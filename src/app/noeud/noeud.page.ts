import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ModalController } from '@ionic/angular';
import { ListeRegionsPage } from '../liste-regions/liste-regions.page'
import { InfoNoeudPage } from '../info-noeud/info-noeud.page';

@Component({
  selector: 'app-noeud',
  templateUrl: './noeud.page.html',
  styleUrls: ['./noeud.page.scss'],
})
export class NoeudPage implements OnInit {
  segment = "site";

  constructor(private auth: AuthentificationService, private modalctrl: ModalController) { }
  data = [

    {
      "datetime": "2011-03-11 04:46:23",
      "depth": 24.4,
      "lng": 142.369,
      "src": "us",
      "region": "CENTRE",
      "magnitude": 8.8,
      "lat": 38.322,
      "nom": "Akoeman-CENTRE"
    },
    {
      "datetime": "2012-04-11 06:38:37",
      "depth": 22.9,
      "lng": 93.0632,
      "src": "us",
      "region": "NORD",
      "magnitude": 8.6,
      "lat": 2.311,
      "nom": "Ekounou-Lycee-MTN-NORD"
    },
    {
      "datetime": "2007-09-12 09:10:26",
      "depth": 30,
      "lng": 101.3815,
      "src": "us",
      "region": "OUEST",
      "magnitude": 8.4,
      "lat": -4.5172,
      "nom": "NKoabang_sud-OUEST"
    }]


  ngOnInit() {
    this.GetData()
  }
  logout() {
    this.auth.logout()
  }
  public isSearchbarOpened = false;
  ListeSite = []
  getItems(event) {
    let val = event.target.value;
    this.ListeSite = [];

    this.ListeSite = this.data

    if (val && val.trim() != '') {
      this.ListeSite = this.ListeSite.filter((location) => {
        if (location.nom != null)
          return location.nom.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }

  }

  doRefresh(event) {


    this.ListeSite = this.data


    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  GetData() {
    this.ListeSite = this.data

  }

  idRegion
  async GoesTOListeRegions() {
    const modal = await this.modalctrl.create({
      component: ListeRegionsPage,
      componentProps: {
        idRegion: this.idRegion,
      },

    })
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.idRegion = data.id
      console.log('idRegion', this.idRegion)
      console.log('data', data)
      if (data.nom && data.nom.trim() != '') {
        this.ListeSite = this.ListeSite.filter((location) => {
          if (location.region != null)
            return location.region.toLowerCase().indexOf(data.nom.toLowerCase()) > -1;
        })
      }
    }



  }
  async GoesTODetail() {
    const modal = await this.modalctrl.create({
      component: InfoNoeudPage,

    })
    modal.present();


  }
}
