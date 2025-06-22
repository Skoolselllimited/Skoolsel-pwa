import { JSX } from 'react';

export type BlogPost = {
  title: string;
  description: string | JSX.Element;
  image: string;
  category: string;
  timeAgo: string;
  readTime: string;
};
