function Stock(smbl, nm, prc ) {
  this.symbol = smbl;
  this.name = nm;
  this.price = prc;

  this.format = " $: "
  this.displayName = this.name + this.format + this.price

  this.width = textWidth(this.displayName);
  this.x = 50;
  this.padding = 10;

  this.barPercentage = 0;//TODO price/width as a percentage?
}

this.drawText = function(yOffset) { //this.draw is won't override properly
		fill(255,255,255);	//Color to white
		text(this.displayName, this.x, 50 + 50 * yOffset) 	//width and height are native vars to use too
		fill(0,255,255);	//TODO make the color change according to $$ or alg
		// 		x,  y, 	w, 	h, tl, tr, br, bl	TODO why 30 here?
		rect(this.width + this.padding + this.x, 30 + 50*yOffset, this.price/2, 20, 20, 20, 20, 1);	//rounded rect TODO use dynamic xy spacing
		// price/1 to cast to integer???
		//console.log(price);
}
