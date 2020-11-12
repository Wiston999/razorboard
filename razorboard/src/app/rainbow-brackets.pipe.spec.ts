import { RainbowBracketsPipe } from './rainbow-brackets.pipe';

describe('RainbowBracketsPipe', () => {
  const pipe = new RainbowBracketsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not mark un-bracketed', () => {
    const text = 'this is a test text with no brackets';
    expect(pipe.transform(text)).toEqual(text);
  });

  it('should not mark unbalanced bracketed', () => {
    let text = 'this is a test [ { (text ( [ { with unbalanced brackets';
    expect(pipe.transform(text)).toEqual(text);
    text = 'this is a test [ { (text] ) } with other unbalanced brackets';
    expect(pipe.transform(text)).toEqual(text);
    text = '}this is a test text with other unbalanced brackets';
    expect(pipe.transform(text)).toEqual(text);
  });

  it('should mark brackets properly', () => {
    const text = '[this is a (test) text with {balanced} [brackets]]';
    const expected = '\
<span class="rb-1">[</span>\
this is a \
<span class="rb-2">(</span>test<span class="rb-2">)</span> \
text with \
<span class="rb-2">{</span>balanced<span class="rb-2">}</span> \
<span class="rb-2">[</span>brackets<span class="rb-2">]</span>\
<span class="rb-1">]</span>';
    expect(pipe.transform(text)).toEqual(expected);
  });
});
