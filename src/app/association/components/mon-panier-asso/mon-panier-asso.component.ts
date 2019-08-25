import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-panier-asso',
  templateUrl: './mon-panier-asso.component.html',
  styleUrls: ['./mon-panier-asso.component.css']
})
export class MonPanierAssoComponent implements OnInit {

  constructor(private _cookieService: CookieService,  private _userService: UserService, 
     private _storageService: StorageService, private _commandeService: CommandeService,
    private _route : Router) { }
  parsedPanier = [];
  isEmpty = true;

  maxArticle = 50;
  maxArticleFixe = 50;

  formatDate(date: string): string {
    let dateTab = date.split("T");
    return dateTab[0];
  }


  async ngOnInit() {
        
    let sevenDays = 604800000;
    let now = new Date(Date.now());
    let oneSemaineLeft = new Date(Date.now() - sevenDays);


    let token = this._storageService.getItem('token');


    let maxInit = await this._commandeService.getSumOfProductsOrderByUserAndDate(this.formatDate(oneSemaineLeft.toISOString()),
      this.formatDate(now.toISOString()), this._userService.decodeTokenId(token), token).toPromise();


    if (maxInit != 0) {
      if (maxInit[0].total != null) {
        this.maxArticle -= maxInit[0].total;
      }
    }

    let cookie = this._cookieService.get("produitPanier");
    if (cookie) {
      this.parsedPanier = JSON.parse(cookie);
      this.isEmpty = false;
      this.savePanier(this.parsedPanier);

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

  savePanier(produitPanier) {
    this._cookieService.delete('produitPanier', '/panier-asso');
    this._cookieService.set('produitPanier', JSON.stringify(produitPanier), 5);//expire dans 5 jours

    if(produitPanier.length == 0){
      this.isEmpty = true;
    }

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


  async validatePanier() {
    this._route.navigate(['commande-asso'], { queryParams: { parsedPanier: this.parsedPanier  } });

  }

  


}
