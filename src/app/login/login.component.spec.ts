import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Timesheet Login');
    expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="password"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Login');
  });

  it('should call onSubmit method when login button is clicked', () => {
    spyOn(component, 'onSubmit');
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    loginButton.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
