//QuickStock$®
var stocks = []; //Array of stocks
var symbols = [] //["aapl","googl", "aac", "mmm"];
var articles = []; //[1,"Trump is crazy", "McCain was like..."]
var symbolJSON = 'stocks.json';

var btc; //BTC IS TREATED LIKE A STOCK
var chyX = 0;
var num1;
//Important stuff
var newsOrg = ["business-insider", "fortune"];
var yearWeeks = ["2017-10-20", "2017-09-22", "2017-08-11", "2017-07-14", "2017-06-23", "2017-05-12", "2017-04-21", "2017-03-17", "2017-02-03", "2017-01-20"]; //YEARS IN A WEEK
var btcMonths = [739.00, 966.19, 1189.10, 1081.30, 1435.00, 2191.83, 2191.83, 2420.60, 2854.30, 4718.30, 4366.60, 6450.20];

////////FACTORS/////////
var historyFactor = [];
var newsFactor = [];
var totalFactor = [];

///////////////UIJAUNTS////////////////////////
var input, button, greeting;

function preload() {  //Preloads fonts
  stockFont = loadFont('assets/BebasNeue.otf');
  titleFont = loadFont('assets/couture-bldit.otf');
}

function setup() {
    //Button ish
  createCanvas(windowWidth, windowHeight)
  background(255,255,255,0);
  textStyle(BOLD);
  input = createInput('Input a stock symbol');
  input.position(windowWidth*0.01, windowHeight-100);
  button = createButton('乇乂ㄒ尺卂 ㄒ卄丨匚匚');
  button.position(width, 10);
  //Alex Is sad bcause he doesnet get a working button
  //button.mousePressed(specificStock(input.value));
  textAlign(CENTER);
  textSize(50);
  //

createCanvas(windowWidth, windowHeight);
  //Import parrticles?
  particlesJS.load('particles-js', 'particles.json', function() { //Loads the particle system
    //console.log('callback - particles.js config loaded');
  });
  //Graphical Setup
  clock = new Clock();  //Creates the clock
  background(50, 50, 50, 0); //gray bg
  textFont(stockFont);

  $(document).ready(function() { //jQuery funciton, only called once the document is ready
    doArticles(); //Queries the news APIs and fetches information from resulting JSON
    doStocks(); //Queries the stock API and fetches information from resulting JSON
    doBTC();  //Queries the BTC API
  });
}

function draw() { //TODO not drawing to the currect canvas?
  background(50, 50, 50, 0);
  textSize(25);
  //Clock Ish
  clock.update(); //Updates clock info
  clock.show()  //Draws clock info
  //Stock ish
  textSize(25)
  for (var i = 0; i < stocks.length; i++) {
    stocks[i].show(i); //Dras the stocks to the screen
  }
  //coin
  if (typeof btc !== "undefined") {
    btc.show(); //Draws the BTC ticker
  }

  //Article ish
  var chyron = "";
  for (var i = 0; i < articles.length; i++) {
    chyron += articles[i].title + "\t\t | \t\t";
  }
  if (chyX < textWidth(chyron)) { //Scrolls the news feed along the bottom of the screen
    chyX += 3;
  } else {
    chyX = 0;
  }

  //News ish
  push();
  fill(255, 255, 255, 150);
  text(chyron, width - chyX, height - 10);
  pop();
//change ish
////////This is one of our Future Implementations with the algorithm///////////
/**
  push();
  fill(255, 255, 255, 150);
  var tText = "";
  tText += specificStock(input.value);

  text(tText, width -100, height - 100);
  pop();
**/
  //Title
  push();
    fill(255, 255, 255, 230);
    textSize(15)
    textFont(titleFont);
    var msg = "//Displaying current prices vs. yearly averages";
    text(msg, 20, 40);
    strokeCap(SQUARE);
    textFont(stockFont);
    stroke(255);
    strokeWeight(4);
    line(28, 45, textWidth(msg) * 1.86, 45);
  pop();
}

function keyPressed() {
  console.log(keyCode);
  if(keyCode == 13) { //13 === enter
    specificStock(input.value());
    input.value('Input a stock symbol');
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Jared

function doArticles() {
  for (j = 0; j < newsOrg.length; j++) { //Loops through each news organization
    var newsOrganization = newsOrg[j];
    var URL2 = 'https://newsapi.org/v1/articles?source=' + newsOrganization + '&sortBy=top&apiKey=1e4eec7a67aa42a49ff34214aebe4f86';

    $.getJSON(URL2, function(data) { //Grabs the JSON from the URL, and calls a function
//Variables
      var desc = "";
      var index = i;
      var title = "";

      for (var i = 0; i < data.articles.length; i++) { //Loops through each of the articles from that organization
        desc = data.articles[i].description;
        index = i;
        title = data.articles[i].title;
        url = data.articles[i].url;
        articles.push(new Articles(index, desc, title, url)); //adds the aricle to a articles array
      }
      //  console.log(articles);
    });
  }

}
/*
function specificStock(str) {
  var symbol = str;
  var name = "QuickStock$";
  var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
  var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;
  $.getJSON(URL, function(data) {
    if (typeof data["Meta Data"] !== "undefined") { //Verifies the fetch was successful
      var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
      var weeks = data["Weekly Time Series"];
      var lastWeek = data["Meta Data"]["3. Last Refreshed"];
      var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week
      var avg = getAvg(weeks);
      var tempStock = new Stock(iSymbol, name, price, avg);

      var exists = false
      for(i = 0; i < stocks.length; i++) {
        if (tempStock.symbol == stocks[i].symbol){
          exists = true
        }
      }
      if(!exists) {
        stocks.push(tempStock);
        getNewsRating(tempStock);
        addHistoryFactor();
        getTotalFactor();
      } else {
        input.value(str + " already displaying");
      }
    } else {
      console.log("data missing?")
    }
    });
  }
*/

//Peter
function doStocks() {
  $.getJSON('stocks.json', function(data) { //populates symbols from Json
      for (var name in data) { //Iterates through stocks.json
        symbols[name] = data[name]; //copies json to array
        var nm = symbols[name];
        var symbol = symbols[name]; //Grab current symbol
        var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
        var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;

        $.getJSON(URL, function(data) { //Grabs the JSON from the URL, and calls a function
            if (typeof data["Meta Data"] !== "undefined") { //Verifies the fetch was successful
              var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
              var weeks = data["Weekly Time Series"];
              var lastWeek = data["Meta Data"]["3. Last Refreshed"];
              var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week
              var avg = getAvg(weeks);
              var tempStock = new Stock(iSymbol, name, price, avg);
              //addHistoryFactor();
              //console.log(stocks[0]);
              //console.log(newsFactor);
              stocks.push(tempStock);

          } else {
            console.log("data missing?")
          }
        });
    }
  });
}

//Creates a bitcoin ticker
function doBTC() {
  var URL = 'https://blockchain.info/ticker';
  $.getJSON(URL, function(data) {
    var price = data.USD.buy;
    var symbol = "BTC";
    var name = "Bitcoin";
    var avg = getBTCAvg();
    btc = new Crypto(symbol, name, price, avg);
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Creates a BTC avg
function getBTCAvg() {
  var sum = 0;
  for (var i = 0; i < btcMonths.length; i++) {
    sum += Math.round(btcMonths[i] * 100) / 100;
  }
  return sum / 12;
}

//Peter
//Get Average of a certain stock
//Takes in weeks
function getAvg(x) {
  var sum = 0;
  for (var i = 0; i < yearWeeks.length; i++) {
    sum += Math.round(x[yearWeeks[i]]["1. open"] * 100) / 100; //Converts from string to num
  }
  return sum / 12; //Returns the avg price of the last year
}

function addHistoryFactor() {
  for (var i = 0; i < stocks.length; i++) {
    historyFactor[i] = stocks[i].ratingPrice();
  }
}
//Gets a specific stock and returns the ticker
function specificStock(str) {//str is the symbol
  var symbol = str;
  var name = str;
  //couldnt finish but idea is str is sent in and its transfered to the name
if(str == "fb"){
name = "facebook";
} else if(str == "baba"){
name = "alibaba";
}else if(str == "csco"){
name = "cisco";
}else if(str == "amzn"){
name = "amazon";
}else if(str == "msft"){
name = "microsoft";
}else if(str == "nke"){
name = "nike";
}

  var key = 'N6N8STFNCERJ1DTH'; //Personal API Key
  var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&interval=1min&apikey=' + key;
  $.getJSON(URL, function(data) {
    if (typeof data["Meta Data"] !== "undefined") { //Verifies the fetch was successful
      var iSymbol = data["Meta Data"]["2. Symbol"]; //Grabs official symbol from data rather than str passed by user
      var weeks = data["Weekly Time Series"];
      var lastWeek = data["Meta Data"]["3. Last Refreshed"];
      var price = weeks[lastWeek]["1. open"]; //Grabs open price from last week
      var avg = getAvg(weeks);
      var tempStock = new Stock(iSymbol, name, price, avg);
console.log(tempStock);
//determines whether stock already exists
      var exists = false
      for(i = 0; i < stocks.length; i++) {
        if (tempStock.symbol == stocks[i].symbol){
          exists = true
        }
      }

//json file for the keywords//Ugh
      $.getJSON('keywords.json', function(data) {

//Variables
        var relevantArticlesList = tempStock.relevantArticles(articles);
        var output = [];//should hold the number returned
        var rating = 0;
        var history = 0;
        console.log(tempStock);
        for (var i = 0; i < relevantArticlesList.length; i++) {//loops through each of the relevent articles with the word
          for (var name in data) {//goes through each word in the keyword list
            if (relevantArticlesList[i].keySearch(name) !== "") {//if relevent article contains a keyword then add it to the output as 3 if good 1 if bad
              output[i] = data[name];
              console.log(output);
              console.log(relevantArticlesList);
            }
          }

        }
        for (var i = 0; i < output.length; i++) {
          rating += output[i];//gets the rating of the output
          console.log(rating);
        }
        var factors = new factor((rating/output.length), tempStock.ratingPrice());
        console.log(factors);
        totalFactor.push(factors);//pushes to the array factors
        num1  = factors.add();//get num1 as the total
        console.log(num1);
        return num1;
      });


      if(!exists) {//if it doesnt exist create the stock
        stocks.push(tempStock);
      } else {
        input.value(str + " already displaying");//checks if the stock is already created
      }
    } else {
      console.log("data missing?")
    }
    });
  }
