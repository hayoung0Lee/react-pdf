import applyBestFit from '../../../src/engines/linebreaker/bestFit';

describe('bestFit', () => {
  test('should return at least one breakpoint', () => {
    const nodes = [{ type: 'box', width: 10, value: 'a', hyphenated: false }];
    const widths = [12];
    const breakpoints = applyBestFit(nodes, widths);
    expect(breakpoints.length).toBeGreaterThan(0);
  });

  test('should calculate breakpoints until the last box', () => {
    const nodes = [
      { type: 'box', width: 10, value: 'a', hyphenated: false },
      { type: 'box', width: 10, value: 'a', hyphenated: false },
      { type: 'penalty', width: 10, penalty: 600, flagged: 1 },
      { type: 'glue', width: 10, stretch: 1.3, shrink: 1 },
      { type: 'box', width: 10, value: 'a', hyphenated: false },
      { type: 'penalty', width: 10, penalty: 600, flagged: 1 },
      { type: 'glue', width: 10, stretch: 1.3, shrink: 1 },
      { type: 'box', width: 10, value: 'a', hyphenated: false },
      { type: 'penalty', width: 10, penalty: 600, flagged: 1 },
      { type: 'glue', width: 10, stretch: 1.3, shrink: 1 },
    ];
    const widths = [20];
    const breakpoints = applyBestFit(nodes, widths);
    const breakpointLength = breakpoints.length;
    const sum = { width: 0, stretch: 0, shrink: 0 };

    let boxCount = 0;
    for (
      let i = breakpoints[breakpointLength - 1].position;
      i < nodes.length;
      i += 1
    ) {
      const node = nodes[i];
      if (node.type === 'box') {
        boxCount += 1;
        sum.width += node.width;
      } else if (node.type === 'glue') {
        sum.width += node.width;
        sum.stretch += node.stretch;
        sum.shrink += node.shrink;
      }
    }

    const totalWidth = sum.width - sum.shrink;
    expect(boxCount <= 1 || totalWidth < widths[0]).toBeTruthy();
  });
});
