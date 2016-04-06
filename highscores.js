//highscore variables
var numScores = 5;
var top_scores = [1000,999,800,505,100,70,55,49,45,36,19,12];

//highscore functions
function clearScores(){
	var curTable = document.getElementById("hsTable");
	while(curTable.rows.length > 1) {
  		curTable.deleteRow(1);
	}

}
function insertScore(newscore, newposition, scoreSize){
	var startpos = scoreSize;
	//accounts for inserting to non full array
	if(scoreSize == 15)
		startpos -= 1;
	//shifts all elements < newscore right
	for(i = startpos; i >= newposition; --i){
		top_scores[i] = top_scores[i-1];
	}
	//inserts new score to correct position
	top_scores[newposition] = newscore;
}
function addScore(curscore){
	var scoreSize = top_scores.length;
	var inserted = false;
	//check if score is > than any existing scores
	for(i = 0; i < scoreSize; ++i){
		if(curscore > top_scores[i]){
			insertScore(curscore, i, scoreSize);
			inserted = true;
			break;
		}
	}
	//if score ! > than existing score, but space in scores array
	if(!inserted && scoreSize < 15){
		top_scores.push(curscore);
		inserted = true;
	}
	if(inserted){
		clearScores();
		populateScores();
	}
}
function populateScores(){
	var curTable = document.getElementById("hsTable");
	for(i = 0; i < top_scores.length; ++i){
		var row = curTable.insertRow(i+1);
		var newcell = row.insertCell(0);
		newcell.innerHTML = i+1;
		newcell = row.insertCell(1);
		newcell.innerHTML = top_scores[i];
	}
}