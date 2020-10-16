import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reposFilter'
})
export class ReposFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      let outputItems = items.filter(item => this.filterRepo(item, filter));
      return outputItems;
    }
  }

  filterRepo(repo, filter: string): boolean {
    if (repo.name.includes(filter)){
      return true;
    }
    if (repo.url && repo.url.includes(filter)) {
      return true
    }
    if (repo.iso_url && repo.iso_url.includes(filter)) {
      return true;
    }
    if (repo.task && repo.task.name.includes(filter)) {
      return true
    }
    return false;
  }

}
