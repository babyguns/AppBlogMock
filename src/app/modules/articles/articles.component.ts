import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User, ResultUser, Comment, SingleArticle, Article, MultipleComment, SingleComment } from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  ArticleDetail: Article;
  slug: string;
  currrentUser: User;
  commentAdd: string = '';
  listComment: Comment[];
  isYourArticle: boolean;
  constructor(private article: ArticlesService, private route: ActivatedRoute,
    public auth: AuthService) {

  }

  ngOnInit() {

    this.route.params.subscribe(param => {
      this.slug = param.slug,
        this.getCommentbySlug()
    });

    this.article.getArticlebySlug(this.slug).subscribe((data: SingleArticle) => {
      this.ArticleDetail = data.article;
      this.isYourArticle = (localStorage.getItem('username') == data.article.author.username)
    })
    this.auth.getCurrentUser().subscribe((user: ResultUser) => {
      this.currrentUser = user.user;
    }
    );

  }

  getCommentbySlug() {
    this.article.GetCommentFromArticlebySlug(this.slug).subscribe((comment: MultipleComment) => {
      this.listComment = comment.comments
    })
  }

  getCommentValue(event: KeyboardEvent) {

    this.commentAdd = (event.target as HTMLTextAreaElement).value;
  }
  addComment() {
    this.article.addCommenttoArticle(this.slug, this.commentAdd).subscribe((comment: SingleComment) => {
      this.commentAdd = '';
      this.listComment.unshift(comment.comment)
    }, err => console.log(err)
    )
  }
  deleteComment(id, indexRemove) {
    this.article.deleteCommentbySlug(this.slug, id).subscribe(comment => {
      this.listComment.splice(indexRemove, 1);
    }, err => console.log(err)
    )


  }



}


