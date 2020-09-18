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
  image = []

  constructor(private storage: Storage, private sanitizer: DomSanitizer, private alertController: AlertController, private modalctrl: ModalController) { }

  ngOnInit() {
    this.storage.get('Question').then((val: any) => {
      this.Question = val;
      this.Question.image.forEach(element => {
        this.image.push(
          {
            "imageData": this.sanitizer.bypassSecurityTrustUrl(element.imageData),
            "date": element.date
          }
        );
      });

    });
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }
  async ConfirmSupperssion() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
