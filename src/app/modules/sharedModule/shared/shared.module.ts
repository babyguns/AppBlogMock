import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router'
import { FollowComponent } from '../sharedComponent/follow/follow.component';
import { ShowListArticleComponent } from '../sharedComponent/show-list-article/show-list-article.component';
import { PaginationComponent } from '../sharedComponent/pagination/pagination.component';

@NgModule({
  declarations: [
    FollowComponent,
    ShowListArticleComponent,
    PaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FollowComponent,ShowListArticleComponent,PaginationComponent
  ]
})
export class SharedModule { }
