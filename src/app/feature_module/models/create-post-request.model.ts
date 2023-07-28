export class CreatePostRequestModel {
  id: any;
  postName: string | undefined;
  description: string | undefined;
  subGroupId?: number | undefined;
  // subGroupName?: string | undefined;
  images: Array<any> = new Array<any>();
  createdByUser: any;
  totalVotes: Array<any> = new Array<any>();
  comments: Array<any> = new Array<any>();
  pageNumber?: number | undefined;
  pageSize?: number | undefined;

  // createdDate: Date = new Date();
}
