import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
// import { Socket } from 'ng-socket-io';
import { Socket } from 'ngx-socket-io';
//  import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
   }

connect(){
  this.socket.connect();
  
}
desconnect(){
  this.socket.disconnect();
}

publish(event,data){
  this.socket.emit(event, data);
}
Listen(event): Observable<any> {
  return this.socket.fromEvent(event)
}


// getMessage(where) {
//   return this.socket.fromEvent(where).pipe(map((data) => data));
// }

removeListener(event){
  this.socket.removeListener(event);
}



}
