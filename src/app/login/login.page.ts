import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { QuizzPage } from '../quizz/quizz.page';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

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

  constructor(private auth: AuthentificationService, private menuCtrl: MenuController, private alertCtrl: AlertController, private modalctrl: ModalController, private nav: NavController) {

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
    this.auth.login(this.data);
  }

  async GoesTOuizz() {
    const modal = await this.modalctrl.create({
      component: QuizzPage,

    })
    modal.present();
    await modal.onWillDismiss().then(d => {
    })
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
