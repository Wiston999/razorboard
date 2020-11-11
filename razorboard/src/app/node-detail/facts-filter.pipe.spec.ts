import { FactsFilterPipe } from './facts-filter.pipe';

describe('FactsFilterPipe', () => {
  const pipe = new FactsFilterPipe();
  const items = [
    {
      key: 'test-key-lowercase',
      value: 'test-value-lowercase',
    },
    {
      key: 'TEST-KEY-UPPERCASE',
      value: 'TEST-VALUE-UPPERCASE',
    },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter by key', () => {
    expect(pipe.transform(items, 'test-key-lowercase').length).toBe(1);
    expect(pipe.transform(items, 'TEST-KEY-LOWERCASE').length).toBe(1);
    expect(pipe.transform(items, 'test-key-uppercase').length).toBe(1);
    expect(pipe.transform(items, 'TEST-KEY-UPPERCASE').length).toBe(1);
  });

  it('should filter by value', () => {
    expect(pipe.transform(items, 'test-value-lowercase').length).toBe(1);
    expect(pipe.transform(items, 'TEST-VALUE-LOWERCASE').length).toBe(1);
    expect(pipe.transform(items, 'test-value-uppercase').length).toBe(1);
    expect(pipe.transform(items, 'TEST-VALUE-UPPERCASE').length).toBe(1);
  });
});
