import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/core/services/alerte.service';
import { StorageService } from 'src/app/core/services/storage.service';
import * as jwt_decode from 'jwt-decode';
import { faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Alerte } from 'src/app/core/models/alerte';

@Component({
  selector: 'app-gestion-alertes',
  templateUrl: './gestion-alertes.component.html',
  styleUrls: ['./gestion-alertes.component.css']
})
export class GestionAlertesComponent implements OnInit {

  alerts: Alerte[];
  faTimesCircle = faTimesCircle;

  faPlus = faPlus;

  constructor(private _alertService: AlerteService, private _storageService: StorageService) { }

  async ngOnInit() {

    let data = this._storageService.getItem('token');

    if (data) {
      let token_decoded = jwt_decode(data);

      this.alerts = await this._alertService.getAllAlertByUserId(token_decoded["id"]).toPromise();
    }

  }


  deleteAlert(id) {
    this._alertService.deleteAlertById(id).toPromise();
    location.reload();
  }

}
