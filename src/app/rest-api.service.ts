import { Injectable, Renderer2 } from '@angular/core';
import { environment } from '../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, MenuController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthentificationService } from './authentification.service';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { EditInfoSitePage } from './edit-info-site/edit-info-site.page';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  User
  AllSite
  constructor(private nav: NavController, private httpClient: HttpClient, private authService: AuthentificationService, private storage: Storage, private http: HTTP, private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) {
  }


  async loadingFn() {
    this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
    }).then((res) => {
      res.present();
    });
  }

  async dismissFn() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      keyboardClose: true,
      animated: true,
      duration: 2000,
      color: color,
    })
    toast.present();
  }

  ListeSites() {
    return this.http.get(`${environment.url}/sites`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  ListeRegions() {
    return this.http.get(`${environment.url}/regions`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }


  Listnoeud_acceptances(idDestinataire) {
    return this.http.get(`${environment.url}/NoeudAcceptances/` + idDestinataire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  ListSites(idFichier, iduser) {
    return this.http.get(`${environment.url}/ListSites/` + idFichier + '/' + iduser,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  SendData(data, iduser) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken()
      }),
    };
    return this.httpClient.post(`${environment.url}/sendResponse/` + iduser, data, httpOptions);
  }

  async presentConfirm() {
    let alert = await this.alertController.create({
      message: 'En cours de construction',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  InfoSite(idSite) {
    return this.http.get(`${environment.url}/InfoSite/` + idSite,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }








}
