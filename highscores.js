//highscore variables
var top_scores = [];
var score_times = [];
var top_players = [];
var insertedpos = 0;

//highscore functions
//save data locally
function saveData(){
	var temp1 = JSON.stringify(top_scores);
	var temp2 = JSON.stringify(score_times);
	var temp3 = JSON.stringify(top_players);
	localStorage.setItem("topScores", temp1);
	localStorage.setItem("scoreTimes", temp2);
	localStorage.setItem("topPlayers", temp3);
}
//load local data
function loadData(){
	var temp1 = localStorage.getItem("topScores");
	var temp2 = localStorage.getItem("scoreTimes");
	var temp3 = localStorage.getItem("topPlayers");

	top_scores = JSON.parse(temp1);
	score_times = JSON.parse(temp2);
	top_players = JSON.parse(temp3);
	if(!top_scores){
		top_scores = [];
		score_times = [];
		top_players = [];
	}
}
//call to update HS values
loadData();
function clearScores(){
	var curTable = document.getElementById("hsTable");
	while(curTable.rows.length > 1) {
  		curTable.deleteRow(1);
	}
	top_scores = [];
	score_times = [];
	top_players = [];
	localStorage.clear();
}
function insertScore(newscore, newtime, player, newposition, scoreSize){
	var startpos = scoreSize;
	//accounts for inserting to non full array
	if(scoreSize == 15)
		startpos -= 1;
	//shifts all elements < newscore right
	for(i = startpos; i >= newposition; --i){
		top_scores[i] = top_scores[i-1];
		score_times[i] = score_times[i-1];
		top_players[i] = top_players[i-1];
	}
	//inserts new score to correct position
	top_scores[newposition] = newscore;
	score_times[newposition] = newtime;
	top_players[newposition] = player;
	insertedpos = newposition;
}
function addScore(curscore, curtime, player){
	loadData();
	var scoreSize = top_scores.length;
	var inserted = false;
	//check if score is > than any existing scores
	for(i = 0; i < scoreSize; ++i){
		if(curscore > top_scores[i]){
			insertScore(curscore, curtime, player, i, scoreSize);
			inserted = true;
			break;
		}
	}
	//if score ! > than existing score, but space in scores array
	if(!inserted && scoreSize < 15){
		top_scores.push(curscore);
		score_times.push(curtime);
		top_players.push(player);
		inserted = true;
		insertedpos = scoreSize;
	}
	saveData();
	return inserted;
}
function populateScores(){
	var curTable = document.getElementById("hsTable");
	for(i = 0; i < top_scores.length; ++i){
		var row = curTable.insertRow(i+1);
		//insert/populate cell for rank
		var newcell = row.insertCell(0);
		newcell.innerHTML = i+1;
		//insert/populate cell for score
		newcell = row.insertCell(1);
		newcell.innerHTML = top_scores[i];
		//insert/populate cell for time
		newcell = row.insertCell(2);
		newcell.innerHTML = score_times[i];
		//insert/populate cell for player names
		newcell = row.insertCell(3);
		newcell.innerHTML = top_players[i];
	}
}
function updateDesiredName(updatedName){
	loadData();
	top_players[insertedpos] = updatedName;
	saveData();
}