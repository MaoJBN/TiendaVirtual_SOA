import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithFacebookComponent } from './login-with-facebook.component';

describe('LoginWithFacebookComponent', () => {
  let component: LoginWithFacebookComponent;
  let fixture: ComponentFixture<LoginWithFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithFacebookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
