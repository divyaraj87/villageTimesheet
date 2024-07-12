import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add.component';
import { ConfigService } from '../config.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      declarations: [ AddComponent ],
      providers: [ ConfigService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const entryForm = component.entryForm;
    expect(entryForm).toBeDefined();
    expect(entryForm.controls['jobNumber'].value).toEqual('');
    expect(entryForm.controls['hours'].value).toEqual('');
    expect(entryForm.controls['startTime'].value).toEqual('');
    expect(entryForm.controls['finishTime'].value).toEqual('');
    expect(entryForm.controls['date'].value).toEqual('');
  });

  it('should have required form controls', () => {
    const entryForm = component.entryForm;
    expect(entryForm.controls['jobNumber'].hasError('required')).toBeTruthy();
    expect(entryForm.controls['hours'].hasError('required')).toBeTruthy();
    expect(entryForm.controls['startTime'].hasError('required')).toBeTruthy();
    expect(entryForm.controls['finishTime'].hasError('required')).toBeTruthy();
    expect(entryForm.controls['date'].hasError('required')).toBeTruthy();
  });
});
