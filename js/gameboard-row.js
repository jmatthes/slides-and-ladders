function GameboardRow(rowNumber, startNumber, rowSize, shouldIAddToStartNumber) {
    this.rowNumber = rowNumber;  
    this.startNumber = startNumber;  
    this.rowSize = rowSize;  
    this.shouldIAddToStartNumber = shouldIAddToStartNumber;  
    this.nextNumberToUse = startNumber;
    this.rowCounter = 0;

    this.nextNumber = function () {
    		var returnNumber = 0;
    	    if(this.rowCounter < this.rowSize){
	    		returnNumber = this.nextNumberToUse;
	    	    	if(this.shouldIAddToStartNumber){
	    	    		this.nextNumberToUse++;
	    	    	}else{
	    	    		this.nextNumberToUse--;
	    	    	}
    	    	
    	    	    this.rowCounter++;
    	    	    return returnNumber;
    	    }else{
    	    		return -1;
    	    }
    };  
}


function LadderOrChute(start, end, isLadder, description) {
    this.start = start;  
    this.end = end;  
    this.isLadder = isLadder;  
    this.description = description;  
   
}

