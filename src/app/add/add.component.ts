import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';
import axios from 'axios';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  entryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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
