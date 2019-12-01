export interface SingleArticle {
    article: Article;
  };
  export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: User;
  
  }
  
  export interface MultipleComment {
    comments: Comment[];
  }
  
  export interface SingleComment {
    comment: Comment
  }
 
  export interface ListTag {
    tags: string[]
  }
  export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: User;
  
  }
  export interface MultiArticle {
    'articles': Article[];
    'articlesCount': number;
  }
  export interface ResultUser {
    user: User
  }
  export interface User {
    bio: string;
    following: boolean;
    image: string;
    username: string;
    token: string;
  }
  export interface ResultProfile {
    profile: Profile
  }
  export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  }