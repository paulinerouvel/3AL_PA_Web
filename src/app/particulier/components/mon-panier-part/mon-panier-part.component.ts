import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { MailService } from 'src/app/core/services/mail.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { Commande } from 'src/app/core/models/commande';
import { Commande_has_produit } from 'src/app/core/models/commande_has_produit';
import { Produit } from 'src/app/core/models/produit';
import { Mail } from 'src/app/core/models/mail';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/core/models/utilisateur';

@Component({
  selector: 'app-mon-panier-part',
  templateUrl: './mon-panier-part.component.html',
  styleUrls: ['./mon-panier-part.component.css']
})
export class MonPanierPartComponent implements OnInit {

  constructor(private _cookieService: CookieService,private _route : Router, private storageService : StorageService, private userService : UserService) { }

  parsedPanier = [];
  isEmpty = true;
  totalPanier = 0;
  reduction = false;
  curUser = new Utilisateur(0,"","","","","","","","","","","","",0,0,"","","",0)
  ptSourires = 0;


  async ngOnInit() {
    let cookie = this._cookieService.get("produitPanier");
    if (cookie) {
      this.parsedPanier = JSON.parse(cookie);
      this.isEmpty = false;


    }
    this.calculTotalPanier();

    let token = this.storageService.getItem('token');
    let token_decoded = jwt_decode(token);
    this.curUser = await this.userService.getUserById(token_decoded['id']).toPromise();
  }


  deletePanier(idProduit) {

    for (let i = 0; i < this.parsedPanier.length; i++) {
      if (this.parsedPanier[i].id == idProduit) {
        this.parsedPanier.splice(i, 1);
        this.savePanier(this.parsedPanier);
      }
    }
  }

   savePanier(produitPanier) {
    this._cookieService.delete('produitPanier', '/panier-part');
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

  calculTotalPanier() {
    this.totalPanier = 0;
    for (let k = 0; k < this.parsedPanier.length; k++) {
      this.totalPanier += this.parsedPanier[k].prix * this.parsedPanier[k].nb;
    }
  }

  async validatePanier() {
    this._route.navigate(['paiement'], {queryParams : {parsedPanier : this.parsedPanier, ptSourires : this.ptSourires ,total : encodeURIComponent(JSON.stringify({type: 'float', value: this.totalPanier.toString()}))}});

  }

  addReduction(){
    this.reduction = true;
    this.ptSourires = this.curUser.nbPointsSourire /10;
    this.totalPanier = this.totalPanier - this.ptSourires;

    

  }

  deleteReduction(){
    this.reduction = false;
    this.totalPanier = this.totalPanier + this.ptSourires;
    this.ptSourires = 0;
  }

}
