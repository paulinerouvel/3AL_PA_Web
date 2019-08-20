import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from 'src/app/core/services/image.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';


@Component({
  selector: 'app-modify-photo',
  templateUrl: './modify-photo.component.html',
  styleUrls: ['./modify-photo.component.css']
})


export class ModifyPhotoComponent implements OnInit {

  constructor(private fb: FormBuilder, private storageService: StorageService, private userService: UserService,
    private imageService: ImageService) { }



  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  err: string;
  selectedFile: File;


  ngOnInit() {

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
  
        location.replace("/");
  
      }, err=>{
        alert("Une erreur s'est produite, retentez plus tard");
        console.log("err", err);
      });


    });


    reader.readAsDataURL(this.selectedFile);

  }
}
