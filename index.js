const events = require('events');
const fs = require('fs');
const readline = require('readline');
// const allFileContents = fs.readFileSync('broad.sql', 'utf-8');
// allFileContents.split(/\r?\n/).forEach(line =>  {
//   console.log(`Line from file: ${line}`);
// });
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('broad.sql'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      console.log(`Line from file: ${line}`);
    });

    await events.once(rl, 'close');

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})();