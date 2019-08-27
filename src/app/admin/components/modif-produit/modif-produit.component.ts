import { Component, OnInit } from '@angular/core';
import { EntrepotService } from 'src/app/core/services/entrepot.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Produit } from 'src/app/core/models/produit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.css']
})
export class ModifProduitComponent implements OnInit {

  constructor(private route: ActivatedRoute,private entrepotService: EntrepotService, private userService: UserService, private produitService: ProduitService,
    private storageService : StorageService) { }

    destinataires;
    entrepots;
    categoriesProduit;
  
    productModel = new Produit(0, "", "", "", 0, 0, 0, "", "", 0, "", 0, null, 0, 0);

    async ngOnInit() {


      let idProduit = this.route.snapshot.queryParamMap.get('id');
      this.productModel = await this.produitService.getProductById(idProduit).toPromise();


      this.productModel.dateMiseEnRayon = this.productModel.dateMiseEnRayon.split('T')[0];
      this.productModel.dlc = this.productModel.dlc.split('T')[0];


      this.entrepots = await this.entrepotService.getAllEntrepot().toPromise();
  
      this.destinataires = await this.userService.getAllCategory().toPromise();
  
  
      let cpt = this.destinataires.length;
      for (let i = 0; i < cpt; i++) {
  
        if (this.destinataires[i].libelle == "Administrateur" || this.destinataires[i].libelle == "Entreprise" || this.destinataires[i].libelle == "Employe") {
          this.destinataires.splice(i, 1);
          cpt = cpt - 1;
          i-=1;
        }
  
      }
  
      this.categoriesProduit = await this.produitService.getAllProductsCategorie().toPromise();
  
    }


    async onSubmit(){

      let token = this.storageService.getItem('token');
      this.productModel.photo = "img_product.jpg";
  
      if(this.productModel.enRayon == 1){
        this.productModel.enRayon = true;
      }
      else{
        this.productModel.enRayon = false; 
      }
  
      this.productModel.prixInitial = 0;
  
      let res = await this.produitService.updateProduct(this.productModel, token).toPromise();
  
      console.log(res)
  
      alert('Produit modifié !');
      location.replace('/gestion-produit');
    }
}
