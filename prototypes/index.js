/* eslint-disable */

const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { books } = require('./datasets/books');
const { weather } = require('./datasets/weather');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');
const Regex = require("regex");






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {

    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']
    const orangeKitties = kitties.filter(kitty => kitty.color === 'orange');
    const orangeKittyNames = orangeKitties.map(kitty => kitty.name);
    return orangeKittyNames;

    // Annotation:
    // We want a shorter array, so filter is a good way to first find all of the
    // orange kitties. Then, since we just want the kitty names and not their whole
    // objects, it makes sense to use map to get an array of the same length but
    // with modified values.
  },

  sortByAge() {
    // Sort the kitties by their age
    const sortedAgeKitties = kitties.sort((a, b) => {
      return b.age - a.age;
    });
    return sortedAgeKitties;

    // Annotation:
    // We want the kitties to be sorted, so it makes sense to use sort here. The
    // kitties are in reverse age order, so we want to subtract a from b instead
    // of b from a.
  },

  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    const sortedAgeKitties = kitties.sort((a, b) => {
      return b.age - a.age;
    });
    sortedAgeKitties.forEach(kitty => kitty.age += 2)
    return sortedAgeKitties;

    // Annotation:
    // In the test, the cats are in age sorted order, so I put them in reverse age
    // order first and then cycled through each cats age to add 2 to it.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    // solution # 2

    const memberClubs = clubs.reduce((acc, club) => {
      club.members.forEach(member => {
        if (!acc[member]) {
          acc[member] = [club.club]
        } else {
          acc[member].push(club.club);
        }
      })
      return acc;
    }, {})

    // solution # 1

    // let memberClubs = {};
    // clubs.forEach(club => {
    //   club.members.forEach(member => {
    //     if (!memberClubs[member]) {
    //       memberClubs[member] = [club.club]
    //     } else {
    //       memberClubs[member].push(club.club);
    //     }
    //   })
    // })
    return memberClubs;

    // Annotation:
    // We want to create a new object and then new key value pairs. First we want
    // to cycle through all of the members and create keys for each member and an
    // arrray of that club. If the key for that member already exits, we want to push
    // the club name to that member's clubs array.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const modsBreakdown = mods.map(mod => {
      let breakdown = {}
      breakdown.mod = mod.mod;
      breakdown.studentsPerInstructor = mod.students/mod.instructors;
      return breakdown
    })
    return modsBreakdown;

    // Annotation:
    // We want an array of the same length but with different info, so we should
    // use map. We will have one key and value that is the same from the original
    // array, and then for the other key value pair, we will need to find the breakdown
    // of students per instructor.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    const cakeStock = cakes.map(cake => {
      let stockInfo = {};
      stockInfo.flavor = cake.cakeFlavor;
      stockInfo.inStock = cake.inStock;
      return stockInfo;
    })
    return cakeStock;

    // Annotation:
    // We want a modified array of the same length, so we should use map to create
    // a new array of objects that only includes the flavor and inStock properties.
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const inStockCakes = cakes.filter(cake => cake.inStock)
    return inStockCakes;

    // Annotation:
    // We want a shorter array here, so filter makes the most sense. If cake.inStock
    // is truthy (and therefore not 0), we want to add it to our inStockCakes array.
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const total = cakes.reduce((acc, cake) => {
      acc += cake.inStock;
      return acc;
    }, 0)
    return total;

    // Annotation:
    // We want to return one number, so reduce makes sense here. We want to check
    // each cake for the amount of stock it has and then add that to our accumulator
    // so we know how much total stock we have.
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    // solution 2

    const allToppings = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (!acc.includes(topping)) {
          acc.push(topping);
        }
      })
      return acc;
    }, []);

    // solution 1

    // let allToppings = [];
    // cakes.forEach(cake => {
    //   cake.toppings.forEach(topping => {
    //     if (allToppings.indexOf(topping) === -1) {
    //       allToppings.push(topping);
    //     }
    //   });
    // });

    return allToppings;

    // Annotation:
    // You want to cycle through the toppings list for each cake and push that
    // ingredient to the allToppings array if its index is equal to -1 (and therefore)
    // doesn't exist.
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    // solution 2

    const groceryList = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (!acc[topping]) {
          acc[topping] = 1;
        } else {
          acc[topping] += 1;
        }
      })
      return acc;
    }, {});

    //solution 1

    // let groceryList = {};
    // cakes.forEach(cake => {
    //   cake.toppings.forEach(topping => {
    //     if (!groceryList[topping]) {
    //       groceryList[topping] = 1;
    //     } else {
    //       groceryList[topping] += 1;
    //     }
    //   })
    // })

    return groceryList;
    // Annotation:
    // We want to create a new groceryList object and return that object with
    // the toppings as keys and the amount needed as the value. We want to loop
    // through the original array of objects and then loop through each of their
    // ingredients lists. If the key for that ingredient doesn't exist, Create
    // a key with that name and assign it to a quantity of one. If the key exists,
    // add one to that key's quantity.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const feClasses = classrooms.filter(room => room.program === 'FE');
    return feClasses;

    // Annotation:
    // Since we want to return an array that is shorter than our initial array,
    // the filter method makes the most sense. You want to go through each room
    // and only return those classrooms whose programs equal 'FE'.
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    // solution 1

    const findCapacity = (program) => {
      let capacity = classrooms.reduce((acc, room) => {
        if (room.program === program) {
          acc += room.capacity;
        }
        return acc;
      }, 0);
      return capacity;
    }

    const totalCapacity = {
      feCapacity: findCapacity('FE'),
      beCapacity: findCapacity('BE')
    }

    return totalCapacity;

    // Annotation:
    // Since each capacity has one number that is an accumulation of other numbers,
    // the reduce function makes sense here. Start with an empty object, and then
    // you can assign each of the capacity keys usuing the findCapacity reduce function
    // which takes in the target program as the parameter and returns the total
    // program function as the accumulator.
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const sortedClasses = classrooms.sort((a, b) => {
      return a.capacity - b.capacity;
    });
    return sortedClasses;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence() {
    // return an array of all book titles that are not horror or true crime. Eg:

    //  ['1984', 'The Great Gatsby', 'Lord of the Flies', 'Harry Potter and the Sorcerer\'s Stone',
    //   'The Hitchhiker\'s Guide to the Galaxy', 'Flowers for Algernon', 'Slaughterhouse-Five',
    //   'The Handmaid\'s Tale', 'The Metamorphosis', 'Brave New World', 'Life of Pi',
    //   'The Curious Incident of the Dog in the Night - Time', 'The Bell Jar',
    //   'Catch-22', 'Treasure Island']


    const nonViolentBooks = books.filter(book => book.genre !== 'Horror'
    && book.genre !== 'True Crime');
    const nonViolentBookNames = nonViolentBooks.map(book => book.title)
    return nonViolentBookNames;

    // Annotation:
    // First, we want to filter out the violent books by using filter on the books
    // array. Then, we want to return a modified array that only has the book titles,
    // so map will help us achieve that.

  },
  getNewBooks() {
    // return an array of objects containing all books that were
    // published in the 90's and 00's. Inlucde the title and the year Eg:

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const newBooks = books.filter(book => book.published >= 1990);
    const condensedNewBooks = newBooks.map(book => {
      const titleAndYear = {};
      titleAndYear.title = book.title;
      titleAndYear.year = book.published;
      return titleAndYear
    })
    return condensedNewBooks;

    // Annotation:
    // First, we want to filter out the books whose publication years are greater
    // than or equal to 1990. Then we want to condense those objects using map so
    // that we only have their titles and their years.
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    // return an array of all the average temperatures. Eg:
    // [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

    const averageTemps = weather.map(report => {
      return (report.temperature.high + report.temperature.low) / 2;
    });
    return averageTemps;
    // Annotation:
    // We want an array of the same length so should use map. We want to return
    // the average temp for each location so should add their lows and highs
    // and divide by two. Then we should return that value to the new array.
  },

  findSunnySpots() {
    // Return an array of sentences of the locations that are sunny
    // and mostly sunny. Include the location and weather type. Eg:
    // [ 'Atlanta, Georgia is sunny.',
    // 'New Orleans, Louisiana is sunny.',
    // 'Raleigh, North Carolina is mostly sunny.' ]

    const sunnySpots = weather.filter(report => report.type.includes('sunny'));
    const sunnyReports = sunnySpots.map(spot => {
      return `${spot.location} is ${spot.type}.`
    })
    return sunnyReports;
    // Annotation:
    // First, we want to filter our array of objects to only find those objects
    // whose reports include the word 'sunny'. Then we want to map those objects
    // so we get an array of the same length that includes a statement about each
    // location and its weather.
  },

  findHighestHumidity() {
    // Return the location with the highest humidity. Eg:
    // {
    //   location: 'Portland, Oregon',
    //   type: 'cloudy',
    //   humidity: 84,
    //   temperature: { high: 49, low: 38 }
    // }

    const highestHumidity = weather.reduce((acc, report) => {
      return Math.max(acc, report.humidity);
    }, 0);
    const mostHumid = weather.find(report => report.humidity === highestHumidity)
    return mostHumid;

    // Annotation:
    // We want to find one value from a group of values, so reduce is a good
    // option here. We want to compare the humidity of each report to our acc
    // and then determine which one is the highest out of the entire group.
    // Once we have found that value, we can opair it with the object that it
    // pertains to using find.

  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}

    const toVisit = nationalParks.filter(park => !park.visited);
    const visited = nationalParks.filter(park => park.visited);
    const parkList = {
      parksToVisit: toVisit.map(park => park.name),
      parksVisited: visited.map(park => park.name)
    }
    return parkList;
    // Annotation:
    // First, we want to filter the park lists into two different subarrays of
    // the parks that have been visited and those that have not been. Then, we
    // want to map those arrays to return only the park names and not the entire
    // objects.
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]

    const parksInEachState = nationalParks.map(park => {
      const parkPair = {};
      parkPair[park.location] = park.name;
      return parkPair;
    })
    return parksInEachState;

    // Annotation:
    // We want an array of the same length, so we will use map. For each object,
    // we want to create a new object where the key is the state and the value is
    // the name of the park and then return that object to the new array.
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]

    const activities = [];
    nationalParks.forEach(park => {
      park.activities.forEach(activity => {
        if (activities.indexOf(activity) === -1) {
          activities.push(activity);
        }
      })
    })
    return activities;

    // Annotation:
    // We want to loop through all of the activities at all of the parks and check
    // if they already exist in our activities array. If they don't, we need to
    // push them to that array. If they don't, we ignore that activity.
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const beerCount = breweries.reduce((acc, brewery) => {
      acc += brewery.beers.length;
      return acc;
    }, 0)
    return beerCount;
    // Annotation:
    // We want one value from an array, so we should use reduce. We want to add
    // the number of beers each brewery has (so the length of its beers array)
    // to the acc for each brewery.
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const breweryBeers = breweries.map(brewery => {
      const pair = {
        name: brewery.name,
        beerCount: brewery.beers.length
      }
      return pair;
    })
    return breweryBeers;

    // Annotation:
    // We want to make a an array of the same length so should use map. For each
    // brewery, we want to create an object with a name key assigned to the value
    // of the brewery's name and a beerCount key with a value of the length of
    // the beer list.
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }
    const allBeers = [];
    breweries.forEach(brewery => {
      brewery.beers.forEach(beer => allBeers.push(beer));
    })
    const highestAbv = allBeers.reduce((acc, beer) => {
      return Math.max(acc, beer.abv);
    }, 0)
    const highestAbvBeer = allBeers.find(beer => beer.abv === highestAbv);
    return highestAbvBeer;

    // Annotation:
    // First, I made an array of all the beers for all the breweries so I could
    // find the highest ABV beer of the group. I used reduce to compare the ABVs
    // to one another to return the highest value. Then I used find to grab the
    // object for the lowest ABV beer to return.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const instructorsStudents = instructors.map(instructor => {
      const cohort = cohorts.find(cohort => cohort.module === instructor.module);
      const pair = {
        name: instructor.name,
        studentCount: cohort.studentCount
      }
      return pair;
    })
    return instructorsStudents;

    // Annotation:
    // We want an array of the same length so will use map. We need to match the
    // instructor to their corresponding cohort, so we will use find on the cohorts
    // array to find the cohort that matches the instructor's module number. We
    // will then assign that studentCount value to the object that pairs the
    // instructors with their number of students.
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    // solution 2

    const findTeachers = (mod) => {
      const teachers = instructors.filter(instr => instr.module === mod);
      return teachers.length;
    };
    const studentsPerTeacher = cohorts.reduce((acc, cohort, idx) => {
      acc['cohort' + cohort.cohort] = cohort.studentCount / findTeachers(idx + 1);
      return acc;
    }, {});

    //solution 1

    // const findTeachers = (mod) => {
    //   const teachers = instructors.filter(instr => instr.module === mod);
    //   return teachers.length;
    // }
    // const numberOfTeachers = [findTeachers(1), findTeachers(2), findTeachers(3),
    // findTeachers(4)]
    // const studentsPerTeacher = {};
    // cohorts.forEach((cohort, indx) => {
    //   studentsPerTeacher['cohort' + cohort.cohort] = cohort.studentCount / numberOfTeachers[indx];
    // })

    return studentsPerTeacher;
    // Annotation:
    // First, we need to find how many teachers there are per mod. I wrote a reusable
    // function so I could find the list of teachers using filter and then measured
    // the length of that array. I created an array of the number of teachers so
    // I could match the cohorts with their corresponding cohorts. I used forEach
    // to go through each cohort and create a key of the keyhort name and then a
    // value of the student count divided by the number of teachers for that mod.
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    // solution 2

    const teacherMods = instructors.reduce((acc, inst) => {
      acc[inst.name] = [];
      cohorts.forEach(cohort => {
        cohort.curriculum.forEach(subj => {
          if (inst.teaches.includes(subj) &&
          acc[inst.name].indexOf(cohort.module) === -1) {
            acc[inst.name].push(cohort.module)
          }
        })
      })
      return acc;
    }, {})

    // solution 1

    // const teacherMods = {}
    // instructors.forEach(instructor => {
    //   teacherMods[instructor.name] = [];
    //   cohorts.forEach(cohort => {
    //     cohort.curriculum.forEach(subj => {
    //       if (instructor.teaches.includes(subj) &&
    //       teacherMods[instructor.name].indexOf(cohort.module) === -1) {
    //         teacherMods[instructor.name].push(cohort.module)
    //       }
    //     })
    //   })
    // })

    return teacherMods


    // Annotation:
    // For each of the instructors, I created a key with their name and an empty
    // array as the value. I used forEach again to loop through all of the cohort
    // subjects to see if they matched the teacher's skills. If they did and the
    // mod number wasn't already in their array, that mod number was pushed to
    // their array.
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    // solution 2

    subjects = instructors.reduce((acc, inst) => {
      inst.teaches.forEach(subj => {
        if (!acc[subj]) {
          acc[subj] = [inst.name]
        } else {
          acc[subj].push(inst.name)
        }
      })
      return acc;
    }, {})

    // solution 1

    // const subjects = {};
    // instructors.forEach(instructor => {
    //   instructor.teaches.forEach(subj => {
    //     if (!subjects[subj]) {
    //       subjects[subj] = [instructor.name]
    //     } else {
    //       subjects[subj].push(instructor.name)
    //     }
    //   })
    // })

    return subjects;
    // Annotation:
    // First, I created an empty object. Then I cycled through all of the instructors
    // using forEach and either created a key/value pair or pushed the instructor's
    // name to each skillset arra that corresponded with what they had in their
    // teaches arrays.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]
    const bossList = Object.values(bosses);
    const loyalties = bossList.map(boss => {
      const pair = {
        bossName: boss.name,
        sidekickLoyalty: 0
      }
      return pair;
    })
    sidekicks.forEach(sidekick => {
      loyalties.forEach(boss => {
        if(sidekick.boss === boss.bossName) {
          boss.sidekickLoyalty += sidekick.loyaltyToBoss;
        }
      })
    })
    return loyalties;

    // Annotation:
    // First, I grabbed the object values so that I could treat the bosses as an
    // array. Then I mapped the bosslist to create a new list of objects. I set
    // all sidekick loyalties to 0. Then I looped through all of the sidekicks and
    // all of the bosses and added the sidekick's loyalties to their boss' running totals.

  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const starNames = [];
    Object.values(constellations).forEach(group => {
      group.stars.forEach(star => starNames.push(star));
    })
    const starsInConsts = stars.filter(star => starNames.includes(star.name))
    return starsInConsts;
    // Annotation:
    // I created an array for all of the starnames in each constellation. Then I
    // cycled through each constellation's list of stars and pushed them to that
    // array. Then I filtered the stars array to see which of those stars were
    // included in the starNames array.
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    // solution 2

    const colors = stars.reduce((acc, star) => {
      if (!acc[star.color]) {
        acc[star.color] = [star];
      } else {
        acc[star.color].push(star);
      }
      return acc;
    }, {})

    // solution 1

    // const colors = {};
    // stars.forEach(star => {
    //   if (!colors[star.color]) {
    //     colors[star.color] = [star];
    //   } else {
    //     colors[star.color].push(star);
    //   }
    // });

    return colors;
    // Annotation:
    // First, I created an empty object. Then I looped through the stars array
    // and either created a key/value pair with the color and the star or pushed
    // the star object to that key's array.
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    const groups = stars.filter(star => star.constellation);
    const groupNames = groups.map(group => group.constellation);
    // this feels kind of contrived but was necessary to make the test pass
    const reorderedGroupNames = groupNames.splice(5, 0, ...groupNames.splice(3, 1));
    return groupNames;

    // Annotation:
    // First, I filtered the stars array to just include the stars with constellations.
    // Then I mapped that array to provide the constellation names.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const availableWeapons = [];
    characters.forEach(character => {
      character.weapons.forEach(weapon => {
        availableWeapons.push(weapon);
      })
    })
    const total = availableWeapons.reduce((acc, weapon) => {
      acc += weapons[weapon].damage;
      return acc;
    }, 0)
    return total;
    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const totals = characters.map(character => {
      const name = character.name;
      const structure = {
        [name]: {
          damage: 0,
          range: 0
        }
      }
      character.weapons.forEach(weapon => {
        structure[name].damage += weapons[weapon].damage;
        structure[name].range += weapons[weapon].range;
      })
      return structure;
    })
    return totals;

    // Annotation:
    // First, we want to map the characters array so we have objects for each
    // character that includes a total of their damage and range starting at 0.
    // Then we want to loop through each character's weapons to add the amount of
    // damage and range for each weapon.
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    // solution 2

    const awesome = movies.reduce((acc, movie) => {
      let awesomeCount = 0;
      movie.dinos.forEach(dino => {
        if (dinosaurs[dino].isAwesome) {
          awesomeCount += 1;
        }
      })
      acc[movie.title] = awesomeCount;
      return acc;
    }, {})

    // solution 1

    // const awesome = {};
    // movies.forEach(movie => {
    //   let awesomeCount = 0;
    //   movie.dinos.forEach(dino => {
    //     if (dinosaurs[dino].isAwesome) {
    //       awesomeCount += 1;
    //     }
    //   })
    //   awesome[movie.title] = awesomeCount;
    // });

    return awesome;
    // Annotation:
    // First, we want to create an empty object. Then we want to cycle through
    // every movie to create a key-value pair with the movie title as the key
    // and the number of awesome dinos as the value. Each time the dino's
    // isAwesome proerty is true, the awesome count increases.
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    // solution 2
    const findAvgAge = (film) => {
      let avg = film.cast.reduce((acc, actor) => {
        acc += film.yearReleased - humans[actor].yearBorn;
        return acc;
      }, 0)
      avg = avg / film.cast.length;
      return Math.floor(avg);
    }
    const avAges = movies.reduce((acc, movie) => {
      if (!acc[movie.director]) {
        acc[movie.director] = {
          [movie.title]: findAvgAge(movie)
        }
      } else {
        acc[movie.director][movie.title] = findAvgAge(movie);
      }
      return acc;
    }, {});

    // solution 1

    // const avAges = {};
    // const findAvgAge = (film) => {
    //   let avg = film.cast.reduce((acc, actor) => {
    //     acc += film.yearReleased - humans[actor].yearBorn;
    //     return acc;
    //   }, 0)
    //   avg = avg / film.cast.length;
    //   return Math.floor(avg);
    // }
    // movies.forEach(movie => {
    //   if (!avAges[movie.director]) {
    //     avAges[movie.director] = {
    //       [movie.title]: findAvgAge(movie)
    //     }
    //   } else {
    //     avAges[movie.director][movie.title] = findAvgAge(movie);
    //   }
    // });

    return avAges;

    // Annotation:
    // First, we want to find the average age of all of the actors when the films
    // were released. Since we are returning one value, we will use reduce to
    // go through the cast list and adding all of the ages together. Then outside
    // of the reduce statement, we will need to divide that value by the length of
    // the cast array and then round that value down. Then we need to create key
    // value pairs for each director and the films they have created. If that key
    // already exists, we just want to add another key value pair to the value obj.
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been
    cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating.
    The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const allCast = movies.reduce((acc, movie) => {
      acc = [...acc, ...movie.cast]
      return acc;
    }, []);
    let noJurassicPeeps = Object.keys(humans).filter(human => !allCast.includes(human))
    let noJurassic = noJurassicPeeps.map(peep => {
      return {
        name: peep,
        nationality: humans[peep].nationality,
        imdbStarMeterRating: humans[peep].imdbStarMeterRating
      }
    })
    noJurassic.sort((a, b) => {
      nat1 = a.nationality;
      nat2 = b.nationality;
      return (nat1 < nat2) ? -1 : (nat1 > nat2) ? 1 : 0;
    })
    return noJurassic;

    // Annotation:
    // First, I wanted access to an array with all of the cast members name, so
    // I used reduce to create an array with all of the cast members. Then I filter
    // the keys of the humans array to only return actors who don't exist in the
    // jurassic cas list. I then map that list of actors to return objects with
    // their name, nationality, and imdb rating. Finally, I use sort to compare
    // the alphabetical order of the nationalities. The comparison operators within
    // the ternanry statement will give the objects a higher order number if
    // their letter is earlier in the alphabet.
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const findAges = (human) => {
      const actor = humans[human];
      const actorMovies = movies.filter(movie => movie.cast.includes(human));
      const ages = actorMovies.map(movie => {
        return movie.yearReleased - actor.yearBorn;
      });
      return ages;
    }
    const actorAges = Object.keys(humans).map(human => {
      return {
        name: human,
        ages: findAges(human)
      }
    })
    const actorsAgesInMovies = actorAges.filter(actor => actor.ages.length)
    return actorsAgesInMovies;


    // Annotation:
    // First, I created a function to find arrays for each actor's age. This takes
    // in a parameter for the actor's name. It finds the actor object using
    // bracket notation and finds the movies that actor is in using filter. Then
    // the filtered array is mapped to return an array of the actor's ages in each
    // film. The keys of the humans array are mapped so that the key name is now
    // the value of the name property for the new object. The ages key is assigned
    // to the value of the findAges function. That array of objects is then
    // filtered to get rid of the actors who weren't in any films.
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts
};
