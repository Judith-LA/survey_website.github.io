var rangeslider;
var output;
var comments;
var index;
var i=0;
var answers = {id: [], rate: []};
var startDate;
var endDate;

function toSurvey() {
 	location.replace("survey.html");
}

function toInstructions() {
	location.replace("index.html");
}


function loadIndex(){
    var parameters = location.search.substring(1).split("&");

    if (parameters != ""){
	    var temp = parameters[0].split("=");
	    document.getElementById("info").name = unescape(temp[0]);
	    document.getElementById("info").value = unescape(temp[1]);
	}
}

function set_tick_labels() {

  var range = document.getElementById("slider");
  
  var ticks = document.getElementById("ticks");
  
  var array = ["Negativ", "Eher negativ", "Neutral", "Eher positiv", "Positiv"]

  array.forEach(function (item, index) {
  		var span = document.createElement("SPAN");
  
  		span.textContent = item;
  		span.setAttribute('class', 'tick');
  		span.style.left = (index/14*100-12)+'%';
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
		comment_title.textContent = '';
	} else {
		comment_title.textContent = title;
	}

	comment_text.textContent = comments["text"][index[i]];
}

function displayInfo(){
	//set_tick_labels();

	var parameters = location.search.substring(1).split("&");
	
	if (parameters != ""){
		var temp = parameters[0].split("=");
		var data_file = "standard_" + unescape(temp[1]) + ".json";
	} else {
		var data_file = "standard_test.json";
	}

	$.getJSON(data_file).done(function(data) { 
	    comments = data;
	    add_comment(i);
	});
	
	startDate = new Date();
}

function nextQuestion(){
	answers.id.push(document.getElementById('postid').value);
	answers.rate.push(document.querySelector('input[name="Options"]:checked').value);
	if (i >= 4){
		document.getElementById('next').hidden = true;
		document.getElementById('finish').hidden = false;
	}
	document.querySelector('input[name="Options"]:checked').checked = false;
	i = i+1;
	add_comment(i);
}

function endSurvey(){
	endDate = new Date();
	
	answers.id.push(document.getElementById('postid').value);
	answers.rate.push(document.querySelector('input[name="Options"]:checked').value);
	
	sessionStorage.setItem("rates", JSON.stringify(answers));
	sessionStorage.setItem("surveyTime", (endDate - startDate)/1e3);
	
	var token = document.getElementById('recaptchaResponse').value;
	$.ajax({
		url: "captcha.php",
		type: "POST",
		data: {recaptcha_response:token},
		success: function(result){
			var captcha = JSON.parse(result);
			sessionStorage.setItem("score",captcha.score);
		},
	});
	
	location.href = "survey_end.html";
}

function loadRates(){
	document.getElementById("rates").textContent = sessionStorage.getItem("rates");
	
	var surveyTime = sessionStorage.getItem("surveyTime");
	var hours = Math.floor((surveyTime)/3600);
	var minutes = Math.floor((surveyTime)%3600/60);
	var seconds = Math.floor((surveyTime)%60);

	document.getElementById("survey_time").textContent = hours.toString()+':'+minutes.toString()+':'+seconds.toString();
	
	
	document.getElementById("score").textContent = sessionStorage.getItem("score");
}


