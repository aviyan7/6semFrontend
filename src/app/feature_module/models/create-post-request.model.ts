export class CreatePostRequestModel {
  id: any;
  postName: string | undefined;
  description: string | undefined;
  postImages: Array<any> = new Array<any>();
  createdByUser: any;
  totalVotes: Array<any> = new Array<any>();
  comments: Array<any> = new Array<any>();
  // createdDate: Date = new Date();
}
