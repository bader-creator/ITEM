import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeFichierPage } from './liste-fichier.page';

describe('ListeFichierPage', () => {
  let component: ListeFichierPage;
  let fixture: ComponentFixture<ListeFichierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFichierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeFichierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
