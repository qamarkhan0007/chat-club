import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sideBar: any = true;
  messages: any = [];
  message: any;
  currentUser: any;
  userToChat: any;

  constructor(private socket: Socket, private routes: ActivatedRoute, private _service: AppService, private router: Router) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('user');
    console.log(this.currentUser);
    // this.checkStatus();
    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('active');
    });
    this.uploadMessages().subscribe(message => {
      this.messages.push(message.text[0]);
    });
    // this.routes.params.subscribe(params => {
    //   this.currentUser = params['email'];
    // });
  }
  checkStatus() {
    if (this.sideBar === true) {
      this.sideBar = false;
    }else {
      this.sideBar = true;
    }
  }
  uploadMessages() {
    const observable: any = new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });
    });
    return observable;
  }
  sendMessage(cUser) {
    this.socket.emit('add-message', {groupId: [this.currentUser, this.userToChat.email],
       text: [{msg: this.message, from: cUser, name: this.userToChat.name, date: new Date()}]});
    this.message = '';
    this.getMessage();
  }
  getMessage() {
    this._service.getMessage(this.currentUser, this.userToChat).subscribe(response => {
      this.messages = response.data.text;
      console.log(this.messages);
    });
  }
  getUser(email) {
    this._service.getUser(email).subscribe(res => {
      console.log('...........', res.data);
      this.userToChat = res.data;
    });
    this.getMessage();
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
