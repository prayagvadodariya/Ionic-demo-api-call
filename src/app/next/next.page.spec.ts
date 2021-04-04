import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NextPage } from './next.page';

describe('NextPage', () => {
  let component: NextPage;
  let fixture: ComponentFixture<NextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
