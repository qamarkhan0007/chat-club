import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _service: AppService, private router: Router) { }

  ngOnInit() {
  }
  register(form: any) {
    console.log('form', form);
    this._service.register(form).subscribe( res => {
      console.log(res.data);
      if (res.code === 200) {
        this.router.navigate(['/login']);
      }else {
        this.router.navigate(['/register']);
      }
    });
  }

}
