import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Utilisateur } from '../../models/utilisateur';
import { ImageService } from '../../services/image.service';
import { StorageService } from '../../services/storage.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detail-association',
  templateUrl: './detail-association.component.html',
  styleUrls: ['./detail-association.component.css']
})
export class DetailAssociationComponent implements OnInit {

  curAsso = new Utilisateur(0, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", "", 0);
  imageToShow  ;
  don = false;



  constructor(private _userService: UserService, private router : Router,private _storageService: StorageService, private route: ActivatedRoute, private _imageService : ImageService) { }

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
    const idAsso = this.route.snapshot.paramMap.get("id");
    this.curAsso = await this._userService.getUserById(idAsso).toPromise();



    this._imageService.getImage(this.curAsso.photo).subscribe(res => {
      this.createImageFromBlob(res);
    }, err => {
      //console.log(err)
    });


    let token = this._storageService.getItem('token');

    if(token != null){
      let token_decoded = jwt_decode(token);
      if(token_decoded['type'] == 3){
        this.don = true;
      }

    }

  }

  donAsso(){
    this.router.navigate(['/donAsso', { idAsso: this.curAsso.id }]);
  }

}
