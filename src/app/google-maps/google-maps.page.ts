import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {
  map: GoogleMap;
  constructor(public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform, private auth: AuthentificationService) {

  }


  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDXp2UQHy2S-pyPqniPA--wSYM-MrLCdGg',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDXp2UQHy2S-pyPqniPA--wSYM-MrLCdGg'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.610769,
          lng: 3.876716
        },
        zoom: 12,
        tilt: 30
      }
    });
  }

  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Satellite',
        handler: () => {
          console.log('Satellite clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        handler: () => {
          console.log('Plan clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        handler: () => {
          console.log('Terrain clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  logout() {
    this.auth.logout()
  }



}

