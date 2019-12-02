import { Component, OnInit } from '@angular/core';
import { UserService,  } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResultProfile,Article, MultiArticle, SingleArticle,Profile} from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isYourprofile: boolean;
  totalArticle: number;
  currentUser: string;
  currentTab: string = 'ArticlesTab';
  currentPage: number = 1;
  pageList: number[] = [];
  articles: Article[];
  articlePerPage: number = 5;
  offset: number = 0;
  profileInfo: Profile = {
    username: '',
    bio: '',
    image: '',
    following: false
  }
  totalPage: number;

  constructor(private user: UserService,
    private router: ActivatedRoute, private articleService: ArticlesService, private auth: AuthService) {
  }

  ngOnInit() {

    this.router.params.subscribe((slug) => {
      this.currentUser = slug.profile;
      this.user.getProfile(this.currentUser).subscribe((data: ResultProfile) => {
        this.profileInfo = data.profile;
      });

    })
    this.isYourprofile = (this.currentUser == localStorage.getItem('username'))
    this.currentTab = 'ArticlesTab';
    this.articleService.getArticleGlobal(this.articlePerPage, this.offset, { author: this.currentUser }).subscribe((data: MultiArticle) => {
      this.handleData(data);


    })
  }
  handleData(data: MultiArticle) {

    this.articles = data.articles;
    this.totalArticle = data.articlesCount;
    this.totalPage = Math.ceil(this.totalArticle / this.articlePerPage);
    this.currentPage = 1;
    this.auth.getCurrentPage.next(this.currentPage);
  }

  myArticles() {

    this.offset = 0;

    this.currentTab = 'ArticlesTab';
    this.articleService.getArticleGlobal(this.articlePerPage, 0, { author: this.currentUser }).subscribe((data: MultiArticle) => {
      this.handleData(data);
    })
  }
  favoriteArticle() {

    this.currentTab = 'FavoriteTab';
    this.articleService.getArticleGlobal(this.articlePerPage, 0, { favorited: this.currentUser }).subscribe((data: MultiArticle) => {
      this.handleData(data);
    })
  }
  handleFollow(username, checkFollow) {
    if (checkFollow) {
      return this.user.unfollowUser(username).subscribe((data: ResultProfile) => {
        this.profileInfo.following = data.profile.following

      })
    } else {
      return this.user.followUser(username).subscribe((data) => {
        this.profileInfo.following = data.profile.following;
      });

    }
  }
  getOffset(data) {
    this.offset = data;
    this.handlePageChange(this.offset)
  }
  handlePageChange(offset) {

    if (this.currentTab == 'ArticlesTab') {
      this.articleService.getArticleGlobal(this.articlePerPage, offset, { author: this.currentUser }).subscribe((data: MultiArticle) => {
        this.articles = data.articles;

      })

    }
    if (this.currentTab == "FavoriteTab") {
      this.articleService.getArticleGlobal(this.articlePerPage, offset, { favorited: this.currentUser }).subscribe(data => {
        this.articles = data.articles;

      })
    }
  }
}
