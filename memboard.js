var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var scoreTotal = 0;
var totalTime = 0;
var runtimer;
//0 if not found, 1 if found: A-L
var found_tiles = [0,0,0,0,0,0,0,0,0,0,0,0];
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//added ***
function posTileFound(val){
	return val.charCodeAt() - 65;
}
function tileFound(val){
	if(found_tiles[posTileFound(val)]>0)
		return true;
	return false;
}
function updateScore(adjustment){
	//increase score
	if(adjustment > 0)
		scoreTotal += 100;
	else if (adjustment < 0)
		scoreTotal -= 20;
	else
		scoreTotal = 0;
	document.getElementById("scoreCounter").innerHTML = scoreTotal;
}
function gameTimer(){
	++totalTime;
	document.getElementById("timer").innerHTML = totalTime;
}
//***

function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2 && !tileFound(val)){
		tile.style.backgroundImage = "url('resizedpics/" + val + ".png')";
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1 && (memory_tile_ids[0] != tile.id)){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1] && (memory_tile_ids[0] != memory_tile_ids[1])){
				//true for increase score
				updateScore(1);
				found_tiles[posTileFound(val)]++;
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					window.clearInterval(runtimer);
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
					updateScore(0);
					document.getElementById("timer").innerHTML = "0";
					totalTime = 0;
					window.setInterval(gameTimer,1000);
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.backgroundImage = "url('resizedpics/pokeball.png')";
            	    tile_1.innerHTML = "";
            	    tile_2.innerHTML = "";
            	    tile_2.style.backgroundImage = "url('resizedpics/pokeball.png')";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				updateScore(-1);
				setTimeout(flip2Back, 700);
			}
		}
	}
}

runtimer = window.setInterval(gameTimer, 1000);