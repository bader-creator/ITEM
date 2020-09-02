import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoNoeudPage } from './info-noeud.page';

describe('InfoNoeudPage', () => {
  let component: InfoNoeudPage;
  let fixture: ComponentFixture<InfoNoeudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoNoeudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoNoeudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
