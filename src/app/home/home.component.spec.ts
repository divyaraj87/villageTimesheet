import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ConfigService } from '../config.service';
import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TotalTimePipe } from '../total-time.pipe';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let configService: ConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule
      ],
      declarations: [ HomeComponent, TotalTimePipe ],
      providers: [ ConfigService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    configService = TestBed.inject(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current date and load jobs', () => {
    spyOn(component, 'loadJobs');
    component.ngOnInit();
    expect(component.loadJobs).toHaveBeenCalledWith(component.currentDate);
  });

  it('should navigate to the previous date and load jobs', () => {
    spyOn(component, 'loadJobs');
    const previousDateButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    previousDateButton.click();
    expect(component.loadJobs).toHaveBeenCalled();
  });

  it('should navigate to the next date and load jobs', () => {
    spyOn(component, 'loadJobs');
    const nextDateButton = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'))[1].nativeElement;
    nextDateButton.click();
    expect(component.loadJobs).toHaveBeenCalled();
  });

  it('should display job details in the template', () => {
    component.isLoading = false;
    component.jobs = [
      {
        startTime: '2023-06-07T06:00:37.361Z',
        endTime: '2023-06-07T14:30:37.361Z',
        jobId: '1234',
        job: {
          jobDescription: 'Lorem Ipsum',
        }
      }
    ];
    fixture.detectChanges();

    const jobItems = fixture.debugElement.queryAll(By.css('.job-item'));
    expect(jobItems.length).toBe(1);
    expect(jobItems[0].query(By.css('.job-date .day')).nativeElement.textContent).toContain('Wed 07');
    expect(jobItems[0].query(By.css('.job-date .month')).nativeElement.textContent).toContain('Jun 23');
    expect(jobItems[0].query(By.css('.job-time .time')).nativeElement.textContent).toContain('07:00');
    expect(jobItems[0].query(By.css('.job-time .duration')).nativeElement.textContent).toContain('8 hours');
    expect(jobItems[0].query(By.css('.job-description')).nativeElement.textContent).toContain('1234 - Lorem Ipsum');
  });
});
