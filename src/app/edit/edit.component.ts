import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';
import axios from 'axios';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  entryForm: FormGroup;
  entryId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) {
    this.entryForm = this.fb.group({
      jobNumber: ['', Validators.required],
      hours: ['', Validators.required],
      startTime: ['', Validators.required],
      finishTime: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.entryId = this.route.snapshot.paramMap.get('id')!;
    const apiUrl = this.configService.get('apiUrl');
    axios.get(`${apiUrl}/Event/GetById`, {
      params: { id: this.entryId }
    }).then(response => {
      console.log("Edit", response)
      /* this.entryForm.setValue({
        jobNumber: response.jobId,
        hours: response.ho,
        startTime: response.startTime,
        finishTime: response.endTime,
        date: response.startTime.split('T')[0]
      }); */
    });
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      axios.post(`/api/Event/CreateOrUpdate`, this.entryForm.value)
      .then(response => {
          this.router.navigate(['/home']);
        }, error => {
          console.error('There was an error!', error);
        });
    }
  }
}
