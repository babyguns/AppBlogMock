import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListArticleComponent } from './show-list-article.component';

describe('ShowListArticleComponent', () => {
  let component: ShowListArticleComponent;
  let fixture: ComponentFixture<ShowListArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
