import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpUtils} from '../../core_module/utils/http-utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  static API = 'social';

  constructor(
    private httpClient: HttpClient
  ) { }

  protected getApi(): string {
    return FeatureService.API;
  }

  savePostDetails(data: any): Observable<any> {
    const api = `${this.getApi()}/posts`;
    const req = HttpUtils.getRequest(api);
    return this.httpClient.post(req.url, data);
  }

  updatePostDetails(data: any, uid: any): Observable<any> {
    const api = `${this.getApi()}/posts/${uid}`;
    const req = HttpUtils.getRequest(api);
    return this.httpClient.put(req.url, data);
  }

  getAllPosts(): Observable<any> {
    const api = `${this.getApi()}/posts`;
    const req = HttpUtils.getRequest(api);
    return this.httpClient.get(req.url);
  }
}
