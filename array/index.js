// filter
export function filterArray(arr, callback){
  const result = []
  for (const elem of arr) {
    if(callback(elem)){
      result.push(elem)
    }
  }
  return result
}
// map
export function mapArray(arr, callback) {
  const result = [];
  for (const elem of arr) {
    result.push(callback(elem));
  }
  return result;
}
// expanding
export function collectFruits(persons) {
  const result = [];
  for (const person of persons) {
    result.push(...person.fruits);
  }
  return result;
}
// filter-mapping
export function getTitles(movies, minRating) {
  const result = [];
  for (const movie of movies) {
    if (movie.rating >= minRating) { // (A)
      result.push(movie.title); // (B)
    }
  }
  return result;
}
// Computing a summary
export function getAverageGrade(students) {
  let sumOfGrades = 0;
  for (const student of students) {
    sumOfGrades += student.grade;
  }
  return sumOfGrades / students.length;
}
// Finding
export function findInArray(arr, callback) {
  for (const [index, value] of arr.entries()) {
    if (callback(value)) {
      return { index, value }; // (A)
    }
  }
  return undefined;
}
// Checking a condition 
export function everyArrayElement(arr, condition) {
  for (const elem of arr) {
    if (!condition(elem)) {
      return false; // (A)
    }
  }
  return true;
}