import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodesFilter'
})
export class NodesFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      const outputItems = items.filter(item => this.filterNode(item, filter));
      return outputItems;
    }
  }

  filterNode(node, filter: string): boolean {
    if (node.name.includes(filter)) {
      return true;
    }
    if (node.dhcp_mac.includes(filter) || node.dhcp_mac.replace(/-/g, ':').includes(filter)) {
      return true;
    }
    if (node.facts && node.facts.hostname && node.facts.hostname.includes(filter)) {
      return true;
    }
    if (node.state && node.state.installed && node.state.installed.includes(filter)) {
      return true;
    }
    if (node.policy && node.policy.name.includes(filter)) {
      return true;
    }
    for (const tag of node.tags) {
      if (tag.name.includes(filter)) {
        return true;
      }
    }
    return false;
  }
}
