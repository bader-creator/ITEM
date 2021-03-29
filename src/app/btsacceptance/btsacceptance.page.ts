import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-btsacceptance',
  templateUrl: './btsacceptance.page.html',
  styleUrls: ['./btsacceptance.page.scss'],
})
export class BTSAcceptancePage implements OnInit {
  env = environment.pathfile;
  transfer: FileTransferObject;
  constructor(private auth: AuthentificationService, private nav: NavController, private activatedRoute: ActivatedRoute, private api: RestApiService,
    private platform: Platform, private file: File, private filetransfer: FileTransfer, private fileOpener: FileOpener
  ) { }
  idSite
  ngOnInit() {
    this.idSite = this.activatedRoute.snapshot.paramMap.get('idSite')
    this.InfoSite(this.idSite);

  }

  ionViewWillLeave() {
    this.api.dismissFn();
    this.transfer = null
  }

  details
  InfoSite(idSite) {
    this.api.loadingFn()
    this.api.InfoSite(idSite).then(d => {
      let data = JSON.parse(d.data);
      this.details = data.info;
      console.log("details", this.details);
      this.api.dismissFn();
      this.api.presentToast('Operation effectuée avec succes', 'medium')

    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast('Erreur', 'danger')
      this.api.dismissFn();
    })
  }

  GoToMaps(latitude, longitude) {
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    this.nav.navigateForward('/google-maps/' + latitude + '/' + longitude);
  }

  downloadAndOpenPdf(id) {
    this.api.loadingFn()
    let downloadUrl = `${environment.url2}/export_pdf/` + id
    let path = this.file.dataDirectory;
    this.transfer = this.filetransfer.create();
    this.transfer.download(downloadUrl, path + '.pdf').then(entry => {
      let url = entry.toURL();
      this.fileOpener.open(url, 'application/pdf')
        .then(() => this.api.dismissFn())
        .catch(e => this.api.dismissFn());
    });

  }
}
