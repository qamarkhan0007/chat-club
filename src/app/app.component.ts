import { Component, ViewContainerRef, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public viewContainerRef: ViewContainerRef;

    public constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
      this.viewContainerRef = viewContainerRef;

      this.toastr.setRootViewContainerRef(viewContainerRef);
    }
    ngOnInit() {
      // const socket = socketIo('http://localhost:3000');
      // socket.on('Hello', function(data) {
      //   console.log('Data is here', data);
      // });
    }
    showSuccess() {
    }
    showError() {
      this.toastr.error('This is not good!', 'Oops!');
    }
    showWarning() {
      this.toastr.warning('You are being warned.', 'Alert!');
    }
    showInfo() {
      this.toastr.info('Just some information for you.');
    }
    showCustom() {
      this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }
}
