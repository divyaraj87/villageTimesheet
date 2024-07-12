import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalTime'
})
export class TotalTimePipe implements PipeTransform {

  transform(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return `${diffHours} hours`;
  }

}
