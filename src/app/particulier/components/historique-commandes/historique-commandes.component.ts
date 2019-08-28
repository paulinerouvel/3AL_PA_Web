import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { UserService } from 'src/app/core/services/user.service';
import { PayementService } from 'src/app/core/services/payement.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent implements OnInit {

  commandes;

  constructor(private _storageService: StorageService, private _commandeService: CommandeService, private userService: UserService,
    private payementService : PayementService) { }

  async ngOnInit() {

    let token = this._storageService.getItem('token');

    this.commandes = await this._commandeService.getAllCommandeByIdUser(this.userService.decodeTokenId(token), token).toPromise();
    this.commandes.forEach(async element => {
      element.produits = await this._commandeService.getAllProductByOrder(element.id, token).toPromise();
      let t = 0;
      for (let p of element.produits) {
        t += p.prix * p.quantite;
      }

      element.total = t;

    });


  }


  downloadPDF(cmdId) {
    this.payementService.getFacture('facture_cmd_'+ cmdId + '.pdf')
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
        link.download = 'facture_cmd_'+ cmdId + '.pdf';
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
