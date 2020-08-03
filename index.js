import fs from 'fs';

const states = getStates();
const cities = getCities();
let globalStateArray = [];
countCitiesPerState('AC');
getCitiesWithBiggestNamesPerState();
getCitiesWithSmallestNamesPerState();
countFiveBiggestCities();
countFiveSmallestCities();
combineCitiesInStates();
getBiggestCityName();
getSmallestCityName();



function getStates() {
  try {
    return JSON.parse(fs.readFileSync('Estados.json'));
  } catch (err) {
    console.log(err);
  }
}
function getCities() {
  try {
    return JSON.parse(fs.readFileSync('Cidades.json'));
  } catch (err) {
    console.log(err);
  }
}
function combineCitiesInStates() {
  states.forEach((state) => {
    let stateObj = {
      path: `states/${state.Sigla}.json`,
      cities: [],
    };
    cities.forEach((city) => {
      if (state.ID === city.Estado) {
        stateObj.cities.push(city);
      }
    });
    globalStateArray.push(stateObj);
  });

  globalStateArray.forEach((state) => {
    fs.writeFileSync(state.path, JSON.stringify(state.cities));
  });
}
function countCitiesPerState(uf) {
  let stateId = states.filter((state) => state.Sigla === uf)[0].ID;
  let cityCount = cities.filter((city) => city.Estado === stateId).length;
  /*console.log(
    `No estado:${uf} existem ${
      cityCount
    } cidades`
  );*/
  return cityCount;
}
function countFiveBiggestCities() {
  let citiesCountArr = [];
  states.map((state) => {
    citiesCountArr.push({
      uf: state.Sigla,
      cities: countCitiesPerState(state.Sigla),
    });
  });
  console.log(citiesCountArr.sort((a, b) => b.cities - a.cities).slice(0, 5));
}
function countFiveSmallestCities() {
  let citiesCountArr = [];
  states.map((state) => {
    citiesCountArr.push({
      uf: state.Sigla,
      cities: countCitiesPerState(state.Sigla),
    });
  });
  console.log(citiesCountArr.sort((a, b) => a.cities - b.cities).slice(0, 5));
}
function getCitiesWithBiggestNamesPerState() {
  let bigNameArr = [];
  states.forEach((state) => {
    bigNameArr.push({
      name: state.Sigla,
      cities: cities
        .sort((a, b) => {
          return a[1] - b[1];
        })
        .filter((city) => city.Estado === state.ID)
        .map((city) => {
          return city.Nome;
        })
        .reduce((a, b) => {
          if (a.length === b.length) {
          }
          return a.length > b.length ? a : b;
        }),
    });
  });
  console.log(bigNameArr);
}
function getCitiesWithSmallestNamesPerState() {
  let bigNameArr = [];
  states.forEach((state) => {
    bigNameArr.push({
      name: state.Sigla,
      cities: cities
        .sort((a, b) => {
          return a[1] - b[1];
        })
        .filter((city) => city.Estado === state.ID)
        .map((city) => {
          return city.Nome;
        })
        .reduce((a, b) => {
          return a.length < b.length ? a : b;
        }),
    });
  });
  console.log(bigNameArr);
}
function getBiggestCityName() {
  let cityName = cities
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .map((city) => {
      return city.Nome;
    })
    .reduce((a, b) => {
      if (a.length === b.length) {
      }
      return a.length > b.length ? a : b;
    });
  let state = cities.filter((city) => {
    return city.Nome === cityName;
  });
  let stateShortName = states.filter((stateIndex) => {
    return state[0].Estado === stateIndex.ID;
  });
  console.log(`${cityName}-${stateShortName[0].Sigla}`);
}
function getSmallestCityName() {
  let cityName = cities
    .sort((a, b) => {
      return a.Nome - b.Nome;
    })
    .map((city) => {
      return city.Nome;
    })
    .reduce((a, b) => {
      if (a.length === b.length) {
      }
      return a.length < b.length ? a : b;
    });
  let state = cities.filter((city) => {
    return city.Nome === cityName;
  });
  let stateShortName = states.filter((stateIndex) => {
    return state[0].Estado === stateIndex.ID;
  });
  console.log(`${cityName}-${stateShortName[0].Sigla}`);
}
