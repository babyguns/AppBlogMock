import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article, SingleArticle } from 'src/app/interfaces/config-type';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list-article',
  templateUrl: './show-list-article.component.html',
  styleUrls: ['./show-list-article.component.css']
})
export class ShowListArticleComponent implements OnInit {
   @Input('articles') public articles:Article[];
  constructor(private articleService:ArticlesService,private auth:AuthService,private router:Router) {    
   }

  ngOnInit() {
    
  }

  handleFavourite(checkFavourite: boolean, slug: string, index: number) {
    
    if(this.auth.isLogged){
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
    }else{
      this.router.navigateByUrl('/register')
    }
  
  }
}
