import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery-noeud',
  templateUrl: './gallery-noeud.page.html',
  styleUrls: ['./gallery-noeud.page.scss'],
})
export class GalleryNoeudPage implements OnInit {

  constructor(private storage: Storage, private sanitizer: DomSanitizer, private alertController: AlertController, private modalctrl: ModalController) { }

  idSite
  imagsite
  ngOnInit() {
    this.idSite = this.idSite
    console.log('idSite', this.idSite)
    this.storage.get('imagsite').then((val: any) => {
      console.log('val', val)
      if (val) {
        this.imagsite = val
        this.imagsite.image = this.sanitizer.bypassSecurityTrustUrl(this.imagsite.image)
        console.log('image', this.imagsite.image)
      }
    });

  }

  onDismiss() {
    this.modalctrl.dismiss();
  }



}
