function Articles(indx, desc, name,ur) {

  this.index = indx;
  this.description = desc.toUpperCase();
  this.title = name.toUpperCase();
  this.url = ur;

  this.print = function() {
    var output = "";

    output = "[" + this.index + ": " + this.description + ": " + this.title + "]";
    console.log(output);
    return output;
  };
this.keySearch = function(key){
  var output = "";
  if(this.description.search(key.toUpperCase()) == -1 && this.title.search(key.toUpperCase()) == -1){
    return output;
  }
  if(this.description.search(key.toUpperCase()) !== -1 && this.title.search(key.toUpperCase()) !== -1){
    return this.description + this.title;
  }
  if(this.description.search(key.toUpperCase()) !== -1){
    return this.description;
  }
  if(this.title.search(key.toUpperCase()) !== -1){
    return this.title;
  }
  return output;
}

};
