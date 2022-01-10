import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController, MenuController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private network: Network,
    private fcm: FCM,
    private menuCtrl: MenuController, private helper: JwtHelperService, private nav: NavController, private storage: Storage, private http: HTTP, private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) { }





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
      duration: 3000,
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
      this.presentToast('vous êtes connecté sur ' + '' + this.network.type + '' + 'Connection', "primary");

    });
  }

  token


  currentUser = { "id": null, "firstName": null, "lastName": null, "group": null, "job": null, "path": null, "phone": null, "userName": null }
  login(credentials) {
    this.loadingFn();

    this.http.post(`${environment.url}/login_check`, credentials, { 'Content-Type': 'application/json' })
      .then(data => {
        //convert to json
        let resultat = JSON.parse(data.data);
        console.log("resultat", resultat);
        this.currentUser.id = resultat.id;
        this.currentUser.firstName = resultat.firstName;
        this.currentUser.lastName = resultat.lastName;
        this.currentUser.group = resultat.group;
        this.currentUser.job = resultat.job;
        this.currentUser.path = resultat.path;
        this.currentUser.phone = resultat.phone;
        this.currentUser.userName = resultat.userName;

        this.token = resultat.data.token;
        this.storage.set('token', this.token);
        this.storage.set('currentUser', this.currentUser)
        this.listeFiches()
        this.fcm.getToken().then(data => {
          console.log("mytokenfirebase: ", data);
          console.log('currentUser', this.currentUser)
          this.setTokenFireBase(this.currentUser.id, data);
        })
        this.dismissFn();
        this.presentToast("Authentification effectuée avec succès", "success");
        this.nav.navigateForward(`/home`);
        this.menuCtrl.enable(true);
      }).catch(error => {
        console.log(error);
        this.presentToast('le nom d\'utilisateur ou mot de passe est incorrect', "danger");
        this.dismissFn();
      });



  }
  public setTokenFireBase(id, token = null) {
    let data = { id: id, token: token }
    console.log("data", data);
    this.http.post(`${environment.url2}/setTokenFireBase`, data, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.getToken(),
    });
  }

  Listefiches
  listeFiches() {
    console.log()
    this.http.get(`${environment.url}/fiches`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      }
    ).then(d => {
      let data = JSON.parse(d.data);
      console.log('data', data)
      this.Listefiches = data["hydra:member"]
      console.log('Listefiches', this.Listefiches)
      this.storage.set('Listefiches', this.Listefiches)
    }).catch(e => {
      console.log('erreur', e)
    })
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
            this.menuCtrl.enable(false);
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
        this.token = val;
        console.log("decode", decoded);
        console.log('tokentoken', this.token)
        this.nav.navigateRoot(`/home`);
      } else {
        this.storage.remove('token');
        this.storage.remove('currentUser');
        this.nav.navigateRoot(`/login`);
        this.menuCtrl.enable(false);
      }
    })
  }
}
