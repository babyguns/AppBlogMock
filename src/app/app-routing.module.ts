import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { SettingComponent } from './modules/setting/setting.component';
import { LoginRegisterComponent } from './modules/login-register/login-register.component';
import { CreateEditArticleComponent } from './modules/create-edit-article/create-edit-article.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { FollowComponent } from './modules/profile/follow/follow.component';
import { ShowListArticleComponent } from './modules/show-list-article/show-list-article.component';
import { PaginationComponent } from './modules/pagination/pagination.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setting', canActivate: [AuthGuard], component: SettingComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'editor', canActivate: [AuthGuard], component: CreateEditArticleComponent },
  { path: 'editor/:slug', canActivate: [AuthGuard], component: CreateEditArticleComponent },
  { path: 'article/:slug', component: ArticlesComponent },
  { path: 'users/:profile', component: ProfileComponent }
];

@NgModule({
  declarations: [HomeComponent,
    SettingComponent,
    LoginRegisterComponent,
    CreateEditArticleComponent,
    ArticlesComponent,
    ProfileComponent,
    FollowComponent,
    ShowListArticleComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
