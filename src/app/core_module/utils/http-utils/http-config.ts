import { environment } from 'src/environments/environment';

export class HttpConfig {
  public static baseApiUrl = environment.baseUrl;
  // public static baseApiUrl = environment.firebase.baseApiUrl;
  public static auth = HttpConfig.baseApiUrl + '/login';
}
