import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: { [key: string]: string } = {
    apiUrl: environment.apiUrl,
  };

  constructor() {}

  get(key: string): string {
    return this.config[key];
  }
}
