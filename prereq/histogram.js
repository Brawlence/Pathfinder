"use strict"; // if won't work, disable

const ROLLS = 100000;
const CHARS = 100000;
// const SCALE = 190;
const modi = [ -5, -5,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,2,2,3, 3, 4, 4];
const cost = [-10,-10,-8,-8,-6,-6,-4,-4,-2,-1,0,1,2,3,5,7,10,13,17]; // значения стоимости покупки ниже -4 приблизительные — в таблице их не было

function maxThreeFromFour() {
    var dice = [0,0,0,0];
    for (var i=0;i<4;i++) {
        dice[i] = Math.floor(Math.random() * 6.0) + 1;
    };
    dice = dice.sort();
    return dice[1]+dice[2]+dice[3];
}

function printHisto(histogram) {
    var SCALE = Math.floor(document.getElementById('histoControl').offsetLeft / 9) - 20;
    var output = "";
    var maxVal = 0;
    for (var v=0;v < histogram.length; v++) {
        maxVal = Math.max(maxVal,histogram[v]);
    };
    for (var v=0;v < histogram.length; v++) {
        var tempstr = "",
            spacer1 = " ",
            spacer2 = "";
        if (v < 10) spacer1 = "  ";
        var histogram_corr = histogram[v] * SCALE / maxVal;
        var histogram_pres = (1.0 * histogram[v])/ROLLS;
        for (var d = histogram_pres.toString().length; d < 10; d++ ) { spacer2 = spacer2 + " "; };
        for (var k=0;k<histogram_corr;k++) { tempstr = tempstr + "*"; };
        if (histogram_pres > 0) output = output + v + spacer1 + histogram_pres + spacer2 + tempstr + "\n";
    };
    return output;
}


function histo(){
	if (document.getElementById('elderMagicField') === null) {
		const elderMagicField = document.body.appendChild(document.createElement('textarea'));
			elderMagicField.id = "elderMagicField";
			elderMagicField.style = "top: 5%; left: 5%; height: 90%; width: 90%; position: fixed; z-index: 255;  border-width: 3px; border-style: solid; border-color: black;";
            elderMagicField.value = "...";

        var histogram = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var costHistogram = [];
            for (var i = 0; i < 111; i++) {
                costHistogram[i] = 0;
            }
        for (var j = 0; j < ROLLS; j++) {
            histogram[maxThreeFromFour()]++;
        };
        elderMagicField.value = "Stat distribution histogram:\n\n" + printHisto(histogram);

        // если все характеристики =< 13, либо сумма модификаторов =< +3 - переброс
    
        for (var k = 0; k < CHARS; k++) {
            var tempChara = [10,10,10,10,10,10];
            var validStats = false;
            var validMods = false;
            var modiSum = 0,
                costSum = 0;
            for (var l = 0; l < tempChara.length; l++) {
                tempChara[l] = maxThreeFromFour();
                if (tempChara[l] > 13) validStats = true;
                modiSum = modiSum + modi[tempChara[l]];
            };
            if (modiSum > 3) validMods = true; 
            if ((validStats == true) && (validMods == true)) {
                for (var m = 0; m < tempChara.length; m++) {
                    costSum = costSum + cost[tempChara[m]];
                };
                costHistogram[costSum]++;
            };
        };
        elderMagicField.value = elderMagicField.value + "\nCost distribution histogram:\n\n" + printHisto(costHistogram);		
	} else {
		document.getElementById('elderMagicField').parentElement.removeChild(document.getElementById('elderMagicField'));
	}
}

function createHistoControl() {
    var histoDiv = document.createElement('div');
        histoDiv.id = "histoControl";
        histoDiv.innerHTML = "<img src=\"./prereq/pi.svg\" class=\"bw\" onclick=\"histo();\" title=\"Гистограммка!\"></img>";
    document.body.appendChild(histoDiv);
};

createHistoControl();
