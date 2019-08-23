import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-associations-partenaires',
  templateUrl: './associations-partenaires.component.html',
  styleUrls: ['./associations-partenaires.component.css']
})
export class AssociationsPartenairesComponent implements OnInit {

  listeAssos;
  isEmpty = false;
  imageToShow = [];
  don =false;

  constructor(private userService: UserService, private _imageService: ImageService, 
    private router : Router, private storageService: StorageService) { }

  createImageFromBlob(image: Blob, id ) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow[id] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async ngOnInit() {

    this.listeAssos = await this.userService.getValidUsersByCategory("Association").toPromise();
    if (this.listeAssos == []) {
      this.isEmpty = true;
    }

    let token = this.storageService.getItem('token');

    if(token != null){
      if(this.userService.decodeTokenType(token) == 3){
        this.don = true;
      }

    }

    this.listeAssos.forEach(element => {
      this._imageService.getImage(element.photo).subscribe(async res => {

        this.createImageFromBlob(res, element.Utilisateur_id);
      }, err => {
        console.log(err)
      });
    });


  }

  donAsso(id){

    this.router.navigate(['/donAsso', { idAsso: id }]);
  }


}
