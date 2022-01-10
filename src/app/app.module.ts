import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from "@auth0/angular-jwt";
//import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { GalleryNoeudPage } from './gallery-noeud/gallery-noeud.page'
import { HttpClientModule } from '@angular/common/http';
import { ListeFichierPage } from './liste-fichier/liste-fichier.page';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [AppComponent, GalleryNoeudPage, ListeFichierPage],
  entryComponents: [GalleryNoeudPage, ListeFichierPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),

  ],

  providers: [
    StatusBar,
    SplashScreen,
    Network,
    HTTP,
    FCM,
    Camera,
    Geolocation,
    Storage,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileChooser,
    FilePath,
    File,
    //GoogleMaps,
    FileTransfer,
    FileOpener,
    DocumentViewer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
