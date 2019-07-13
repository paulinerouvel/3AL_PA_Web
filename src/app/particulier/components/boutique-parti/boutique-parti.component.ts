import { Component, OnInit } from '@angular/core';

import { faShoppingBasket, faFileAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ProduitService } from 'src/app/core/services/produit.service';

@Component({
  selector: 'app-boutique-parti',
  templateUrl: './boutique-parti.component.html',
  styleUrls: ['./boutique-parti.component.css']
})
export class BoutiquePartiComponent implements OnInit {

  produits;
  parsedPanier = [];
  totalPanier = 0;


  faShoppingBasket = faShoppingBasket;
  faFileAlt = faFileAlt;
  faTimesCircle = faTimesCircle;

  constructor(private _produitService: ProduitService, private _cookieService: CookieService) { }

  async ngOnInit() {

    this.produits = await this._produitService.getAllProductEnRayonByDest("3").toPromise();



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
      produit.nb = 1
      this.parsedPanier.push(produit);
      this.savePanier(this.parsedPanier);
      let cookie = this._cookieService.get("produitPanier");
      this.parsedPanier = JSON.parse(cookie);
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
    this._cookieService.delete('produitPanier', '/boutique-part');
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
    for (let o = 0; o < this.parsedPanier.length; o++) {
      if (this.parsedPanier[o].id == id) {

        this.parsedPanier[o].nb = i;
        this.savePanier(this.parsedPanier);
      }
    }
  }

}
