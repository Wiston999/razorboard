import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[repo-list-item]',
  templateUrl: './repo-list-item.component.html',
  styleUrls: ['./repo-list-item.component.css']
})
export class RepoListItemComponent implements OnInit {
  @Input() repo;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
