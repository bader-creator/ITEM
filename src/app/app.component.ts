import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthentificationService } from './authentification.service';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  User
  activePage
  env = environment.pathavatar;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthentificationService,
    private menuCtrl: MenuController,
    private storage: Storage,
    private router: Router,
    private fcm: FCM,
    private nav: NavController,
    private api: RestApiService,
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.auth.checkToken();
    this.auth.connect();
    this.activePage = 1;
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('currentUserssss', this.User)
      if (this.User == null) {
        console.log('Useauthhhr', this.User)
        this.User = this.auth.currentUser
        console.log('this.Userauthen', this.User)
      }
    })




  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          this.nav.navigateRoot(`/audit`);
        } else {
          this.presentToast(data.title);
        }
      });
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  logout() {
    this.auth.logout()
  }
  toggleMenu(page) {
    this.menuCtrl.toggle(); //Add this method to your button click function
    this.activePage = page;
  }
  isActive(page) {
    return page === this.activePage;
  }
}
