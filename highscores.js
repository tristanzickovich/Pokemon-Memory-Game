//highscore variables
var numScores = 5;
var top_scores = [1000, 999, 800];
var score_times = [300, 250, 333];
var top_players = ["john", "john", "bill"];
//highscore functions
function clearScores(){
	var curTable = document.getElementById("hsTable");
	while(curTable.rows.length > 1) {
  		curTable.deleteRow(1);
	}
	top_scores = [];
	score_times = [];
	top_players = [];
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
}
function addScore(curscore, curtime, player){
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
	}
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