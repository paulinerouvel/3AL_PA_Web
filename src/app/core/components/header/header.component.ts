import { Component, OnInit} from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Utilisateur } from '../../models/utilisateur';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShown: boolean = false;
  isShownBis: boolean = false;
  isConnected = false;
  type;
  imageToShow;
  curUser: Utilisateur = new Utilisateur(0, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  constructor(private _storageService: StorageService, private _imageService : ImageService, private _userService: UserService, 
    private _cookieService: CookieService, private _router: Router) {
      let token = this._storageService.getItem('token');


      
      if (token != undefined) {

        this.isConnected = true;
        this._userService.decodeTokenType(token);
        this.type = this._userService.decodeTokenType(token);

        this._userService.getUserById(this._userService.decodeTokenId(token)).subscribe(res=>{
          this.curUser = res
        })
      }
  
  }

  async ngOnInit() {


    let token =this._storageService.getItem('token');
    if (token != undefined) {
      this.isConnected = true;

      this.type = this._userService.decodeTokenType(token);
      this.curUser = await this._userService.getUserById(this._userService.decodeTokenId(token)).toPromise();


      
      this._imageService.getImage(this.curUser.photo).subscribe(res => {
        this.createImageFromBlob(res);
      }, err => {
        console.log(err)
      });
    }



    //regarde si le localStorage change pour le token 
    this._storageService.watchStorage().subscribe(async (token: string) => {


      if (token != "remove") {
        this.isConnected = true;
        this.type = this._userService.decodeTokenType(token);
        this.curUser = await this._userService.getUserById(this._userService.decodeTokenId(token)).toPromise();
      }
      else {
        this.isConnected = false;
        //this.curUser = undefined;
      }

    });

  }


  deconnexion() {
    this._storageService.removeItem("token");
    this._cookieService.delete('produitPanier');
    this.isConnected = false;
    this.curUser = undefined;
    this._router.navigateByUrl('/home');
  }


}
