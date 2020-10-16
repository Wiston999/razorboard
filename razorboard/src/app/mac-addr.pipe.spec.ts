import { MacAddrPipe } from './mac-addr.pipe';

describe('MacAddrPipe', () => {
  it('create an instance', () => {
    const pipe = new MacAddrPipe();
    expect(pipe).toBeTruthy();
  });
});
