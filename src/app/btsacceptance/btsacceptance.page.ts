import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-btsacceptance',
  templateUrl: './btsacceptance.page.html',
  styleUrls: ['./btsacceptance.page.scss'],
})
export class BTSAcceptancePage implements OnInit {
  env = environment.pathavatar;
  constructor(private auth: AuthentificationService, private nav: NavController, private activatedRoute: ActivatedRoute, private api: RestApiService) { }
  idSite
  ngOnInit() {
    this.idSite = this.activatedRoute.snapshot.paramMap.get('idSite')
    this.InfoSite(this.idSite);

  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }

  details
  InfoSite(idSite) {
    this.api.loadingFn()
    this.api.InfoSite(idSite).then(d => {
      let data = JSON.parse(d.data);
      this.details = data.info;
      console.log("details", this.details);
      if (this.details) {
        this.api.dismissFn();
        this.api.presentToast('Operation effectuée avec succes', 'medium')
      }
    }).catch(e => {
      console.log('erreur', e)
      this.api.presentToast(e.error, 'danger')
      this.api.dismissFn();
    })
  }

  GoToMaps(latitude, longitude) {
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    this.nav.navigateRoot('/google-maps/' + latitude + '/' + longitude);
  }
}
