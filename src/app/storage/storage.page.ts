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
  iduser
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.StorageData()

  }

  StorageData() {
    this.api.loadingFn();
    this.storage.get('AllSiteON').then((val: any) => {
      if (val) {
        this.AllSiteON = val
        this.AllSiteON.forEach(element => {
          if (element.image.image.changingThisBreaksApplicationSecurity) {
            console.log('element.image.image ', element.image.image)
            console.log('element.image.image.changingThisBreaksApplicationSecurity', element.image.image.changingThisBreaksApplicationSecurity)
          } else {
            element.image.image = this.domSanitizer.bypassSecurityTrustResourceUrl(element.image.image);
          }
        });
      }
    }).then(d => {
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')
    }).catch(e => {
      //console.log('erreur', e)
      this.api.dismissFn();
      this.api.presentToast(e.error, 'danger')
    })

    this.storage.get('AllSiteOff').then((val: any) => {
      if (val) {
        this.AllSiteOff = val
        //console.log('AllSiteOff', this.AllSiteOff)
        this.AllSiteOff.forEach(element => {
          if (element.image.image.changingThisBreaksApplicationSecurity) {
            console.log('element.image.image.changingThisBreaksApplicationSecurity', element.image.image.changingThisBreaksApplicationSecurity)
          } else {
            element.image.image = this.domSanitizer.bypassSecurityTrustResourceUrl(element.image.image);
            // console.log('element.image.image', element.image.image)
          }
        });
      }
    })
    this.storage.get('currentUser').then((val) => {
      this.iduser = val.id;
      //this.ListSite(this.iduser)
    });
  }

  logout() {
    this.auth.logout()
  }

  ionViewWillLeave() {
    this.AllSiteOff = [];
    this.AllSiteON = [];
    this.api.dismissFn();
  }
  Reponses = []
  async presentConfirm(site) {
    let alert = await this.alertCtrl.create({
      header: 'Check Site',

      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.api.loadingFn();
            this.storage.get('AllReponsesOff').then((val: any) => {
              if (val) {
                val.forEach(element => {
                  console.log('element.IdSite', element.IdSite)
                  console.log('site.IdSite', site.IdSite)
                  if (element.IdSite == site.IdSite) {
                    this.Reponses.push(element)
                  }
                });
              }
            }).then(d => {
              this.api.SendData(this.Reponses, this.iduser).subscribe(data => {
                console.log('data', data)
                console.log('Reponses', this.Reponses)
                this.api.dismissFn();
                this.api.presentToast('Operation effectuée avec succes', 'medium')
                this.Reponses = []

              }), err => {
                console.log("error", err)
                this.api.dismissFn();
                this.api.presentToast('Erreur', 'danger')
                this.Reponses = []
              }
            }).catch(e => {
              console.log("eeee", e)
              this.api.dismissFn();
              this.api.presentToast('Erreur', 'danger')
            })

          }
        }
      ]
    });
    alert.present();
  }

  async ConfirmSupperssion(IdSite, mode) {
    console.log('AllSiteON', this.AllSiteON)
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
            // console.log('mode', mode)
            if (mode == "OnLine") {
              this.api.loadingFn()
              this.storage.get('AllSiteON').then((val: any) => {

                val.forEach(element => {
                  if (element.IdSite == IdSite) {
                    const index = val.indexOf(element);
                    if (index > -1) {
                      val.splice(index, 1);
                    }
                  }
                });
                this.storage.set('AllSiteON', val).then(d => {
                  this.api.dismissFn()
                  this.StorageData()
                })
              })

            } else {
              this.api.loadingFn()
              this.storage.get('AllSiteOff').then((val: any) => {
                val.forEach(element => {
                  if (element.IdSite == IdSite) {
                    const index = val.indexOf(element);
                    if (index > -1) {
                      val.splice(index, 1);
                    }
                  }
                })
                this.storage.set('AllSiteOff', val).then(d => {
                  this.api.dismissFn()
                  this.StorageData()
                })
              })

            }
          }
        }
      ]
    });

    await alert.present();
  }

  async ModifierNom(IdSite) {

    const modal = await this.modalctrl.create({
      component: EditInfoSitePage,
      cssClass: 'Siteinfo',
      componentProps: {
        IdSite: IdSite,
      }
    })
    modal.present();

    await modal.onWillDismiss()
    this.StorageData();

  }


  Sites
  SendOffLine(idFichier, site) {
    this.api.loadingFn()
    this.api.ListSites(idFichier, this.iduser).then(d => {
      let data = JSON.parse(d.data);
      console.log("Sites", this.Sites);
      this.Sites = data.site;
      console.log("Sites", this.Sites);
      this.api.dismissFn()
      this.PresentAlert(site);
    }).catch(e => {
      console.log('erreur', e)
      this.api.dismissFn()
      this.api.presentToast('Erreur', 'danger')
    })
  }

  async PresentAlert(site) {
    let inputs = []
    this.Sites.forEach(element => {
      inputs.push({
        type: "radio",
        label: element.name,
        value: element.name,
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
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'SEND',
          handler: (data) => {
            console.log('data', data)
            console.log('site.nom', site.nom)
            if (data != site.nom) {
              this.api.presentToast('Merci de vérifier le nom de site', 'danger')
            } else {
              this.api.loadingFn();
              this.storage.get('AllReponsesOff').then((val: any) => {
                if (val) {
                  val.forEach(element => {
                    console.log('element.IdSite', element.IdSite)
                    if (element.IdSite == site.IdSite) {
                      this.Reponses.push(element)
                    }
                  });
                }
              }).then(d => {
                this.api.SendData(this.Reponses, this.iduser).subscribe(data => {
                  console.log('data', data)
                  console.log('Reponses', this.Reponses)
                  this.api.dismissFn();
                  this.api.presentToast('Operation effectuée avec succes', 'medium')
                  this.Reponses = []

                }), err => {
                  console.log("error", err)
                  this.api.dismissFn();
                  this.api.presentToast('Erreur', 'danger')
                  this.Reponses = []
                }
              }).catch(e => {
                console.log("eeee", e)
                this.api.dismissFn();
                this.api.presentToast('Erreur', 'danger')
              })
            }

          }
        }
      ]
    });
    alert.present();

  }


}
