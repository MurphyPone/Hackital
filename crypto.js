//Crypto currency class used by the BTC ticker
function Crypto(smbl, nm, prc, average) {
  this.symbol = smbl.toUpperCase();
  this.name = nm;
  this.price = Math.round(prc * 100) / 100;
  this.avg = average;
  this.format = " : $";
  this.displayName = this.symbol + this.format + this.price;

  this.width = textWidth(this.displayName);
  this.x = 20;
  this.y = height -40;
  this.padding = 10;

  this.show = function() {  //Displays the symbol, price, and net change vs avg bars
    textSize(25);
    fill(255,255,255);	//Color to white
    text(this.displayName, this.x, this.y);
    fill(50,255,50);
    this.currentBar();
    this.avgBar();
  }

  //Current price visualization
  this.currentBar = function() {
    push()
      strokeWeight(2);
      stroke(255);
      fill(255, 255, 0);  //gold
      var tempWidth = this.width + this.padding + this.x
      rect(tempWidth, this.y-20, width-tempWidth-this.padding, 20, 20, 1, 20, 1);
    pop();
  }

  //Average price visualization
  this.avgBar = function() {
    push();
      strokeWeight(2);
      stroke(255);
      fill(200, 200, 200, 200); //transparent
      rect(this.width + this.padding + this.x, this.y-20, this.avg/20, 20, 20, 1, 20, 1);
    pop();
  }
}
