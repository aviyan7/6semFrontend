export class CreatePostRequestModel {
  id: any;
  location: string | undefined;
  description: string | undefined;
  postImages: Array<any> = new Array<any>();
  createdByUser: any;
  totalLikes: Array<any> = new Array<any>();
  comments: Array<any> = new Array<any>();
  createdDate: Date = new Date();
}
