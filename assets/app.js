$(document).ready(function() {
    function initialScreen() {
      startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Begin!</a></p>";
      $(".mainArea").html(startScreen);
    }
    initialScreen();
    $("body").on("click", ".start-button", function(event) {
      event.preventDefault();
      //clickSound.play(); //todo
      generateHTML();
      timerWrapper();
    }); // Closes start-button click
    $("body").on("click", ".answer", function(event) {
      //answeredQuestion = true;
      // clickSound.play(); /todo
      selectedAnswer = $(this).text();
      if (selectedAnswer === correctAnswers) {
        //alert("correct");
        clearInterval(theClock);
        generateWin();
      } else {
        //alert("wrong answer!");
        clearInterval(theClock);
        generateLoss();
      }
    }); // Close .answer click
    $("body").on("click", ".reset-button", function(event) {
      // clickSound.play(); //todo
      resetGame();
    }); // Closes reset-button click
  }); //  Closes jQuery wrapper
  function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers + "</p>" + "<img class='center-block img-wrong' src='" + imageArray + ">";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
  }
  
  function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers + "</p><p><img class='center-block img-wrong' src='" + imageArray + "'></p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
  }
  
  function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers + "</p><p><img class='center-block img-wrong' src='" + imageArray + "'></p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
  }
  
  function generateHTML() {
    populateTrivia();
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + question + "<br>" + movie + " (" + movieYear + ")" + "</p><p class='first-answer answer'>A. " + answerArray[0] + "</p><p class='answer'>B. " + answerArray[1] + "</p><p class='answer'>C. " + answerArray[2] + "</p><p class='answer'>D. " + answerArray[3] + "</p><p class='answer'>E. " + answerArray[4] + "</p>";
    $(".mainArea").html(gameHTML);
  }
  
  function wait() {
    if (questionCounter < 7) {
      questionCounter++;
      generateHTML();
      counter = 30;
      timerWrapper();
    } else {
      finalScreen();
    }
  }
  
  function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
  
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(theClock);
        generateLossDueToTimeOut();
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  }
  
  function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
  }
  
  function populateTrivia() {
    var movieSelect = Math.round(Math.random() * 100);
    movie = moviesObject[movieSelect];
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      movie = response.Title;
      tempAnswer = response.Rated;
      hint = response.Plot;
      imageArray = response.Poster;
      movieYear = response.Year;
      if (tempAnswer == "G") {
        correctAnswers = "A. G"
      } else if (tempAnswer == "PG") {
        correctAnswers = "B. PG"
      } else if (tempAnswer == "PG13") {
        correctAnswers = "C. PG13"
      } else if (tempAnswer == "PG 13") {
        correctAnswers = "C. PG13"
      } else if (tempAnswer == "PG-13") {
        correctAnswers = "C. PG13"
      } else if (tempAnswer == "R") {
        correctAnswers = "D. R"
      } else {
        correctAnswers = "E. OTHER"
      }
    })
  };
  
  function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
  }
  var startScreen;
  var gameHTML;
  var counter = 30;
  var moviesObject = ["CITIZEN KANE", "THE GODFATHER", "CASABLANCA", "RAGING BULL", "SINGIN' IN THE RAIN", "GONE WITH THE WIND", "LAWRENCE OF ARABIA", "SCHINDLER'S LIST", "VERTIGO", "THE WIZARD OF OZ", "CITY LIGHTS", "THE SEARCHERS", "STAR WARS", "PSYCHO", "2001: A SPACE ODYSSEY", "SUNSET BLVD.", "THE GRADUATE", "THE GENERAL", "ON THE WATERFRONT", "IT'S A WONDERFUL LIFE", "CHINATOWN", "SOME LIKE IT HOT", "THE GRAPES OF WRATH", "E.T. THE EXTRA-TERRESTRIAL", "TO KILL A MOCKINGBIRD", "MR. SMITH GOES TO WASHINGTON", "HIGH NOON", "ALL ABOUT EVE", "DOUBLE INDEMNITY", "APOCALYPSE NOW", "THE MALTESE FALCON", "THE GODFATHER PART II", "ONE FLEW OVER THE CUCKOO'S NEST", "SNOW WHITE AND THE SEVEN DWARFS", "ANNIE HALL", "THE BRIDGE ON THE RIVER KWAI", "THE BEST YEARS OF OUR LIVES", "THE TREASURE OF THE SIERRA MADRE", "DR. STRANGELOVE", "THE SOUND OF MUSIC", "KING KONG", "BONNIE AND CLYDE", "MIDNIGHT COWBOY", "THE PHILADELPHIA STORY", "SHANE", "IT HAPPENED ONE NIGHT", "A STREETCAR NAMED DESIRE", "REAR WINDOW", "INTOLERANCE", "THE LORD OF THE RINGS: THE FELLOWSHIP OF THE RING", "WEST SIDE STORY", "TAXI DRIVER", "THE DEER HUNTER", "M*A*S*H", "NORTH BY NORTHWEST", "JAWS", "ROCKY", "THE GOLD RUSH", "NASHVILLE", "DUCK SOUP", "SULLIVAN'S TRAVELS", "AMERICAN GRAFFITI", "CABARET", "NETWORK", "THE AFRICAN QUEEN", "RAIDERS OF THE LOST ARK", "WHO'S AFRAID OF VIRGINIA WOOLF?", "UNFORGIVEN", "TOOTSIE", "A CLOCKWORK ORANGE", "SAVING PRIVATE RYAN", "THE SHAWSHANK REDEMPTION", "BUTCH CASSIDY AND THE SUNDANCE KID", "THE SILENCE OF THE LAMBS", "IN THE HEAT OF THE NIGHT", "FORREST GUMP", "ALL THE PRESIDENT'S MEN", "MODERN TIMES", "THE WILD BUNCH", "THE APARTMENT", "SPARTACUS", "SUNRISE", "TITANIC", "EASY RIDER", "A NIGHT AT THE OPERA", "PLATOON", "12 ANGRY MEN", "BRINGING UP BABY", "THE SIXTH SENSE", "SWING TIME", "SOPHIE'S CHOICE", "GOODFELLAS", "THE FRENCH CONNECTION", "PULP FICTION", "THE LAST PICTURE SHOW", "DO THE RIGHT THING", "BLADE RUNNER", "YANKEE DOODLE DANDY", "TOY STORY", "BEN-HUR"]
  var tempAnswer = "";
  var movie = "";
  var movieYear = "";
  var question = "What is this movie rated?" + movie;
  var answerArray = ["G", "PG", "PG13", "R", "OTHER"];
  var imageArray = "";
  var correctAnswers = "";
  var hint = [];
  var questionCounter = 0;
  var selectedAnswer;
  var theClock;
  var correctTally = 0;
  var incorrectTally = 0;
  var unansweredTally = 0;