const scope = {
  exerciseA() {
    let personA = 'Paul';
    let personB = 'Ben';
    let personC = 'Tom';

    const log = [];

    function changePerson() {
      if (personA === 'Paul') {
        person = 'CardiB';
        beautifyPerson();
      }

      function beautifyPerson() {
        // Log A: personB
        log.push({A: personB});

        if (personB.includes('B')) {
          personB = person;
          personC = personB;
          // Log B: personC
          log.push({B: personC});
        }
      }

      personC = personA;

      // Log C: personB
      log.push({C: personB});
    }

    changePerson();
    // Log D: personC
    log.push({D: personC});

    return log;

    // Annotation:
    // Persons A-C are declared and assigned in the global scope. When the
    // changePerson function is called on line 33, we go into that function's scope
    // and the first thing that happens is that person is assigned to 'CardiB'.
    // Since it isn't declared, the engine will read it as a global variable.
    // Then we move into the scope of the beautifyPerson function. This is where
    // PersonB is assigned to log A. Since personB hasn't been reassigned, personB
    // is still Ben. Since personB does include 'B', we move into the if block's scope.
    // personB is reassigned to CardiB and personC is reassigning to CardiB as well.
    // PersonC (cardiB) is then assigned to log B. We then exit the beautifyPerson
    // scope and return to the changePerson scope where personC is reassigned to
    // personA which is still Paul. That is then assigned to log[C]. We then return to
    // the global scope where personC (Paul) is assigned to log[D].
  },

  exerciseB() {

    let number = 30;

    const nums = [];

    function numberFunction() {
      let number = 75;

      if (number === 75) {
        let number = 28;
      }
      nums.push({A: number});
      // Log A: number

      function newNumber() {
        number = 64;
        nums.push({B: number});
        // Log B: number
      }

      newNumber();
      nums.push({C: number});
      // Log C: number
    }

    numberFunction();
    nums.push({D: number});
    // Log D: number
    return nums;

    // Annotation:
    // Num A is 75 because it is declared with let in line 61. It is also assigned
    // on line 64, but that doesn't change the value in the numberFunction scope since
    // it exists within the if block's scope. Num B is 64 because it is reassigned on
    // line 70. This isn't a new declaration, so the number that exists within
    // the numberFunction scope is changed, so num C is 64 as well. Num D is 30
    // because number was initially declared as 30 and was never reassigned in
    // the global scope.
  },

  exerciseC() {
    const greetings = [];

    let greeting = 'Hello';

    function greetingFunction() {
      var greeting = 'Yo';

      if (greeting === 'Yo') {
        let greeting = 'Howdy';
      }
      greetings.push({A: greeting});
      // Log A: greeting

      function newPhrase() {
        greeting = 'Hey';
        greetings.push({B: greeting});
        // Log B: greeting
      }

      newPhrase();
      greetings.push({C: greeting});
      // Log C: greeting
    }

    greetingFunction();
    greetings.push({D: greeting});
    // Log D: greeting

    return greetings;

    // Annotation:
    // Greeting A is 'Yo' because var is functionally scoped and isn't reassigned
    // in that scope before line 106. Greeting B is 'Hey' because it is reassigned
    // within the scope of the newPhrase function. Greeting C is also 'Hey' because
    // the variable exists within the greetingFunction scope and was reassigned
    // via the nested function. Greeting D is 'Hello' because the greeting that
    // was reassigned within greetingFunction was alwas the var greeting on line 101,
    // So the let greeting on line 98 remained unchanged.
  },

  exerciseD() {
    const greetings = [];

    let greeting = 'howdy';

    const greetingGenerator = () => {
      let greeting = 'hi';

      if (greeting === 'hi') {
        let greeting = 'hello';
      }
      greetings.push({A: greeting});
      // Log A: greeting

      const newGreeting = ()  => {
        greeting = 'welcome';
        greetings.push({B: greeting});
        // Log B: greeting
      };

      newGreeting();
      greetings.push({C: greeting});
      // Log C: greeting
    };

    greetingGenerator();
    greetings.push({D: greeting});
    // Log D: greeting

    return greetings;

    // Annotation:
    // Greeting A is 'hi'because it has yet to be reassigned within the generator
    // function after being initially declared on line 142. B is 'welcome' since
    // greeting is reassigned on the line above it. C is also 'welcome' because
    // the initial declaration is within its parent function's scope, so the
    // reassignment from the newGreeting function still applies. D is 'howdy' since
    // the global variable greeting was never reassigned after being declared on 139.
  },

  exerciseE() {
    const names = [];
    let name = 'Brittany';

    function sayName() {
      let name = 'Pam';

      if (name === 'Pam') {
        name = 'Nathaniel';

        if (name.length > 0) {
          let name = 'Brittany';
        }
        names.push({A: name});
        // Log A: name
      }
      names.push({B: name});
      // Log B: name
    }
    names.push({C: name});
    // Log C: name

    sayName();
    names.push({D: name});
    // Log D: name

    return names;

    // Annotation:
    // C pushes first since it is the first statement the engine will run after
    // the creation phase. It is equal to Brittany, the global name. A pushes
    // next once we enter into the scope of sayName on line 198 since name equals
    // Pam within the functional scope and is therefore reassigned to Nathaniel
    // on line 184. The functionally scoped name is not reassigned again before
    // it is pushed on line 192, so name is still Nathaniel for B. D is logged
    // last since it is pushed after the sayName function. The global name variable
    // hasn't been reassigned, so it is still Brittany.
  },

  exerciseF() {
    const dogs = [];

    var dog = 'Spot';

    function petDog() {
      // Log A: dog
      dogs.push({A: dog});

      if (dog === 'Spot') {
        let dog = 'Fluffy';
      }

      function rollOver() {
        // Log B: dog
        dogs.push({B: dog});
        dog = 'Biscuit';

        // Log C: dog
        dogs.push({C: dog});
      }

      rollOver();
      dogs.push({D: dog});
      // Log D: dog
    }

    petDog();
    dogs.push({E: dog});
    // Log E: dog

    return dogs;

    // Annotation:
    // Dog A will be 'Spot' since it is declared globally and not reassigned
    // before line 222 when its pushed within the petDog functional scope. We move
    // into rollOver's scope and it is still not reassigned, so B is 'Spot' as well.
    // The global var is reassigned on line 231 to 'Biscuit,' so dog C is Biscuit.
    // It is not reassigned again before line 238 so it is still Biscuit for dog D.
    // Since the var is global, Biscuit is pushed once again for dog E.

  },

  exerciseG() {
    const fruits = [];

    var fruit = 'apple';

    function eatFruit() {

      if (fruit !== 'kiwi') {
        var fruit = 'mango';

        if (fruit) {
          // Log A: fruit
          fruits.push({A: 'reference error'});
          const fruit = 'strawberry';
        }
        fruits.push({B: fruit});
        // Log B: fruit
      }
      fruits.push({C: fruit});
      // Log C: fruit
    }

    eatFruit();
    fruits.push({D: fruit});
    // Log D: fruit

    return fruits;

    // Annotation:
    // When we try to log fruit A, we get 'ReferenceError: Cannot access
    // 'fruit' before initialization'. It exists within the temporal dead zone
    // since const variable declarations aren't hoisted like var declarations.
    // B is mango since we are within the eatFruit functional scope and the
    // fruit is equal to mango within that scope. Var can't have block scope,
    // so we still have access to it on line 276, so C is mango again. D is apple
    // since fruit is re-declared in the eatFruit function before it is reassigned,
    // so the global variable is never reassigned and remains 'apple.'
  },

  exerciseH() {
    const nums = [];

    let num = 6;

    const fn1 = function() {
      let num = 4;
      nums.push({A: num});
      // Log A: num

      if (num < 5) {
        const num = 9;

        fn2(num);

        const newNum = num;
        nums.push({B: num});
        // Log B: newNum
      }

      newNum = num;
      nums.push({C: num});
      // Log C: newNum
    };

    const fn2 = function(num){
      // Log D: num
      nums.push({D: num});
      num = num + 1;
      nums.push({E: num});
      // Log E: num
    };

    fn1();

    return nums;

    // Annotation:
    // A is logged first and is equal to 4 since it is redeclared on line 303
    // after fn1 is called. D is logged next when fn2 is called within fn1 and we
    // move into its scope. It was redeclared on line 308 to be 9. Since they
    // aren't redeclared in fn2, the engine looks up the scope chain to the parent
    // if block where it is assigned to 9, so D is 9. E is logged next on line 326
    // after 1 has been added, so E is 10. B is pushed next because we move back into
    // the scope of the if block started on 307. we push num again on 313 and it
    // is still 9 since it was only reassigned in block scope, so the 308 assignment
    // still stands. C is logged last and is 4 since it was not modified within
    // the functional scope after being assigned to 4 on 303.
  },

  exerciseI() {
    const hungers = [];

    var hunger = 100;

    function eatSnack() {
      hunger -= 25;
      // Log A: hunger
      hungers.push({A: hunger});
      gorgeYourself();

      function gorgeYourself() {
        const hunger = 0;
        hungers.push({B: hunger});
        // Log B: hunger
      }
      hungers.push({C: hunger});
      // Log C: hunger
    }

    eatSnack();

    hunger += 5;
    hungers.push({D: hunger});
    // Log D: hunger

    eatSnack();
    hungers.push({E: hunger});
    // Log E: hunger

    return hungers;

    // Annotation:
    // A is logged first and is 75 because 25 is subtracted from hunger on 353.
    // += reassigns the variable. B is logged when we move into gorgeYourself's
    // scope. It is redeclared witin that function's scope to 0, so B is 0. C is
    // logged on 363 and is still 75 since the redeclaration was limited in scope.
    // Once eatSnack is done running, five is assed to the global hunger of 75,
    // so the global var is now 80. We now run eatSnack again and run through A,
    // B, and C again in that order. A and C are 55 since they rep the global variable
    // after 25 is subtracted (80 - 25), and B is 0 since it is once again redeclared
    // within gorgeYourself. Finally, the global value of 55 is pushed again for
    // hunger E.
  },

  exerciseJ() {
    const allToppings = [];

    let sandwich = 'ketchup sandwich';
    allToppings.push({A: sandwich});
    // Log A: sandwich

    const addChipotle = () => {
      // Log B: toppings
      allToppings.push({B: toppings});
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') {
        sandwich = 'not a mediocre sandwich';
      }
      allToppings.push({C: sandwich});
      // Log C: sandwich
    };

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: cheeseTopping
      allToppings.push({D: cheeseTopping});
      const shesTheManReference = () => {
        amandaBynes = 'National Treasure';
      };

      shesTheManReference();
    };

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    allToppings.push({E: sandwich});
    allToppings.push({F: amandaBynes});
    // Log E: sandwich
    // Log F: amandaBynes

    return allToppings;

    // Annotation:
    // Sandwich is defined on 395 and pushed to allToppings on the next line, so
    // its value is 'ketchup sandwich.' D is logged next because addCheese is the
    // first function to be executed. Cheese topping is redeclared in that funct's
    // scope on 412, so gouda is assigned to D when it's pushed. B is pushed next,
    // but it is pushed before var toppings is declared and defined, so it is
    // undefined. C if pushed next. We jump into the if block scope on 404 since
    // toppings is equal to chipotle sauce. Within that scope, the global sandiwch
    // is reassigned to "not a mediocre sandwich," so that is the value of C.
    // E is pushed nect on 426 after we exit the scope of addChipotle. Sandwich
    // is global and hasn't been reassigned again, so E is 'not a mediocre sandiwch'
    // as well. Finally, F is pushed with a value of 'national treasure' since
    // that is the value the amandaBynes variable was assigned to when shesTheManReference
    // was called within the contect of the addCheese function. Since the variable
    // was never declared, the engine assumes it is within the global scope.
  },

  exerciseK() {
    const nums = [];

    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      nums.push({A: num});
    }

    foo();

    // Log B: num
    nums.push({B: num});

    return nums;

    // Annotation:
    // Num is assigned to 10 in the global scope on 453 but is reassigned to 7 when
    // foo is run on 462, so A is 7 when pushed on 458 After foo has finished running
    // and we have exited its scope back to the global scope, num is still 7 since
    // it was globally declared and is still 7, so B is 7 too.
  },

  exerciseL() {
    const grades = [];

    let grade = 100;

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }
        grades.push({A: grade});
        // Log A: grade
      }

      addPoints();
      grades.push({B: grade});
      // Log B: grade
    }

    losePoints();
    grades.push({C: grade});
    // Log C: grade

    return grades;

    // Annotation:
    // After grade is globally assigned to 100, we move into the losePoints scope
    // on line 499. There, grade is reassigned to 90. We then move into the scope
    // of addPoints on line 494. Grade is re-declared and assigned to 95. Since
    // grade is never re-assigned within the addPoints scope, 95 is pushed on line
    // 490. We then exit the addPOints scope and grade is pushed on 495. Since
    // grade was declared and assigned 95 only in the scope of addPOints, the
    // value of grade is still 90 for B. We go back into the global scope and the
    // global grade is still 90, so it is once again pushed for C.
  },

  exerciseM() {
    const nums = [];

    var num = 5;

    function first() {
      nums.push({A: num});
      // Log A: num
      num = 6;
      nums.push({B: num});
      // Log B: num
    }

    function second() {
      nums.push({C: 'reference error'});
      // Log C: num
      let num = 7;
    }

    first();
    second();

    nums.push({D: num});
    // Log D: num

    return nums;

    // Annotation:
    // Num is delcared and assigned globally to 5 on 519. Then first is invoked
    // on 535 which takes us into that functional scope. Num is still 5, so A is
    // 5. Num is then reassigned to 6 and pushed with B on line 525. We then
    // exit first's functional scope and enter second's on 536. Since num is
    // declared within that functional scope but hasn't been declared yet, we
    // get a reference error for C on 530. Num is then redeclared but only within
    // second's scope, so we don't care. When D: num is pushed on 538, it is still 6
    // (as reassigned on 524).
  },

  exerciseN() {
    const instructors = [];

    var instructor = 'Pam';

    function changeInstructor() {
      instructors.push({A: instructor});
      // Log A: instructor

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }
      instructors.push({B: instructor});
      // Log B: instructor

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor
        instructors.push({C: instructor});
      }

      rename();
      instructors.push({D: instructor});
      // Log D: instructor

    }
    instructors.push({E: instructor});
    // Log E: instructor

    changeInstructor();
    instructors.push({F: instructor});
    // Log F: instructor

    return instructors;

    // Annotation:
    // Instructor is assigned to 'Pam' globally on 557. E is logged first since
    // it is pushed on 582 before any functions are invoked. We then move into
    // changeINstructor's scope when it's invoked on 585. 'Pam' is then logged
    // again for A on 560. We ignore the whole if else block and 'Pam' is pushed
    // with B on 568. Rename is then invoked on 577 where instructor is reassigned
    // to Louisa. C: 'Louisa' is pushed on on 574. We then go back into changeINstructor's
    // scope and push D. Since the instructor var was declared globally and reassigned,
    // not re-declared, it is  still 'Louisa.' We then go back into the global
    // scope (where instructor is still Louisa) where F: Louisa is pushed.
  },

  exerciseO() {
    const shoes = [];
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe
      shoes.push({A: shoe});
      var shoe = 'boot';
    }
    shoes.push({B: shoe});
    // Log B: shoe
    putOnShoe();
    // Log C: shoe
    shoes.push({C: shoe});

    return shoes;

    // Annotation:
    // The first part of the execution phase after shoe is assigned to 'flipflop'
    // is line 612 where B is pushed. We then go into putOnShoe's scope where we
    // try to push A before shoe is declared in that function's scope, so shoe
    // is undefined. We don't get a reference error since shoe was hoiseted since
    // it was declared using var. We then go back into the global scope where C: shoe
    // (which is still globally 'flipflop') is pushed.
  },

  exerciseP() {
    const lunches = [];

    let lunch;
    function orderLunch() {
      if (lunch) {
        // Log A: lunch
        lunches.push({A: lunch});
        let lunch = 'sandwich';
      }

      if (typeof lunch === 'undefined') {
        lunch = 'soup';
      }
      lunches.push({B: lunch});
      // Log B: lunch
    }

    orderLunch();
    lunches.push({C: lunch});
    // Log C: lunch

    return lunches;

    // Annotation:
    // Lunch is declared but not assigned on 632. We then jump into orderLunch's
    // scope on 647. Since lunch is undefined and falsy, the if block where A is
    // pushed doesn't run. Lunch is then assigned to 'soup', so B: 'soup' pushes
    // on 643. We then go back into the global scope where C: 'soup' is pushed on
    // 648. When vars are reassigned, they are still available in their original
    // scope.
  },

  exerciseQ(){
    let myKid = 'Pandora';
    let wildKids = ['Antigone'];

    let myCrazyKidAntics = kid => {
      // Log A: kid
      wildKids.push(kid);
      // Log B: wildKids

      let drawOnTheWall = () => {
        let myKid = 'Mandy';
        // Log C: myKid
        return `That wild kid ${myKid}, drew on the wall!`;
      };

      drawOnTheWall();

      let myAmazingKid = () => {
        let myKid = wildKids.shift();
        // Log D: myKid
        return `That kid ${myKid}, is AMAZING!`;
      };

      myAmazingKid();
      // Log E: myKid;
      return `All these kids are wild, especially, ${myKid}!`;
    };

    myCrazyKidAntics(myKid);

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseR() {
    const names = [];
    let myName = 'Rody';
    // Log A: myName
    names.push({A: myName});
    const parentFunc = () => {
      myName += 'Toy';
      // Log B: myName
      names.push({B: myName});
      let innerFunc = () => {
        let myName = 'Tesla';
        // Log C: myName
        names.push({C: myName});
      };

      innerFunc();
      myName += 'Daniels';
    };

    parentFunc();
    // Log D: myName
    names.push({D: myName});

    return names;

    // Annotation:
    // myName is declared and assigned to 'Rody' on 706, so that's the value pushed
    // with A on 708. We then go into parentFunc's scope on 723 where 'Toy' is
    // concatenated onto Rody, so 'RodyToy' is pushed with B on 712. InnerFunc is
    // then invoked within parentFunc's scope Within innerFunc, myName is redeclared
    // and assigned to 'Tesla', so that's what's pushed with C on 716. We then go back
    // into parentFunc (where myName is 'RodyToy' since it is reading the global
    // variable originally declared on 706 that has been reassigned) and 'Daniels'
    // is added to the end of the variable before it is pushed with D on 725.
  }
};

module.exports = scope;
