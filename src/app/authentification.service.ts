import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private network: Network, private helper: JwtHelperService, private nav: NavController, private storage: Storage, private http: HTTP, private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) { }


  loading;
  async loadingFn() {
    this.loading = await this.loadingController.create({ message: "Chargement ..." });
    this.loading.present();
  }
  async dismissFn() {
    await this.loading.dismiss();
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: color,
    });
    toast.present();
  }

  connected
  connect() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast('Impossible d’établir une connexion ', "danger");
      this.connected = false;
      console.log("connected", this.connected)
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.connected = true;
      console.log("connected", this.connected)
      this.presentToast('vous êtes connecté sur ' + '' + this.network.type + '' + 'Connection,Woohoo!', "primary");

    });
  }

  token
  IdUser
  currentUser
  login(credentials) {
    this.loadingFn();

    this.http.post(`${environment.url}/login_check`, credentials, { 'Content-Type': 'application/json' })
      .then(data => {
        //convert to json
        let resultat = JSON.parse(data.data);
        console.log("data", resultat);
        this.token = resultat.token;
        this.currentUser = resultat.data;

        console.log('token', this.token)
        console.log('currentUser', this.currentUser)
        this.storage.set('token', this.token);
        this.storage.set('currentUser', this.currentUser);

        this.dismissFn();

        this.presentToast("Authentification effectuée avec succès", "success");
        this.nav.navigateForward(`/home`);
      }).catch(error => {
        console.log(error);
        this.presentToast('le nom d\'utilisateur ou mot de passe est incorrect', "danger");
        this.dismissFn();
      });



  }

  public getToken() {
    return this.token;
  }

  async logout() {
    let alert = await this.alertController.create({
      header: 'Logging out ',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.token = "";
            this.storage.remove('token');
            this.storage.remove('currentUser');
            this.nav.navigateForward(`/login`);
          }
        }
      ]
    });
    await alert.present();
  }

  user
  checkToken() {
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
      let decoded = this.helper.decodeToken(val);
      let isExpired = this.helper.isTokenExpired(val);
      console.log("decode", decoded);
      if (!isExpired) {
        this.user = decoded;
        this.token = val;
        this.nav.navigateForward(`/home`);

      } else {
        this.storage.remove('token');
        this.nav.navigateForward(`/login`);
      }
    })
  }
}
