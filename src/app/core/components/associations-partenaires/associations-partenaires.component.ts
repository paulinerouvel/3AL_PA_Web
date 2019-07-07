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

  constructor(private userService : UserService, private _imageService : ImageService) { }

  async ngOnInit() {

    this.listeAssos = await this.userService.getValidUsersByCategory("Association").toPromise();

    // this._imageService.getValidUsersByCategory("couou").subscribe(res=>{
    //   console.log(res);
    // }, err=>{
    //   console.log(err)
    // });


  }


}
