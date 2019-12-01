import { Injectable } from '@angular/core';
import { RequestServiceService } from './request-service.service';
import { Observable } from 'rxjs';
import { MultiArticle } from '../interfaces/config-type';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  isloading = false;
  constructor(private request: RequestServiceService) { }
  getArticleGlobal(limit, offset = 0, obj = {}): Observable<MultiArticle> {
    let param = {
      Limit: limit,
      offset: offset,
    }
    if (obj) {
      for (let key of Object.keys(obj)) {
        param[key] = obj[key]
      }
    }

    return this.request.getData("articles", param);
  }

  getArticlebySlug(slug) {
    return this.request.getData("articles/" + slug);
  }
  updateArticlebySlug(slug, articleData) {
    return this.request.putData(`articles/${slug}/`, { article: articleData })
  }
  createArticlebySlug(articleData) {
    return this.request.postData(`articles`, { article: articleData })
  }
  deleteArticlebySlug(slug) {
    return this.request.deleteData(`articles/${slug}`)
  }
  addCommenttoArticle(slug, commentData) {
    return this.request.postData(`articles/${slug}/comments`, {
      comment: { body: commentData }
    })
  }

  favoriteArticle(slug) {
    return this.request.postData(`articles/${slug}/favorite`)
  }
  unfavoriteArticle(slug) {
    return this.request.deleteData(`articles/${slug}/favorite`)
  }
  getTags() {
    return this.request.getData("tags")
  }
  getFeedArticle(offset = 0) {
    let param = {
      limit: 10,
      offset: offset
    }
    return this.request.getData("articles/feed", param)
  }
  favouriteArticlebySlug(slug) {
    return this.request.postData(`articles/${slug}/favorite`)
  }
  unfavouriteArticlebySlug(slug) {
    return this.request.deleteData(`articles/${slug}/favorite`)
  }
  addCommentToArticlebySlug(slug, commentData = {}) {
    return this.request.postData(`articles/${slug}/comments`, { comment: commentData })
  }
  GetCommentFromArticlebySlug(slug) {
    return this.request.getData(`articles/${slug}/comments`)
  }
  deleteCommentbySlug(slug, id) {
    return this.request.deleteData(`articles/${slug}/comments/${id}`)
  }

}
