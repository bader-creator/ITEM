import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-liste-regions',
  templateUrl: './liste-regions.page.html',
  styleUrls: ['./liste-regions.page.scss'],
})
export class ListeRegionsPage implements OnInit {

  constructor(private modalctrl: ModalController, private api: RestApiService) { }

  ngOnInit() {
    this.ListeRegions()
  }


  onDismiss() {
    this.modalctrl.dismiss();
  }

  ListesRegions
  ListeRegions() {
    this.api.loadingFn()
    this.api.ListeRegions().then(d => {
      let data = JSON.parse(d.data);
      this.ListesRegions = data['hydra:member'];
      console.log('ListeRegions', this.ListesRegions)
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')
    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast('Erreur', 'danger')
      this.api.dismissFn();
    })

  }
  getListofRegion(nom, id) {
    console.log('nom', nom)
    this.modalctrl.dismiss({ nom: nom, id: id });
  }

}
