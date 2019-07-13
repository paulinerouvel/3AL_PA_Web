import { Component, OnInit } from '@angular/core';

import { faShoppingBasket, faFileAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-boutique-asso',
  templateUrl: './boutique-asso.component.html',
  styleUrls: ['./boutique-asso.component.css']
})
export class BoutiqueAssoComponent implements OnInit {

  produits;
  parsedPanier = [];
  totalPanier = 0;
  maxArticle = 50;
  maxArticleFixe = 50;


  faShoppingBasket = faShoppingBasket;
  faFileAlt = faFileAlt;
  faTimesCircle = faTimesCircle;

  constructor(private _produitService: ProduitService, private _storageService: StorageService, private _cookieService: CookieService, private _commandeService: CommandeService) { }

  formatDate(date: string): string {
    let dateTab = date.split("T");
    return dateTab[0];
  }

  async ngOnInit() {

    let sevenDays = 604800000;
    let now = new Date(Date.now());
    let oneSemaineLeft = new Date(Date.now() - sevenDays);


    let token = this._storageService.getItem('token');
    let token_decoded = jwt_decode(token);


    let maxInit = await this._commandeService.getSumOfProductsOrderByUserAndDate(this.formatDate(oneSemaineLeft.toISOString()),
      this.formatDate(now.toISOString()), token_decoded['id']).toPromise();


    if (maxInit != 0) {
      if (maxInit[0].total != null) {
        this.maxArticle -= maxInit[0].total;
      }
    }

    this.produits = await this._produitService.getAllProductEnRayonByDest("1").toPromise();



    //recupération du contenu du panier
    let cookie = this._cookieService.get("produitPanier");
    if (cookie) {
      this.parsedPanier = JSON.parse(cookie);

      for (let j = 0; j < this.produits.length; j++) {
        for (let k = 0; k < this.parsedPanier.length; k++) {
          if (this.produits[j].id == this.parsedPanier[k].id) {
            this.parsedPanier[k].quantite = this.produits[j].quantite;
          }
        }
      }
      this.calculTotalPanier();
    }

  }



  async addPanier(produit) {
    let alreadyInPan = false;


    for (let i = 0; i < this.parsedPanier.length; i++) {
      if (this.parsedPanier[i].id == produit.id) {
        alreadyInPan = true;
      }
    }

    if (!alreadyInPan) {
      if (this.maxArticle != 0) {
        produit.nb = 1
        this.parsedPanier.push(produit);
        this.savePanier(this.parsedPanier);
        let cookie = this._cookieService.get("produitPanier");
        this.parsedPanier = JSON.parse(cookie);
        this.maxArticle -= 1;
        if (this.maxArticle == 0) {
          alert("Vous ne pouvez plus mettre d'article dans votre panier, car vous avez atteind la limite de " + this.maxArticleFixe + " produits par semaine !");
        }
      }
      else {
        alert("Vous ne pouvez plus mettre d'article dans votre panier, car vous avez atteind la limite de " + this.maxArticleFixe + " produits par semaine !");
      }

    }
    else {
      alert("Déjà dans le panier !");
    }

  }

  deletePanier(idProduit) {

    for (let i = 0; i < this.parsedPanier.length; i++) {
      if (this.parsedPanier[i].id == idProduit) {
        this.parsedPanier.splice(i, 1);
        this.savePanier(this.parsedPanier);
      }
    }
  }

  calculTotalPanier() {
    this.totalPanier = 0;
    for (let k = 0; k < this.parsedPanier.length; k++) {
      this.totalPanier += this.parsedPanier[k].prix * this.parsedPanier[k].nb;
    }
  }


  savePanier(produitPanier) {
    this._cookieService.set('produitPanier', JSON.stringify(produitPanier), 5);//expire dans 5 jours
    this.calculTotalPanier();
  }


  counter(nb) {
    nb = parseInt(nb);
    let counter = [];

    for (let i = 1; i <= nb; i++) {
      counter.push(i)
    }
    return counter;
  }


  updateQuantite(id, i) {
    i = parseInt(i)
    if (this.maxArticle != 0) {


      if (this.maxArticle - i <= 0) {
        alert("Vous ne pouvez pas mettre autant d'article dans votre panier, car vous il vous reste " + this.maxArticle + " produits cette semaine !");
        location.reload();
      }
      else {
        for (let o = 0; o < this.parsedPanier.length; o++) {
          if (this.parsedPanier[o].id == id) {

            this.parsedPanier[o].nb = i;
            this.savePanier(this.parsedPanier);
          }
        }
      }
    }
    else {

      alert("Vous ne pouvez plus mettre d'article dans votre panier, car vous avez atteind la limite de " + this.maxArticleFixe + " produits par semaine !");
      location.reload();
    }

  }

}
