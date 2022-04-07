"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _execa = require("execa");

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function run() {
  var subprocess2;
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const { stdout, stderr } = await execa("echo", ["execa is pretty neat!"])
          // try {
          //   const { stdout, stderr } = await execa('ls', ['index.js'])
          //   console.log({stdout, stderr})
          // } catch (error) {
          //   console.error(`ERROR: The command failed. stderr: ${error.stderr} (${error.exitCode})`)
          // }
          // cancel the child process
          // const subprocess = execa('node', ['index.js'])
          // setTimeout(() => {
          //   subprocess.cancel() // or subprocess.kill() force a child process to end
          // },100)
          // try {
          //   const { stdout, stderr } = await subprocess
          //   console.log({stdout, stderr})
          // } catch (error) {
          //   if (error.isCanceled) {
          //     console.error('command canceled')
          //   } else {
          //     console.error(error)
          //   }
          // }
          // Piping output
          subprocess2 = (0, _execa.execa)('node', ['index.js']);

          try {
            subprocess2.stdout.pipe(fs.createWriteStream("stdout.txt"));
            console.log("stdout piped to stdout.txt");
          } catch (error) {
            if (error.isCanceled) {
              console.error('command canceled');
            } else {
              console.error(error);
            }
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

run();