import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-edit-info-site',
  templateUrl: './edit-info-site.page.html',
  styleUrls: ['./edit-info-site.page.scss'],
})
export class EditInfoSitePage implements OnInit {

  constructor(private modalctrl: ModalController, private storage: Storage, private api: RestApiService) { }
  IdSite
  Site
  name
  ngOnInit() {
    this.IdSite = this.IdSite
    console.log('IdSite', this.IdSite)
    this.storage.get('AllSiteOff').then((val: any) => {
      if (val) {
        val.forEach(element => {
          if (element.IdSite == this.IdSite) {
            this.Site = element;
            this.name = this.Site.nom
          }
        });
      }
    })
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }

  UpdateInfo() {
    this.api.loadingFn();
    this.storage.get('AllSiteOff').then((val: any) => {
      if (val) {
        val.forEach(element => {
          if (element.IdSite == this.IdSite) {
            element.nom = this.name;
            console.log('element.nom', element.nom)
            this.storage.set('AllSiteOff', val);
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
  }

}
