import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policiesFilter'
})
export class PoliciesFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      let outputItems = items.filter(item => this.filterPolicy(item, filter));
      return outputItems;
    }
  }

  filterPolicy(policy, filter: string): boolean {
    if (policy.name.includes(filter)){
      return true;
    }
    if (policy.repo && policy.repo.name.includes(filter)){
      return true;
    }
    if (policy.broker && policy.broker.name.includes(filter)){
      return true;
    }
    if (policy.task && policy.task.name.includes(filter)){
      return true;
    }
    for (let tag of policy.tags) {
      if (tag.name.includes(filter)) {
        return true;
      }
    }
    return false;
  }

}
