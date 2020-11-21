import { Injectable, Renderer2 } from '@angular/core';
import { environment } from '../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, MenuController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthentificationService } from './authentification.service';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  AllSite
  constructor(private nav: NavController, private httpClient: HttpClient, private authService: AuthentificationService, private storage: Storage, private http: HTTP, private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) { }

  isLoading = false;
  async loadingFn() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: "Chargement ..."
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismissFn() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
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
    return this.http.get(`${environment.url}/noeud_acceptances?userDestinator=` + idDestinataire,
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
    return this.httpClient.post(
      `${environment.url}/sendResponse/` + iduser,
      data,
      httpOptions
    );


  }







}
