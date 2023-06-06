import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  apiUrlEndPoint: string = '/post';
  getData: string = '/all';
  baseUrl: string = environment.baseUrl;
  apiUrlEndPoint1: string = this.baseUrl + '/subGroup';

  constructor(
    private httpClient: HttpClient
  ) { }

  savePostDetails(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint),data);
  }

  saveSubGroup(data: any): Observable<any>{
    return this.httpClient.post(this.apiUrlEndPoint1, data);
  }

  updatePostDetails(data: any, uid: any): Observable<any> {
    // const api = `${this.getApi()}/posts/${uid}`;
    // const req = HttpUtils.getRequest(api);
    // return this.httpClient.put(req.url, data);
    return this.httpClient.put(this.baseUrl.concat(this.apiUrlEndPoint),data);
  }

  getAllPosts(): Observable<any> {
    // const api = `${this.getApi()}/posts`;
    // const req = HttpUtils.getRequest(api);
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint));
  }
}
