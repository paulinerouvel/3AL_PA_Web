import { Component, OnInit } from '@angular/core';
import { DonService } from 'src/app/core/services/don.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { ImageService } from 'src/app/core/services/image.service';
import { PayementService } from 'src/app/core/services/payement.service';

@Component({
  selector: 'app-historique-dons',
  templateUrl: './historique-dons.component.html',
  styleUrls: ['./historique-dons.component.css']
})
export class HistoriqueDonsComponent implements OnInit {
  dons;
  imageToShow=[];

  constructor(private _donService: DonService, private _storageService: StorageService, private _userService: UserService, 
    private _imageService : ImageService, private payementService : PayementService) { }

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


  downloadPDF(donId) {
    this.payementService.getFacture('facture_don_'+ donId + '.pdf')
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = 'facture_don_'+ donId + '.pdf';
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }
}
