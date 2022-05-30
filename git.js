import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import {request} from 'isomorphic-git/http/node/index.cjs';
import { spawn, exec } from 'child_process';
import { URL } from 'url';
import shell from 'shelljs';
import fsExtra from 'fs-extra';
import NodeGit from 'nodegit';

const http = {request};

async function onAuth (url) {
  const { protocol, host } = new URL(url)
  return new Promise((resolve, reject) => {
    const output = []
    const process = spawn('git', ['credential', 'fill'])
    process.stdin.write(`protocol=${protocol.slice(0, -1)}\nhost=${host}\n\n`)
    process.stdout.on('data', (data) => output.push(data.toString().trim()))
    process.on('close', (code) => {
      if (code) return reject(code)
      const { username, password } = output.join('\n').split('\n').reduce((acc, line) => {
        if (line.startsWith('username') || line.startsWith('password')) {
          const [ key, val ] = line.split('=')
          acc[key] = val
        }
        return acc
      }, {})
      resolve({ username, password })
    })
  })
}


function getGitRepo(url) {
  const dir = path.join(process.cwd(), 'test-clone')
  const repo = new URL(url)
  console.log(repo.pathname.split('/')[2].split('.')[0]);
  git.clone({ fs, http, dir, url,onAuth }).then(console.log)
}

// getGitRepo('http://192.168.10.6/xbongbong/xbb-pro-dingtalk-front.git')

// await git.pull({
//   fs,
//   http,
//   dir: '/test-clone',
//   ref: 'main',
//   singleBranch: true
// })

// const branchArr = await getRemoteBranches('http://192.168.10.6/xbongbong/xbb-pro-dingtalk-front.git')
// console.log(branchArr.filter(branch=> branch.includes('hotfix')), 'done')
// console.log(branchArr, 'done')

async function getRemoteBranches(url) {
  const res = await git.getRemoteInfo({ http, url, onAuth })
  const heads = res.refs.heads
  return getBranches(heads)
}

function getBranches(heads, prefix){
  let result = []
  Object.keys(heads).forEach(head => {
    if(typeof heads[head] === 'object'){
      let branches = getBranches(heads[head], head)
      result.push(...branches)
    }else{
      const branch = prefix ? `${prefix}/${head}` : head
      result.push({branch, commit: heads[head]})
    }
  })
  return result
}
function startScript(){
  // shell.cd(projectName);
  // const installChild = shell.exec('npm install', {async:true});
  // installChild.stdout.on('data', function(data) {
  //   /* ... do something with data ... */
  //   console.log(data, 'data')
  // });
  //  installChild.stderr.on('data', (data) => {
  //   console.error(data, '-------error-------');
  // });
  // installChild.on('exit', (code) => {
  //   console.log(`exit ${code}`);
  //   shell.exec('npm run build', function(code, stdout, stderr) {
  //     console.log('Exit code:', code);
  //     console.log('Program output:', stdout);
  //     console.log('Program stderr:', stderr);
  //   });
  // });
  const projectDir = path.join(process.cwd(), `test-clone`)
  console.log(projectDir, 'projectDir');
  // cd ${projectDir} && npm install
  const ls = spawn(`cd ${projectDir} && npm install`, {
    shell: true
  });
  // ls.stderr.on('data', function(data){
  //     console.log('Error msg from process 2: ' + data.toString());
  // });
  // console.log(ls, 'ls');
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  // ls.on('close', function(code){
  //   console.log('child exists with code: ' + code);
  // });
// exec(`cd ${projectDir} && npm install`, function(error, stdout, stderr){
//     if(error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });
}
// startScript()
function copyFile(source, destination){
  fsExtra.copy(source, destination, function (err) {
    if (err){ 
      console.log('An error occured while copying the folder.') 
      return console.error(err) 
    } 
    console.log('Copy completed!') 
  })
}

// const dir = path.join(process.cwd(), 'test-clone/dist')
// const destination = path.join(process.cwd(), `files/commit`)
// console.log(dir, destination)

// copyFile(dir, destination) feature/team-members
async function gitCheckout(dir, branch){
  console.log(dir, branch)
  NodeGit.Repository.open(dir).then(function (repo) {
      console.log(repo, 'repo')
      repo.getBranch('refs/remotes/origin/' + branch)
      .then(function(reference) {
          //checkout branch
          console.log(reference)
          return repo.checkoutRef(reference);
      }).then((res)=>{
        console.log(res)
        console.log('repo checkout complete')
      })
      // return repo.getCurrentBranch().then(function(ref) {
      //   console.log("On " + ref.shorthand() + " " + ref.target());

      //   console.log("Checking out master");
      //   var checkoutOpts = {
      //     checkoutStrategy: NodeGit.Checkout.STRATEGY.FORCE
      //   };
      //   return repo.checkoutBranch(branch, checkoutOpts);
      // }).then(function () {
      //   return repo.getCurrentBranch().then(function(ref) {
      //     console.log("On " + ref.shorthand() + " " + ref.target());
      //   });
      // });


      // repo.checkoutBranch(branch).then(function() {
      // // method complete
      // console.log('repo checkout complete')

      // });
    // Inside of this function we have an open repo
    })
  // await git.checkout({
  //   fs,
  //   dir,
  //   ref: branch
  // })
  // console.log('git checkout success')

}
const dir = path.join(process.cwd(), 'test-clone')
// gitCheckout(dir, 'master')
gitCheckout(dir, 'feature/private-deploy-v4.43.0')