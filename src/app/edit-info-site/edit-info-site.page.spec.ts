import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInfoSitePage } from './edit-info-site.page';

describe('EditInfoSitePage', () => {
  let component: EditInfoSitePage;
  let fixture: ComponentFixture<EditInfoSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoSitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInfoSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
