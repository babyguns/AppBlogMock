import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article, SingleArticle } from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-show-list-article',
  templateUrl: './show-list-article.component.html',
  styleUrls: ['./show-list-article.component.css']
})
export class ShowListArticleComponent implements OnInit {
   @Input('articles') public articles:Article[];
  constructor(private articleService:ArticlesService) {    
   }

  ngOnInit() {
    
  }

  handleFavourite(checkFavourite: boolean, slug: string, index: number) {
    
    
    if (checkFavourite) {
      this.articleService.unfavoriteArticle(slug).subscribe((data: SingleArticle) => {
        this.articles[index].favoritesCount = data.article.favoritesCount;
        this.articles[index].favorited = false;
      });
    }
    if (!checkFavourite) {
      this.articleService.favoriteArticle(slug).subscribe((data: SingleArticle) => {
        this.articles[index].favoritesCount = data.article.favoritesCount;
        this.articles[index].favorited = true;
      })

    }
  }
}
