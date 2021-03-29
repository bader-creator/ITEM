import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-gallery-site',
  templateUrl: './gallery-site.page.html',
  styleUrls: ['./gallery-site.page.scss'],
})
export class GallerySitePage implements OnInit {
  Question
  images = []
  idQuestion
  itemid
  SousItemid
  constructor(private storage: Storage, private api: RestApiService, private sanitizer: DomSanitizer, private alertController: AlertController, private modalctrl: ModalController) { }

  ngOnInit() {
    this.idQuestion = this.idQuestion;
    this.itemid = this.itemid;
    this.SousItemid = this.SousItemid;
    console.log('idQuestion', this.idQuestion)
    console.log('itemid', this.itemid)
    console.log('SousItemid', this.SousItemid)
    this.StorageImages()

  }
  ionViewWillLeave() {
    this.images = [];
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }

  StorageImages() {
    this.storage.get('images').then((val: any) => {
      console.log('val', val)
      if (val) {
        val.forEach(element => {
          if (element.id == this.idQuestion && element.itemid == this.itemid && element.SousItemid == this.SousItemid) {
            this.images.push(element);
          }
        });
      }
      console.log('this.images', this.images)
      this.images.forEach(element => {
        if (element.imageData.changingThisBreaksApplicationSecurity) {

        } else {
          element.imageData = this.sanitizer.bypassSecurityTrustUrl(element.imageData)
        }

      });

    });
  }
  pictures = [];
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
            this.api.loadingFn()
            this.storage.get('images').then((val: any) => {
              if (index > -1) {
                this.images.splice(index, 1);
                val.splice(index, 1);
              }
              this.storage.set('images', val).then(d => {
                this.api.dismissFn()
              })
            })


          }
        }
      ]
    });

    await alert.present();
  }
}
