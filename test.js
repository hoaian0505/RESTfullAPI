
//Bất đồng bộ dùng Async-CallBack
console.log('Starting up');

setTimeout(() => {
    console.log('Two Second');
}, 2000)

setTimeout(() => {
    console.log('Zero Second');
}, 0)

console.log('Finishing up');

//Bất đồng bộ dùng Promises

let done = true;

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built';
    resolve(workDone);
  } else {
    const why = 'Still working on something else';
    reject(why);
  }
})

const checkIfItsDone = () => {
    isItDoneYet
      .then(ok => {
        console.log(ok);
      })
      .catch(err => {
        console.error(err);
      })
  }

checkIfItsDone();
//Bất đồng bộ dùng Async-Await


/*
const Request = async () =>{
    console.log('Two');
    await console.log('One');

}

Request();*/
const doSomethingAsync = () => {
    /*return new Promise(resolve => {
      setTimeout(() => resolve('I did something'), 3000)
    })
    */
   setTimeout(() => {
    console.log('I did something aaaa');
    }, 3000)
  }
  
  const doSomething = async () => {
    console.log(await doSomethingAsync())
  }
  
  console.log('Before')
  doSomething()
  console.log('After')
  