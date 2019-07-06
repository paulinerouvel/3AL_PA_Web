import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import {  faShoppingBasket, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

  
  produits;
  panierId = [];
  panier = [];


  faShoppingBasket = faShoppingBasket;
  faFileAlt = faFileAlt;

  constructor(private _produitService : ProduitService, private _cookieService : CookieService) { }

  async ngOnInit() {

    this.produits = await this._produitService.getAllProductEnRayon().toPromise();

    let cookie = this._cookieService.get("productsPanier");
    
    let tabCookie = cookie.split('|');
    this.panierId = [];
    this.panier = [];
  
    for (const p in tabCookie) {
      this.panierId.push(parseInt(tabCookie[p]));

      //get produit by id 
      let selectedProduct = await this._produitService.getProductById(parseInt(tabCookie[p])).toPromise();

      this.panier.push(selectedProduct);
    }

  }

  async addPanier(idProduit){
    let oldProduits = this._cookieService.get('productsPanier');

    if(!oldProduits){
      this._cookieService.set( 'productsPanier', idProduit );
      this.panierId = [];
      this.panierId.push(parseInt(idProduit));
    }
    else{
      let newCookie = oldProduits += "|" + idProduit;
      this._cookieService.set( 'productsPanier', newCookie );

      let tabCookie = newCookie.split('|');


      this.panierId = [];
      this.panier = [];
    
      for (const p in tabCookie) {
        this.panierId.push(parseInt(tabCookie[p]));
        let selectedProduct = await this._produitService.getProductById(parseInt(tabCookie[p])).toPromise();

        this.panier.push(selectedProduct);

      }


    }
    
  }

  deletePanier(idProduit){

  }






}
