import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/config-type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  isYourProfile:boolean;
 @Input() public ArticleDetail:Article;
  constructor(private profile:UserService,private article:ArticlesService,private router:Router,private auth:AuthService) {}
  
  ngOnInit() {
    
    
    if(this.ArticleDetail){
      
      this.isYourProfile=(localStorage.getItem('username')==this.ArticleDetail.author.username);
      
    }
       
    
  }

  
  handleFollow(checkFollow, username) {
    if(this.auth.isLogged){
      if (checkFollow) {
        this.profile.unfollowUser(username).subscribe(data => data);
        this.ArticleDetail.author.following = false;
      } else {
        this.profile.followUser(username).subscribe(data => data);
        this.ArticleDetail.author.following = true;
      }
    }else{
      this.router.navigateByUrl('/login')
    }
   
  }
    deleteArticle(){
      this.article.deleteArticlebySlug(this.ArticleDetail.slug).subscribe(data=>data);
      this.router.navigateByUrl('/')
    }
    handleFavorite(checkFavorite, slug) {
      if(this.auth.isLogged){
        if (checkFavorite) {
          this.article.unfavoriteArticle(slug).subscribe(data =>{
            this.ArticleDetail.favoritesCount=data.article.favoritesCount
    
          } );
          this.ArticleDetail.favorited=false;
        }
        else{
          this.article.favoriteArticle(slug).subscribe(data=>{
            this.ArticleDetail.favoritesCount=data.article.favoritesCount
    
          });
          this.ArticleDetail.favorited=true;
        }
      }else{
        this.router.navigateByUrl('/login')
      }
      
  
    }
}
