import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
})
export class StoragePage implements OnInit {
  segment = "storage"
  constructor(private auth: AuthentificationService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout()
  }

}
