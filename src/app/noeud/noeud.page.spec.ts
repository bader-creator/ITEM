import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoeudPage } from './noeud.page';

describe('NoeudPage', () => {
  let component: NoeudPage;
  let fixture: ComponentFixture<NoeudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoeudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoeudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
