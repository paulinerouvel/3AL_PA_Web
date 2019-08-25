import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/core/models/produit';
import { ProduitService } from 'src/app/core/services/produit.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  constructor(private route: ActivatedRoute, private produitService : ProduitService, private imageService : ImageService) { }

  produit;


  imageToShow;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async ngOnInit() {

    let idProduit = this.route.snapshot.queryParamMap.get('id');
    this.produit = await this.produitService.getProductById(idProduit).toPromise();


    this.imageService.getImage(this.produit.photo).subscribe(res => {
      this.createImageFromBlob(res);
    }, err => {
      console.log(err)
    });

  }

}
