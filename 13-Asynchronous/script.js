/// ASYNCHRONOUS ///
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, countryOrNeighbour = 'country') {
  const html = `
    <article class=${countryOrNeighbour}>
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// Used in Promise Parallel and Throwing and Handling ERROR
const getJSON = async function (url, errorMsg = 'getJSON()') {
  try {
    const response = await fetch(url);
    //   console.log(response);
    if (!response.ok) {
      // Terminate and Propagate the catch()
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

// CC 2 and 3
const imgContainer = document.querySelector('.images');
const img = document.createElement('img');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    // reject(new Error('Image not found!'));

    // ???: why use below instead of above
    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

///////////////////////////////////////////////////////
/// AJAX call: XMLHttpRequest ///
/*
const getCountryData = function (countryName) {
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`);
  req.send();
  // console.log(req.responseText);

  // Loading
  req.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('Indonesia');
getCountryData('Russia');
getCountryData('Japan');

// been loading many times, mine still seems blocking 😑
*/

///////////////////////////////////////////////////////
/// Callback Hell /// Nested-callback
/*
const getCountryAndNeighbour = function (country) {
  // COUNTRY AJAX call
  const cou = new XMLHttpRequest();
  cou.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  cou.send();

  // Loading country
  cou.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const render = renderCountry(data);
    
    const [neighbour] = data.borders;
    
    // NEIGHBOUR AJAX call
    if (!neighbour) return; // HELPER ☺

    const nei = new XMLHttpRequest();
    nei.open(
      'GET',
      `https://restcountries.eu/rest/v2/alpha/${data.borders[0]}`
    );
    nei.send();

    // Loading neighbour
    nei.addEventListener('load', function () {
      //   console.log(nei.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      const render2 = renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('Indonesia');
// getCountryAndNeighbour('Japan');

// Another example of callback hell
setTimeout(() => {
  console.log('1 second');
  setTimeout(() => {
    console.log('2 second');
    setTimeout(() => {
      console.log('3 second');
      setTimeout(() => {
        console.log('4 second');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Had better using Promises instead using callback hell
*/

///////////////////////////////////////////////////////
/// PROMISES and The Fetch API ///
// FETCH(), returning promise
// THEN(), accepting AND returning promise
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
    //   console.log(response);
      return response.json();
    })
    .then(function (data) {
    //   console.log(data);
      renderCountry(data[0]);
    });
};

// Yap! Promises still use callback functions
// BUT it's BETTER than nested-callback/callback hell

/// CONSUMING PROMISES by FLAT CHAIN

const getCountryData = function (country) {
    // COUNTRY
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
    //   console.log(response);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
    
      // NEIGHBOUR
      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// Promises is not only READABLE but also MAINTAINABLE
*/
///////////////////////////////////////////////////////
/// Throwing and Handling ERROR ///
/*
const getCountryData = function (country) {
  // COUNTRY
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found 🤔'
  )
  // Execute if promise is resolved
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // NEIGHBOUR
      if (!neighbour)
        // Terminate and Propagate the catch()
        throw new Error('No neighbour found 😢');

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country (neighbour) not found 🤔'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))

    // Catch/Handling the error in promises chain
    // Execute if promise is rejected
    .catch(err => {
      console.error(err.message);
      renderError(`Something went wrong! ${err.message}`);
    })

    // Execute if promise either fulfilled OR rejected
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  //   getCountryData('Russia');
  //   getCountryData('Apex');
  //   getCountryData('Japan'); // NO neighbour
});

// Fetch function ONLY reject offline
// getCountryData('Apex');
*/
///////////////////////////////////////////////////////
/// CODING CHALLANGE 1 ///
/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`Geocode API (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      if (!data.country) throw new Error(`Reverse Geocode`);

      //   return getCountryData(data.country);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`Country API (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`Something's wrong with ${err.message}! 😱`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// Three calls at same time => 403
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/
///////////////////////////////////////////////////////
/// The Event Loop ///
/*
// Microtask has a priority over Callback
// Promises has a priority over Async function that accepts a callback

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolve promise 1').then(res => console.log(res));
// console.log('Test end');

Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/
///////////////////////////////////////////////////////
/// Building A Simple Promise ///
// Promisifying: callback based API to promise based API
// by Encapsulating Async behaviour into a promise
/*
// Immediately executed
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.error(x.message));

// Promisifying example
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is hapenning.. ');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎊');
    } else {
      reject(new Error('You LOST 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err.message));

// Promisifying setTimeout API
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
  });

// setTimeout(() => {
//   console.log('1 second');
//   setTimeout(() => {
//     console.log('2 second');
//     setTimeout(() => {
//       console.log('3 second');
//       setTimeout(() => {
//         console.log('4 second');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promisifying Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(pos => console.log(pos)).catch(err => console.error(err.message));

// Advanced whereAmI()
const whereAmI = function () {
  getPosition()
    .then(pos => {
      // console.log(pos.coords);

      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      // console.log(response);

      if (!response.ok) throw new Error(`Geocode API (${response.status})`);
      return response.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      if (!data.country) throw new Error(`Reverse Geocode`);
      //   return getCountryData(data.country);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      // console.log(response);

      if (!response.ok) throw new Error(`Country API (${response.status})`);
      return response.json();
    })
    .then(data => {
      // console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`Something's wrong with ${err.message}! 😱`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI());
*/
///////////////////////////////////////////////////////
/// CODING CHALLANGE 2 ///
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Set network to 3G
let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    currentImg.style.display = 'block';
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    currentImg.style.display = 'block';
    console.log('Image 3 loaded');
    return wait(2);
  })
  .catch(err => console.error(err.message));

///////////////////////////////////////////////////////
/// Consuming Promises with ASYNC/AWAIT ///
// Make asynchronous function with async keyword
// Return value of async () will be converted into resolved promise
// 
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Ultimate advanced whereAmI()
const whereAmI = async function () {
  try {
    // Get position
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // 1.
    if (!resGeo.ok) throw new Error('Geocode API (${response.status})');
    const dataGeo = await resGeo.json();

    // Get country
    const res = await fetch(
      // `https://restcountries.eu/rest/v2/name/${dataGeo.countryZZZ}`
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    // 1.
    if (!res.ok) throw new Error('Country API (${response.status})');
    const data = await res.json();
    renderCountry(data[0]);

    // 2. Return a value (Auto be resolved)
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`Something's wrong! 💥 ${err}`);
    renderError(`💥 ${err.message}`);

    // 3. Reject the return value
    throw err;
  }
};

// whereAmI();
// console.log('FIRST');

// 1. Tryna to reject 403, because fetch only reject offline
// whereAmI();
// whereAmI();
// whereAmI();

// 2. Return value from async function is a promise
// const city = whereAmI();
// console.log(city);

// 3. Return value is settled as soon as promise is settled (either fulfilled/resolved or rejected)
// console.log('1.');
// whereAmI()
//   .then(res => console.log(`2. ${res}`))
//   .catch(err => console.log(`2. Return value rejected!`))
//   .finally(() => console.log('3.'));

// 4. Stick to the Async/Await instead mixed with Flat Chain
console.log('1.');
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2. ${city}`);
  } catch (err) {
    console.log('2. Return value rejected');
  }
  console.log('3.');
})();
*/
///////////////////////////////////////////////////////
/// Running Promises in Parallel /// with Combinators
/*
/// PROMISE.ALL([...promises])
// return an array of promises
// if one is rejected then will short circuit

const get3Countries = async function (c1, c2, c3) {
  try {
    // 1.
    // const [data1] = await getJSON([
    //   `https://restcountries.eu/rest/v2/namep/${c1}`,
    // ]);
    // const [data2] = await getJSON([
    //   `https://restcountries.eu/rest/v2/name/${c2}`,
    // ]);
    // const [data3] = await getJSON([
    //   `https://restcountries.eu/rest/v2/name/${c3}`,
    // ]);
    // console.log([data1.capital, data2.capital, data3.capital]);

    //2.
    const res = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(res.map(data => data[0].capital));
  } catch (err) {
    console.error(`Something's wrong! ${err.message}`);
  }
};

// Set slow 3G and see the difference 1's and 2's waterfall
get3Countries('portugal', 'canada', 'tanzania');

/// PROMISE.RACE([...promises])
// return the first settled promise

// See the time in network tab
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/indonesia`),
    getJSON(`https://restcountries.eu/rest/v2/name/japan`),
    getJSON(`https://restcountries.eu/rest/v2/name/russia`),
  ]);
  console.log(res[0]);
})();

// Request timeout scheme
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/austria`),
  timeout(0.8),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

/// PROMISE.ALLSETTLED([...promises])
// return an array of promises
// never short circuit if one of promises is rejected

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success too'),
]).then(res => console.log(...res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success too'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/// PROMISE.ANY([...promises])
// return the first fulfilled promise

Promise.any([
  Promise.reject('Error'),
  Promise.reject('Error too'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

Promise.race([
  Promise.reject('Error'),
  Promise.reject('Error too'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.all() and Promise.race() are more make sense
*/
///////////////////////////////////////////////////////
/// CODING CHALLANGE 3 ///
// Re-create CC2 with Async/Await

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage(`img/img-1.jpg`);
    console.log('Image 1 loaded');
    await wait(2);

    img.style.display = 'none';

    img = await createImage(`img/img-2.jpg`);
    img.style.display = 'block';
    console.log('Image 2 loaded');
    await wait(2);

    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(
      img => createImage(img)

      // async img => await createImage(img)
      //   {
      //   const imgEl = await createImage(img);
      //   imgEl.classList.add('parallel');
      //   return imgEl;
      // }
    );
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel')); //BUG: only 1 image added instead three of them
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
