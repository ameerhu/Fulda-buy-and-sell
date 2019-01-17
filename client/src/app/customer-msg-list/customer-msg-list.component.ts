import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../_services/messaging.service';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Messages } from '../model';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-customer-msg-list',
  templateUrl: './customer-msg-list.component.html',
  styleUrls: ['./customer-msg-list.component.css']
})
export class CustomerMsgListComponent implements OnInit, OnDestroy {
  _destroy$ = new Subject();
  messages: Messages[];
  senderNames: String[] = [];
  sender = new Map();
  currentUser;

  constructor(
    private messageService: MessagingService,
    private auth: AuthenticationService) {
    this.currentUser = this.auth.currentUser;
  }

  ngOnInit() {
    this.messageService.messages$.pipe(takeUntil(this._destroy$)).subscribe(data => {
      this.messages = data;
      console.log(data);

      this.messages.forEach(element => {
        if (element.senderU && element.senderU.username) {
          this.senderNames.push(element.senderU.username);
          this.sender.set(element.senderU.username, element.customer_Sender_Id);
        }
      });
      this.senderNames = this.senderNames.filter((el, i, a) => i === a.indexOf(el));
      // this.messageService.getMessages(this.sender.get(this.messages.pop().receiverU),this.currentUser.id);
    });
  }

  msgDetails(username) {
    this.messageService.getMessages(this.sender.get(username), this.currentUser.id);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

}
