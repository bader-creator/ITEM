import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthentificationService } from './authentification.service';
import { MenuController, NavController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  User
  env = environment.pathavatar;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthentificationService,
    private menuCtrl: MenuController,
    private storage: Storage,
    private router: Router,
    private nav: NavController
  ) {
    this.initializeApp();
    this.auth.checkToken();
    this.auth.connect();
    this.storage.get('currentUser').then((val) => {
      this.User = val;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
        if (this.router.url === '/home') {
          navigator['app'].exitApp();
          console.log('go back to loginpage')
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.auth.logout()
  }
  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
