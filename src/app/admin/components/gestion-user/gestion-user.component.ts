import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Utilisateur } from 'src/app/core/models/utilisateur';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {

  constructor(private userService : UserService, private storageService : StorageService) { }

  public users : Utilisateur[];

  async ngOnInit() {

    this.users = await this.userService.getAllUsers().toPromise();


    
  }



  async deleteUser(id : string){
    let token = this.storageService.getItem('token');
    await this.userService.deleteUser(id, token).toPromise();

    alert("Utilisateur supprimé !");

    location.reload();
  }

}
