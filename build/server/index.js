import express from 'express';
const app = express();
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
  const p = {};
  const s = p ?? 'dd';
  console.log(s);
  const ss = [...[]];
  console.log(ss);
  const person = {
    name: {
      first: ''
    }
  };
  console.log(person?.name);
  const testArray = [1, 2, 3, 4];

  // Test flatMap
  const result = testArray.flatMap(x => [x * 2]);
  console.log('flatMap result:', result); // Should log: [2, 4, 6, 8]
});
const p = {};
const s = p ?? 'ddd';
console.log(s);
const ss = [...[]];
console.log(ss);
const person = {
  name: {
    first: ''
  }
};
console.log(person?.name);
const testArray = [1, 2, 3, 4];

// Test flatMap
const result = testArray.flatMap(x => [x * 2]);
console.log('flatMap result:', result); // Should log: [2, 4, 6, 8]

async function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve('Data loaded'), 1000));
}
async function main() {
  const data = await fetchData();
  console.log(data); // Expected: "Data loaded"
}
const a = ['p'];
main();
