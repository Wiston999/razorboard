import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tasksFilter'
})
export class TasksFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      let outputItems = items.filter(item => this.filterTask(item, filter));
      return outputItems;
    }
  }

  filterTask(task, filter: string): boolean {
    if (task.name.includes(filter)){
      return true;
    }
    if (task.base && task.base.name.includes(filter)) {
      return true
    }
    if (task.description.includes(filter)) {
      return true;
    }
    return false;
  }

}
