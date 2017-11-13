function factor(x, y) {

this.news = Number(x);
this.history = Number(y);

this.add = function() {
  var output = 0;

  output = this.news + this.history;
  console.log(output);
  return output;
};

}
