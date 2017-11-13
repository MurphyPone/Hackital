//Clock class
function Clock() {
  var hr, mn, sc, time, d, mnth, yr, fullTime, strMonth;  //Declares variables for determining time
  angleMode(DEGREES);

  //Converts the num to a day
  this.monthToString = function(num) {  //Converts the month int to a string value
    var result;
    switch (num) {
    case 1:
        result = "Janury";
        break;
    case 2:
        result = "February";
        break;
    case 3:
        result = "March";
        break;
    case 4:
        result = "April";
        break;
    case 5:
        result = "May";
        break;
    case 6:
        result = "June";
        break;
    case 7:
        result = "July";
        break;
    case 8:
        result = "August";
        break;
    case 9:
        result = "September";
        break;
    case 10:
        result = "October";
        break;
    case 11:
        result = "November";
        break;
    case 12:
        result = "December";
        break;
      }
      return result;
    }

    //Updates the time variables
    this.update = function() {
       hr = new Date().getHours()%12;
       mn = new Date().getMinutes();
       sc = new Date().getSeconds();
       time = hr + ":" + mn + ":" + sc; //Builds the string to be displayed

       d = day();
       mnth = new Date().getMonth() +1;
       yr = new Date().getYear();

       strMonth = this.monthToString(mnth) + " " + d + ",";
    }

  //Draws date/time information
  this.show = function() {
    clear()
    push()
      translate(width - width/4, height/2-25);
      rotate(-90);  //puts top at 12 o clock
      strokeCap(SQUARE);  //Sharp type *_*
      stroke(255);  //White stroke
      noFill(); //Removes ugly

      //SECONDS
      strokeWeight(6);
      var endSC = map(sc, 0, 60, 0, 360);
      stroke(255, 255, 255, endSC);
          //x ,           y,       ,hrad, vrad, how many
      arc(0, 0, 280, 280, 0, endSC);

      //MINUTES
      strokeWeight(10);  //Size
      var endMN = map(mn, 0, 60, 0, 360);
      stroke(255, 255, 255, endMN);
      arc(0, 0, 300, 300, 0, endMN);

      //HOURS
      strokeWeight(14);  //Size
      var endHR = map(hr, 0, 12, 0, 360);
      stroke(255, 255, 255, endHR);
      arc(0, 0, 328, 328, 0, endHR);
    pop();

    //time formatting
    push()
      translate(width - width/4, height/2-25);
      textSize(40);
      fill(255);
      text(strMonth, -textWidth(strMonth)/2, 0);
      text(time, -textWidth(time)/2, 40);
    pop()
  }

}
