import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ModalController, IonSlides, NavController, AlertController } from '@ionic/angular';
import { GallerySitePage } from '../gallery-site/gallery-site.page';
import { CommentesQuizzPage } from '../commentes-quizz/commentes-quizz.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.page.html',
  styleUrls: ['./quizz.page.scss'],
})
export class QuizzPage implements OnInit {

  @ViewChild('Slides', { static: false }) protected slides: IonSlides;
  title = "Site infos"
  site = {
    'id': null,
    "nom": null,
    "longitude": null,
    "latitude": null,

  }
  AllQuestion = []
  Question = {
    "id": 1,
    "image": [],
    "repInput": null,
    "repSelect": null,
    "comments": [],
  }
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;


  constructor(private modalctrl: ModalController, private geolocation: Geolocation,
    private storage: Storage, public FilePath: FilePath, public FileChooser: FileChooser, public Base64: Base64, public Camera: Camera, private alertCtrl: AlertController, private nav: NavController) {

  }

  ngOnInit() {
    this.AllQuestion.push(this.Question)
  }

  getCurrentCoordinates() {
    console.log('geoLatitude', this.geoLatitude)
    console.log('geolocation', this.geolocation)
    this.geolocation.getCurrentPosition().then((resp) => {
      this.site.latitude = resp.coords.latitude;
      console.log('geoLatitude', this.site.latitude)
      this.site.longitude = resp.coords.longitude;
      console.log('geoLongitude', this.site.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onDismiss() {
    this.modalctrl.dismiss();

  }

  allNumber
  ionViewWillEnter() {
    this.slides.update()
    this.slides.lockSwipes(true);

    this.slides.getActiveIndex().then(index => {
      console.log('index', index)
      this.currentNumber = index;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slides.length().then(number => {
        console.log("length", number);
        this.allNumber = number - 1;
      });
    }, 100);
  }

  verifeChamp = false;
  next() {
    this.verifeChamp = true;

    if (this.currentNumber == 0) {
      if (this.site.id && this.site.nom && this.site.longitude && this.site.latitude) {
        this.title = "Site"
        this.verifeChamp = false;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }
    } else if (this.currentNumber == 1) {
      var repInput = (<HTMLInputElement>document.getElementById("repInput")).value;
      var repSelect = (<HTMLInputElement>document.getElementById("repSelect")).value;
      this.Question.repInput = repInput;
      this.Question.repSelect = repSelect;
      console.log('question', this.Question)
      this.storage.set('Question', this.Question);
      this.storage.remove('CommentQuizz');
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
    else {
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }

    this.slides.getActiveIndex().then(index => {
      console.log('index', index)
      this.currentNumber = index;
    });
  }

  currentNumber
  prev() {
    this.title = "Site infos"
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.slides.getActiveIndex().then(index => {
      console.log('index', index)
      this.currentNumber = index;
    });

  }
  async GoesTOGallery() {
    const modal = await this.modalctrl.create({
      component: GallerySitePage,

    })
    modal.present();
  }

  async GoesTOCommentes() {
    const modal = await this.modalctrl.create({
      component: CommentesQuizzPage,

    })
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('data', data)
      data.comments.forEach(element => {
        this.Question.comments.push(element)
      });
    }
  }

  chargerImageCamera() {
    let options = { quality: 80, correctOrientation: true };
    this.Camera.getPicture(options).then(imageData => {
      this.Base64.encodeFile(imageData).then((base64File: string) => {
        this.Question.image.push({
          imageData: base64File,
          date: new Date().toISOString(),
        });

      }), (err) => {
        console.log(err);
      };


    })

  }

}
