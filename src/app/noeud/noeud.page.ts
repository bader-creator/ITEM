import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ModalController } from '@ionic/angular';
import { ListeRegionsPage } from '../liste-regions/liste-regions.page'
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-noeud',
  templateUrl: './noeud.page.html',
  styleUrls: ['./noeud.page.scss'],
})
export class NoeudPage implements OnInit {
  segment = "site";

  constructor(private auth: AuthentificationService, private modalctrl: ModalController, private api: RestApiService) { }



  ngOnInit() {
    this.ListeSites()

  }
  ionViewWillLeave() {
    this.api.dismissFn();
  }

  public isSearchbarOpened = false;
  ListesSite = []
  getItems(event) {
    let val = event.target.value;
    this.ListesSite = [];

    this.ListesSite = this.data

    if (val && val.trim() != '') {
      this.ListesSite = this.ListesSite.filter((location) => {
        if (location.name != null)
          return location.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }

  }


  doRefresh(event) {
    this.ListeSites()
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  data

  ListeSites() {
    this.api.loadingFn()
    this.api.ListeSites().then(d => {
      let data = JSON.parse(d.data);
      this.ListesSite = data['hydra:member'];
      console.log('ListesSite', this.ListesSite)
      this.data = data['hydra:member'];
      console.log('data', this.data)
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')
    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast('Erreur', 'danger')
      this.api.dismissFn();
    })

  }


  async GoesTOListeRegions() {
    const modal = await this.modalctrl.create({
      component: ListeRegionsPage,


    })
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("data ", data)
      if (data.nom && data.nom.trim() != '') {
        console.log("data.nom ", data.nom)
        this.ListesSite = this.ListesSite.filter((location) => {
          console.log("ListesSite.name ", this.ListesSite)
          if (location.region.name != null)
            console.log("location.region.name ", location.region.name)
          return location.region.name.toLowerCase().indexOf(data.nom.toLowerCase()) > -1;
        })
      }
    }



  }

}
