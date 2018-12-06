import dateFormat from '../../src/rules/dateFormat'

describe('Rule: dateFormat', () => {
  test('Valid dates', () => {
    expect(dateFormat.validate('02/03/1998')).toBe(true);
    expect(dateFormat.validate('28/02/2018')).toBe(true);
    expect(dateFormat.validate(1542647179967)).toBe(true);
  })

  test('Invalid dates', () => {
    expect(dateFormat.validate('29/02/2018')).toBe(false);
    expect(dateFormat.validate('40/12/3018')).toBe(false);
    expect(dateFormat.validate('00/00/0000')).toBe(false);
  })
})
