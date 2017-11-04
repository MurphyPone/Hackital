//QuickStock$®
function setup() {

}

//TODO cool idea, have all stocks slide down/up from $500 for animation
function draw() {
	//Setup
	background(30);

	//Clock?
	fill(255,255,255);	//Color to white
	time = month() + "/" + day() + " " + hour()%12 + ":" + minute() + ":" + second();
	textSize(50)
	text(time, width - textWidth(time) -50, height/2);

	textSize(25)
	text(ticker,40, 40);
}

function keyPressed() {
	console.log(key);
}
