import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { Alerte } from 'src/app/core/models/alerte';
import { AlerteService } from 'src/app/core/services/alerte.service';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-alerte',
  templateUrl: './add-alerte.component.html',
  styleUrls: ['./add-alerte.component.css']
})
export class AddAlerteComponent implements OnInit {

  alerte: Alerte = new Alerte(-1, "", "", 0);

  constructor(private _alerteService: AlerteService, private _storageService: StorageService, private _router: Router) { }


  ngOnInit() {
  }

  onSubmit() {
    let token = this._storageService.getItem("token");

    let token_decoded = jwt_decode(token);
    this.alerte.utilisateur_id = token_decoded['id'];

    let d = Date.now();
    let date: Date = new Date(d);

    this.alerte.date = date.toISOString();

    this._alerteService.addAlert(this.alerte).toPromise();
    this._router.navigateByUrl('/gestion-alertes-asso');
  }

}
