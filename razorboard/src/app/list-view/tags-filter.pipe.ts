import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsFilter'
})
export class TagsFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      return items.filter(item => this.filterTag(item, filter));
    }
  }

  filterTag(tag, filter: string): boolean {
    if (tag.name.includes(filter)) {
      return true;
    }
    if (JSON.stringify(tag.rule).includes(filter)) {
      return true;
    }
    return false;
  }

}
