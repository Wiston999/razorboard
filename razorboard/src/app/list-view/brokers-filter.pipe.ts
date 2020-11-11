import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brokersFilter'
})
export class BrokersFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

  filterBroker(broker, filter: string): boolean {
    if (broker.name.includes(filter)) {
      return true;
    }
    if (broker.type && broker.type.includes(filter)) {
      return true;
    }
    for (const confKey of Object.keys(broker.configuration)) {
      const confValue = broker.configuration[confKey];
      if (confKey.includes(filter) || confValue.includes(filter)) {
        return true;
      }
    }
    return false;
  }
}
