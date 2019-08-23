import { Component, OnInit } from '@angular/core';
import { Entrepot } from 'src/app/core/models/entrepot';
import { Commande } from 'src/app/core/models/commande';
import * as L from 'leaflet';
import { EntrepotService } from 'src/app/core/services/entrepot.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Commande_has_produit } from 'src/app/core/models/commande_has_produit';
import { Produit } from 'src/app/core/models/produit';
import { ProduitService } from 'src/app/core/services/produit.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  entrepots : Entrepot[];

  commandeModel = new Commande(0, "", null, "", "", "", new Entrepot(0, "", "", "", "", "", "", 0, 0));

  livrerChezMoi = true;
  livrerEntrepot = false;

  parsedPanier;

  constructor(private entrepotService : EntrepotService, private storageService : StorageService, private userService : UserService,
    private commandeService : CommandeService, private route : Router, private cookieService : CookieService, 
    private produitService : ProduitService) { }

  async ngOnInit() {

    let cookie = this.cookieService.get("produitPanier");
    if (cookie) {
      this.parsedPanier = JSON.parse(cookie);
    }
    else{
      this.route.navigateByUrl('/boutique-part');
    }

    //carte
    const myfrugalmap = L.map('frugalmap').setView([48.8534, 2.3488], 12);
 
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    //marqueur des entrepots

    this.entrepots  = await this.entrepotService.getAllEntrepot().toPromise();

    for (const entrepot of this.entrepots) {
      let coor = await this.entrepotService.getCoordArdress(entrepot.adresse, entrepot.ville,entrepot.codePostal).toPromise();

      const marqueurEntr = L.icon({
         iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
       });
       L.marker([coor[0].lat, coor[0].lon], {icon: marqueurEntr}).bindPopup(entrepot.libelle).addTo(myfrugalmap).openPopup();
    }
  }

  selectLivraisonChezMoi(){
    this.livrerEntrepot = !this.livrerEntrepot;

  }

  selectLivraisonEntrepot(){
    this.livrerChezMoi = !this.livrerChezMoi;

  }


  async onSubmit() {
    let token = this.storageService.getItem('token');
    let idUser = this.userService.decodeTokenId(token);
    let curUser : Utilisateur = await this.userService.getUserById(idUser).toPromise();

    let now = new Date(Date.now())

    let n = now.toISOString().split('T');

    let date = n[0] + "T" + now.toLocaleTimeString();

    let c;

    if(this.livrerChezMoi == true){
      c = new Commande(-1, date, idUser, curUser.adresse, curUser.ville, curUser.codePostal, null);
    }
    else{
      c = new Commande(-1, date, idUser, this.commandeModel.entrepot['adresse'], this.commandeModel.entrepot['ville'], this.commandeModel.entrepot['codePostal'], null);
    }
    

    let res = await this.commandeService.addCommande(c, token).toPromise();
    if (res == null) {
      let curCommande: Commande = await this.commandeService.getLastOrderByIdUser(idUser, token).toPromise();


      for (let p of this.parsedPanier) {
        let commande_has_produit = new Commande_has_produit(p["id"], curCommande[0].id, p["nb"]);
        await this.commandeService.addProductInCommande(commande_has_produit, token).toPromise();




        let upProduit = new Produit(p["id"], p["libelle"], p["desc"], p["photo"], p["prix"], p["prixInitial"], parseInt(p["quantite"]) - parseInt(p['nb']),
          p["dlc"], p["codeBarre"], p["enRayon"], p["dateMiseEnRayon"], p["categorieProduit_id"], p["listProduct_id"], p["entrepotwm_id"], p["destinataire"]);

        await this.produitService.updateProduct(upProduit, token).toPromise();

      }

      this.cookieService.delete('produitPanier');



    }


    alert("Votre commande à bien été prise en compte, vous allez recevoir un mail de confirmation de votre achat !");


    if(this.userService.decodeTokenType(token) == 1){
      this.route.navigateByUrl('/boutique-asso');
    }
    else if(this.userService.decodeTokenType(token) == 3){
      this.route.navigateByUrl('/boutique-part');
    }
    else{
      this.route.navigateByUrl('/boutique');
    }
  }

}
