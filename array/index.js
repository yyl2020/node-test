
// filter
export function filterArray(arr, callback){
  // for-of
  // const result = []
  // for (const elem of arr) {
  //   if(callback(elem)){
  //     result.push(elem)
  //   }
  // }
  // return result
  // reduce
  return arr.reduce((result, elem) => {
    if(callback(elem)){
      result.push(elem)
    }
    return result
  },[])

  // flatmap
}
// map
export function mapArray(arr, callback) {
  // for-of
  // const result = []
  // for (const elem of arr) {
  //   result.push(callback(elem))
  // }
  // return result
  // reduce
  return arr.reduce((result, elem) => {
    result.push(callback(elem))
    return result
  },[])
}
// expanding
export function collectFruits(persons) {
  // for-of
  // const result = []
  // for (const person of persons) {
  //   result.push(...person.fruits)
  // }
  // return result
  // reduce
  return persons.reduce((result, person) => {
    result.push(...person.fruits)
    return result
  },[])
}
// filter-mapping
export function getTitles(movies, minRating) {
  // for-of
  const result = []
  for (const movie of movies) {
    if(movie.rating >= minRating){
      result.push(movie.title)
    }
  }
  return result
}
// Computing a summary
export function getAverageGrade(students) {
  // for-of
  let result = 0
  for (const student of students) {
    result += student.grade
  }
  return result / students.length
}
// Finding
export function findInArray(arr, callback) {
  // for-of
  for (const [index, value] of arr.entries()) {
    if (callback(value)){
      return { index, value }
    }
  }
  return undefined
}
// Checking a condition 
export function everyArrayElement(arr, condition) {
  // for-of
  for (const elem of arr) {
    if(!condition(elem)){
      return false
    }
  }
  return true
}