import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GallerySitePage } from './gallery-site.page';

describe('GallerySitePage', () => {
  let component: GallerySitePage;
  let fixture: ComponentFixture<GallerySitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerySitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
