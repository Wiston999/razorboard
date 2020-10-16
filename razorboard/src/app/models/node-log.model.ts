import { LogEntry } from './log-entry.model';

export class NodeLog extends LogEntry {
  msg: string;
  severity: string;
  action: string;
  error: string;
  installed: string;
  policy: string;
  repo: string;
  script: string;
  event: string;
  stage: string;
  task: string;
  template: string;
  url: string;
  vars: { string: any };
  policy_name: string;
}
