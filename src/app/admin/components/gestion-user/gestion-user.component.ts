import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {

  constructor(private userService : UserService) { }

  users;

  async ngOnInit() {

    this.users = await this.userService.getAllUsers().toPromise();
  }

}
