//Holds the symbol name and price of any given stock
function Stock(smbl, nm, prc, average) {
  this.symbol = smbl.toUpperCase();
  this.name = nm;
  this.price = Math.round(prc * 100) / 100;
  this.avg = average;
  this.format = " : $";
  this.displayName = this.symbol + this.format + this.price;

  this.width = textWidth(this.displayName);
  this.x = 20;
  this.padding = 10;

  //Displays the symbol, price and visualization bars of the current price vs. the yearly average
  this.show = function(offset) {
    textSize(25);
    fill(255,255,255);	//Color to white
    text(this.displayName, this.x, 80 + 25 * offset); 	//width and height are native vars to use too
    fill(10,255,10);	//TODO make the color change according to $$ or alg
    this.currentBar(offset);
    this.avgBar(offset);
  }

  //Displays the current price visualization
  this.currentBar = function(offset) {
    push()
      strokeWeight(2);
      stroke(255);
      if(this.price > this.avg) { //Above Avg
          fill(50, 200, 50, 255); //transparent
      } else { //Below Avg
          fill(200, 50, 50, 255); //transparent
      }
      rect(this.width + this.padding + this.x, 60 + 25*offset, this.price/2, 20, 20, 1, 20, 1);
      pop();
  }

  //Displays the average yearly price of the stock
  this.avgBar = function(offset) {
    push();
    strokeWeight(2);
    stroke(255);
    fill(200, 200, 200, 200); //transparent
    rect(this.width + this.padding + this.x, 60 + 25*offset, this.avg/2, 20, 20, 1, 20, 1);
    pop();
  }
  //returns an array of articles relevant to the stock
this.relevantArticles = function(arr){ //takes in an array of articles and the stocks name as a string
if(arr.length > 0){
  var relevant = [];

   for(var i = 0; i< arr.length; i++){
       if(arr[i].keySearch(this.name) !== ""){
         relevant.push(arr[i]);
       }
   }
  return relevant;
}else{
  return null;
}
}
// reurns a rating of the price
  this.ratingPrice = function() {
    var rating = 0;
    var diff = this.price - this.avg;
    var twentyPercent = (this.avg * .2);
    var fifteenPercent = (this.avg * .15);
    var fivePercent = (this.avg * .1);

    if (diff > twentyPercent) {
    rating = 5;
  } else if (diff >= fifteenPercent && diff <= twentyPercent) {
    rating = 4;
  } else if (diff >= fivePercent && diff <= fifteenPercent) {
    rating = 3;
  } else if (diff >= 0 && diff <= fivePercent) {
    rating = 2;
  } else if (diff <= 0) {
    rating = 1;
  }



  return rating;

}


}
