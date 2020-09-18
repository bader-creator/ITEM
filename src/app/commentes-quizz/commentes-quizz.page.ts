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
  CommentByQuizz
  Question
  comments = [];
  GetComment = []
  constructor(private modalctrl: ModalController, private storage: Storage, private alertController: AlertController) {
    this.ii = setInterval(() => {
      this.getComments();

    }, 2000);
  }

  ngOnInit() {
  }

  onDismiss() {
    this.modalctrl.dismiss({ comments: this.comments });
  }
  getComments() {
    this.storage.get('CommentQuizz').then((val: any) => {
      console.log('val', val)
      this.GetComment = val;
    });
    this.storage.get('Question').then((val: any) => {
      this.Question = val;
      this.CommentByQuizz = this.Question.comments
    });
  }

  ionViewWillLeave() {
    clearInterval(this.ii);

  }

  sendMessage() {
    //var commentaire = (<HTMLInputElement>document.getElementById("comment")).value;
    console.log('this.commentaire', this.comment)
    if (this.comment.commentaire) {
      this.comments.push(
        {
          commentaire: this.comment.commentaire,
          date: new Date().toISOString(),
        });
      this.storage.set('CommentQuizz', this.comments);
    }
    this.resetView()
  }

  resetView() {
    this.comment = {
      "commentaire": "",
    }
  }
  async ConfirmSupperssion() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
