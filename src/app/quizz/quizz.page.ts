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
    "date": null,
    "idfichier": null,
    "idTicket": null
  }
  mode
  AllQuestion = []
  Question = {
    "id": null,
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
  iduser
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

  allSlide
  ngOnInit() {
    this.api.loadingFn()
    this.mode = this.mode
    console.log('mode', this.mode)
    if (this.mode == "OnLine") {
      this.data = this.data;
      console.log('datadatadatadata', this.data)
      this.site.IdSite = this.data.IdSite;
      this.site.nom = this.data.SIteName;
      this.site.id = this.data.id
      this.site.idTicket = this.data.idTicket

      this.storage.get('currentUser').then((val) => {
        console.log('val', val);
        this.iduser = val.id;
      });
    }
    else if (this.mode == "OffLine") {
      this.idFichier = this.idFichier
      this.site.idfichier = this.idFichier
      console.log('this.idFichier = this.idFichier', this.idFichier)
    }

    this.storage.get('Listefiches').then((val) => {
      console.log('valfiche', val)
      if (this.mode == "OnLine") {
        val.forEach(element => {
          if (element.id == this.data.IdFiche) {
            this.allSlide = element.items.length
            console.log('allSlideItemsOnLine', this.allSlide)
            this.Fiches = element.items;
            this.title = element.label
            this.titles.push(element.label)
          }
        });
      }
      else if (this.mode == "OffLine") {
        val.forEach(element => {
          if (element.id == this.idFichier) {
            this.allSlide = element.items.length
            console.log('allSlideItemsOOffLine', this.allSlide)
            this.Fiches = element.items;
            this.title = element.label
            this.titles.push(element.label)
          }
        });
      }
      this.api.dismissFn()
      this.Fiches.forEach(element => {
        this.titles.push(element.label)
      })

      this.Fiches.forEach(fiche => {
        fiche.sousItems.forEach(sousitem => {
          sousitem.questions.forEach(element => {
            let data = { 'id': null, 'type': null, 'sousitem': null, 'item': null }
            data.id = element.id
            data.type = element.type
            data.sousitem = sousitem.id
            data.item = fiche.id
            this.Questions.push(data)


          });
        });
      });
      console.log(' this.Questions this.Questions', this.Questions)

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




  ionViewWillEnter() {
    this.title = this.titles['0']
    this.slides.update()
    this.slides.lockSwipes(true);
    this.slides.getActiveIndex().then(index => {
      this.currentSlide = index;
      console.log('currentSlide', this.currentSlide)

    });
  }

  ionViewWillLeave() {
    this.platform.backButton.observers.pop();
    this.modalctrl.dismiss();
    this.api.dismissFn();
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
  async GoesTOGallery(idQuestion, itemid, SousItemid) {
    const modal = await this.modalctrl.create({
      component: GallerySitePage,
      componentProps: {
        idQuestion: idQuestion,
        itemid: itemid,
        SousItemid: SousItemid,
      }
    })
    modal.present();
  }


  async GoesTOCommentes(idQuestion, itemid, SousItemid) {
    const modal = await this.modalctrl.create({
      component: CommentesQuizzPage,
      componentProps: {
        idQuestion: idQuestion,
        itemid: itemid,
        SousItemid: SousItemid,
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
        this.api.presentToast('Erreur', 'danger')
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

  chargerImageCamera(idquestion, itemid, SousItemid) {
    let options = { quality: 80, correctOrientation: true };
    this.Camera.getPicture(options).then(imageData => {
      this.Base64.encodeFile(imageData).then((base64File: string) => {
        this.Question.image.push({
          id: idquestion,
          itemid: itemid,
          SousItemid: SousItemid,
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

  change(event, id, item, sousitem) {
    this.change_happy(event, id, item, sousitem);
  }


  change_happy(event, id, item, sousitem) {

    let valieinfo = event.target.id;
    let infodata = (<HTMLInputElement>document.getElementById(valieinfo)).value;


    if (infodata.length) {
      (<HTMLInputElement>document.getElementById(`${id}happy${item}${sousitem}`)).classList.remove('hide');
      (<HTMLInputElement>document.getElementById(`${id}sad${item}${sousitem}`)).classList.add('hide');
      return true;
    }
    (<HTMLInputElement>document.getElementById(`${id}happy${item}${sousitem}`)).classList.add('hide');
    (<HTMLInputElement>document.getElementById(`${id}sad${item}${sousitem}`)).classList.remove('hide');
    return false;
  }

  selectid
  infoselect
  onSelectChange(event, id, item, sousitem) {
    console.log('event', event)
    let valieinfo = event.target.id;
    let infodata = (<HTMLInputElement>document.getElementById(valieinfo)).value;
    if (infodata) {
      (<HTMLInputElement>document.getElementById(`${id}happy${item}${sousitem}`)).classList.remove('hide');
      (<HTMLInputElement>document.getElementById(`${id}sad${item}${sousitem}`)).classList.add('hide');
      return true;
    }
    (<HTMLInputElement>document.getElementById(`${id}happy${item}${sousitem}`)).classList.add('hide');
    (<HTMLInputElement>document.getElementById(`${id}sad${item}${sousitem}`)).classList.remove('hide');
    return false;

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
      let Reponse = { 'id': null, 'type': null, 'reponse': null, 'sousitem': null, 'item': null }
      if (element.type == 1) {
        console.log('<HTMLInputElement>document.getElementById(element.id + "" + "ResponseInput" + "" + element.item + "" + element.sousitem)).value', (<HTMLInputElement>document.getElementById(element.id + "" + "ResponseInput" + "" + element.item + "" + element.sousitem)).value)
        if ((<HTMLInputElement>document.getElementById(element.id + "" + "ResponseInput" + "" + element.item + "" + element.sousitem)).value) {
          Reponse.reponse = (<HTMLInputElement>document.getElementById(element.id + "" + "ResponseInput" + "" + element.item + "" + element.sousitem)).value;
        } else {
          Reponse.reponse = null
        }
        Reponse.id = element.id;
        Reponse.type = element.type;
        Reponse.sousitem = element.sousitem;
        Reponse.item = element.item;
        this.Reponses.push(Reponse)
      } else if (element.type == 0) {
        if ((<HTMLInputElement>document.getElementById(element.id + "" + "ResponseSelect" + "" + element.item + "" + element.sousitem)).value) {
          Reponse.reponse = (<HTMLInputElement>document.getElementById(element.id + "" + "ResponseSelect" + "" + element.item + "" + element.sousitem)).value;
        } else {
          Reponse.reponse = null
        }
        Reponse.id = element.id;
        Reponse.type = element.type;
        Reponse.sousitem = element.sousitem;
        Reponse.item = element.item;
        this.Reponses.push(Reponse)
      }
    });
    console.log('Reponsesbeforecommit', this.Reponses)

    this.storage.get('CommentQuizz').then((val: any) => {
      this.Allcomments = val
      this.storage.get('images').then((val: any) => {
        this.images = val

        this.Reponses.forEach(reponse => {
          let data = { 'idFiche': null, 'IdSite': null, 'date': null, 'id': null, "idTicket": null, 'type': null, 'reponse': null, 'comments': [], 'images': [], 'sousitem': null, 'item': null }
          if (this.Allcomments) {
            this.Allcomments.forEach(comment => {
              if (comment.idQuestion == reponse.id && comment.SousItemid == reponse.sousitem && comment.itemid == reponse.item) {
                data.comments.push(comment)
              }
            });
          }
          if (this.images) {
            this.images.forEach(image => {
              if (image.id == reponse.id && image.SousItemid == reponse.sousitem && image.itemid == reponse.item) {
                data.images.push(image)
              }
            });
          }

          if (this.mode == "OnLine") {
            console.log("OnLine")
            data.idFiche = this.data.IdFiche
            data.IdSite = this.site.IdSite
            data.idTicket = this.site.idTicket
            data.date = new Date().toISOString()
            data.id = reponse.id
            data.type = reponse.type
            data.reponse = reponse.reponse
            data.sousitem = reponse.sousitem;
            data.item = reponse.item;
            this.site.date = new Date().toISOString();
            this.AllReponsesON.push(data);

          }
          else {
            console.log("OffLine")
            data.idFiche = this.idFichier
            data.IdSite = this.site.IdSite
            data.date = new Date().toISOString()
            data.id = reponse.id
            data.type = reponse.type
            data.reponse = reponse.reponse
            data.sousitem = reponse.sousitem;
            data.item = reponse.item;
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
        if (this.auth.connected == false) {
          this.api.presentToast('Impossible d’établir une connexion ', "danger");
          this.api.dismissFn();
        } else {
          let DataSite = { 'site': null, data: null }
          DataSite.site = this.site;
          DataSite.data = this.AllReponsesON;
          console.log('DataSite', DataSite)
          this.api.SendData(DataSite, this.iduser).subscribe((data) => {
            console.log('DataSite', DataSite)
            this.api.dismissFn();
            this.AllReponsesON = []
            DataSite = { 'site': null, data: null }
            this.storage.remove('CommentQuizz');
            this.storage.remove('images');
            this.storage.remove('imagsite');
            this.api.presentToast('Operation effectuée avec succes', 'medium').then(d => {

              this.modalctrl.dismiss().then(d => {
                this.nav.navigateRoot(`/home`)
              })
            })
          }, (err) => {
            console.log("error", err)
            this.api.dismissFn();
            this.AllReponsesON = []
            DataSite = { 'site': null, data: null }
            this.api.presentToast('Erreur', 'danger').then(d => {
              this.modalctrl.dismiss().then(d => {
                this.nav.navigateRoot(`/home`)
              })
            })
          });

        }
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
              this.api.presentToast('Erreur', 'danger');
              this.api.dismissFn();
            }
          }
        },
        {
          text: 'Stroage',
          handler: (type = "storage") => {
            try {
              this.GetResponse(type)
              this.modalctrl.dismiss().then(
                d => {
                  setTimeout(() => {
                    this.nav.navigateRoot(`/storage`);
                  }, 2000);
                }
              )


            } catch (error) {
              console.log('error', error)
              this.api.presentToast('Erreur', 'danger');
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
              this.api.presentToast('Erreur', 'danger');
              this.api.dismissFn();
            }

          }
        }
      ]
    });
    alert.present();
  }


}
