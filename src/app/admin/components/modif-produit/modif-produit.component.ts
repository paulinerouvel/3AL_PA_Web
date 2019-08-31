import { Component, OnInit } from '@angular/core';
import { EntrepotService } from 'src/app/core/services/entrepot.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Produit } from 'src/app/core/models/produit';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { Entrepot } from 'src/app/core/models/entrepot';

@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.css']
})
export class ModifProduitComponent implements OnInit {

  constructor(private route: ActivatedRoute, private entrepotService: EntrepotService, private userService: UserService, private produitService: ProduitService,
    private storageService: StorageService) { }

  public destinataires: Utilisateur[];
  public entrepots: Entrepot[];
  public categoriesProduit;
  photoInit = "";

  public productModel = new Produit(0, "", "", "", 0, 0, 0, "", "", 0, "", 0, null, 0, 0);

  async ngOnInit() {


    let idProduit = this.route.snapshot.queryParamMap.get('id');
    this.productModel = await this.produitService.getProductById(idProduit).toPromise();

    this.photoInit = this.productModel.photo;


    this.productModel.dateMiseEnRayon = this.productModel.dateMiseEnRayon.split('T')[0];
    this.productModel.dlc = this.productModel.dlc.split('T')[0];


    this.entrepots = await this.entrepotService.getAllEntrepot().toPromise();

    this.destinataires = await this.userService.getAllCategory().toPromise();


    let cpt = this.destinataires.length;
    for (let i = 0; i < cpt; i++) {

      if (this.destinataires[i].libelle == "Administrateur" || this.destinataires[i].libelle == "Entreprise" || this.destinataires[i].libelle == "Employe") {
        this.destinataires.splice(i, 1);
        cpt = cpt - 1;
        i -= 1;
      }

    }

    this.categoriesProduit = await this.produitService.getAllProductsCategorie().toPromise();

  }


  async onSubmit() {

    if (this.productModel.prix <= 0 || this.productModel.quantite <= 0
      || new Date(this.productModel.dateMiseEnRayon) < new Date(Date.now()) || new Date(this.productModel.dlc) < new Date(Date.now())) {
      alert('Certains champs ne sont pas valides');
    }
    else {


      let entrepot: Entrepot = await this.entrepotService.getEntrepotById((this.productModel.entrepotwm_id).toString()).toPromise();



      if (entrepot[0].placeLibre + this.productModel.quantite >= entrepot[0].placeTotal) {
        alert("Il n'y a pas assez de place dans l'entrepôt !");
      } else {

        let token = this.storageService.getItem('token');

        if (this.productModel.photo == null || this.productModel.photo == undefined || this.productModel.photo == "") {
          this.productModel.photo = this.photoInit;
        }


        if (this.productModel.enRayon == 1) {
          this.productModel.enRayon = true;
        }
        else {
          this.productModel.enRayon = false;
        }

        this.productModel.prixInitial = 0;

        let res = await this.produitService.updateProduct(this.productModel, token).toPromise();

        console.log(res)

        alert('Produit modifié !');
        location.replace('/gestion-produit');
      }
    }
  }
}
