import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-liste-regions',
  templateUrl: './liste-regions.page.html',
  styleUrls: ['./liste-regions.page.scss'],
})
export class ListeRegionsPage implements OnInit {
  idRegion
  regions
  constructor(private modalctrl: ModalController) { }
  data = [

    {
      "id": 1,
      "nom": "CENTRE"
    },
    {
      "id": 2,
      "nom": "LITTORAL"
    },
    {
      "id": 3,
      "nom": "NORD"
    },
    {
      "id": 4,
      "nom": "OUEST"
    },
    {
      "id": 5,
      "nom": "Paris Saclay"
    },
    {
      "id": 6,
      "nom": "SUD"
    }
  ]

  ngOnInit() {
    this.idRegion = this.idRegion;
    this.regions = this.idRegion;
    console.log('idRegionInListeRegion', this.idRegion)
  }


  onDismiss() {
    this.modalctrl.dismiss();
  }
  getListofRegion(nom, id) {

    console.log('nom', nom)
    this.modalctrl.dismiss({ nom: nom, id: id });
  }

}
