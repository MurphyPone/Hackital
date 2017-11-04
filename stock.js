function Stock(smbl, prc) {
  this.symbol = smbl.toUpperCase();
  //this.name = nm;
  this.price = fPrice(prc);

  this.format = " : $"
  this.displayName = this.symbol+ this.format + this.price

  this.width = textWidth(this.displayName);
  this.x = 20;
  this.padding = 10;
}

//Rounds to 2 decimal places
this.fPrice = function(rawPrice) {
  return Math.round(rawPrice * 100) / 100;
}
