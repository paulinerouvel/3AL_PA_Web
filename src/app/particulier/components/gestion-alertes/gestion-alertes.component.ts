import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/core/services/alerte.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Alerte } from 'src/app/core/models/alerte';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-gestion-alertes',
  templateUrl: './gestion-alertes.component.html',
  styleUrls: ['./gestion-alertes.component.css']
})
export class GestionAlertesComponent implements OnInit {

  alerts: Alerte[];

  constructor(private _alertService: AlerteService, private _storageService: StorageService, private userService : UserService) { }

  async ngOnInit() {

    let data = this._storageService.getItem('token');

    if (data) {

      this.alerts = await this._alertService.getAllAlertByUserId(this.userService.decodeTokenId(data), data).toPromise();
    }

  }


  deleteAlert(id) {
    let token = this._storageService.getItem('token');
    this._alertService.deleteAlertById(id, token).toPromise();
    location.reload();
  }

}
