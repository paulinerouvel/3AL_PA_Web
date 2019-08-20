import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Commande } from 'src/app/core/models/commande';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { Commande_has_produit } from 'src/app/core/models/commande_has_produit';
import { MailService } from 'src/app/core/services/mail.service';
import { Mail } from 'src/app/core/models/mail';
import { UserService } from 'src/app/core/services/user.service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { Produit } from 'src/app/core/models/produit';

@Component({
  selector: 'app-mon-panier-asso',
  templateUrl: './mon-panier-asso.component.html',
  styleUrls: ['./mon-panier-asso.component.css']
})
export class MonPanierAssoComponent implements OnInit {

  constructor(private _cookieService: CookieService, private _produitService: ProduitService, private _userService: UserService, private _mailService: MailService, private _storageService: StorageService, private _commandeService: CommandeService) { }
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
    let token = this._storageService.getItem('token');
    let idUser = this._userService.decodeTokenId(token);
    let now = new Date(Date.now());
    let c = new Commande(-1, now.toISOString(), idUser, "", "", "", null);
    let res = await this._commandeService.addCommande(c, token).toPromise();
    if (res == null) {
      let curCommande: Commande = await this._commandeService.getLastOrderByIdUser(idUser, token).toPromise();


      for (let p of this.parsedPanier) {
        let commande_has_produit = new Commande_has_produit(p["id"], curCommande[0].id, p["nb"]);
        await this._commandeService.addProductInCommande(commande_has_produit, token).toPromise();




        let upProduit = new Produit(p["id"], p["libelle"], p["desc"], p["photo"], p["prix"], p["prixInitial"], parseInt(p["quantite"]) - parseInt(p['nb']),
          p["dlc"], p["codeBarre"], p["enRayon"], p["dateMiseEnRayon"], p["categorieProduit_id"], p["listProduct_id"], p["entrepotwm_id"], p["destinataire"]);

        await this._produitService.updateProduct(upProduit, token).toPromise();

      }

      this._cookieService.delete('produitPanier');

      let curUser = await this._userService.getUserById(idUser).toPromise();

      let mail = new Mail("wastemart.company@gmail.com", curUser.mail, "Votre Commande",
        "Vous avez commandé des produits chez WasteMart ! <br/> Votre commande sera à votre porte d'ici un jour ouvré.<br/>Cordialement,<br/>L'équipe WasteMart");

      await this._mailService.sendMail(mail).toPromise();

    }

    this.isEmpty = true;

    alert("Votre commande à bien été prise en compte, vous allez recevoir un mail de confirmation de votre achat !");
    location.reload();
  }


}
