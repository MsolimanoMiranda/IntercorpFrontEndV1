import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Service {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient) { }

  getUris(uri) {
    return this.http.get(uri, { headers: this.httpHeaders });

    }

    postUris(uri, postdata) {

      return this.http.post(uri, postdata, { headers: this.httpHeaders });
    }

    deleteUris(uri) {
      return this.http.delete(uri, { headers: this.httpHeaders });
    }





}
