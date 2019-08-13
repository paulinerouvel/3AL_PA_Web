import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { Alerte } from 'src/app/core/models/alerte';
import { AlerteService } from 'src/app/core/services/alerte.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-alerte',
  templateUrl: './add-alerte.component.html',
  styleUrls: ['./add-alerte.component.css']
})
export class AddAlerteComponent implements OnInit {

  alerte: Alerte = new Alerte(-1, "", "", 0);

  constructor(private _alerteService: AlerteService, private _storageService: StorageService, private _router: Router, 
    private userService : UserService) { }


  ngOnInit() {
  }

  onSubmit() {
    let token = this._storageService.getItem("token");

    this.alerte.utilisateur_id = this.userService.decodeTokenId(token);



    let d = Date.now();
    let date: Date = new Date(d);

    this.alerte.date = date.toISOString();

    this._alerteService.addAlert(this.alerte, token).toPromise();
    this._router.navigateByUrl('/gestion-alertes-part');
  }

}
