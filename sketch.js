//QuickStock$®
var stocks = [];	//Array of stocks

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Idrk///////
	$(document).ready(function() {	//jQuery funciton, only called once the document is "ready" wtf that means..
		var symbols= ["goog", "aapl", "msft", "mmm", "aac"];	//Stocks to fetch, TODO get from user input?

		var callback = function(data) {
				var results = "";
				$.each(data.query.results.quote, function(i, value){	//for each? TODO how to grab data.query.results.quote[i]??
					results += value.Name + ":$" + value.LastTradePriceOnly + " ";
					stocks[i] = new Stock(symbols[i], value.Name, value.LastTradePriceOnly)	//Inserts values into table as ordered pair
			 })
			 //alert(results);
		};


		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20("
		$.each(symbols, function(j, code){	//For each symbol
			 url += "%22" + code + "%22";
			 if (j < (symbols.length-1)){
					url += "%2C";
			 }
		});

		url += ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
		$.getJSON(url, callback);
	});
	///////////////

}

//TODO cool idea, have all stocks slide down/up from $500 for animation
function draw() {
	//Setup
	background(30);

	//Clock?
	fill(255,255,255);	//Color to white
	time = month() + "/" + day() + " " + hour() + ":" + minute() + ":" + second();
	textSize(50)
	text(time, width - textWidth(time) -50, height/2);

	textSize(25)

	//Draw all the stocks
	for (i = 0; i < stocks.length; i++) {
		stocks[i].drawText(i);
	}

}

function keyPressed() {
	console.log(key);
}
