import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segment = "accueil"
  env = environment.pathavatar;
  constructor(private auth: AuthentificationService, private storage: Storage, private alertController: AlertController) {

  }
  User
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;

    });
  }



  logout() {
    this.auth.logout()
  }


}
