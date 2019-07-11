import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent implements OnInit {

  commandes;

  constructor(private _storageService: StorageService, private _commandeService : CommandeService) { }

  async ngOnInit() {

    let token = this._storageService.getItem('token');

    let token_decoded = jwt_decode(token);

    this.commandes = await this._commandeService.getAllCommandeByIdUser(token_decoded['id']).toPromise();
    this.commandes.forEach(async element => {
      element.produits = await this._commandeService.getAllProductByOrder(element.id).toPromise();
      let t = 0;
      for(let p of element.produits){
        t += p.prix * p.quantite;
      }

      element.total = t;

    });

    
  }

}
