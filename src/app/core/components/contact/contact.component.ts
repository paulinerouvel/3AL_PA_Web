import { Component, OnInit } from '@angular/core';
import { Mail } from '../../models/mail';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { MailService } from '../../services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mail = new Mail("", "wastemart.company@gmail.com", "", "");
  constructor(private _storageService: StorageService, private _userService: UserService, 
    private _mailService: MailService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {

    let token = this._storageService.getItem('token');

    let user = await this._userService.getUserById(this._userService.decodeTokenId(token)).toPromise();

    this.mail.sender = user.mail;
    this.mail.message += "<br/>" + user.mail + " " + user.prenom + " " + user.nom;

    await this._mailService.sendMail(this.mail).toPromise();

    this.mail.subject += "-COPIE";
    this.mail.destination = user.mail;
    await this._mailService.sendMail(this.mail).toPromise();


    this.router.navigateByUrl('/home');
  }

}
