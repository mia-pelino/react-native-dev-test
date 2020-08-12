export interface Author {
  id: string;
  name: string;
};

export interface LatinPost {
  author: Author;
  body: string;
  id: string;
  publishedAt: string;
  title: string;
};