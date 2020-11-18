import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthentificationService } from './authentification.service';
import { MenuController, NavController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
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
    private nav: NavController,
    private api: RestApiService
  ) {
    this.initializeApp();
    this.auth.checkToken();
    this.auth.connect();
    this.activePage = 1;



  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('currentUser').then((val) => {
        this.User = val;
        console.log('currentUser', this.User)
      });
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
  toggleMenu(page) {
    this.menuCtrl.toggle(); //Add this method to your button click function
    this.activePage = page;
  }
  isActive(page) {
    return page === this.activePage;
  }
}
