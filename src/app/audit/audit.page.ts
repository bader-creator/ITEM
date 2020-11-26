import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { QuizzPage } from '../quizz/quizz.page'

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  segment = "audit"
  constructor(private auth: AuthentificationService, private modalctrl: ModalController, private nav: NavController, private storage: Storage, private api: RestApiService) { }
  User
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('currentUser', this.User.id)
      this.Listnoeud_acceptances(this.User.id)
    });
  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }


  ListNoeud
  length
  Listnoeud_acceptances(idDestinataire) {
    this.api.loadingFn()
    this.api.Listnoeud_acceptances(idDestinataire).then(d => {
      let data = JSON.parse(d.data);
      console.log('data', data)
      this.ListNoeud = data["hydra:member"]
      console.log('ListNoeud', this.ListNoeud)
      this.auth.listeFiches()
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')

    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast(e.error, 'danger')
      this.api.dismissFn();
    })
  }

  GoToMaps(latitude, longitude) {
    this.nav.navigateRoot('/google-maps/' + latitude + '/' + longitude);
  }


  async GoesTOuizz(id, IdSite, SIteName, IdFiche, idTicket) {
    let data = { 'id': id, 'IdSite': IdSite, 'SIteName': SIteName, 'IdFiche': IdFiche, 'idTicket': idTicket }
    console.log('data', data)
    const modal = await this.modalctrl.create({
      component: QuizzPage,
      componentProps: {
        data: data,
        mode: "OnLine"
      },
    })
    modal.present();

  }
}
