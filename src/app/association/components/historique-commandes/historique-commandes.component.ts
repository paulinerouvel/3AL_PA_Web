import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/core/services/commande.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent implements OnInit {

  commandes;

  constructor(private _storageService: StorageService, private _commandeService: CommandeService, private userService : UserService) { }

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

}
