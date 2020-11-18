import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EditInfoSitePage } from '../edit-info-site/edit-info-site.page';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
})
export class StoragePage implements OnInit {

  constructor(private auth: AuthentificationService, private api: RestApiService, private domSanitizer: DomSanitizer, private storage: Storage, private modalctrl: ModalController, private alertCtrl: AlertController) { }
  AllSiteON = []
  AllSiteOff = []
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.api.loadingFn();
    this.storage.get('AllSiteON').then((val: any) => {
      if (val) {
        this.AllSiteON = val
        console.log('AllSiteLength', this.api.AllSite)
        this.AllSiteON.forEach(element => {
          if (element.image) {
            element.image.image = this.domSanitizer.bypassSecurityTrustResourceUrl(element.image.image);
            console.log('element.image.image', element.image.image)
          }
        });
      }
    }).then(d => {
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')
    }).catch(e => {
      console.log('erreur', e)
      this.api.dismissFn();
      this.api.presentToast(e.error, 'danger')
    })

    this.storage.get('AllSiteOff').then((val: any) => {
      if (val) {
        this.AllSiteOff = val
        console.log('AllSiteOff', this.AllSiteOff)
        this.AllSiteOff.forEach(element => {
          if (element.image) {
            element.image.image = this.domSanitizer.bypassSecurityTrustResourceUrl(element.image.image);
            console.log('element.image.image', element.image.image)
          }
        });
      }
    })
    this.storage.get('currentUser').then((val) => {
      this.ListSite(val.id)
    });
  }

  logout() {
    this.auth.logout()
  }

  ionViewWillLeave() {
    this.AllSiteOff = [];
    this.AllSiteON = [];
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

  async ConfirmSupperssion(IdSite, mode) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('mode', mode)
            if (mode == "OnLine") {

              this.AllSiteON.forEach(element => {
                if (element.IdSite == IdSite) {
                  const index = this.AllSiteON.indexOf(element);
                  if (index > -1) {
                    this.AllSiteON.splice(index, 1);
                  }

                }
              });
              this.storage.set('AllSiteON', this.AllSiteON)
            } else {
              this.AllSiteOff.forEach(element => {
                if (element.IdSite == IdSite) {
                  const index = this.AllSiteOff.indexOf(element);
                  if (index > -1) {
                    this.AllSiteOff.splice(index, 1);
                  }

                }
              });
              this.storage.set('AllSiteOff', this.AllSiteOff)
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async ModifierNom(IdSite) {
    console.log('IdSite', IdSite)
    const modal = await this.modalctrl.create({
      component: EditInfoSitePage,
      cssClass: 'Siteinfo',
      componentProps: {
        IdSite: IdSite,
      }
    })
    modal.present();
  }


  Sites = []
  ListSite(idDestinataire) {
    this.api.Listnoeud_acceptances(idDestinataire).then(d => {
      let data = JSON.parse(d.data);
      data["hydra:member"].forEach(element => {
        this.Sites.push(element.site)
      });
    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast('Erreur', 'danger')
    })
  }

  async SendOffLine() {
    let inputs = []
    this.Sites.forEach(element => {
      inputs.push({
        type: "radio",
        label: element.name,
        value: element.id,
      })
    });
    let alert = await this.alertCtrl.create({
      header: 'Check Site',
      inputs,
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'SEND',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
