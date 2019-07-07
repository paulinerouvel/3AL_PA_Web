import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from "@angular/router";
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-detail-association',
  templateUrl: './detail-association.component.html',
  styleUrls: ['./detail-association.component.css']
})
export class DetailAssociationComponent implements OnInit {

  curAsso = new Utilisateur(0, "", "", "", "", "", "", "", "", "", "","", "", 0, 0, "", "", "", 0) ;

  // title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;

  constructor(private _userService : UserService, private route : ActivatedRoute) { }

  async ngOnInit() {
    const idAsso = this.route.snapshot.paramMap.get("id");
    this.curAsso = await this._userService.getUserById(idAsso).toPromise();
  }

}
