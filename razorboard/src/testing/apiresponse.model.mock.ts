import { ApiResponse } from '../app/models/apiresponse.model';
import { Node } from '../app/models/node.model';

export const nodeList = [
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/nodes/member',
    id: 'http://localhost:8150/api/collections/nodes/node1',
    name: 'node1',
    hw_info: {
      mac: [
        '50-9a-aa-aa-aa-aa',
        'f8-f2-aa-aa-aa-aa',
        'f8-f2-aa-aa-aa-ab'
      ],
      serial: 'aaaaaaaa',
      uuid: 'be12cce4-82d5-4a5c-bc5b-14002970b2d8'
    },
    dhcp_mac: 'f8-f2-aa-aa-aa-aa',
    tags: [
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/debian_stretch',
        name: 'debian_stretch'
      },
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/all',
        name: 'all'
      },
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/compute',
        name: 'compute'
      }
    ],
    facts: {
      interfaces: 'eno16,enp94s0f0,enp94s0f1,lo',
      domain_name: 'example.com',
      hostname: 'node-01',
      no_value_fact: '',
      facterversion: '2.4.6'
    },
    metadata: {
      last_hook_execution: 'node-booted',
      enable_swap: 'false',
      setup_bonding: 'true',
    },
    state: {
      installed: 'stretch',
      installed_at: '2020-02-18T15:35:16Z'
    },
    hostname: 'node-${i}.example.com',
    root_password: 'f00b4R',
    last_checkin: '2020-02-18T15:23:06Z'
  },
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/nodes/member',
    id: 'http://localhost:8150/api/collections/nodes/node2',
    name: 'node2',
    hw_info: {
      mac: [
        '50-9a-aa-aa-aa-aa',
        'f8-f2-aa-aa-aa-aa',
        'f8-f2-aa-aa-aa-ab'
      ],
      serial: 'aaaaaaaa',
      uuid: 'be12cce4-82d5-4a5c-bc5b-14002970b2d8'
    },
    dhcp_mac: 'f8-f2-aa-aa-aa-aa',
    tags: [
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/debian_stretch',
        name: 'debian_stretch'
      },
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/all',
        name: 'all'
      },
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:8150/api/collections/tags/compute',
        name: 'compute'
      }
    ],
    facts: {
      interfaces: 'eno16,enp94s0f0,enp94s0f1,lo',
      domain_name: 'example.com',
      hostname: 'node-02',
      facterversion: '2.4.6'
    },
    metadata: {
      last_hook_execution: 'node-booted',
      enable_swap: 'false',
      setup_bonding: 'true',
    },
    state: {
      installed: false,
    },
    hostname: 'node-${i}.example.com',
    root_password: 'f00b4R',
    last_checkin: '2020-02-18T15:23:06Z'
  }
];

export const nodeListResponse: ApiResponse = {
  total: 1,
  items: nodeList,
};
