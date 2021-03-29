import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segment = "accueil"
  env = environment.pathavatar;
  constructor(private auth: AuthentificationService, private api: RestApiService, private menuCtrl: MenuController, private storage: Storage, private alertController: AlertController) {
  }
  User
  StorageCount
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('User', this.User)
      this.Listnoeud_acceptances(this.User.id)
    });
    this.storage.get('AllSiteON').then((val: any) => {
      if (val) {
        this.StorageCount = val.length
        console.log('StorageCount', this.StorageCount)
      }
    }).then(d => {
      this.storage.get('AllSiteOff').then((val: any) => {
        if (val) {
          this.StorageCount = this.StorageCount + val.length
          console.log('StorageCount', this.StorageCount)
        }
      })
    })
  }

  AuditCount
  Listnoeud_acceptances(idDestinataire) {
    this.api.Listnoeud_acceptances(idDestinataire).then(d => {
      let data = JSON.parse(d.data);
      this.AuditCount = data.ListNoeud.length
      console.log('this.AuditCount', this.AuditCount)
    })
  }



  logout() {
    this.auth.logout()
  }


}
