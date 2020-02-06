/* eslint-disable */

const context = {
  exerciseA() {
    const fly = () => {
      console.log(this);
    };

    class SpaceProbe {
      constructor(title, classification) {
        this.title = title;
        this.classification = classification;
        this.fly = fly;
      }
    }

    const ship = new SpaceProbe('voyager', 'classy');


    // What is the value of `this` when we call ship.fly()?
    return 'global window object';

    // Annotation:
    // This is the global window object because it is called within an arrow
    // function. With arrow functions, 'this' is set when the function is created,
    // not when the function is called. The default value of this is the window obj.
  },

  exerciseB() {
    function fn() {
      const value = 2;
      return this.value;
    }

    // What is the value of `this` when we call fn()?
    return 'global window object';

    // Annotation:
    // 'this' is the window object since there is no instantiated object for this
    // to be called, so fn() is called globally, therefore the default value of
    // 'this' (window obj) stands.
  },

  exerciseC() {
    const car = {
      make: 'Tesla',
      getInfo: function(){
        console.log(this);
      }
    };

    const el = document.getElementById('btn');
    el.addEventListener('click', car.getInfo);

    // What is the value of `this` when a user clicks on our element and car.getInfo() is triggered?
    return 'el';

    // Annotation:
    // When 'this' is within a function that is called on an event listener, the
    // value of 'this' is whatever is left of the dot.
  },

  exerciseD() {
    const dog = {
      breed: 'Chihuahua',
      getBreed: function(){

        const innerFunction = function() {
          console.log(this.breed);
        };

        return innerFunction;
      }
    };

    var breed = dog.getBreed();

    // What is the value of `this` when we call breed()?
    return 'global window object';

    // Annotation:
    // 'this' is the global window object in this situation because it is set within
    // a function, not within a method. Since it isn't invoked via the new keyword
    // or as a method, the default stands.
  },

  exerciseE() {

    const fn = () => {
      value = 21;
      return this.value;
    };


    // What is the value of `this` when we call fn()?
    return 'global window object'

    // Annotation:
    // This is the global window object because it is called within an arrow
    // function, so 'this' is set when the function is created, not when the function
    // is called, so the default value of this is the window.
  },

  exerciseF() {
    class Hero {
      constructor(name, power, canFly = false) {
        this.name = name;
        this.power = power;
        this.canFly = canFly;
      }

      identifyHero() {
        return this;
      }
    }

    const storm = new Hero('Ororo', 'weather control', true);
    // What is the value of `this` when we call storm.identifyHero()?
    return 'instance of Hero'

    // Annotation:
    // 'this' will be the Hero instance that we created with the keyword new on
    // 115 and assigned to storm. new means that this is now the object instance
    // when the methods associated with that instance are invoked.
  },

  exerciseG() {
    class Game {
      constructor(title) {
        this.title = title;
      }

      resetGame() {
        console.log('Clearing the board and starting over');
      }

      restart() {
        setTimeout(function() {
          console.log(`Restarting ${this.title}...`);
        }, 1000);
      }
    }

    const monopoly = new Game('Monopoly');


    // What is the value of `this` when we call monopoly.restart()?
    return 'global window object'

    // Annotation:
    // When a function is not specified as a method on an object, the default
    // value of this (global window object) stands. Since the setTimeout function
    // is nested within a method but isn't itself a method, this is the window obj.
  },

  exerciseH() {
    const obj = {
      arrowFunction: null,
      method: function() {
        this.arrowFunction = () => {
          return this;
        };
      }
    };

    obj.method();

    // What is the value of `this` when we call obj.arrowFunction()?
    return 'obj';

    // Annotation:
    // The arrow function is created only when the method function is called, so
    // the typical issue where arrow functions refer to the global object doesn't
    // apply here. When method is invoked, it is a method on the obj object, so
    // this is set as the object when that arrow function is created.
  },

  exerciseI() {
    const poets = [{
      name: 'Sappho'
    }, {
      name: 'Maya'
    }, {
      name: 'Emily'
    }, {
      name: 'Audre'
    }];

    poets.map(function(poet) {
      return this;
    }, poets);

    // What is the value of `this` that gets returned on each iteration of poets.map()?
    return 'poets';

    // Annotation:
    // The value after the curly braces when invoking map is the this argument. It
    // tells the engine what this should be when a method is invoked on an array.
    // The poets array is able to be the target of this since it is an object.
  },

  exerciseJ() {
    const el = $('#btn');
    el.on('click', function() {
      console.log($(this));
    });

    // What is the value of `this` when a user clicks on our #btn element and the callback is triggered?
    return 'el';

    // Annotation:
    // Since this is being set within a function that is invoked on an event listener,
    // the element to the left of the period is the reference point for 'this.'
  },

  exerciseK() {
    var store = {
      fruit: "grapes",
      sellMe: function() {
        return this.fruit;
      }
    }

    // What is the value of `this` when we call store.sellMe()?
    return 'store';

    // Annotation:
    // Since sellMe is a method that is invoked on an object, the value of this
    // is the object on which the method is invoked. In this case, it is our store
    // object.
  },

  exerciseL() {
    const dog = {
      breed: 'Chihuahua',
      getBreed: function(){
        var _this = this;

        setTimeout(function() {
          console.log('Your dog is a ' + _this.breed);
        })
      }
    };

    // What is the value of `this` when we call dog.getBreed()?
    return 'dog'

    // Annotation:
    // Since getBreed is a method on our dog object, the value of this when that
    // method is invoked will be the object itself.
  },

  exerciseM() {
    const robert = {
      name: 'Bobo',
      occupation: 'instructor'
    }

    const william = {
      name: 'will',
      occupation: 'instructor'
    }

    function makeBirdNoise() {
      console.log('My name is ' + this.name + ' ... caw! caw!');
    }

    // What is the value of `this` when we call makeBirdNoise.call(robert);
    return 'robert';

    // Annotation:
    // When you use the .call() function prototype, you are able to manually set
    // the value of this as the first argument passed into the method. When the
    // makeBirdNoise function is called, 'robert' is 'this.'
  },

  exerciseN() {
    class Bird {
      constructor(name, species) {
        this.name = name;
        this.species = species;
      }

      delayNoise() {
        setTimeout(this.makeNoise.bind(this), 1000)
      }

      makeNoise() {
        console.log('caw, caw');
      }
    }

    var firstBird = new Bird('Calvin', 'budgie');

    // What is the value of `this` when we call firstBird.delayNoise();
    return 'instance of Bird'

    // Annotation:
    // When you use bind, it sets the this value to a specified valued passed in
    // as an argument. Since this is passed in in this circumstance, it is the value of
    // this when the function is called. Since we used the new keyword to create
    // an object instance, this is that object instance when the method is called.
  },

  exerciseO() {
    const button = document.querySelector('#submit');

    button.addEventListener('click', () => {
      console.log(this);
      this.classList.toggle('on');
    });

    // What is the value of `this` when a user clicks on our button element and the callback is triggered?
    return 'global window object'

    // Annotation:
    // Since the event listener uses an arrow function, the value of this is set
    // when the function is created. Because of that, this is the global window
    // object instead of the element before the event listener.
  },

  exerciseP() {
    const child = {
      totalScreams : 4,
      scream: () => {
        this.totalScreams++;
      }
    }

    return 'global window object'

    // What is the value of `this` when we call child.scream();
    // Annotation:
    // Since scream is assigned to an arrow function in an object literal, the
    // value of this is set when the function is created as opposed to when the
    // method is invoked, so this is the global window object.
  }
};

module.exports = context;
