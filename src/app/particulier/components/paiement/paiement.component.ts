import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { UserService } from 'src/app/core/services/user.service';
import { MailService } from 'src/app/core/services/mail.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { Commande } from 'src/app/core/models/commande';
import { Commande_has_produit } from 'src/app/core/models/commande_has_produit';
import { Produit } from 'src/app/core/models/produit';
import { Mail } from 'src/app/core/models/mail';
import { Utilisateur } from 'src/app/core/models/utilisateur';

import * as L from 'leaflet';
import { EntrepotService } from 'src/app/core/services/entrepot.service';
import { Entrepot } from 'src/app/core/models/entrepot';
import { Payement } from 'src/app/core/models/payement';
import { PayementService } from 'src/app/core/services/payement.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  total = 0;
  parsedPanier;
  ptSouriresReduction = 0;

  entrepots : Entrepot[];

  commandeModel = new Commande(0, "", null, "", "", "", new Entrepot(0, "", "", "", "", "", "", 0, 0));
  payementModel = new Payement(0, "", "", "", "", null, null, "", null);

  livrerChezMoi = true;
  livrerEntrepot = false;

  constructor(private _aroute: ActivatedRoute, private route : Router,private _cookieService : CookieService, 
    private _produitService: ProduitService, private _userService: UserService, 
    private _mailService: MailService, private _storageService: StorageService, private _commandeService: CommandeService,
    private entrepotService : EntrepotService, private payementService : PayementService) {

   }



  async ngOnInit() {


    let totalParsed = JSON.parse(decodeURIComponent(this._aroute.snapshot.queryParamMap.get('total')));
    this.total = totalParsed['value'];

    this.ptSouriresReduction = JSON.parse(decodeURIComponent(this._aroute.snapshot.queryParamMap.get('ptSourires')));



    let cookie = this._cookieService.get("produitPanier");
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




  async onSubmit(){

    let token = this._storageService.getItem('token');

    let userId = this._userService.decodeTokenId(token);

    
    let now = new Date(Date.now())

    let n = now.toISOString().split('T');

    let date = n[0] + "T" + now.toLocaleTimeString();

    let c;

    if(this.livrerEntrepot == true){
      c = new Commande(-1, date, userId, this.commandeModel.entrepot['adresse'], this.commandeModel.entrepot['ville'], this.commandeModel.entrepot['codePostal'], null);
    }
    else{
      c = new Commande(-1, date, userId, this.commandeModel.adresse_livraison, this.commandeModel.ville_livraison, 
      this.commandeModel.cp_livraison, null);
    }
    

    let res = await this._commandeService.addCommande(c, token).toPromise();
    if (res == null) {
      let curCommande: Commande = await this._commandeService.getLastOrderByIdUser(userId, token).toPromise();


      this.payementModel.montant = this.total;
      this.payementModel.id_commande = curCommande[0].id;
      let payement = await this.payementService.addPayement(this.payementModel, token).toPromise();


      for (let p of this.parsedPanier) {
        let commande_has_produit = new Commande_has_produit(p["id"], curCommande[0].id, p["nb"]);

        await this._commandeService.addProductInCommande(commande_has_produit, token).toPromise();




        let upProduit = new Produit(p["id"], p["libelle"], p["desc"], p["photo"], p["prix"], p["prixInitial"], parseInt(p["quantite"]) - parseInt(p['nb']),
          p["dlc"], p["codeBarre"], p["enRayon"], p["dateMiseEnRayon"], p["categorieProduit_id"], p["listProduct_id"], p["entrepotwm_id"], p["destinataire"]);

        await this._produitService.updateProduct(upProduit, token).toPromise();

      }

      this._cookieService.delete('produitPanier');

      let curUser : Utilisateur = await this._userService.getUserById(userId).toPromise();

      let ptSourires = Math.trunc( this.total );
      curUser.nbPointsSourire += ptSourires;


      if(this.ptSouriresReduction != 0){
        curUser.nbPointsSourire -= (this.ptSouriresReduction * 10);
      }
      await this._userService.updateUser(curUser, token).toPromise();



      let mail = new Mail("wastemart.company@gmail.com", curUser.mail, "Votre Commande",
        "Vous avez commandé des produits chez WasteMart ! <br/> Votre commande sera à votre porte d'ici un jour ouvré.<br/>Cordialement,<br/>L'équipe WasteMart");

      await this._mailService.sendMail(mail).toPromise();

    }


    alert("Votre commande à bien été prise en compte, vous allez recevoir un mail de confirmation de votre achat !");
    location.reload();
  }

  

}
