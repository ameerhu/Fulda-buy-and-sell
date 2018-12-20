import { config } from '../config';
import { Messages, Customer } from '../model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages$: BehaviorSubject<Messages[]> = new BehaviorSubject([]);
  messagesList$: BehaviorSubject<Messages[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
    ) { 
      const currentUser = this.auth.currentUser;
      if(currentUser)
      this.getMsgCustomer(this.auth.currentUser.id); 
    }

  send(msgDetail: Messages){
    return this.http.post(config.apiUrl + '/Messages' , msgDetail);
  }

  getMsgCustomer(receiverId){
    //return this.http.get(config.apiUrl + '/Messages [where][customer_Receiver_Id] =' + receiverId);
    let queryString = '';
    queryString = '?filter[where][customer_Receiver_Id]=' + receiverId + '&filter[order]=msgDate%20DESC';
    return this.http.get<Messages[]>(config.apiUrl + '/Messages' + queryString).subscribe(data=>{
      this.messages$.next(data);
    })
  }

  getMessages(senderId, receiverId){
    let queryString = '';
    // queryString = '?filter[where][customer_Receiver_Id]=' + receiverId + ' [customer_Sender_Id]='+senderId;
    queryString = '?filter={"where":{"and":[{"customer_Sender_Id":{"inq":["'+senderId+'","'+receiverId+'"]}},{"customer_Receiver_Id":{"inq":["'+receiverId+'","'+senderId+'"]}}]},"order":"msgDate"}'
    return this.http.get<Messages[]>(config.apiUrl + '/Messages' + queryString).subscribe(data=>{
      this.messagesList$.next(data);
      console.log(data);
    })
  }

}
