import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gallery-site',
  templateUrl: './gallery-site.page.html',
  styleUrls: ['./gallery-site.page.scss'],
})
export class GallerySitePage implements OnInit {
  Question
  images = []
  idQuestion
  constructor(private storage: Storage, private sanitizer: DomSanitizer, private alertController: AlertController, private modalctrl: ModalController) { }

  ngOnInit() {
    this.idQuestion = this.idQuestion;
    console.log('idQuestion', this.idQuestion)
    this.storage.get('images').then((val: any) => {
      console.log('val', val)
      if (val) {
        val.forEach(element => {
          if (element.id == this.idQuestion) {
            this.images.push(element);
          }
        });
      }
      console.log('this.images', this.images)
      this.images.forEach(element => {
        element.imageData = this.sanitizer.bypassSecurityTrustUrl(element.imageData)
      });

    });
  }
  ionViewWillLeave() {
    this.images = [];
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }
  async ConfirmSupperssion(index) {
    const alert = await this.alertController.create({
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
            console.log('index', index);
            if (index > -1) {
              this.images.splice(index, 1);
            }
            this.storage.set('images', this.images)
          }
        }
      ]
    });

    await alert.present();
  }
}
