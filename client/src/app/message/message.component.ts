import { MessagingService } from '../_services/messaging.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatSnackBar } from '@angular/material';
import { Messages } from '../model';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  _destroy$ = new Subject();
  message: Messages = new Messages();
  msgData: Messages = new Messages();
  messages: Messages[];
  receiver: String;
  currentUser;
  senderName: String;
  interval: any;

  messageContent: String;
  constructor(private messagingService: MessagingService,
    public snackBar: MatSnackBar,
    private auth: AuthenticationService) {
    this.currentUser = this.auth.currentUser;
  }

  ngOnInit() {
    this.messagingService.messagesList$.pipe(takeUntil(this._destroy$)).subscribe(data => {
      this.messages = data;
      this.messages.forEach(element => {
        this.msgData = element;
      });
      if (this.currentUser.id === this.msgData.customer_Sender_Id) {
        this.receiver = this.msgData.customer_Receiver_Id;
      } else {
        this.receiver = this.msgData.customer_Sender_Id;
      }
      console.log('receiver is : ' + JSON.stringify(this.receiver));
      if (!this.msgData) {
        console.log('Sender ' + this.msgData.senderU.username);
        console.log('Sender ' + this.msgData.receiverU.username);
      }

    });

    this.interval = setInterval(() => {
      // this.messagingService.getMessages(this.receiver,this.currentUser.id);
      // console.log("sender: + id: "+this.currentUser.id+"\n receiver: + id: "+this.receiver);
      // console.log("Refreshing data");

    }, 15000);

  }

  sendMessage(msg: String) {
    if (!msg) {
      return;
    }
    this.message.customer_Sender_Id = this.currentUser.id;
    this.message.customer_Receiver_Id = this.receiver;
    this.message.body = msg;
    this.message.msgDate = new Date();
    this.messagingService.send(this.message).subscribe(data => {
      this.openSnackBar('Notify', 'Message sent');
      console.log(this.message);
      this.messageContent = null;
      this.messagingService.getMessages(this.currentUser.id, this.receiver);
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
