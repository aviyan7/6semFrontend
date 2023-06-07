import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Createsubgroup} from "../models/createsubgroup.model";
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  apiUrlEndPoint: string = '/post';
  baseUrl: string = environment.baseUrl;
  apiUrlEndPoint1: string = '/subGroup';
  constructor(
    private httpClient: HttpClient
  ) { }

  savePostDetails(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint),data);
  }

  saveSubGroup(subGroup: Createsubgroup): Observable<any>{
    return this.httpClient.post<Createsubgroup>(this.baseUrl.concat(this.apiUrlEndPoint1), subGroup);
  }

  updatePostDetails(data: any, uid: any): Observable<any> {
    return this.httpClient.put(this.baseUrl.concat(this.apiUrlEndPoint),data);
  }

  getAllPosts(): Observable<any> {
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint));
  }
}
