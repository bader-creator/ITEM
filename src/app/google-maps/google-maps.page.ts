import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
/*import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  Marker,
  Environment
} from '@ionic-native/google-maps';*/
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {
  //map: GoogleMap;
  constructor(public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private auth: AuthentificationService,
    public geolocation: Geolocation) {


  }
  map: Leaflet.Map;
  pos = {
    lat: null,
    lng: null
  };

  async ngOnInit() {
    this.pos.lat = this.activatedRoute.snapshot.paramMap.get('latitude');
    this.pos.lng = this.activatedRoute.snapshot.paramMap.get('longitude');
    console.log('pos', this.pos)
    await this.platform.ready();
    // await this.loadMap();
  }
  ionViewDidEnter() { this.leafletMap(); }


  leafletMap() {
    this.map = Leaflet.map('mapId').setView([this.pos.lat, this.pos.lng], 10);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    var myIcon = Leaflet.icon({
      iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      iconSize: [50, 50],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    Leaflet.marker([this.pos.lat, this.pos.lng], { icon: myIcon }).addTo(this.map);

  }

  ionViewWillLeave() {
    this.map.remove();
  }

  /* loadMap() {
     Environment.setEnv({
       API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDXp2UQHy2S-pyPqniPA--wSYM-MrLCdGg',
       API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDXp2UQHy2S-pyPqniPA--wSYM-MrLCdGg'
     });
     console.log('posmarker', this.pos)
     this.map = GoogleMaps.create('map_canvas', {
       camera: {
         target: {
           lat: this.pos.lat,
           lng: this.pos.lng
         },
         zoom: 12,
         tilt: 30
       }
 
     });
 
 
 
 
     if (this.pos.lat && this.pos.lng) {
       const marker: Marker = this.map.addMarkerSync({
         icon: 'red',
         animation: 'DROP',
         position: this.pos
       });
       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
         console.log('hellomarker')
       })
     }
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
 */


}

