import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-btsacceptance',
  templateUrl: './btsacceptance.page.html',
  styleUrls: ['./btsacceptance.page.scss'],
})
export class BTSAcceptancePage implements OnInit {

  constructor(private auth: AuthentificationService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
  }
}
