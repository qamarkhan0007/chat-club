import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  animations: [
    trigger('messages', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class ChatRoomComponent implements OnInit {
  messages: any = [];
  message = '';
  nickname: any;
  alertMessage: any;
  constructor(private socket: Socket, private routes: ActivatedRoute) { }

  ngOnInit() {
    this.routes.params.subscribe((params: Params) => {
      this.nickname = params['nickname'];
    });
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.getUsers().subscribe(data => {
      const user = data['user'];
      if (data['event'] === 'left') {
        this.alertMessage = 'User left: ' + user;
      }else {
        this.alertMessage = 'User joined: ' + user;
      }
    });
  }

  removeItem(msg) {
    console.log(msg);
    console.log(this.messages);
    let i = this.messages.indexOf(msg);
    console.log('index', i);
    this.messages.splice(i, 1);
  }

  getMessages() {
    const observable: any = new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    this.socket.emit('add-message', {text: this.message});
    this.message = '';
  }

  getUsers() {
    const observable: any = new Observable(observer => {
      this.socket.on('users-changed', data => {
        observer.next(data);
      });
    });
    return observable;
  }
}
