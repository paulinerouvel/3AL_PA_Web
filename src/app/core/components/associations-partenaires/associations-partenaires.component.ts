import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-associations-partenaires',
  templateUrl: './associations-partenaires.component.html',
  styleUrls: ['./associations-partenaires.component.css']
})
export class AssociationsPartenairesComponent implements OnInit {

  listeAssos;
  isEmpty = false;
  imageToShow = [];

  constructor(private userService: UserService, private _imageService: ImageService) { }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow.push(reader.result);
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

    this._imageService.getImage().subscribe(res=>{
      this.createImageFromBlob(res);
    }, err=>{
      console.log(err)
    });


  }


}
