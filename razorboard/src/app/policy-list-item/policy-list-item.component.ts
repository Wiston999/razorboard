import { Component, OnInit, Input } from '@angular/core';
import { ColorTagService } from '../color-tag.service';

@Component({
  selector: '[policy-list-item]',
  templateUrl: './policy-list-item.component.html',
  styleUrls: ['./policy-list-item.component.css']
})
export class PolicyListItemComponent implements OnInit {
  @Input() policy;
  @Input() columns: string[];

  constructor(
    public colorTag: ColorTagService,
  ) { }

  ngOnInit() {
  }

  barColor(): string {
    const percentage = this.policy.nodes.count / this.policy.max_count;
    if (percentage >= 1) {
      return 'danger';
    } else if (percentage >= 0.85) {
      return 'warning';
    }
    return 'info';
  }
}
