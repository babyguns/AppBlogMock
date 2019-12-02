import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Article, SingleArticle, MultiArticle } from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-create-edit-article',
  templateUrl: './create-edit-article.component.html',
  styleUrls: ['./create-edit-article.component.css']
})
export class CreateEditArticleComponent implements OnInit {
  articleForm: FormGroup;
  oldArticle: Article = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: true,
    favoritesCount: 0,
    author: {
      bio: '',
      following: true,
      image: '',
      username: '',
      token: ''
    },
  };
  taglist = [];
  isNewArticle: boolean;
  listerrors;
  slugArticle: string;
  constructor(private fb: FormBuilder, private article: ArticlesService, private route: ActivatedRoute,
    private router: Router, private auth: AuthService) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: this.fb.array['']

    })
  }

  ngOnInit() {
    if (this.router.url == '/editor') {
      this.isNewArticle = true;

    } else {
      this.isNewArticle = false;
      this.route.params.subscribe(data => this.slugArticle = data.slug);
      this.article.getArticlebySlug(this.slugArticle).subscribe((data:SingleArticle) => {
        this.oldArticle.title = data.article.title;
        this.oldArticle.description = data.article.description;
        this.oldArticle.body = data.article.body;
        this.oldArticle.tagList = data.article.tagList;

        this.oldArticle.tagList.map(ele => this.taglist.push(ele))
        this.articleForm.setValue({
          title: this.oldArticle.title,
          description: this.oldArticle.description,
          body: this.oldArticle.body,
          tagList: this.oldArticle.tagList,

        })
      })

    }
  }

  getTaglist(event: KeyboardEvent) {
    let tag = (event.target as HTMLInputElement).value;
    if (tag) {
      this.taglist.push(tag);
    }
    (event.target as HTMLInputElement).value = '';
  
    
  }
  removeTag(index) {
    this.taglist.splice(index, 1);

  }
  createArticle() {
    console.log(this.articleForm.value);
    
    if (this.isNewArticle) {
      this.articleForm.value['tagList'] = this.taglist;
      this.article.createArticlebySlug(this.articleForm.value).subscribe((data:SingleArticle) => {
        let slug=data.article.slug;
        this.router.navigate(['/article',slug])
      },
        err => {
          this.listerrors = this.auth.showErrors(err);

        })
    }
  }
  editArticle() {
    
    if (!this.isNewArticle) {
      this.articleForm.value.tagList = this.taglist;

      this.article.updateArticlebySlug(this.slugArticle, this.articleForm.value).subscribe((data:MultiArticle) => {
        this.router.navigate(['article', this.slugArticle])
      }, err => {
        this.listerrors = this.auth.showErrors(err)
      }
      )

    }
  }



}
