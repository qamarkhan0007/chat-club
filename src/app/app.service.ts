import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {
  baseUrl: any = 'http://localhost:3000/';

  constructor(private _http: Http) { }

  register(data) {
    console.log('data in servce ', data);
    const _path = this.baseUrl + 'register',
    headers = new Headers({'Content-type' : 'application/json'}),
    options = new RequestOptions({headers: headers}),
    body = JSON.stringify(data);
    return this._http.post(_path, body, options).map(res => {
      return res.json();
    });
  }
  login(data) {
    const _path = this.baseUrl + 'login',
    headers = new Headers({'Content-type': 'application/json'}),
    body = JSON.stringify(data);
    return this._http.post(_path, body, {headers: headers}).map( res => {
      return res.json();
    });
  }
  uploadMe(file) {
    const _path = this.baseUrl + 'uploadMe';
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('uploads[]', file);
      // formData.append('customName', 'qk');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', _path, true);
      console.log('formData', formData);
      xhr.send(formData);
    });
    // headers = new Headers({'Content-type': 'application/json'}),
    // body = JSON.stringify(file);
    // return this._http.post(_path, body, {headers: headers}).map( res => {
    //   return res.json();
    // });
  }
  getFile() {
    console.log('service???????????');
    const _path = this.baseUrl + 'file',
    headers = new Headers({'Content-type': 'application/json'});
    return this._http.get(_path, {headers: headers}).map( res => {
      return res.json();
    });
  }
  getUser(email) {
    const _path = this.baseUrl + email,
    headers = new Headers({'Content-type': 'application/json'});
    return this._http.get(_path, {headers: headers}).map( res => {
      return res.json();
    });
  }
  getMessage(cUser, oUser): Observable<any> {
    // const observable: any = new Observable(observer => {
      console.log('services>>>>>>>>>>>');
      const _path = this.baseUrl + 'getmsg',
      headers = new Headers({'Content-type': 'application/json'});
      return this._http.post(_path, [cUser, oUser], {headers: headers}).map( res => {
        return res.json();
      });
    // });
    // return observable;
  }

}
