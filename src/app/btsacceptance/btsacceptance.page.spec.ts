import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BTSAcceptancePage } from './btsacceptance.page';

describe('BTSAcceptancePage', () => {
  let component: BTSAcceptancePage;
  let fixture: ComponentFixture<BTSAcceptancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BTSAcceptancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BTSAcceptancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
