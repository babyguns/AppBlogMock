import { Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  currentPage: number = 1;
  @Input() public ArticlePerPage: number;
  @Input() public totalPage: number;
  @Output() getOffset = new EventEmitter();
  offset: number;
  listPage: number[] = []
  index: number;

  constructor(private auth: AuthService) { }

  ngOnChanges() {

    this.listPage = new Array(this.totalPage)
    this.auth.getCurrentPage.subscribe(data => {
      this.currentPage = data
    })
  }

  handlePageChange(index: number) {
    this.currentPage = index + 1;
    this.offset = (index * this.ArticlePerPage);
    this.getOffset.emit(this.offset);
  }

}
