import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EditInfoSitePage } from '../edit-info-site/edit-info-site.page';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
})
export class StoragePage implements OnInit {
  segment = "storage"
  constructor(private auth: AuthentificationService, private modalctrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout()
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Check Site',

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
  async GoesTOChangeInfoSite() {
    const modal = await this.modalctrl.create({
      component: EditInfoSitePage,

    })
    modal.present();


  }

}
