import { Component, OnInit } from '@angular/core';
import { Don } from 'src/app/core/models/don';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { DonService } from 'src/app/core/services/don.service';
import { UserService } from 'src/app/core/services/user.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { Payement } from 'src/app/core/models/payement';
import { ImageService } from 'src/app/core/services/image.service';
import { PayementService } from 'src/app/core/services/payement.service';

@Component({
  selector: 'app-don-asso',
  templateUrl: './don-asso.component.html',
  styleUrls: ['./don-asso.component.css']
})
export class DonAssoComponent implements OnInit {

  constructor(private _aRoute: ActivatedRoute, private _storageService: StorageService, private _donService: DonService,
    private _userService: UserService, private imageService: ImageService, private payementService: PayementService) { }


  idAsso = this._aRoute.snapshot.params.idAsso;
  donModel = new Don(0, "", 0, 0, 0);
  payementModel = new Payement(0, "", "", "", "", null, null, "", 0);

  imageToShow;


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async ngOnInit() {
    let asso = await this._userService.getUserById(this.idAsso).toPromise();

    this.imageService.getImage(asso.photo).subscribe(res => {
      this.createImageFromBlob(res);
    }, err => {
      //console.log(err)
    });
  }



  async onSubmit() {

    this.donModel.montant = this.payementModel.montant;


    if (this.donModel.montant > 0) {
      let token = this._storageService.getItem('token');

      let userId = this._userService.decodeTokenId(token);

      let now = new Date(Date.now())

      let n = now.toISOString().split('T');
  
      let date = n[0] + "T" + now.toLocaleTimeString();

      this.donModel.donneur_id = userId;
      this.donModel.receveur_id = this.idAsso;
      this.donModel.date = date;





      await this._donService.addDon(this.donModel, token).toPromise();

      let lastDon: Don = await this._donService.getLastDonByIdDonneur(userId, token).toPromise();

      this.payementModel.id_don = lastDon[0].id;

      await this.payementService.addPayement(this.payementModel, token).toPromise();

      let curUser: Utilisateur = await this._userService.getUserById(userId).toPromise();

      let ptsSourires = Math.trunc(this.donModel.montant) * 2;

      curUser.nbPointsSourire += ptsSourires;

      await this._userService.updateUser(curUser, token).toPromise();



      alert("Votre don à bien été pris en compte, vous allez recevoir un mail de confirmation de votre don !");
      location.replace('/');

    }
    else{
      alert("Vous ne pouvez pas faire un don négatif ou nul ! ");
    }



  }

}
