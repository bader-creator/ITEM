import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-info-site',
  templateUrl: './edit-info-site.page.html',
  styleUrls: ['./edit-info-site.page.scss'],
})
export class EditInfoSitePage implements OnInit {

  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }

}
