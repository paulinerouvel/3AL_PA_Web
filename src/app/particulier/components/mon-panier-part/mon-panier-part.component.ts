import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { MailService } from 'src/app/core/services/mail.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { CookieService } from 'ngx-cookie-service';
import { faShoppingBasket, faFileAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import * as jwt_decode from 'jwt-decode';
import { Commande } from 'src/app/core/models/commande';
import { Commande_has_produit } from 'src/app/core/models/commande_has_produit';
import { Produit } from 'src/app/core/models/produit';
import { Mail } from 'src/app/core/models/mail';

@Component({
  selector: 'app-mon-panier-part',
  templateUrl: './mon-panier-part.component.html',
  styleUrls: ['./mon-panier-part.component.css']
})
export class MonPanierPartComponent implements OnInit {

  constructor(private _cookieService: CookieService, private _produitService: ProduitService, private _userService: UserService, private _mailService: MailService, private _storageService: StorageService, private _commandeService: CommandeService) { }

  parsedPanier = [];
  faShoppingBasket = faShoppingBasket;
  faFileAlt = faFileAlt;
  faTimesCircle = faTimesCircle;
  isEmpty = true;
  totalPanier = 0;


  ngOnInit() {
    let cookie = this._cookieService.get("produitPanier");
    if (cookie) {
      this.parsedPanier = JSON.parse(cookie);
      this.isEmpty = false;

    }
    this.calculTotalPanier();
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
    let token = this._storageService.getItem('token');
    let token_decoded = jwt_decode(token);
    let now = new Date(Date.now());
    let c = new Commande(-1, now.toISOString(), token_decoded['id']);
    let res = await this._commandeService.addCommande(c).toPromise();
    if (res == null) {
      let curCommande: Commande = await this._commandeService.getLastOrderByIdUser(token_decoded['id']).toPromise();


      for (let p of this.parsedPanier) {
        let commande_has_produit = new Commande_has_produit(p["id"], curCommande[0].id, p["nb"]);
        await this._commandeService.addProductInCommande(commande_has_produit).toPromise();




        let upProduit = new Produit(p["id"], p["libelle"], p["desc"], p["photo"], p["prix"], p["prixInitial"], parseInt(p["quantite"]) - parseInt(p['nb']),
          p["dlc"], p["codeBarre"], p["enRayon"], p["dateMiseEnRayon"], p["categorieProduit_id"], p["listProduct_id"], p["entrepotwm_id"], p["destinataire"]);

        await this._produitService.updateProduct(upProduit).toPromise();

      }

      this._cookieService.delete('produitPanier');

      let curUser = await this._userService.getUserById(token_decoded['id']).toPromise();

      let mail = new Mail("wastemart.company@gmail.com", curUser.mail, "Votre Commande",
        "Vous avez commandé des produits chez WasteMart ! <br/> Votre commande sera à votre porte d'ici un jour ouvré.<br/>Cordialement,<br/>L'équipe WasteMart");

      await this._mailService.sendMail(mail).toPromise();

    }

    this.isEmpty = true;

    alert("Votre commande à bien été prise en compte, vous allez recevoir un mail de confirmation de votre achat !");
    location.reload();
  }

}
