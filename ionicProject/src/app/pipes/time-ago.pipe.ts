

import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistanceToNow, differenceInDays, isYesterday, isMonday, getHours, getTime } from 'date-fns';

// get the time base current send count
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (isYesterday(value)) {
      return 'yesterday ' + format(value, 'H:mm');
    }
    return differenceInDays(Date.now(), value) > 1 ?
      format(value, 'MMM d, yyyy, H:mm') : formatDistanceToNow(value, { addSuffix: true });
  }

}
