import { module } from "inversiland";
import { PostModule } from "src/post/PostModule";
import { CoreModule } from "src/core/CoreModule";
import { ObatModule } from "src/obat/ObatModule";

@module({
  imports: [CoreModule, PostModule, ObatModule],
})
export default class AppModule {}
