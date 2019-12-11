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

import { SharedModule } from './modules/sharedModule/shared/shared.module';
import { HeaderComponent } from './modules/headerfooter/header/header.component';
import { FooterComponent } from './modules/headerfooter/footer/footer.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setting', canActivate: [AuthGuard], component: SettingComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'editor', canActivate: [AuthGuard], component: CreateEditArticleComponent },
  { path: 'editor/:slug', canActivate: [AuthGuard], component: CreateEditArticleComponent },
  { path: 'article/:slug', component: ArticlesComponent },
  { path: 'users/:profile', component: ProfileComponent },
  { path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  declarations: [HomeComponent,
    SettingComponent,
    LoginRegisterComponent,
    CreateEditArticleComponent,
    ArticlesComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(routes)],
  exports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    RouterModule]
})
export class AppRoutingModule { }
