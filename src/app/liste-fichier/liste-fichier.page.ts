import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QuizzPage } from '../quizz/quizz.page'
@Component({
  selector: 'app-liste-fichier',
  templateUrl: './liste-fichier.page.html',
  styleUrls: ['./liste-fichier.page.scss'],
})
export class ListeFichierPage implements OnInit {

  constructor(private storage: Storage, private modalctrl: ModalController) { }
  Listefiches
  ngOnInit() {
    this.storage.get('Listefiches').then((val) => {
      if (val) {
        this.Listefiches = val;
        console.log('Listefiches', this.Listefiches)
      }

    });
  }

  async GoToQuizz(idFichier) {
    const modal = await this.modalctrl.create({
      component: QuizzPage,
      componentProps: {
        idFichier: idFichier,
        mode: "OffLine"
      },
    })
    modal.present()
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }

}
