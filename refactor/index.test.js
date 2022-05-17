import { describe, it, expect, beforeEach, assert } from 'vitest'
import { add, sampleProvinceData, Province, statement, invoice, plays } from './index'
// describe('suite', () => {
//   it('add', () => {
//       expect(add()).toBe(0)
//       expect(add(1)).toBe(1)
//       expect(add(1, 2, 3)).toBe(6)
//       assert.equal(add(1, 2, 3), 6);
//   })
// })
describe('province', function() { // 只要测试失败时足以识别出对应的测试
  let asia
  beforeEach(function() {
   asia = new Province(sampleProvinceData());
  });
  it('shortfall', function() {
    // const asia = new Province(sampleProvinceData()); // 设置好是测试所需要的数据和对象等
    // 验证数据和对象等是否正确
    expect(asia.shortfall).equal(5);
  });
  it('profit', function() {
    // const asia = new Province(sampleProvinceData()); //测试随即产生了一些重复代码,它们都在第一行里初始化了同一个数据和对象
    expect(asia.profit).equal(230);
  });
  // 验证数据修改
  it('change production', function() {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });
  // 边界情况
  it('zero demand', function() {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
  it('negative demand', function() {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
  it('empty string demand', function() {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});
// 上面的测试都聚焦于正常的行为上，被称为“正常路径”（happy path）
// 探测边界条件
describe('no producers', function() {
  let noProducers;
  beforeEach(() => {
    const data = {
      name: "No proudcers",
      producers: [],
      demand: 30,
      price: 20
    };
    noProducers = new Province(data);
  });
  it('shortfall', function() {
    expect(noProducers.shortfall).equal(30);
  });
  it('profit', function() {
    expect(noProducers.profit).equal(0);
  });
})

// 不要因为测试无法捕捉所有的bug就不写测试，因为测试的确可以捕捉到大多数bug
// 与编程的许多方面类似，测试也是一种迭代式的活动。除非你技能非常纯熟，或者非常幸运，否则你很难第一次就把测试写对。

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