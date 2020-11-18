import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-noeud',
  templateUrl: './info-noeud.page.html',
  styleUrls: ['./info-noeud.page.scss'],
})
export class InfoNoeudPage implements OnInit {

  constructor(private modalctrl: ModalController) { }

  ListesSite
  ngOnInit() {
    this.ListesSite = this.ListesSite;
    console.log('ListesSite', this.ListesSite)
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }

}
