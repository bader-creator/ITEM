import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  segment = "audit"
  constructor(private auth: AuthentificationService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout()
  }
}
