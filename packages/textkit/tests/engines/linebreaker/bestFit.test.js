import applyBestFit from '../../../src/engines/linebreaker/bestFit';

// data 만들어줘야함
// avalable width 값이랑, nodes 값 파악하기
describe('bestFit', () => {
  test('should return something', () => {
    const breakpoints = applyBestFit([], []);
    expect(breakpoints).toEqual(1);
  });
});
