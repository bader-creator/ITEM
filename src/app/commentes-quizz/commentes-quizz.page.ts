import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-commentes-quizz',
  templateUrl: './commentes-quizz.page.html',
  styleUrls: ['./commentes-quizz.page.scss'],
})
export class CommentesQuizzPage implements OnInit {
  ii
  comment = {
    "commentaire": "",
  }

  constructor(private modalctrl: ModalController, private storage: Storage, private alertController: AlertController) {
    /* this.ii = setInterval(() => {
       this.getComments();
 
     }, 2000);*/
  }
  idQuestion
  SousItemid
  itemid
  ngOnInit() {
    this.idQuestion = this.idQuestion
    this.SousItemid = this.SousItemid
    this.itemid = this.itemid
    console.log('this.SousItemid', this.SousItemid)
    console.log('this.itemid', this.itemid)
    this.getComments();

  }

  onDismiss() {
    this.modalctrl.dismiss();
  }
  Allcomments = []
  getComments() {
    this.storage.get('CommentQuizz').then((val: any) => {
      console.log('val', val)
      if (val) {
        this.Allcomments = val;
      }
      console.log('his.Allcomments', this.Allcomments)

    });

  }

  ionViewWillLeave() {
    clearInterval(this.ii);

  }

  sendMessage() {
    if (this.comment.commentaire) {
      this.Allcomments.push(
        {
          idQuestion: this.idQuestion,
          SousItemid: this.SousItemid,
          itemid: this.itemid,
          commentaire: this.comment.commentaire,
          date: new Date().toISOString(),
        });
      this.storage.set('CommentQuizz', this.Allcomments);
    }
    this.resetView()
  }

  resetView() {
    this.comment = {
      "commentaire": "",
    }
  }
  async ConfirmSupperssion(index) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('index', index);
            if (index > -1) {
              this.Allcomments.splice(index, 1);
            }
            this.storage.set('CommentQuizz', this.Allcomments)

          }
        }
      ]
    });

    await alert.present();
  }
}
