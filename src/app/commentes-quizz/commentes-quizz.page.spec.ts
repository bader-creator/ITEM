import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentesQuizzPage } from './commentes-quizz.page';

describe('CommentesQuizzPage', () => {
  let component: CommentesQuizzPage;
  let fixture: ComponentFixture<CommentesQuizzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentesQuizzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentesQuizzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
