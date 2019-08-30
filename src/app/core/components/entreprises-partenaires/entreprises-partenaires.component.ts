import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-entreprises-partenaires',
  templateUrl: './entreprises-partenaires.component.html',
  styleUrls: ['./entreprises-partenaires.component.css']
})
export class EntreprisesPartenairesComponent implements OnInit {

  listeEntreprises;
  imageToShow = [];

  constructor(private _userService: UserService, private _imageService : ImageService) { }

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

    this.listeEntreprises = await this._userService.getValidUsersByCategory("Entreprise").toPromise();

    this.listeEntreprises.forEach(element => {
      this._imageService.getImage(element.photo).subscribe(res => {
        this.createImageFromBlob(res, element.id);
      }, err => {
        console.log(err)
      });
    });
  }

}
