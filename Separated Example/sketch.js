//Alpha Vantage Example
var str_Ticker = '';

function setup() {
	createCanvas(windowWidth, windowHeight);

	$(document).ready(function() {	//jQuery funciton, only called once the document is "ready" wtf that means..
		var symbols = ["goog", "aapl", "msft", "mmm", "aac"];	//Stocks to fetch, TODO get from user input?

			//https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey
			var symbol = 'MSFT';
			var key = 'N6N8STFNCERJ1DTH';
			var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+symbol+'&interval=1min&apikey='+key;

			$.getJSON(URL, function(data) {
				console.log(data);
				var str_Symbol = data["Meta Data"]["2. Symbol"];
				var str_Price = data["Weekly Time Series"]["2000-01-14"]["1. open"];
				str_Ticker = symbol + " : $" + str_Price;
				console.log(str_Ticker);
			});
		});
}
function draw() {
	text(str_Ticker, 200, 200);
}

function keyPressed() {
	console.log(key);
}
