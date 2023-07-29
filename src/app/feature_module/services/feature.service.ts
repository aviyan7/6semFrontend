import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  apiUrlEndPoint2: string = '/comments';
  apiUrlEndPoint3: string = '/user';
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

  // getAllPosts(): Observable<any> {
  //   // return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint+'/page'));
  //   return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint));
  // }

  getAllPosts(page?: number, size?: number): Observable<any> {
    // return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint+'/page'));
    let params;
    if(page && size){
      params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    }
    // const params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('size', size.toString());
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint), {params});
  }

  postComment(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl.concat(this.apiUrlEndPoint2),data);
  }

  getAllSubGroups(): Observable<any> {
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint1));
  }

  getCurrentUser(): Observable<any>{
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint3));
  }

  getUserPost(page?: number, size?: number): Observable<any>{
    let params;
    if(page && size){
      params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    }
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint)+'/user',{params});
  }

  joinsubGroup(id: any): Observable<any>{
    return this.httpClient.get(this.baseUrl.concat(this.apiUrlEndPoint1+'/join/'+id));
  }
}
