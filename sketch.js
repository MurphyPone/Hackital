//Stocks
var name = "";
var price = "";

var stocks = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Idrk///////
	$(document).ready(function() {	//jQuery funciton, only called once the document is "ready" wtf that means..
		var symbols= ["goog", "aapl", "msft"];	//Stocks to fetch, TODO get from user input?

		var callback = function(data) {
				var results = "";		//Moved up to make global ish
			 $.each(data.query.results.quote, function(i, value){	//for each? TODO how to grab data.query.results.quote[i]??
					results += value.Name + ":$" + value.LastTradePriceOnly + " ";

					stocks[i] = [value.Name, value.LastTradePriceOnly]	//Inserts values into table as ordered pair

					if(i == 1 ) {	//Grabs the first value for testing
						name = value.Name;
						price = value.LastTradePriceOnly;
					}
			 })
			 //alert(results);
		};

		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20("
		$.each(symbols, function(j, code){
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
	background(20);
	fill(255,255,255);
	textSize(25)

	for (i = 0; i < stocks.length; i++) {
		text(stocks[i][0] + " : $" + stocks[i][1], 50, 50 + 50*i) 	//width and height are native vars to use too
		fill(255,255,255);	//TODO make the color change according to $$ or alg
		// 		x,  y, 	w, 	h, tl, tr, br, bl .
		rect(280, 30 + 30*i, stocks[i][1]/1, 20, 20, 20, 20, 1);	//rounded rect TODO use dynamic xy spacing
		// price/1 to cast to integer???
		//console.log(price);
	}

}

function keyPressed() {
	console.log(key);
}
