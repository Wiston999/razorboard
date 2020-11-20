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
    policy: {
      spec: 'http://api.puppetlabs.com/razor/v1/collections/policies/member',
      id: 'http://localhost:8150/api/collections/policies/debian',
      name: 'debian'
    },
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
    policy: {
      spec: 'http://api.puppetlabs.com/razor/v1/collections/policies/member',
      id: 'http://localhost:8150/api/collections/policies/debian',
      name: 'debian'
    },
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

export const policyList = [
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/policies/member',
    id: 'http://localhost:4200/api/collections/policies/jessie',
    name: 'jessie',
    repo: {
      spec: 'http://api.puppetlabs.com/razor/v1/collections/repos/member',
      id: 'http://localhost:4200/api/collections/repos/Debian-Jessie-mini',
      name: 'Debian-Jessie-mini'
    },
    task: {
      spec: 'http://api.puppetlabs.com/razor/v1/collections/tasks/member',
      id: 'http://localhost:4200/api/collections/tasks/debian',
      name: 'debian'
    },
    broker: {
      spec: 'http://api.puppetlabs.com/razor/v1/collections/brokers/member',
      id: 'http://localhost:4200/api/collections/brokers/puppet',
      name: 'puppet'
    },
    enabled: true,
    max_count: 100,
    configuration: {
      hostname_pattern: 'node${i}.example.com',
      root_password: 'foob4R'
    },
    tags: [
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:4200/api/collections/tags/debian',
        name: 'debian'
      },
      {
        spec: 'http://api.puppetlabs.com/razor/v1/collections/tags/member',
        id: 'http://localhost:4200/api/collections/tags/jessie',
        name: 'jessie'
      }
    ],
    nodes: {
      id: 'http://localhost:4200/api/collections/policies/jessie/nodes',
      count: 85,
      name: 'nodes'
    }
  }
];

export const hookList = [
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/hooks/member',
    id: 'http://localhost:4200/api/collections/hooks/data_disks',
    name: 'data_disks',
    hook_type: 'type1',
    log: {
      id: 'http://localhost:4200/api/collections/hooks/data_disks/log',
      name: 'log',
      params: {
        limit: {
          type: 'number'
        },
        start: {
          type: 'number'
        }
      }
    }
  },
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/hooks/member',
    id: 'http://localhost:4200/api/collections/hooks/remove_ip',
    name: 'remove_ip',
    hook_type: 'type1',
    log: {
      id: 'http://localhost:4200/api/collections/hooks/remove_ip/log',
      name: 'log',
      params: {
        limit: {
          type: 'number'
        },
        start: {
          type: 'number'
        }
      }
    }
  }
];

export const brokerList = [
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/brokers/member',
    id: 'http://localhost:8150/api/collections/brokers/puppet',
    name: 'puppet',
    configuration: {
      configtimeout: '240',
      environment: 'production',
      logdir: '/var/log/puppet',
      vardir: '/var/lib/puppet',
      ssldir: '/var/lib/puppet/ssl',
      rundir: '/var/run/puppet',
      factpath: '$vardir/lib/facter',
      templatepath: '$confdir/templates'
    },
    broker_type: 'puppet',
    policies: {
      id: 'http://localhost:4200/api/collections/brokers/puppet/policies',
      count: 4,
      name: 'policies'
    }
  },
  {
    spec: 'http://api.puppetlabs.com/razor/v1/collections/brokers/member',
    id: 'http://localhost:8150/api/collections/brokers/ansible',
    name: 'ansible',
    configuration: {
      ssh_key: '/root/.ssh/id_rsa',
      rundir: '/var/run/puppet',
      factpath: '$vardir/lib/facter',
      templatepath: '$confdir/templates'
    },
    broker_type: 'ansible',
    policies: {
      id: 'http://localhost:4200/api/collections/brokers/ansible/policies',
      count: 1,
      name: 'policies'
    }
  }
];

export const nodeLogs = [
  {
    timestamp: '2016-06-14T10:45:20+00:00',
    severity: 'info',
    event: 'get_task_file',
    template: 'preseed',
    url: 'http://localhost:8150/svc/file/2/preseed'
  },
  {
    timestamp: '2016-06-14T10:41:01+00:00',
    severity: 'warning',
    event: 'get_task_file',
    template: 'preseed',
    url: 'http://localhost:8150/svc/file/2/preseed'
  },
  {
    timestamp: '2016-06-13T10:41:01+00:00',
    severity: 'error',
    event: 'get_task_file',
    template: 'preseed',
    url: 'http://localhost:8150/svc/file/2/preseed'
  },
];

export const nodeListResponse: ApiResponse = {
  total: nodeList.length,
  items: nodeList,
};

export const policyListResponse: ApiResponse = {
  total: policyList.length,
  items: policyList,
};

export const hookListResponse: ApiResponse = {
  total: hookList.length,
  items: hookList,
};

export const brokerListResponse: ApiResponse = {
  total: brokerList.length,
  items: brokerList,
};

export const nodeLogResponse: ApiResponse = {
  total: nodeLogs.length,
  items: nodeLogs,
};
