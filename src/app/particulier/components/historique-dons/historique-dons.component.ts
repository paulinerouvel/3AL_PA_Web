import { Component, OnInit } from '@angular/core';
import { DonService } from 'src/app/core/services/don.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-historique-dons',
  templateUrl: './historique-dons.component.html',
  styleUrls: ['./historique-dons.component.css']
})
export class HistoriqueDonsComponent implements OnInit {
  dons;
  imageToShow=[];

  constructor(private _donService: DonService, private _storageService: StorageService, private _userService: UserService, 
    private _imageService : ImageService) { }

  createImageFromBlob(image: Blob, id) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow[id] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async ngOnInit() {

    let token = this._storageService.getItem('token');

    this.dons = await this._donService.getAllDonByIdDonneur(this._userService.decodeTokenId(token), token).toPromise();


    this.dons.forEach(async element => {
      let receveur = await this._userService.getUserById(element.Receveur_id).toPromise();

      element.receveur = receveur.libelle;

      element.contact = receveur.mail + " " + receveur.tel;

    });


    this.dons.forEach(async element => {

      let user : Utilisateur = await this._userService.getUserById(element.Receveur_id).toPromise();
      this._imageService.getImage(user.photo).subscribe(res => {
        this.createImageFromBlob(res, element.id);
      }, err => {
        //console.log(err)
      });
    });

  }
}
