import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { CookieService } from 'ngx-cookie-service';
import { ProduitService } from 'src/app/core/services/produit.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-boutique-parti',
  templateUrl: './boutique-parti.component.html',
  styleUrls: ['./boutique-parti.component.css']
})
export class BoutiquePartiComponent implements OnInit {

  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  produits;
  parsedPanier = [];
  totalPanier = 0;
  motCle = "";
  filter = [];


  imageToShow=[];


  optionSelect = []

  constructor(  private _produitService: ProduitService, private _cookieService: CookieService, 
    private _imageService : ImageService) {
    

  }

  createImageFromBlob(image: Blob, id) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow[id] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async ngOnInit() {

    this.produits = await this._produitService.getAllProductEnRayonByDest("3").toPromise();

    this.produits.forEach(element => {
      this._imageService.getImage(element.photo).subscribe(res => {
        this.createImageFromBlob(res, element.id);
      }, err => {
        //console.log(err)
      });
    });



    let categoriesProduit = await this._produitService.getAllProductsCategorie().toPromise();
    categoriesProduit.forEach(element => {
      this.optionSelect.push(element)
    });



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


  async filtreCategorie(id){
    let produitDeBase;

    if(this.produits == null /*&& this.lastFilter == "filtreCategorie"*/){
      produitDeBase = await this._produitService.getAllProductEnRayonByDest("3").toPromise();
    }
    else{
      produitDeBase = this.produits;
    }

    
    this.produits= [];
    
    let produitsFiltre = await this._produitService.getProductByCategorieAndDest(id, "3").toPromise();


    if(produitDeBase != null){
      for (const p of produitDeBase) {
        for (const p2 of produitsFiltre) {
          if(p.id == p2.id){
            this.produits.push(p);
          }
        }
      }
    }

  
    if(this.produits.length == 0){
      this.produits = null;
    }

    this.filter.push("filtreCategorie");
  }

  async filtrePrix(){

    let produitDeBase;

    if(this.produits == null /*&& this.lastFilter == "filtrePrix"*/){
      produitDeBase = await this._produitService.getAllProductEnRayonByDest("3").toPromise();
    }
    else{
      produitDeBase = this.produits;
    }

    
    this.produits= [];
    
    let produitsFiltre = await this._produitService.getProductByPrixAndDest(this.value, this.highValue, "3").toPromise();
  

    if(produitDeBase != null){
      for (const p of produitDeBase) {
        for (const p2 of produitsFiltre) {
          if(p.id == p2.id){
            this.produits.push(p);
          }
        }
      }
    }

    if(this.produits.length == 0){
      this.produits = null;
    }
    this.filter.push("filtrePrix");
  }

  async filtreMotCle(){
    let produitDeBase;

    if(this.produits == null /*&& this.lastFilter == "filtreMotCle"*/){
      produitDeBase = await this._produitService.getAllProductEnRayonByDest("3").toPromise();
    }
    else{
      produitDeBase = this.produits;
    }

    
    this.produits= [];

    let produitsFiltre = await this._produitService.getProductByNameAndDest(this.motCle, "3").toPromise();

    if(produitDeBase != null){
      for (const p of produitDeBase) {
        for (const p2 of produitsFiltre) {
          if(p.id == p2.id){
            this.produits.push(p);
          }
        }
      }
    }


    if(this.produits.length == 0){
      this.produits = null;
    }

    this.filter.push("filtreMotCle");

  }

  motCleChange(e)
  {
    this.motCle = e.target.value;

  }
}
