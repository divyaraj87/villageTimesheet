import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from '../config.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentDate: Date = new Date();
  jobs: any[] = [];
  isLoading: boolean = true;

  constructor(
    private configService: ConfigService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadJobs(this.currentDate);
  }

  loadJobs(date: Date): void {
    const apiUrl = this.configService.get('apiUrl');
    axios.get(`api/Event/GetList`, {
      params: { page: '1', pageSize: '10' }
    }).then(response => {
      this.jobs = response.data;
      this.isLoading = false;
      console.log(this.jobs)
    });
  }
  
  previousDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.loadJobs(this.currentDate);
  }

  nextDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.loadJobs(this.currentDate);
  }

  add(): void {
    this.router.navigate(['/add']);
  }
}
