import * as CryptoJS from 'crypto-js';
import {environment} from '../../../environments/environment';

export class CryptoJsUtil {
  /**
   * @param data An input to encrypt.
   * */
  public static encrypt(data: any): string {
    return CryptoJS.AES.encrypt(
      data,
      // environment.firebase.appConfigStorageKey
    ).toString();
  }

  /**
   * @param data An encrypted stream of data or object.
   * */
  public static decrypt(data: any): string {
    return CryptoJS;
    // return CryptoJS.AES.decrypt(data, environment.firebase.appConfigStorageKey).toString(
    //   CryptoJS.enc.Utf8
    // );
  }
}
