import { describe, it, expect, assert } from 'vitest'
import { add, statement, invoice, plays} from './prev'
describe('suite', () => {
  it('add', () => {
      expect(add()).toBe(0)
      expect(add(1)).toBe(1)
      expect(add(1, 2, 3)).toBe(6)
      assert.equal(add(1, 2, 3), 6);
  })
})

describe('statement',function(){
  it('result', function() {
    expect(statement(invoice, plays)).equal(`Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`);
  });
})