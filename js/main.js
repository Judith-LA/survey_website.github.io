var rangeslider;
var output;
var comments;
var jsonresponse;

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

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'standard_1.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    console.log(jsonresponse[0].name);

});

$(document).ready(function() {

	rangeslider = document.getElementById("rangeslider");
	output = document.getElementById("demo");
	output.innerHTML = rangeslider.value;

	rangeslider.oninput = function getSliderValue() {
		output.innerHTML = this.value;
	}

	set_tick_labels();

});





