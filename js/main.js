var rangeslider;
var output;
var comments;
var index;

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

function add_comment(i){
	index = Object.keys(comments.postid);
	
	var comment_id = document.getElementById("postid");
	var comment_title = document.getElementById("title");
	var comment_text = document.getElementById("text");

	comment_id.value = comments.postid[index[i]];

	var title = comments["title"][index[i]];
	if (title==null){
		comment_title.textContent = '-';
	} else {
		comment_title.textContent = title;
	}

	comment_text.textContent = comments["text"][index[i]];
}


$(document).ready(function() {

	rangeslider = document.getElementById("rangeslider");
	output = document.getElementById("demo");
	output.innerHTML = rangeslider.value;

	rangeslider.oninput = function getSliderValue() {
		output.innerHTML = this.value;
	}

	set_tick_labels();

	$.getJSON("standard_1.json").done(function(data) { 
        comments = data;
	console.log(comments.title);
    	});

});

console.log(comments.text);
add_comment(0);



