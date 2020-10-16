import { ExternalRef } from './external-ref.model';

export class HWInfo {
  mac: string[];
  serial: string;
  uuid: string;
}

export class Node {
  id: string;
  spec: string;
  name: string;
  total: number;
  dhcp_mac: string;
  root_password: string;
  last_checkin: string;
  policy: ExternalRef;
  tags: ExternalRef[];
  hw_info: HWInfo;
  state: { string: string };
  metadata: { string: string };
  facts: { string: any };
}
