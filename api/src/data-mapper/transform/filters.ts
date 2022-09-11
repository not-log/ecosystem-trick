import { zSkyworldComAuthor } from "../const";

interface WithAuthor {
  // для наших моделей
  authorName?: string | null;
  // для внешних моделей
  author?: string | null;
}

export const filterTricksWithZSkyworldAuthor = <Trick extends WithAuthor>(trick: Trick): boolean => {
  return (trick.authorName?.includes(zSkyworldComAuthor) || trick.author?.includes(zSkyworldComAuthor)) ?? false;
};
