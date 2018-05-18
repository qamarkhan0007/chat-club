import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Pipe({ name: 'evenNums', pure: false })
export class LoginComponent implements OnInit, PipeTransform {
  today = Date.now();
  dropdownList = [];
  selectedItems = [];
  cities = [];
  dropdownSettings = {};
  opts: any;
  borderStyle = '1px solid black';
  counter = 0;
  minDate: any;
  maxDate: any;

  alertStyles = {
    'color': 'black',
    'font-weight': 'bold',
    'borderBottom': this.borderStyle
  };
  transform(allNums: any) {
    console.log('check me here ', allNums);
    return allNums.filter(num => num % 2 == 0);
  }

  constructor(private socket: Socket, private router: Router, private _service: AppService, public toastr: ToastsManager) {
    console.log('data', typeof this.today);
    this.minDate = new Date();

    }

  ngOnInit() {
    this.cities = [
            { item_id: 1, item_text: 'Mumbai', data: ['Hello11', 'Hello11', 'Hello11'] },
            { item_id: 2, item_text: 'Bangaluru', data: ['Hello22', 'Hello22', 'Hello22'] },
            { item_id: 3, item_text: 'Pune', data: ['Hello3333', 'Hello3333', 'Hello3333'] },
            { item_id: 4, item_text: 'Navsari', data: ['Hello444', 'Hello444', 'Hello444'] },
            { item_id: 5, item_text: 'New Delhi', data: ['Hello555', 'Hello555', 'Hello555'] }
        ];
        this.selectedItems = [
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
  }
  onChange(deviceValue) {
    console.log(deviceValue);
    this.opts = deviceValue.split(deviceValue);
}
  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }
  // showError() {
  //   this.toastr.error('This is not good!', 'Oops!');
  // }
  // showWarning() {
  //   this.toastr.warning('You are being warned.', 'Alert!');
  // }
  // showInfo() {
  //   this.toastr.info('Just some information for you.');
  // }
  // showCustom() {
  //   this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  // }
  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file1 = event.target.files.item(0);
      console.log('event', file1);
      // const file = new Buffer(file1).toString('base64');
      // console.log('file', file1);
      // const formData: FormData = new FormData();
      // formData.append('uploads[]', file1, file1.name);
      // console.log(formData);
      this._service.uploadMe(file1).then( (res: any) => {
        if (res.code !== 400 && res.data !== null) {
          this.router.navigate(['/login']);
        }else {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  getFile() {
    this._service.getFile().subscribe( res => {
    });
  }

  login(form) {
    this._service.login(form).subscribe( res => {
      console.log('res', res);
      if (res.code !== 400 && res.data !== null) {
        localStorage.setItem('user', form.username);
        this.toastr.success('Successfully Login', 'Success!');
        this.router.navigate(['/profile']);
        // this.router.navigate(['profile'], {  queryParams: { name: 'qk' }, skipLocationChange: true });
        // this.joinChat(res.data.name);
      }else {
        this.toastr.error('Username or Password not found', 'Oops!');
        this.router.navigate(['/login']);
      }
    });
  }

  joinChat(nickname) {
    this.socket.connect();
    this.socket.emit('set-nickname', nickname);
    this.router.navigate(['/chat-room/' + nickname]);
  }
  countMe() {
    console.log('1111', this.counter);
  }

}
