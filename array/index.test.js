import { describe, it, assert } from 'vitest'
import { filterArray, mapArray, collectFruits, getTitles, getAverageGrade, findInArray, everyArrayElement } from './index'
describe('for-of array', () => {
  it('filter', () => {
    assert.deepEqual(
      filterArray(['', 'a', '', 'b'], str => str.length > 0),
      ['a', 'b']
    );
  })
  it('map', () => {
    assert.deepEqual(
      mapArray(['a', 'b', 'c'], str => str + str),
      ['aa', 'bb', 'cc']
    );
  })
  it('expanding', () => {
    const PERSONS = [
      {
        name: 'Jane',
        fruits: ['strawberry', 'raspberry'],
      },
      {
        name: 'John',
        fruits: ['apple', 'banana', 'orange'],
      },
      {
        name: 'Rex',
        fruits: ['melon'],
      },
    ];
    assert.deepEqual(
      collectFruits(PERSONS),
      ['strawberry', 'raspberry', 'apple', 'banana', 'orange', 'melon']
    );
  })
  it('filter-mapping', () => {
    const MOVIES = [
      { title: 'Inception', rating: 8.8 },
      { title: 'Arrival', rating: 7.9 },
      { title: 'Groundhog Day', rating: 8.1 },
      { title: 'Back to the Future', rating: 8.5 },
      { title: 'Being John Malkovich', rating: 7.8 },
    ];

    assert.deepEqual(
      getTitles(MOVIES, 8),
      ['Inception', 'Groundhog Day', 'Back to the Future']
    );
  })
  it('Computing a summary', () => {
    const STUDENTS = [
      {
        id: 'qk4k4yif4a',
        grade: 4.0,
      },
      {
        id: 'r6vczv0ds3',
        grade: 0.25,
      },
      {
        id: '9s53dn6pbk',
        grade: 1,
      },
    ];
    assert.equal(
      getAverageGrade(STUDENTS),
      1.75
    );
  })
  it('Finding', () => {
    assert.deepEqual(
      findInArray(['', 'a', '', 'b'], str => str.length > 0),
      { index: 1, value: 'a' }
    );
    assert.deepEqual(
      findInArray(['', 'a', '', 'b'], str => str.length > 1),
      undefined
    );
  })
  it('Checking a condition', () => {
    assert.equal(
      everyArrayElement(['a', '', 'b'], str => str.length > 0),
      false
    );
    assert.equal(
      everyArrayElement(['a', 'b'], str => str.length > 0),
      true
    );
  })
})