import { HttpHeaders } from '@angular/common/http';

import { HttpConfig } from './http-config';

export class HttpUtils {

  public static getRequest(api: string) {
    const fullApi = `${HttpConfig.baseApiUrl}/${api}`;
    return {
      url: fullApi + '.json',
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }


  public static getRequestWithFileSupport(api: string) {
    const fullApi = `${HttpConfig.baseApiUrl}/${api}`;
    return {
      url: fullApi,
      header: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };
  }
}
