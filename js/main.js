var rangeslider;
var output;
var comments;

function toSurvey() {
 	location.replace("survey.html");
}

function toInstructions() {
	location.replace("survey_instructions.html");
}


function set_tick_labels() {

  var range = document.getElementById("slider");
  
  // get the inner "ticks" div 
  //var ticks = document.getElementById("ticks");
  var ticks = document.getElementById("ticks");
  
  var array = ["Very negative", "Negative", "Neutral", "Positive", "Very positive"]

  // for item in label array:
  array.forEach(function (item, index) {
  		var span = document.createElement("SPAN");
  
  		span.textContent = item;
  		span.setAttribute('class', 'tick');
  		span.style.left = (index/5*100)+'%';
  		ticks.append(span);
        
	});
}


$(document).ready(function() {

	rangeslider = document.getElementById("rangeslider");
	output = document.getElementById("demo");
	output.innerHTML = rangeslider.value;

	rangeslider.oninput = function getSliderValue() {
		output.innerHTML = this.value;
	}

	set_tick_labels();

	$.getJSON("questions.json").done(function(data) { 
        comments = data;
    });

});





