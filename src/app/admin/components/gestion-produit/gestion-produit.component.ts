import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/core/services/produit.service';
import { Produit } from 'src/app/core/models/produit';
import { EntrepotService } from 'src/app/core/services/entrepot.service';
import { Entrepot } from 'src/app/core/models/entrepot';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {

  constructor(private produitsService : ProduitService, private entrepotService : EntrepotService, 
    private userService : UserService, private storageService : StorageService) { }

  produits;

  async ngOnInit() {

    this.produits = await this.produitsService.getAllProducts().toPromise();


    for (let p of this.produits) {


      let entrepot :Entrepot = await this.entrepotService.getEntrepotById(p.entrepotwm_id.toString()).toPromise();

      p.entrepotwm_id = entrepot[0].libelle;

      let categorieProduit = await this.produitsService.getCategoryById(p.categorieProduit_id.toString()).toPromise();     


      p.categorieProduit_id = categorieProduit.libelle;


      let categoryUser = await this.userService.getCategoryById(p.destinataire.toString()).toPromise();
      p.destinataire = categoryUser.libelle;
      

    }
  }


  
  async deleteProduit(id : string){
    let token : string = this.storageService.getItem('token');
    await this.produitsService.deleteProduct(id, token).toPromise();

    alert("Produit supprimé !");

    location.reload();
  }
}
