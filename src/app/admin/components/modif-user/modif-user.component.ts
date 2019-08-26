import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/core/models/utilisateur';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.css']
})
export class ModifUserComponent implements OnInit {

  userModel = new Utilisateur(-1, "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", 0);
  userType = 0;
  errorMsg = "";
  infoMsg = "";
  constructor(private route: ActivatedRoute, private userService: UserService, private storageService : StorageService) { }

  async ngOnInit() {

    let idUser = this.route.snapshot.queryParamMap.get('id');
    this.userModel = await this.userService.getUserById(idUser).toPromise();

    this.userModel.dateDeNaissance = this.userModel.dateDeNaissance.split('T')[0];
    this.userType = await this.userService.getCategoryOfUser(idUser).toPromise();
  }


  async onSubmit(){
    let token = this.storageService.getItem('token');
    let res = await this.userService.updateUser(this.userModel, token ).toPromise();


    if(res == null){
      alert("Utilisateur Modifié !");
      location.replace('/gestion-user');
    }
    else{
      this.errorMsg = "L'ajout n'a pas fonctionné, un utilisateur existe déjà avec ses informations !";
    }

    
  }

}
