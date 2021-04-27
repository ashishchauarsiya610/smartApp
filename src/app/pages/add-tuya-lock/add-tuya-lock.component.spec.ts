import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTuyaLockComponent } from './add-tuya-lock.component';

describe('AddTuyaLockComponent', () => {
  let component: AddTuyaLockComponent;
  let fixture: ComponentFixture<AddTuyaLockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTuyaLockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTuyaLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
