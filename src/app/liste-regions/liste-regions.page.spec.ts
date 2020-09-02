import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeRegionsPage } from './liste-regions.page';

describe('ListeRegionsPage', () => {
  let component: ListeRegionsPage;
  let fixture: ComponentFixture<ListeRegionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRegionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeRegionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
