import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GalleryNoeudPage } from './gallery-noeud.page';

describe('GalleryNoeudPage', () => {
  let component: GalleryNoeudPage;
  let fixture: ComponentFixture<GalleryNoeudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryNoeudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryNoeudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
