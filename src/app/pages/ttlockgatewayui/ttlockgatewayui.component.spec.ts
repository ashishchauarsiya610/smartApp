import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TtlockgatewayuiComponent } from './ttlockgatewayui.component';

describe('TtlockgatewayuiComponent', () => {
  let component: TtlockgatewayuiComponent;
  let fixture: ComponentFixture<TtlockgatewayuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtlockgatewayuiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TtlockgatewayuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
