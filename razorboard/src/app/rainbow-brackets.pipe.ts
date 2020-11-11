import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rainbowBrackets'
})
export class RainbowBracketsPipe implements PipeTransform {

  // Stack algo from https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/
  transform(value: string): string {
    const text = [...value];
    const stack = [];
    const bracketPositions = {};
    let level = 0;
    let balanced = true;
    text.forEach((c, i) => {
      if (['[', '(', '{'].includes(c)) {
        stack.push({c, i});
        level++;
      } else if ([']', ')', '}'].includes(c)) {
        if (stack.length === 0) {
          balanced = false;
          return;
        }
        const currentChar = stack.pop();
        if (currentChar.c === '(' && c !== ')') {
          balanced = false;
          return;
        }
        if (currentChar.c === '[' && c !== ']') {
          balanced = false; // Unbalanced brackets
          return;
        }
        if (currentChar.c === '{' && c !== '}') {
          balanced = false;
          return;
        }
        bracketPositions[i] = {c, level};
        bracketPositions[currentChar.i] = {c: currentChar.c, level};
        level--;
      }
    });

    if (!balanced) {
      return value;
    }

    Object.entries(bracketPositions).sort(([a, ], [b, ]) => parseInt(b, 10) - parseInt(a, 10)).forEach(info => {
      const p = parseInt(info[0], 10);
      const data = info[1] as {c: string, level: string};
      value = value.substring(0, p) + `<span class="rb-${data.level}">${data.c}</span>` + value.substring(p + 1);
    });
    return value;
  }

}
