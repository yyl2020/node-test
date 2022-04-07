import { execa } from "execa"
import * as fs from "fs";
async function run() {
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
  const subprocess2 = execa('node', ['index.js'])
  try {
    subprocess2.stdout.pipe(fs.createWriteStream("stdout.txt"));
    console.log("stdout piped to stdout.txt")
  } catch (error) {
    if (error.isCanceled) {
      console.error('command canceled')
    } else {
      console.error(error)
    }
  }
}

run()