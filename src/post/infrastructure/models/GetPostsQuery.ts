import PayloadDto from "src/core/infrastructure/models/PayloadDto";
import GetPostsPayload from "src/post/application/types/GetPostsPayload";
import { Expose } from "class-transformer";

export default class GetPostsQuery extends PayloadDto<GetPostsPayload> {
  @Expose()
  page!: number;

  @Expose()
  pageSize!: number;

  constructor(payload: GetPostsPayload) {
    super(payload);
    Object.assign(this, this.transform(payload));
  }

  transform(payload: GetPostsPayload) {
    return {
      page: payload.page,
      pageSize: payload.pageSize,
    };
  }
}
