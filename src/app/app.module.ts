import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import {DataTableModule} from 'angular2-datatable';
import { Pipe, PipeTransform } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatRoomComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    ToastModule.forRoot(),
    DataTableModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [AppService, {provide: ToastOptions, useClass: AppModule}],
  bootstrap: [AppComponent]
})
export class AppModule extends ToastOptions {
  animate = 'fade'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  toastLife = 1000;
  positionClass = 'toast-top-center';
}
