var rangeslider;
var output;
var comments;
var index;
var i=0;
var answers = {id: [], rate: []};

function toSurvey() {
 	location.replace("survey.html");
}

function toInstructions() {
	location.replace("index.html");
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

function loadIndex(){
	var parameters = location.search.substring(1).split("&");
	
	if (parameters != null){
		var temp = parameters[0].split("=");
		document.getElementById("info").name = unescape(temp[0]);
		document.getElementById("info").value = unescape(temp[1]);
	}
}

function displayInfo(){
	rangeslider = document.getElementById("rangeslider");
	output = document.getElementById("demo");
	output.innerHTML = rangeslider.value;

	rangeslider.oninput = function getSliderValue() {
		output.innerHTML = this.value;
	}

	set_tick_labels();

	var parameters = location.search.substring(1).split("&");
	var temp = parameters[0].split("=");
	var data_file = "standard_" + unescape(temp[1]) + ".json";

	$.getJSON(data_file).done(function(data) { 
	    comments = data;
	    add_comment(i);
	});
}

function nextQuestion(){
	answers.id.push(document.getElementById('postid').value);
	answers.rate.push(document.getElementById('rangeslider').value);
	if (i >= 8){
		document.getElementById('next').style.display = 'none';
		document.getElementById('end_survey').style.display = 'block';
	}
	i = i+1;
	add_comment(i);
}

