var data = {
        cards:{
            deck:[],
            inHand:[],
            inTwo:[],
            used:[]
        },
        combinations: {
            inGame:[],
            notUsed:[],
            used:[]
        }
    };

/////////////// REORGANIZE

var tempCombinationsNotUsed =[];
var tempCombinationsUsed =[];
var k2z5 = [];
var k1z5= [];
var combsOfHand= [];
var combsOfHandLost= [];
var possibleComb=[];
var lostComb=[];


///////////////////////////////////////////

var Card = function(number,color){
    this.number=number;
    this.color=color;
};

for (var i = 1; i<9; i++){
    var redCards = new Card(i,"Red");
    var yellowCards = new Card(i,"Yellow");
    var blueCards = new Card(i,"Blue");
    data.cards.deck.push(redCards,yellowCards,blueCards)
    }

function findID(number,color){
    this.number=number;
    this.color=color;
    var i = 0;
    while ( i < data.cards.deck.length ){
        if (data.cards.deck[i].number===number && data.cards.deck[i].color===color){
            return i;
            i++;
        }
        else i++;
    }
}

function findHandID(number,color){
    this.number=number;
    this.color=color;
    var i = 0;
    while ( i < data.cards.inHand.length) {
        if (data.cards.inHand[i].number===number && data.cards.inHand[i].color===color){
            return i;
            i++;
        }
        else i++;
    }
}

function cardToHand(number,color,slot){
    this.number=number;
    this.color=color;
    this.slot= slot;
    if(color=="R"){
        color="Red";
    }
    if(color=="Y"){
        color="Yellow";
    }
    if(color=="B"){
        color="Blue";
    }
    var i = 0;
    while ( i < data.cards.deck.length ) {
        id=findID(number,color);
        if (id==i) {
            data.cards.inHand.push(data.cards.deck[id]);
            var o2={ slot: slot };
            let o3={
                ...data.cards.deck[id],
                ...o2
            };
            data.cards.inTwo.push(o3);
            data.cards.deck.splice(id,1);  
            i++;   
        }
        else i++;
    }
}


  


var Combinations = function(sequence,points,type,id,seqId){
    this.sequence=sequence;
    this.points=points;
    this.type=type;
    this.id=id;
    this.seqId=seqId;
};

var Combination = function(sequence,points,type,id){
    this.sequence=sequence;
    this.points=points;
    this.type=type;
    this.id=id;
};

		var a0 =new Combination("1-1-1", 20, 1,0);
		var a1 =new Combination("2-2-2", 30, 1,1);
		var a2 =new Combination("3-3-3", 40, 1,2);
		var a3 =new Combination("4-4-4", 50, 1,3);
		var a4 =new Combination("5-5-5", 60, 1,4);
		var a5 =new Combination("6-6-6", 70, 1,5);
		var a6 =new Combination("7-7-7", 80, 1,6);
		var a7 =new Combination("8-8-8", 90, 1,7);

		var a8 =new Combination("1-2-3", 50, 3,8);
		var a9 =new Combination("2-3-4", 60, 3,9);
		var a10 =new Combination("3-4-5", 70, 3,10);
		var a11 =new Combination("4-5-6", 80, 3,11);
		var a12 =new Combination("5-6-7", 90, 3,12);
		var a13 =new Combination("6-7-8", 100, 3,13);
    
		var a14 =new Combination("1-2-3", 10, 2,14);
		var a15 =new Combination("2-3-4", 20, 2,15);
		var a16 =new Combination("3-4-5", 30, 2,16);
		var a17 =new Combination("4-5-6", 40, 2,17);
		var a18 =new Combination("5-6-7", 50, 2,18);
		var a19 =new Combination("6-7-8", 60, 2,19);

data.combinations.inGame.push(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19);


        // 8+18+144=170 łącznie 
        //po 1 / 1x8= 8
function combinationGenerator(){
        for (var i=0; i<8; i++){
            var l= String(i+1)
            var value = (i+2)*10
            l=(l+l+l);
            var a= new Combinations(l, value, 1,i,"RYB");
            data.combinations.notUsed.push(a);
        }
        //po 3 / 3x6 = 18
        for (var i=0; i<6; i++){
            var l= String(i+1);
            var l2 = String(i+2);
            var l3 = String(i+3);
            var value = 50+i*10;
            var li=(l+l2+l3);
            var a= new Combinations(li, value, 3,i+8,"RRR");
            var b= new Combinations(li, value, 3,i+8,"YYY");
            var c= new Combinations(li, value, 3,i+8,"BBB");
            data.combinations.notUsed.push(a);
            data.combinations.notUsed.push(b);
            data.combinations.notUsed.push(c);     
        }
        //po 24 / 24*6=144
        var counter=0;
        for (var i=0; i<6; i++){  
            var l= String(i+1);
            var l2 = String(i+2);
            var l3 = String(i+3);
            var value = (i+1)*10;
            var li=(l+l2+l3);
            for (var h=0; h<3; h++){
            var first = "";
            var middle ="";
            var last ="";
            var sequencer="";       
            if(h===0){first="R";}
            else if(h===1){first="Y";}
            else if(h===2){first="B";}
            for(var j =0; j<3; j++){
            if(j===0){middle="R";}
            else if(j===1){middle="Y";}
            else if(j===2){middle="B";}
            for(var l = 0; l<3; l++){
            if(l===0){last="R";}
            else if(l===1){last="Y";}
            else if(l===2){last="B";}
            sequencer=first+middle+last;
            if (sequencer!="RRR" && sequencer!="YYY" && sequencer!="BBB"){
            counter+=1;
            var a= new Combinations(li, value, 2,i+14,sequencer, "X");    
            data.combinations.notUsed.push(a);  
                
            }
            }
            }
            }                
        } 
   for(var i=0; i<data.combinations.notUsed.length;i++){
       tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
   }    
}
combinationGenerator();

function singleCardMover(number,color){
    this.number=number;
    this.color=color;
    var i = 0;
    while ( i < data.cards.inHand.length ) {
        id=findHandID(number,color);
        if (id==i) {
            data.cards.used.push(data.cards.inHand[id]);
            data.cards.inHand.splice(id,1);
            data.cards.inTwo.splice(id,1);
            combinationsLeftRefresh(String(number),color[0]);                                          
            i++;
        }
        else i++;
    }
}

function findCombination(type,sequence,seqId){
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var i = 0;
    while ( i < data.combinations.notUsed.length ) {
        if (data.combinations.notUsed[i].type===type && data.combinations.notUsed[i].sequence===sequence && data.combinations.notUsed[i].seqId===seqId){
            return i;
        }
        else i++;
    }
}

function findTempCombination(type,sequence,seqId){
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var i = 0;
    while ( i <tempCombinationsNotUsed.length ) {
        if (tempCombinationsNotUsed[i].type===type && tempCombinationsNotUsed[i].sequence===sequence && tempCombinationsNotUsed[i].seqId===seqId){
            return i;
        }
        else i++;
    }
}

function findTempCombination2(type,sequence,seqId){
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var i = 0;
    while ( i <tempCombinationsUsed.length ) {
        if (tempCombinationsUsed[i].type===type && tempCombinationsUsed[i].sequence===sequence && tempCombinationsUsed[i].seqId===seqId){
            return i;
        }
        else i++;
    }
}

function combinationMover(type,sequence,seqId){
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var id=findCombination(type,sequence,seqId);
    var i = 0;
    while ( i < data.combinations.notUsed.length ) {  
        if (i===id) {
            data.combinations.used.push(data.combinations.notUsed[i]);
            data.combinations.notUsed.splice(i,1);
            i++;
       }else 
            i++;
    }
}

function tempCombinationMover(type,sequence,seqId){ 
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var id=findTempCombination(type,sequence,seqId);
    var i = 0;
    while ( i < tempCombinationsNotUsed.length ) {
        if (i===id) {
            tempCombinationsUsed.push(tempCombinationsNotUsed[id]);                          
            tempCombinationsNotUsed.splice(id,1);
            i++;
        }else 
            i++;
    }
}

function reversedTempCombinationMover(type,sequence,seqId){ 
    this.type=type;
    this.sequence=sequence;
    this.seqId=seqId;
    var id=findTempCombination2(type,sequence,seqId);
    var i = 0;
    while ( i < tempCombinationsUsed.length ) {
        if (i===id) {
            tempCombinationsNotUsed.push(tempCombinationsUsed[id]);                          
            tempCombinationsUsed.splice(id,1);
            i++;
        }else 
            i++;
    }
}

function multipleCardMover(number,color, number2, color2, number3, color3){
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    var multCardsTable=[];
    multCardsTable[0]=number;
    multCardsTable[1]=color;
    multCardsTable[2]=number2;
    multCardsTable[3]=color2;
    multCardsTable[4]=number3;
    multCardsTable[5]=color3;
    for(var i=0;i <6; i+=2){
singleCardMover(multCardsTable[i],multCardsTable[i+1]);
    }
}

function tempCombinationsReseter(){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];
    for(var i=0; i<data.combinations.notUsed.length;i++){
    tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
}

function multipleCardMoverCalc(number,color, number2, color2, number3, color3, number4, color4,number5, color5){
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    this.number4=number4;
    this.color4=color4;
    this.number5=number5;
    this.color5=color5;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;
    tempMultCardsTable[6]=number4;
    tempMultCardsTable[7]=color4;  
    tempMultCardsTable[8]=number5;
    tempMultCardsTable[9]=color5;  
    var x=0;
    //console.log(tempMultCardsTable);
    if(tempMultCardsTable[0]!== undefined){
       x=1;
    }if(tempMultCardsTable[2]!== undefined){
       x=3;
    }if(tempMultCardsTable[4]!== undefined){
       x=5;
    }if(tempMultCardsTable[6]!== undefined){
       x=7;
    }if(tempMultCardsTable[8]!== undefined){
       x=9;
    }
    for(var i=0;i <x; i+=2){
    combinationsLeftRefreshCalc(String(tempMultCardsTable[i]),tempMultCardsTable[i+1][0]);                                        
    }
                               
}

function singleCardMoverCalc(number,color){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    combinationsLeftRefreshCalc(String(tempMultCardsTable[0]),tempMultCardsTable[1][0]);                       
}

function oneOfFourCalc(number,color, number2, color2,number3, color3, number4, color4,number5, color5){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    this.number4=number4;
    this.color4=color4;
    this.number5=number5;
    this.color5=color5;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;
    tempMultCardsTable[6]=number4;
    tempMultCardsTable[7]=color4;
    tempMultCardsTable[8]=number5;
    tempMultCardsTable[9]=color5;    
    combinationsLeftRefreshCalc1of4(String(tempMultCardsTable[0]),tempMultCardsTable[1][0], String(tempMultCardsTable[2]),tempMultCardsTable[3][0], String(tempMultCardsTable[4]),tempMultCardsTable[5][0], String(tempMultCardsTable[6]),tempMultCardsTable[7][0], String(tempMultCardsTable[8]),tempMultCardsTable[9][0]);                    
}

function noneOnHand(number,color, number2, color2,number3, color3, number4, color4,number5, color5){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    this.number4=number4;
    this.color4=color4;
    this.number5=number5;
    this.color5=color5;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;
    tempMultCardsTable[6]=number4;
    tempMultCardsTable[7]=color4;
    tempMultCardsTable[8]=number5;
    tempMultCardsTable[9]=color5;    
    noneOnHandCalc(String(tempMultCardsTable[0]),tempMultCardsTable[1][0], String(tempMultCardsTable[2]),tempMultCardsTable[3][0], String(tempMultCardsTable[4]),tempMultCardsTable[5][0], String(tempMultCardsTable[6]),tempMultCardsTable[7][0], String(tempMultCardsTable[8]),tempMultCardsTable[9][0]);                      
}

function multipleCardMoverCalc2(number,color, number2, color2){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    combinationsLeftRefreshCalc2(String(tempMultCardsTable[0]),tempMultCardsTable[1][0],String(tempMultCardsTable[2]),tempMultCardsTable[3][0]);                       
}

function multipleCardMoverCalc3(number,color, number2, color2,number3, color3){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;    
    combinationsLeftRefreshCalc3(String(tempMultCardsTable[0]),tempMultCardsTable[1][0],String(tempMultCardsTable[2]),tempMultCardsTable[3][0],String(tempMultCardsTable[4]),tempMultCardsTable[5][0]);                       
}



function multipleCardMoverCalc4(number,color, number2, color2,number3, color3,number4, color4){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    this.number4=number4;
    this.color4=color4;    
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;
    tempMultCardsTable[6]=number4;
    tempMultCardsTable[7]=color4;      
    combinationsLeftRefreshCalc3(String(tempMultCardsTable[0]),tempMultCardsTable[1][0],String(tempMultCardsTable[2]),tempMultCardsTable[3][0],String(tempMultCardsTable[4]),tempMultCardsTable[5][0],String(tempMultCardsTable[6]),tempMultCardsTable[7][0]);                       
}



function multipleCardMoverCalc5(number,color, number2, color2,number3, color3){
    tempCombinationsUsed=[];
    tempCombinationsNotUsed=[];  
    for(var i=0; i<data.combinations.notUsed.length;i++){
        tempCombinationsNotUsed.push(data.combinations.notUsed[i]);
    }
    this.number=number;
    this.color=color;
    this.number2=number2;
    this.color2=color2;
    this.number3=number3;
    this.color3=color3;
    var tempMultCardsTable=[];
    tempMultCardsTable[0]=number;
    tempMultCardsTable[1]=color;
    tempMultCardsTable[2]=number2;
    tempMultCardsTable[3]=color2;
    tempMultCardsTable[4]=number3;
    tempMultCardsTable[5]=color3;    
    combinationsLeftRefreshCalc5(String(tempMultCardsTable[0]),tempMultCardsTable[1][0],String(tempMultCardsTable[2]),tempMultCardsTable[3][0],String(tempMultCardsTable[4]),tempMultCardsTable[5][0]);                       
}



function nthIndex(str, pat){
    var L= str.length, j= -1;
    var indexy=[];
    for (var i = 0; i<3; i++){
    if(j<L){
        j= str.indexOf(pat, j);
        if(j!=-1){
        indexy.push(j);    
        }
        if (j < 0) break;
        j++;
    }
    }
    return indexy;
}

function combinationsLeftRefresh(wantedNumber,wantedColor){
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    var y = 0;
    while ( y < data.combinations.notUsed.length ) {   
        var allNumber = data.combinations.notUsed[y].sequence;
        var allColors = data.combinations.notUsed[y].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        if(find==true){
        combinationMover(data.combinations.notUsed[y].type,data.combinations.notUsed[y].sequence,data.combinations.notUsed[y].seqId);
        }
        else y++;
    }
}

function combinationsLeftRefreshCalc(wantedNumber,wantedColor){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        if(find==true){    
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}

function combinationsLeftRefreshCalc1of4(wantedNumber,wantedColor,unwantedNumber2,unwantedColor2,unwantedNumber3,unwantedColor3,unwantedNumber4,unwantedColor4,unwantedNumber5,unwantedColor5){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    this.unwantedNumber2=unwantedNumber2;
    this.unwantedColor2=unwantedColor2;
    this.unwantedNumber3=unwantedNumber3;
    this.unwantedColor3=unwantedColor3;
    this.unwantedNumber4=unwantedNumber4;
    this.unwantedColor4=unwantedColor4;
    this.unwantedNumber5=unwantedNumber5;
    this.unwantedColor5=unwantedColor5;    
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        
        var colorSlots2= nthIndex(allColors,unwantedColor2);  
        var numberSlots2= nthIndex(allNumber,unwantedNumber2);
        var colorSlots3= nthIndex(allColors,unwantedColor3);  
        var numberSlots3= nthIndex(allNumber,unwantedNumber3);
        var colorSlots4= nthIndex(allColors,unwantedColor4);  
        var numberSlots4= nthIndex(allNumber,unwantedNumber4);
        var colorSlots5= nthIndex(allColors,unwantedColor5);  
        var numberSlots5= nthIndex(allNumber,unwantedNumber5);
        
        var find = colorSlots.some(r=> numberSlots.includes(r));
        
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        var find3 = colorSlots3.some(r=> numberSlots3.includes(r));
        var find4 = colorSlots4.some(r=> numberSlots4.includes(r));
        var find5 = colorSlots5.some(r=> numberSlots5.includes(r));
        
        //console.log(find,find2,find3,find4);
        
        if(find==true && find2==false && find3==false && find4==false && find5==false){    
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}

function noneOnHandCalc(unwantedNumber,unwantedColor,unwantedNumber2,unwantedColor2,unwantedNumber3,unwantedColor3,unwantedNumber4,unwantedColor4,unwantedNumber5,unwantedColor5){ 
    this.unwantedNumber=unwantedNumber;
    this.unwantedColor=unwantedColor;
    this.unwantedNumber2=unwantedNumber2;
    this.unwantedColor2=unwantedColor2;
    this.unwantedNumber3=unwantedNumber3;
    this.unwantedColor3=unwantedColor3;
    this.unwantedNumber4=unwantedNumber4;
    this.unwantedColor4=unwantedColor4;
    this.unwantedNumber5=unwantedNumber5;
    this.unwantedColor5=unwantedColor5;    
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,unwantedNumber);  
        var numberSlots= nthIndex(allNumber,unwantedColor);
        var colorSlots2= nthIndex(allColors,unwantedColor2);  
        var numberSlots2= nthIndex(allNumber,unwantedNumber2);
        var colorSlots3= nthIndex(allColors,unwantedColor3);  
        var numberSlots3= nthIndex(allNumber,unwantedNumber3);
        var colorSlots4= nthIndex(allColors,unwantedColor4);  
        var numberSlots4= nthIndex(allNumber,unwantedNumber4);
        var colorSlots5= nthIndex(allColors,unwantedColor5);  
        var numberSlots5= nthIndex(allNumber,unwantedNumber5);
        
        var find = colorSlots.some(r=> numberSlots.includes(r));
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        var find3 = colorSlots3.some(r=> numberSlots3.includes(r));
        var find4 = colorSlots4.some(r=> numberSlots4.includes(r));
        var find5 = colorSlots5.some(r=> numberSlots5.includes(r));
        
        //console.log(find,find2,find3,find4);
        
        if(find==false && find2==false && find3==false && find4==false && find5==false){    
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}

function combinationsLeftRefreshCalc2(wantedNumber,wantedColor,wantedNumber2,wantedColor2){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    this.wantedNumber2=wantedNumber2;
    this.wantedColor2=wantedColor2;
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var colorSlots2= nthIndex(allColors,wantedColor2);  
        var numberSlots2= nthIndex(allNumber,wantedNumber2);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        if(find===true && find2===true){
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}

function combinationsLeftRefreshCalc3(wantedNumber,wantedColor,wantedNumber2,wantedColor2,wantedNumber3,wantedColor3){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    this.wantedNumber2=wantedNumber2;
    this.wantedColor2=wantedColor2;
    this.wantedNumber3=wantedNumber3;
    this.wantedColor3=wantedColor3;
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var colorSlots2= nthIndex(allColors,wantedColor2);  
        var numberSlots2= nthIndex(allNumber,wantedNumber2);
        var colorSlots3= nthIndex(allColors,wantedColor3);  
        var numberSlots3= nthIndex(allNumber,wantedNumber3);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        var find3 = colorSlots3.some(r=> numberSlots3.includes(r));
        if(find===true && find2===true && find3===true){
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}




function combinationsLeftRefreshCalc4(wantedNumber,wantedColor,wantedNumber2,wantedColor2,wantedNumber3,wantedColor3,wantedNumber4,wantedColor4){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    this.wantedNumber2=wantedNumber2;
    this.wantedColor2=wantedColor2;
    this.wantedNumber3=wantedNumber3;
    this.wantedColor3=wantedColor3;
    this.wantedNumber4=wantedNumber4;
    this.wantedColor4=wantedColor4;
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var colorSlots2= nthIndex(allColors,wantedColor2);  
        var numberSlots2= nthIndex(allNumber,wantedNumber2);
        var colorSlots3= nthIndex(allColors,wantedColor3);  
        var numberSlots3= nthIndex(allNumber,wantedNumber3);
        var colorSlots4= nthIndex(allColors,wantedColor4);  
        var numberSlots4= nthIndex(allNumber,wantedNumber4);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        var find3 = colorSlots3.some(r=> numberSlots3.includes(r));
        var find4 = colorSlots4.some(r=> numberSlots4.includes(r));
        if(find===true && find2===true && find3===true && find4===true){
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}

function combinationsLeftRefreshCalc5(wantedNumber,wantedColor,wantedNumber2,wantedColor2,wantedNumber3,wantedColor3){ 
    this.wantedNumber=wantedNumber;
    this.wantedColor=wantedColor;
    this.wantedNumber2=wantedNumber2;
    this.wantedColor2=wantedColor2;
    this.wantedNumber3=wantedNumber3;
    this.wantedColor3=wantedColor3;
    var v = 0;
    while ( v < tempCombinationsNotUsed.length ) { 
        var allNumber = tempCombinationsNotUsed[v].sequence;
        var allColors = tempCombinationsNotUsed[v].seqId;
        var colorSlots= nthIndex(allColors,wantedColor);  
        var numberSlots= nthIndex(allNumber,wantedNumber);
        var colorSlots2= nthIndex(allColors,wantedColor2);  
        var numberSlots2= nthIndex(allNumber,wantedNumber2);
        var colorSlots3= nthIndex(allColors,wantedColor3);  
        var numberSlots3= nthIndex(allNumber,wantedNumber3);
        var find = colorSlots.some(r=> numberSlots.includes(r));
        var find2 = colorSlots2.some(r=> numberSlots2.includes(r));
        var find3 = colorSlots3.some(r=> numberSlots3.includes(r));
        //console.log(find);
        //console.log(find2);
        //console.log(find3);
        if(find===true || find2===true || find3===true){
        tempCombinationMover(tempCombinationsNotUsed[v].type,tempCombinationsNotUsed[v].sequence,tempCombinationsNotUsed[v].seqId); 
        }
        else v++;     
    }
}




function test(){
var k2z4=[];    
var k3z4=[];   
var k4z5=[];    
var test2=[];
var onHand=[];    

 
for (let i = 0; i < data.cards.inHand.length - 1; i++) {
  for (let j = i + 1; j < data.cards.inHand.length; j++) {
        for (let k = j + 1; k < data.cards.inHand.length; k++) {
    k3z4.push([data.cards.inHand[i],data.cards.inHand[j],data.cards.inHand[k]]);
  }
}
}

for (var i = 0; i<k3z4.length;i++){   
multipleCardMoverCalc3(k3z4[i][0].number,k3z4[i][0].color,k3z4[i][1].number,k3z4[i][1].color,k3z4[i][2].number,k3z4[i][2].color);
if(tempCombinationsUsed.length!==0){
onHand.push(tempCombinationsUsed[0]);    
}
}
if(onHand!=0){
var combCardsIndexAll=[]    
for(var for200=0; for200<onHand.length;for200++){
//console.log(onHand[for200]);
var combCardsIndex=[];     
for(var for201=0;for201<3;for201++){
//console.log(parseInt(onHand[for200].sequence[for201]),onHand[for200].seqId[for201]);
for(var for202=0;for202<5;for202++){
if(data.cards.inHand[for202].number==parseInt(onHand[for200].sequence[for201]) && onHand[for200].seqId[for201]==data.cards.inHand[for202].color[0]){
combCardsIndex.push(for202);    
}  
}
}
//console.log(combCardsIndex);
combCardsIndexAll.push(combCardsIndex);     
}
//console.log(combCardsIndexAll);
}    
  
for (let i = 0; i < data.cards.inHand.length; i++) {
var k4z5pom=[];
for (let j = 0; j < data.cards.inHand.length; j++) {   
     if(i!==j){
     k4z5pom.push(data.cards.inHand[j]);
    }
}
k4z5.push(k4z5pom);   
}   
   
var k2z4exp=[];
var k2z4allComb=[];
var k4z5allComb=[];    
for(var for29=0; for29<k4z5.length;for29++){
//console.log(k4z5[for29]);  
k2z4=[];
 for (let i = 0; i < k4z5[for29].length - 1; i++) {

  for (let j = i + 1; j < k4z5[for29].length; j++) {     
      var pom1=[k4z5[for29][i].number,k4z5[for29][i].color];
      var pom2=[k4z5[for29][j].number,k4z5[for29][j].color];
      var pom=[pom1,pom2];
      k2z4.push(pom);
  }
}  
k2z4allComb=[];
for (var for30=0; for30<k2z4.length;for30++){
k2z4Combinations=[];  
multipleCardMoverCalc2(k2z4[for30][0][0],k2z4[for30][0][1],k2z4[for30][1][0],k2z4[for30][1][1]);
if(tempCombinationsUsed!=0){ 
var find = onHand.some(r=> tempCombinationsUsed.includes(r));  
if (find===true){
var subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) );
var tempCombinationsUsed2 = subtractTwoArrays(tempCombinationsUsed, onHand);
}else{
var tempCombinationsUsed2=tempCombinationsUsed;     
}    
Array.prototype.push.apply(k2z4Combinations,tempCombinationsUsed2);
//console.log(k2z4[for30]);     
//console.log(k2z4Combinations);  
Array.prototype.push.apply(k2z4allComb,k2z4Combinations);
}  
}
//console.log(k2z4allComb);   
var k2z4CombinationsPoints=0;  
for(var for31=0; for31<k2z4allComb.length;for31++){  
k2z4CombinationsPoints+=k2z4allComb[for31].points;   
}
//console.log([k2z4CombinationsPoints*((1/data.cards.deck.length)),k2z4allComb.length]);    
var k4z5allCombPom=[k2z4CombinationsPoints*((1/data.cards.deck.length)),k2z4allComb.length]  ;   
k4z5allComb.push(k4z5allCombPom);  
}
        
for(var for106=0; for106<k2z4allComb.length;for106++){
   //console.log(k2z4allComb[for106]);
    var s1=[parseInt(k2z4allComb[for106].sequence[0]),k2z4allComb[for106].seqId[0]];
    var s2=[parseInt(k2z4allComb[for106].sequence[1]),k2z4allComb[for106].seqId[1]];
    var s3=[parseInt(k2z4allComb[for106].sequence[2]),k2z4allComb[for106].seqId[2]];
    }
    

var merged1=[];    
for (var for99 =0; for99<k4z5.length;for99++){
var oneOfForPom=[];    
for (var for100=0;for100<k4z5[for99].length;for100++){
oneOfForPom.push(k4z5[for99][for100]);       
}
var merged0=[];    
oneOfFourCalc(oneOfForPom[0].number,oneOfForPom[0].color, oneOfForPom[1].number,oneOfForPom[1].color,oneOfForPom[2].number,oneOfForPom[2].color,oneOfForPom[3].number,oneOfForPom[3].color,data.cards.inHand[for99].number,data.cards.inHand[for99].color);
//console.log(tempCombinationsUsed);  
Array.prototype.push.apply(merged0,tempCombinationsUsed); 

    
oneOfFourCalc(oneOfForPom[1].number,oneOfForPom[1].color, oneOfForPom[2].number,oneOfForPom[2].color,oneOfForPom[3].number,oneOfForPom[3].color,oneOfForPom[0].number,oneOfForPom[0].color,data.cards.inHand[for99].number,data.cards.inHand[for99].color);
//console.log(tempCombinationsUsed);      
Array.prototype.push.apply(merged0,tempCombinationsUsed); 
 
oneOfFourCalc(oneOfForPom[2].number,oneOfForPom[2].color, oneOfForPom[3].number,oneOfForPom[3].color,oneOfForPom[0].number,oneOfForPom[0].color,oneOfForPom[1].number,oneOfForPom[1].color,data.cards.inHand[for99].number,data.cards.inHand[for99].color);    
Array.prototype.push.apply(merged0,tempCombinationsUsed); 
      
oneOfFourCalc(oneOfForPom[3].number,oneOfForPom[3].color, oneOfForPom[0].number,oneOfForPom[0].color,oneOfForPom[1].number,oneOfForPom[1].color,oneOfForPom[2].number,oneOfForPom[2].color,data.cards.inHand[for99].number,data.cards.inHand[for99].color);    
Array.prototype.push.apply(merged0,tempCombinationsUsed); 
merged1.push(merged0);    
}
var mergedRes=[];
    
for(var for101=0; for101<merged1.length;for101++){
    //console.log(merged1[for101]);
    var mergedSUM=0;
    for(var for102=0;for102<merged1[for101].length;for102++){
        mergedSUM+=merged1[for101][for102].points;
    }
    mergedRes.push([mergedSUM*((1/data.cards.deck.length)*(1/(data.cards.deck.length-1))),merged1[for101].length]);
}    
    
var noneOnHandValue=[];
noneOnHand(data.cards.inHand[0].number,data.cards.inHand[0].color,data.cards.inHand[1].number,data.cards.inHand[1].color,data.cards.inHand[2].number,data.cards.inHand[2].color,data.cards.inHand[3].number,data.cards.inHand[3].color,data.cards.inHand[4].number,data.cards.inHand[4].color);      
Array.prototype.push.apply(noneOnHandValue,tempCombinationsUsed);     
//console.log(noneOnHandValue);
var noneOnHandSUM=0;    
for(var for103=0;for103<noneOnHandValue.length;for103++){
noneOnHandSUM+=noneOnHandValue[for103].points; 
}    
noneOnHandSummary=[(noneOnHandSUM*((1/data.cards.deck.length)*(1/(data.cards.deck.length-1))*(1/(data.cards.deck.length-2)))),noneOnHandValue.length];            
 
// #TOMMY


//console.log(data.cards.inTwo);     
var ExpValComb=[]
 for(var tomy00=0;tomy00<5;tomy00++){      
    var b=k4z5allComb[tomy00][1]+mergedRes[tomy00][1];
    if(isNaN(k4z5allComb[tomy00][0])){
       var a=mergedRes[tomy00][0];
       }else if(isNaN(mergedRes[tomy00][0])){
        var a=k4z5allComb[tomy00][0];        
                }else{
                 var a=k4z5allComb[tomy00][0]+mergedRes[tomy00][0];  
                }
    //console.log([a,b]);
    ExpValComb.push([a,b])
}
var indexOfHighestt=indexOfHighest(ExpValComb);  //
console.log(data.cards.deck);
console.log(data.cards.inHand); 
console.log(ExpValComb);


if (noneOnHandSummary[1]!=0 || (ExpValComb[0][1] !=0 || ExpValComb[1][1] !=0 ||ExpValComb[2][1] !=0 || ExpValComb[3][1] !=0 || ExpValComb[4][1])  ){    
if(onHand==0){   
//var indexOfHighestt=indexOfHighest(ExpValComb);  
if(indexOfHighestt[1].length>1){
//console.log(indexOfHighestt);
if(indexOfHighestt[3].length>1){
//console.log(indexOfHighestt[1]); 
min = Math.ceil(0);
max = Math.floor(indexOfHighestt[1].length);
var zmienLos= Math.floor(Math.random() * (max - min)) + min;
var usuwana = indexOfHighestt[1][zmienLos];     
UIsingleCardMover(usuwana); //zdjąć komentarz
singleCardMover(data.cards.inHand[usuwana].number,data.cards.inHand[usuwana].color);     
for(var tomy04 = 0; tomy04<indexOfHighestt[1].length; tomy04++){
//console.log(indexOfHighestt[1][tomy04]);      
}  
}    
}else{
UIsingleCardMover(indexOfHighestt[1][0]); //zdjąć komentarz
singleCardMover(data.cards.inHand[indexOfHighestt[1][0]].number,data.cards.inHand[indexOfHighestt[1][0]].color);       
}     
}else{
console.log('kombinacja która z nich najbardziej się opłaca i czy się opłaca');
console.log(onHand);
console.log(onHand.length);
var sumsumTempComb=[];    
for(var for300 = 0; for300<onHand.length; for300++){
//console.log(onHand[for300]);

multipleCardMoverCalc5(onHand[for300].sequence[0],onHand[for300].seqId[0],onHand[for300].sequence[1],onHand[for300].seqId[1],onHand[for300].sequence[2],onHand[for300].seqId[2]);
//console.log(tempCombinationsUsed);  
//console.log(tempCombinationsNotUsed);
var sumtempCombinationsUsedPoints=0;
for(var for400=0;for400<tempCombinationsUsed.length;for400++){
    sumtempCombinationsUsedPoints+=tempCombinationsUsed[for400].points;
}
//console.log(sumtempCombinationsUsedPoints);    //marnowane
var sumtempCombinationsNotUsedPoints=0;
for(var for401=0;for401<tempCombinationsNotUsed.length;for401++){
    sumtempCombinationsNotUsedPoints+=tempCombinationsNotUsed[for401].points;
}
//console.log(sumtempCombinationsNotUsedPoints);       //zostawiane
sumsumTempComb.push([sumtempCombinationsUsedPoints,sumtempCombinationsNotUsedPoints]);     
}
console.log(sumsumTempComb);    
    

// 4, red
    
    
    
    
    
if(onHand.length>0){
var highestVal2 = 0;
var highestInd2=[];   
 for (var i = 0; i < onHand.length; i++) {
    //console.log(a[i][0]);
     if(onHand[i].points === highestVal2){
    highestInd2.push(i);  
      }else if (onHand[i].points > highestVal2) {
    highestVal2 = onHand[i].points;
    highestInd2=[];      
    highestInd2.push(i);          
  }   
 }    
console.log([highestVal2,highestInd2]);  
console.log(highestInd2.length);    
console.log(indexOfHighestt); //fix
console.log(ExpValComb);  
console.log(noneOnHandSummary);        

    
if(onHand.length==1){
console.log("wyjebać to   sprawdzić czy wartooooooooooooooooooooooo:");
var k1= [parseInt(onHand[0].sequence[0]),onHand[0].seqId[0]];    
var k2= [parseInt(onHand[0].sequence[1]),onHand[0].seqId[1]]; 
var k3= [parseInt(onHand[0].sequence[2]),onHand[0].seqId[2]];

for(var tony97=4;tony97>=0;tony97--){
//console.log(data.cards.inHand[tony97]);  
if((data.cards.inHand[tony97].number==k1[0] && data.cards.inHand[tony97].color[0]==k1[1]) || 
   (data.cards.inHand[tony97].number==k2[0] && data.cards.inHand[tony97].color[0]==k2[1]) || 
   (data.cards.inHand[tony97].number==k3[0] && data.cards.inHand[tony97].color[0]==k3[1]) ){
UIsingleCardMover(tony97);      
singleCardMover(data.cards.inHand[tony97].number,data.cards.inHand[tony97].color);
}
}   
}   
else if(onHand.length>1 && highestVal2>indexOfHighestt[0] && highestInd2.length==1){
//console.log("1 najwyższa kilka słabszych");   
var k1= [parseInt(onHand[highestInd2].sequence[0]),onHand[highestInd2].seqId[0]];    
var k2= [parseInt(onHand[highestInd2].sequence[1]),onHand[highestInd2].seqId[1]]; 
var k3= [parseInt(onHand[highestInd2].sequence[2]),onHand[highestInd2].seqId[2]];

for(var tony97=4;tony97>=0;tony97--){
if((data.cards.inHand[tony97].number==k1[0] && data.cards.inHand[tony97].color[0]==k1[1]) || 
   (data.cards.inHand[tony97].number==k2[0] && data.cards.inHand[tony97].color[0]==k2[1]) || 
   (data.cards.inHand[tony97].number==k3[0] && data.cards.inHand[tony97].color[0]==k3[1]) ){
UIsingleCardMover(tony97);      
singleCardMover(data.cards.inHand[tony97].number,data.cards.inHand[tony97].color);
}
}         
}else if(onHand.length>1 && highestVal2>indexOfHighestt[0] && highestInd2.length>1){
//console.log("kilka najwyższych"); 
var fewHighestArr=[];    
for(var for219=0;for219<combCardsIndexAll.length;for219++){
fewHighestArr.push([ExpValComb[combCardsIndexAll[for219][0]][0]+ExpValComb[combCardsIndexAll[for219][1]][0]+ExpValComb[combCardsIndexAll[for219][2]][0],ExpValComb[combCardsIndexAll[for219][0]][1]+ExpValComb[combCardsIndexAll[for219][1]][1]+ExpValComb[combCardsIndexAll[for219][2]][1]]);    
}      
console.log(fewHighestArr);

var indexOfHighesttt=indexOfHighest(fewHighestArr);
console.log(indexOfHighesttt);      
if(indexOfHighesttt[1].length>1){  
if(indexOfHighesttt[3].length>1){
min = Math.ceil(0);
max = Math.floor(indexOfHighesttt[1].length);
var zmienLos= Math.floor(Math.random() * (max - min)) + min;
var wybierana = indexOfHighesttt[1][zmienLos];
console.log(wybierana);
console.log("wyjebać to:");    
console.log(onHand[wybierana]);
    

var slociki=[];     
var k1= [parseInt(onHand[wybierana].sequence[0]),onHand[wybierana].seqId[0]];    
var k2= [parseInt(onHand[wybierana].sequence[1]),onHand[wybierana].seqId[1]]; 
var k3= [parseInt(onHand[wybierana].sequence[2]),onHand[wybierana].seqId[2]];

for(var tony97=4;tony97>=0;tony97--){
console.log(data.cards.inHand[tony97]);  
if((data.cards.inHand[tony97].number==k1[0] && data.cards.inHand[tony97].color[0]==k1[1]) || 
   (data.cards.inHand[tony97].number==k2[0] && data.cards.inHand[tony97].color[0]==k2[1]) || 
   (data.cards.inHand[tony97].number==k3[0] && data.cards.inHand[tony97].color[0]==k3[1]) ){
UIsingleCardMover(tony97);      
singleCardMover(data.cards.inHand[tony97].number,data.cards.inHand[tony97].color);
}
}      
    
}        
}else if(indexOfHighesttt[1].length==1){
    //console.log(indexOfHighesttt[1]);
    console.log("wyjebać to:");
    console.log(onHand[indexOfHighesttt[1]]);
    
}   
}else if(highestVal2<indexOfHighestt[0]){
//console.log("nieopłacalne bo wyższa w dalszych kartach ");
/////////////////////////// sprawdzić //////////////////////////////////////////////////    
if(indexOfHighestt[1].length>1){
//console.log(indexOfHighestt);
if(indexOfHighestt[3].length>1){
//console.log(indexOfHighestt[1]); 
min = Math.ceil(0);
max = Math.floor(indexOfHighestt[1].length);
var zmienLos= Math.floor(Math.random() * (max - min)) + min;
var usuwana = indexOfHighestt[1][zmienLos];     
UIsingleCardMover(usuwana);  // zdjąć komentarz
singleCardMover(data.cards.inHand[usuwana].number,data.cards.inHand[usuwana].color);        
for(var tomy04 = 0; tomy04<indexOfHighestt[1].length; tomy04++){
//console.log(indexOfHighestt[1][tomy04]);      
}  
}    
}else{
UIsingleCardMover(indexOfHighestt[1][0]);
singleCardMover(data.cards.inHand[indexOfHighestt[1][0]].number,data.cards.inHand[indexOfHighestt[1][0]].color);        
}    
/////////////////////////////////////////////////////////////////////////////////////      
//wybrac karte do odrzucenia
}
}  
//console.log(combCardsIndexAll);   
}}else{
console.log('koniec gry'); 
console.log(ExpValComb[0][1]);   
console.log(ExpValComb[1][1]);   
    console.log(ExpValComb[2][1]);   
    console.log(ExpValComb[3][1]);   
    console.log(ExpValComb[4][1]); 
    console.log(noneOnHandSummary);
    
//koniec gry  
//odświeżyć strone
}
    
}

function indexOfHighest(a) {
var highestVal = 0;
var highestInd=[];
var highestCombCount=0;
var highestCombCountInd=[]; 
 for (var i = 0; i < a.length; i++) {
    //console.log(a[i][0]);
     if(a[i][0] === highestVal){
    highestInd.push(i);  
      }else if (a[i][0] > highestVal) {
    highestVal = a[i][0];
    highestInd=[];      
    highestInd.push(i);          
  }
 }
if (highestInd.length>1){
    //console.log("dwa cyce");
    for(var tony02=0;tony02<highestInd.length;tony02++){
       //console.log(a[highestInd[tony02]]);
        if(a[highestInd[tony02]][1]===highestCombCount){
         highestCombCountInd.push(tony02);   
        }else if(a[highestInd[tony02]][1]>highestCombCount){
        highestCombCount=a[highestInd[tony02]][1]; 
        highestCombCountInd=[];          
        highestCombCountInd.push(tony02);          
        }
        }
}   
   return [highestVal,highestInd,highestCombCount,highestCombCountInd];
} 


function printID(e){
    e = e || window.event;
    e = e.target || e.srcElement;
    if(e.id!=""){
        //console.log(e);
        //console.log(data.cards.inHand); 
        //console.log(data.cards.inHand2);  
        if(data.cards.inHand.length<5){
        //cardToHand(parseInt(e.id[0]),e.id[1],'x');  
        var x = e.id;
    for(var for111=0;for111<5;for111++){
    var currImage=document.getElementById("h"+String(for111)).src;
    document.getElementById(x).style.display="none";
    var currImageLen = currImage.length-9;
    if(currImage.substring(currImageLen)=="blank.png"){
        document.getElementById("h"+String(for111)).className="imageWhite";
        document.getElementById("h"+String(for111)).src = "img/"+x+".png";
        cardToHand(parseInt(e.id[0]),e.id[1],for111); 
        break;
    }
    }
        }
    if(data.cards.inHand.length==5){
        test();
    } 
}       
}

function UIsingleCardMover(v){
this.v=v;
console.log(v);    
var thisID2="h"+v;    
var slotNUM=data.cards.inTwo[v].slot;
var thisID="h"+slotNUM;     
//singleCardMover(data.cards.inHand[v].number,data.cards.inHand[v].color); 
document.getElementById(thisID).className="imageRed";
document.getElementById(thisID).src="img/blank.png";    
}
