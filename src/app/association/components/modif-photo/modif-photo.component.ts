import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { ImageService } from 'src/app/core/services/image.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modif-photo',
  templateUrl: './modif-photo.component.html',
  styleUrls: ['./modif-photo.component.css']
})
export class ModifPhotoComponent implements OnInit {



  constructor(private fb: FormBuilder, private storageService: StorageService, private userService: UserService,
    private imageService: ImageService, private router : Router) { }

  
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  err: string;
  selectedFile: File;
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

    let token = this.storageService.getItem('token');
    let id = this.userService.decodeTokenId(token);
    let curUser = await this.userService.getUserById(id).toPromise();

    this.imageService.getImage(curUser.photo).subscribe(res => {
      this.createImageFromBlob(res);
    }, err => {
      console.log(err)
    });
  }

  async onFileChange(imageInput) {

    this.selectedFile = imageInput.files[0];


    let fileType = this.selectedFile.type;



    if (fileType == "image/jpeg" || fileType == "image/png") {
      this.err = undefined;
    }
    else {
      this.err = "Veuillez sélectionner une image de format .png ou .jpg"
    }


  }

  onSubmit() {
    const reader = new FileReader();

    reader.addEventListener('load', async (event: any) => {

      let token = this.storageService.getItem('token');
      let userId = this.userService.decodeTokenId(token);

      let ext = this.selectedFile.type.split("/");

      let fileName = "img_profil_" + userId + "." + ext[1];

      let user: Utilisateur = await this.userService.getUserById(userId).toPromise();

      user.photo = fileName;

      await this.userService.updateUser(user, token).toPromise();

      this.imageService.postImage(fileName, this.selectedFile).subscribe(res=>{
        alert("Votre photo à bien été modifiée");
  
        if(this.userService.decodeTokenType(token) == 1){
          this.router.navigateByUrl('/boutique-asso');
        }
        else if(this.userService.decodeTokenType(token) == 3){
          this.router.navigateByUrl('/boutique-part');
        }
        else{
          this.router.navigateByUrl('/boutique');
        }
  
      }, err=>{
        alert("Une erreur s'est produite, retentez plus tard");
        console.log("err", err);
      });


    });


    reader.readAsDataURL(this.selectedFile);

  }
}



