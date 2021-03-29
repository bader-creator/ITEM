import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ListeFichierPage } from '../liste-fichier/liste-fichier.page';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data = {
    'username': null,
    'password': null

  }

  constructor(private auth: AuthentificationService, private api: RestApiService, private storage: Storage, private menuCtrl: MenuController, private alertCtrl: AlertController, private modalctrl: ModalController, private nav: NavController) {

  }

  ngOnInit() {

  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  login() {
    this.auth.login(this.data)  }
  Listefiches
  GoesTOuizz() {
    this.storage.get('Listefiches').then(async (val) => {
      console.log('val', val)
      if (val) {
        const modal = await this.modalctrl.create({
          component: ListeFichierPage,
          cssClass: 'listeFichier'
        })
        modal.present();
      } else {
        this.api.presentToast('Vous devez connecter pour avoir la liste des fichiers', 'danger')
      }

    });


  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Are you sure ?',

      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


}
