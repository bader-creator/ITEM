import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ModalController, IonSlides, NavController, AlertController, Platform } from '@ionic/angular';
import { GallerySitePage } from '../gallery-site/gallery-site.page';
import { CommentesQuizzPage } from '../commentes-quizz/commentes-quizz.page';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RestApiService } from '../rest-api.service';
import { GalleryNoeudPage } from '../gallery-noeud/gallery-noeud.page';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.page.html',
  styleUrls: ['./quizz.page.scss'],
})
export class QuizzPage implements OnInit {

  @ViewChild('Slides', { static: false }) protected slides: IonSlides;

  site = {
    'id': null,
    'IdSite': null,
    "nom": null,
    "longitude": null,
    "latitude": null,
    "image": null,
    "date": null
  }
  mode
  AllQuestion = []
  Question = {
    "id": 1,
    "image": [],
    "repInput": null,
    "repSelect": null,
    "comments": [],
  }
  idFichier
  Reponses = []
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  titles = []
  title
  data
  Fiches = []
  logger = true
  constructor(private modalctrl: ModalController, private auth: AuthentificationService, private geolocation: Geolocation,
    private storage: Storage, private platform: Platform, public FilePath: FilePath, private api: RestApiService, public FileChooser: FileChooser, public Base64: Base64, public Camera: Camera, private alertCtrl: AlertController, private nav: NavController) {

    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('hello');
      }, false);
    });
  }


  ngOnInit() {
    this.data = this.data;
    this.mode = this.mode
    console.log('mode', this.mode)
    if (this.mode == "OnLine") {
      this.site.IdSite = this.data.IdSite;
      this.site.nom = this.data.SIteName;
      this.site.id = this.data.id
    }
    else if (this.mode == "OffLine") {
      this.idFichier = this.idFichier
      console.log('this.idFichier = this.idFichier', this.idFichier)
    }
    this.storage.get('Listefiches').then((val) => {
      if (this.mode == "OnLine") {
        val.forEach(element => {
          if (element.id == this.data.IdFiche) {
            this.Fiches = element.items;
            this.title = element.label
            this.titles.push(element.label)
          }
        });
      }
      else if (this.mode == "OffLine") {
        val.forEach(element => {
          if (element.id == this.idFichier) {
            this.Fiches = element.items;
            this.title = element.label
            this.titles.push(element.label)
          }
        });
      }
      this.Fiches.forEach(element => {
        this.titles.push(element.label)
      });
      this.Fiches.forEach(elements => {
        elements.sousItems.forEach(element => {
          element.questions.forEach(element => {
            let data = { 'id': null, 'type': null }
            data.id = element.id
            data.type = element.type
            this.Questions.push(data)

          });
        });
      });
      console.log('Questions', this.Questions)

    });






  }

  getCurrentCoordinates() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.site.latitude = resp.coords.latitude;

      this.site.longitude = resp.coords.longitude;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  allSlide
  ionViewWillEnter() {
    this.title = this.titles['0']
    this.slides.update()
    this.slides.lockSwipes(true);
    this.slides.getActiveIndex().then(index => {
      this.currentSlide = index;

    });

  }

  ionViewWillLeave() {
    this.currentSlide = 0;
    this.allSlide = 0;
    this.platform.backButton.observers.pop();;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.Fiches['length'] != 0) {
        this.slides.length().then(number => {
          this.allSlide = number - 1;
        });
      }
    }, 150);
  }

  Questions = []
  verifeChamp = false;
  next() {
    this.verifeChamp = true;
    if (this.currentSlide == 0) {
      if (this.site.IdSite && this.site.nom && this.site.longitude && this.site.latitude) {
        if (this.site.image == null) {
          this.api.presentToast('Merci de bien vouloir prendre une image d\'un site', 'danger')
        } else {
          this.verifeChamp = false;
          this.slides.lockSwipes(false);
          this.slides.slideNext();
          this.slides.lockSwipes(true);
        }
      }
    }
    else {
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      this.title = this.titles[this.currentSlide]
    }
    this.slides.getActiveIndex().then(index => {
      this.currentSlide = index;
      this.title = this.titles[this.currentSlide]
    });
  }

  currentSlide
  prev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.slides.getActiveIndex().then(index => {
      this.currentSlide = index;
      this.title = this.titles[this.currentSlide]
    });

  }
  async GoesTOGallery(idQuestion) {
    const modal = await this.modalctrl.create({
      component: GallerySitePage,
      componentProps: {
        idQuestion: idQuestion,
      }
    })
    modal.present();
  }

  async GoesTOCommentes(idQuestion) {
    const modal = await this.modalctrl.create({
      component: CommentesQuizzPage,
      componentProps: {
        idQuestion: idQuestion,
      }
    })
    modal.present();
  }


  UplodeImageSite() {
    let options = { quality: 80, correctOrientation: true };
    this.Camera.getPicture(options).then(imageData => {
      this.Base64.encodeFile(imageData).then((base64File: string) => {
        let imagsite = { 'image': null, 'date': null }
        imagsite.image = base64File;
        imagsite.date = new Date().toISOString(),
          this.site.image = imagsite;
        console.log('site', this.site)
        console.log('imagsite', imagsite)
        this.storage.set('imagsite', imagsite);
      }), (err) => {
        this.api.presentToast(err.error, 'danger')
      };
    })
  }
  async GoesToGallerySite() {
    const modal = await this.modalctrl.create({
      component: GalleryNoeudPage,
      componentProps: {
        idSite: this.site.id,
      }
    })
    modal.present();
  }


  async onDismiss() {
    let alert = await this.alertCtrl.create({
      header: 'êtes-vous sûr de vouloir quitter?',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OUI',
          handler: () => {
            this.modalctrl.dismiss();
            this.storage.remove('CommentQuizz');
            this.storage.remove('images');
            this.storage.remove('imagsite');
          }
        }
      ]
    });
    alert.present();

  }

  chargerImageCamera(idquestion) {
    let options = { quality: 80, correctOrientation: true };
    this.Camera.getPicture(options).then(imageData => {
      this.Base64.encodeFile(imageData).then((base64File: string) => {
        this.Question.image.push({
          id: idquestion,
          imageData: base64File,
          date: new Date().toISOString(),
        });
        this.storage.get('images').then((val: any) => {
          if (val) {
            val.forEach(element => {
              this.Question.image.push(element);
            });
          }
          this.storage.set('images', this.Question.image);
        })
        setTimeout(() => {
          this.Question.image = [];
        }, 2000);
        console.log('this.Question.image', this.Question.image)

      }), (err) => {
        console.log(err);
      };
    })
  }

  AllReponsesON = []
  AllReponsesOff = []
  images = []
  Allcomments = []
  AllSiteON = []
  AllSiteOff = []
  GetResponse(type) {
    this.api.loadingFn();
    this.Questions.forEach(element => {
      let Reponse = { 'id': null, 'type': null, 'reponse': null }
      if (element.type == 1) {
        Reponse.reponse = (<HTMLInputElement>document.getElementById(element.id + "" + "ResponseInput")).value;
        Reponse.id = element.id;
        Reponse.type = element.type;
        this.Reponses.push(Reponse)
      } else if (element.type == 0) {
        Reponse.reponse = (<HTMLInputElement>document.getElementById(element.id + "" + "ResponseSelect")).value;
        Reponse.id = element.id;
        Reponse.type = element.type;
        this.Reponses.push(Reponse)
      }
    });


    this.storage.get('CommentQuizz').then((val: any) => {
      this.Allcomments = val
      this.storage.get('images').then((val: any) => {
        this.images = val

        this.Reponses.forEach(reponse => {
          let data = { 'idFiche': null, 'IdSite': null, 'id': null, 'type': null, 'reponse': null, 'comments': [], 'images': [] }
          if (this.Allcomments) {
            this.Allcomments.forEach(comment => {
              if (comment.idQuestion == reponse.id) {
                data.comments.push(comment)
              }
            });
          }
          if (this.images) {
            this.images.forEach(image => {
              if (image.id == reponse.id) {
                data.images.push(image)
              }
            });
          }

          if (this.mode == "OnLine") {
            console.log("OnLine")
            data.idFiche = this.data.IdFiche
            data.IdSite = this.site.id
            data.id = reponse.id
            data.type = reponse.type
            data.reponse = reponse.reponse
            this.site.date = new Date().toISOString();
            this.AllReponsesON.push(data);

          }
          else {
            console.log("OffLine")
            data.idFiche = this.idFichier
            data.id = reponse.id
            data.type = reponse.type
            data.reponse = reponse.reponse
            this.site.date = new Date().toISOString();
            this.AllReponsesOff.push(data);


          }
        });
      });
    });
    if (this.mode == "OnLine") {
      this.storage.get('AllSiteON').then((val: any) => {
        if (val) {
          val.forEach(element => {
            this.AllSiteON.push(element)
          });

        }
        console.log("OnLineSite")
        this.AllSiteON.push(this.site)
      })
    } else {
      this.storage.get('AllSiteOff').then((val: any) => {
        if (val) {
          val.forEach(element => {
            this.AllSiteOff.push(element)
          });
        }
        console.log("OffLineSite")
        this.AllSiteOff.push(this.site)
      })
    }
    setTimeout(() => {
      if (type == "serveur") {
        this.storage.remove('CommentQuizz');
        this.storage.remove('images');
        this.storage.remove('imagsite');
        this.api.dismissFn();
        this.api.presentToast('Operation effectuée avec succes', 'medium')
      }
      if (type == "storage") {
        if (this.mode == "OnLine") {
          this.storage.get('AllReponsesON').then((val: any) => {
            if (val) {
              val.forEach(element => {
                this.AllReponsesON.push(element);
              });

            }
            console.log('AllReponsesON', this.AllReponsesON)
            this.storage.set('AllReponsesON', this.AllReponsesON)
            console.log('AllSiteON', this.AllSiteON)
            this.storage.set('AllSiteON', this.AllSiteON)
          })
        }
        else {
          this.storage.get('AllReponsesOff').then((val: any) => {
            if (val) {
              val.forEach(element => {
                this.AllReponsesOff.push(element);
              });
            }
            console.log('AllReponsesOff', this.AllReponsesOff)
            this.storage.set('AllReponsesOff', this.AllReponsesOff)
            console.log('AllSiteOff', this.AllSiteOff)
            this.storage.set('AllSiteOff', this.AllSiteOff)
          })
        }
        this.storage.remove('CommentQuizz');
        this.storage.remove('images');
        this.storage.remove('imagsite');
        this.api.dismissFn();
        this.api.presentToast('Operation effectuée avec succes', 'medium')

      }
    }, 2000);

  }

  async SendResponse() {
    let alert = await this.alertCtrl.create({
      header: 'Veuillez sauvegarder votre données dans ?',
      buttons: [
        {
          text: 'Serveur',
          handler: (type = "serveur") => {
            try {
              this.GetResponse(type)
            } catch (error) {
              console.log('error', error)
              this.api.presentToast(error, 'danger');
              this.api.dismissFn();
            }
          }
        },
        {
          text: 'Stroage',
          handler: (type = "storage") => {
            try {
              this.GetResponse(type)
              this.modalctrl.dismiss();
              setTimeout(() => {
                this.nav.navigateRoot(`/storage`);
              }, 2000);

            } catch (error) {
              console.log('error', error)
              this.api.presentToast(error, 'danger');
              this.api.dismissFn();
            }
          }
        }
      ]
    });
    alert.present();

  }
  async SendResponseOffLine() {
    let alert = await this.alertCtrl.create({
      header: 'Veuillez sauvegarder votre données dans Storage ?',
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'oui',
          handler: (type = "storage") => {
            try {
              this.GetResponse(type)
              this.modalctrl.dismiss();
              this.nav.navigateRoot(`/login`);
            } catch (error) {
              console.log('error', error)
              this.api.presentToast(error, 'danger');
              this.api.dismissFn();
            }

          }
        }
      ]
    });
    alert.present();
  }


}
