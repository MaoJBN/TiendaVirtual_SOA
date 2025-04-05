import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithGitComponent } from './login-with-git.component';

describe('LoginWithGitComponent', () => {
  let component: LoginWithGitComponent;
  let fixture: ComponentFixture<LoginWithGitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithGitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
