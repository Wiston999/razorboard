import { NodesFilterPipe } from './nodes-filter.pipe';

import { nodeList } from '../../testing/apiresponse.model.mock';

describe('NodesFilterPipe', () => {
  const pipe = new NodesFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not transform when empty filter', () => {
    expect(pipe.transform([1, 2, 3], '')).toEqual([1, 2, 3]);
    expect(pipe.transform([1, 2, 3], null)).toEqual([1, 2, 3]);
    expect(pipe.transform([1, 2, 3], undefined)).toEqual([1, 2, 3]);
  });

  it('should transform when filter met', () => {
    expect(pipe.transform(nodeList, 'node')).toEqual(nodeList);
    expect(pipe.transform(nodeList, nodeList[0].name)).toEqual([nodeList[0]]);
  });


  it('should filter on name', () => {
    const node = nodeList[0];
    node.name = 'test-name';
    expect(pipe.filterNode(node, 'test-name')).toBeTruthy();
    expect(pipe.filterNode(node, 'test-')).toBeTruthy();
    expect(pipe.filterNode(node, '-name')).toBeTruthy();
    expect(pipe.filterNode(node, 'no-name')).toBeFalsy();
  });

  it('should filter on dhcp_mac', () => {
    const node = nodeList[0];
    node.dhcp_mac = 'aa:aa:aa:aa:aa';
    expect(pipe.filterNode(node, 'aa')).toBeTruthy();
    expect(pipe.filterNode(node, 'aa:')).toBeTruthy();
    expect(pipe.filterNode(node, 'aa:aa:aa:aa:aa')).toBeTruthy();
    expect(pipe.filterNode(node, 'bb:aa')).toBeFalsy();
  });

  it('should filter on hostname', () => {
    const node = nodeList[0];
    const hostname = nodeList[0].facts.hostname;

    expect(pipe.filterNode(node, hostname)).toBeTruthy();
    expect(pipe.filterNode(node, hostname.substring(0, hostname.length - 2))).toBeTruthy();
    expect(pipe.filterNode(node, `aaa${hostname}`)).toBeFalsy();
  });

  it('should filter on state', () => {
    const node = nodeList[0];
    const state = node.state.installed as string;

    expect(pipe.filterNode(node, state)).toBeTruthy();
    expect(pipe.filterNode(node, state.substring(0, state.length - 2))).toBeTruthy();
    expect(pipe.filterNode(node, `aaa${state}`)).toBeFalsy();
  });

  it('should filter on policy', () => {
    const node = nodeList[0];
    const policy = node.policy.name as string;

    expect(pipe.filterNode(node, policy)).toBeTruthy();
    expect(pipe.filterNode(node, policy.substring(0, policy.length - 2))).toBeTruthy();
    expect(pipe.filterNode(node, `aaa${policy}`)).toBeFalsy();
  });

  it('should filter on tag', () => {
    const node = nodeList[0];
    const tag = node.tags[0].name;

    expect(pipe.filterNode(node, tag)).toBeTruthy();
    expect(pipe.filterNode(node, tag.substring(0, tag.length - 2))).toBeTruthy();
    expect(pipe.filterNode(node, `aaa${tag}`)).toBeFalsy();
  });
});
