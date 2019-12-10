import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article, MultiArticle, SingleArticle, ListTag } from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage: number;
  totalPage: number;
  isloading: boolean = false;
  ArticlePerPage: number = 10;
  currentTab: number = 1;
  listArticle: Article[] = [];
  totalArticle: number;
  listTag: ListTag;
  tagArticle: [];
  tagSelected: string = '';
  // pageList: number[] = []
  offset: number;

  constructor(public auth: AuthService, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getTags().subscribe(data => { this.listTag = data['tags'] })

    this.currentPage = 1;
    if (this.auth.isLogged) {
      this.currentTab = 1;
      this.articlesService.getFeedArticle().subscribe((data: MultiArticle) => {
        this.setData(data)

      })
    }
    if (!this.auth.isLogged) {
      this.currentTab = 2;
      return this.articlesService.getArticleGlobal(this.ArticlePerPage).subscribe((data: MultiArticle) => {
        this.setData(data);
      })
    }

  }

  getDataGlobalTab() {
    return this.articlesService.getArticleGlobal(this.ArticlePerPage).subscribe((data: MultiArticle) => {
      this.setData(data)
    })
  }

  getDataFeedTab() {
    return this.articlesService.getFeedArticle().subscribe((data: MultiArticle) => {
      this.setData(data)
    })
  }

  handleGlobal() {
    this.currentTab = 2;
    if (this.isloading == true) return;
    this.isloading = true;
    this.getDataGlobalTab();
    this.isloading = false;
  }

  handleFeed() {
    this.currentTab = 1;
    if (this.isloading == true) return;
    this.isloading = true;
    this.getDataFeedTab();
    this.isloading = false;
  }

  HandleTagSelected(event: Event) {
    if (this.isloading == true) return;
    this.isloading = true;
    this.currentTab = 3;
    this.tagSelected = (event.target as HTMLAnchorElement).innerHTML;
    this.articlesService.getArticleGlobal(this.ArticlePerPage, 0, { tag: this.tagSelected }).subscribe((data: MultiArticle) => {
      this.setData(data);
    })
    this.isloading = false;
  }
  setData(data) {
    this.totalArticle = data.articlesCount;
    this.listArticle = data.articles;
    this.totalPage = Math.ceil(this.totalArticle / this.ArticlePerPage);
    this.currentPage = 1;
    this.auth.getCurrentPage.next(this.currentPage);
  }
  handleFavourite(checkFavourite: boolean, slug: string, index: number) {
    if (checkFavourite) {
      this.articlesService.unfavoriteArticle(slug).subscribe((data: SingleArticle) => {
        this.listArticle[index].favoritesCount = data.article.favoritesCount;
        this.listArticle[index].favorited = false;
      });
    }
    if (!checkFavourite) {
      this.articlesService.favoriteArticle(slug).subscribe((data: SingleArticle) => {
        this.listArticle[index].favoritesCount = data.article.favoritesCount;
        this.listArticle[index].favorited = true;
      })

    }
  }

  getOffset(offset) {
    this.offset = offset;
    this.handlePageChange(this.offset);
  }

  handlePageChange(offset) {
    if (this.currentTab == 2) {
      this.articlesService.getArticleGlobal(this.ArticlePerPage, offset).subscribe((data: MultiArticle) => {
        this.listArticle = data.articles;
      })
    }
    if (this.currentTab == 1) {
      this.articlesService.getFeedArticle(offset).subscribe((data: MultiArticle) => {
        this.listArticle = data.articles;
      })
    }
    if (this.currentTab == 3) {

      this.articlesService.getArticleGlobal(this.ArticlePerPage, offset, { tag: this.tagSelected }).subscribe((data: MultiArticle) => {
        this.listArticle = data.articles;
      })
    }
  }

}
