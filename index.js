let main = document.querySelector('#main');

// Find unsorted pairs in an array
function promiseIsSorted(arr) {
  let promise = new Promise((resolve, reject) => {
    let unsortedPairs = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        unsortedPairs.push([arr[i], arr[i + 1]]);
      }
    }
    if (unsortedPairs.length === 0) {
      // Its sorted
      resolve(arr);
    } else {
      // Not sorted
      reject(unsortedPairs);
    }
  });

  promise
    .then(arr => {
      // Print the entire array, 5 items per line
      main.innerHTML = 'Array is sorted!\n';
      let paragraph = document.createElement('p');
      paragraph.innerHTML = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (i % 5 === 0) {
          main.appendChild(paragraph);
          paragraph = document.createElement('p');
          paragraph.innerHTML = arr[i];
          i++;
        }
        paragraph.innerHTML += `, ${arr[i]}`;
      }

      main.appendChild(paragraph);
    })
    .catch(unsortedPairs => {
      // Print the array, 3 PAIRS per line
      main.innerHTML = 'Array is not sorted, here are the unsorted pairs!\n';
      let paragraph = document.createElement('p');
      paragraph.innerHTML = `[${unsortedPairs[0][0]}, ${unsortedPairs[0][1]}]`;
      for (let i = 1; i < unsortedPairs.length; i++) {
        if (i % 3 === 0) {
          main.appendChild(paragraph);
          paragraph = document.createElement('p');
          paragraph.innerHTML = `[${unsortedPairs[i][0]}, ${
            unsortedPairs[i][1]
          }]`;
          i++;
        }
        paragraph.innerHTML += `, [${unsortedPairs[i][0]}, ${
          unsortedPairs[i][1]
        }]`;
      }

      main.appendChild(paragraph);
    });
}

// promiseIsSorted([2, 1, 3, 7, 6, 4, 3, 2, 1]);
// promiseIsSorted([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

function processOne() {
  let input = JSON.parse(
    `[${document.querySelector('#exerciseOneInput').value}]`
  );

  promiseIsSorted(input);
}

function containsNumber(string, callback1, callback2) {
  let containsNum = false;
  let firstIndex = 0;

  let num = string.match(/\d+/g);

  if (num) {
    containsNum = true;
    firstIndex = string.indexOf(num);
  }

  // Check for a number within ‘string’
  // for (let i = 0; i < string.length; i++) {
  //   // if (Number(string[i]) !== NaN) {
  //   if (!isNaN(string[i])) {
  //     // Not NOT a number
  //     containsNum = true;
  //     firstIndex = i;
  //     break;
  //   }
  // }

  if (containsNum) {
    callback1(string, firstIndex);
  } else {
    callback2(string);
  }
}
function containedNumber(str, index) {
  console.log(`${str} contained a number at index ${index}!`);
}
function noNumber(str) {
  console.log(`${str} does not contain a number.`);
}

function containsNumberPromise(string) {
  let promise = new Promise((resolve, reject) => {
    let containsNum = false;
    let firstIndex = 0;

    let num = string.match(/\d+/g);

    if (num) {
      containsNum = true;
      firstIndex = string.indexOf(num);
    }
    // Built an answer/response object to pass more than one piece of information as a single parameter
    let answer = {
      str: string,
      index: firstIndex
    };

    if (containsNum) {
      resolve(answer);
    } else {
      reject(string);
    }
  });

  promise
    .then(result => {
      console.log(`${result.str} contained a number at index ${result.index}!`);
    })
    .catch(str => {
      console.log(`${str} does not contain a number.`);
    });
}

function processTwoCallback() {
  let input = document.querySelector('#exerciseTwoInput').value;
  containsNumber(input, containedNumber, noNumber);
}
function processTwoPromise() {
  let input = document.querySelector('#exerciseTwoInput').value;
  containsNumberPromise(input);
}

//
//
//
//
//function usersLongestPost(id) {
//    let userid = id;
//    let postPromise = new Promise((resolve, reject) => {
//        const xhr = new XMLHttpRequest();
//        xhr.onload = () => {
//            if (xhr.status == 200) {
//                resolve(xhr.responseText);
//            } else {
//                reject(xhr.status);
//            }
//        }
//        console.log('after xhr onload')
//        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
//        xhr.send();
//    })
//    
//    postPromise.then((response) => {
//        let obj = JSON.parse(response);
//        let posts = [];
//        let biggest = 0;
//        for (let i = 0; i < obj.length; i++) {
//            if (obj[i].userId == userid) {
//                posts.push(obj[i].body);
//            }   
//        }
//        for (let i = 0; i < posts.length; i++) {
//            console.log(posts)
//            console.log('post' + i + 'has a length of' + posts[i].length)
//            if (posts[i].length > posts[biggest].length) {
//                biggest = i;
//            }
//        }
//        
//        let id = biggest+1;
//        
//        console.log(`Post id ${id} is the longest post from user id ${userid}`);
//    })
//    .catch((status) => console.log('u suck and here is why' + status ))
//}
//
//usersLongestPost(2);



function getGit(userid) {
    let url = 'https://api.github.com/users/' + userid;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {console.log(`created at ${json.created_at} and has ${json.followers} followers. So popular.`);
                    return json.followers_url})
    .then((url) => fetch(url))
    .then((response) => response.json())
    .then((json) => console.log(json.map(e => {
        return e.login;
    }
    )))

}

getGit('finnickychief')