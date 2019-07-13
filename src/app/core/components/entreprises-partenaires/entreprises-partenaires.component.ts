import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-entreprises-partenaires',
  templateUrl: './entreprises-partenaires.component.html',
  styleUrls: ['./entreprises-partenaires.component.css']
})
export class EntreprisesPartenairesComponent implements OnInit {

  listeEntreprises;

  constructor(private _userService: UserService) { }

  async ngOnInit() {

    this.listeEntreprises = await this._userService.getValidUsersByCategory("Entreprise").toPromise();
  }

}
