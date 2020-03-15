const ROLLS = 100000;
const CHARS = 100000;
const SCALE = 200;
const modi = [ -5, -5,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,2,2,3, 3, 4, 4];
const cost = [-10,-10,-8,-8,-6,-6,-4,-4,-2,-1,0,1,2,3,5,7,10,13,17]; // значения стоимости покупки ниже -4 приблизительные — в таблице их не было

function maxThreeFromFour() {
    dice = [0,0,0,0];
    for (i=0;i<4;i++) {
        dice[i] = Math.floor(Math.random() * 6.0) + 1;
    };
    dice = dice.sort();
    return dice[1]+dice[2]+dice[3];
}

function printHisto(histogram) {
    maxVal = 0;
    for (v=0;v < histogram.length; v++) {
        maxVal = Math.max(maxVal,histogram[v]);
    };
    for (v=0;v < histogram.length; v++) {
        tempstr = "";
        spacer1 = " ";
        spacer2 = "";
        if (v < 10) spacer1 = "  ";
        histogram_corr = histogram[v] * SCALE / maxVal;
        histogram_pres = (1.0 * histogram[v])/ROLLS;
        for (d = histogram_pres.toString().length; d < 10; d++ ) { spacer2 = spacer2 + " "; };
        for (k=0;k<histogram_corr;k++) { tempstr = tempstr + "*"; };
        if (histogram_pres > 0) console.log(v + spacer1 + histogram_pres + spacer2 + tempstr);
    };
}


function histo(){
    histogram = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    costHistogram = [];
        for (i = 0; i < 111; i++) {
            costHistogram[i] = 0;
        }
    for (j = 0; j < ROLLS; j++) {
        histogram[maxThreeFromFour()]++;
    };
    console.log("Stat distribution histogram:");
    printHisto(histogram);

    // если все характеристики =< 13, либо сумма модификаторов =< +3 - переброс
   
    for (k = 0; k < CHARS; k++) {
        tempChara = [10,10,10,10,10,10];
        validStats = false;
        validMods = false;
        modiSum = 0;
        costSum = 0;
        for (l = 0; l < tempChara.length; l++) {
            tempChara[l] = maxThreeFromFour();
            if (tempChara[l] > 13) validStats = true;
            modiSum = modiSum + modi[tempChara[l]];
        };
        if (modiSum > 3) validMods = true; 
        if ((validStats == true) && (validMods == true)) {
            for (m = 0; m < tempChara.length; m++) {
                costSum = costSum + cost[tempChara[m]];
            };
            costHistogram[costSum]++;
        };
    };
    console.log("Cost distribution histogram:");
    printHisto(costHistogram);
}
