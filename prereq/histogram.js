const ROLLS = 10000;
const CHARS = 10000;

function maxThreeFromFour() {
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
    console.log("Stat distribution histogram:");
    for (v=0;v < histogram.length; v++) {
        tempstr = "";
        spacer1 = "";
        spacer2 = "";
        if (v < 10) spacer1 = " ";
        histogram_corr = histogram[v] * 100 / maxVal;
        histogram_pres = (1.0 * histogram[v])/ROLLS;
        switch (histogram_pres.toString().length) {
            case 1:
                spacer2 = "     ";
                break;
            case 2:
                spacer2 = "    ";
                break;
            case 3:
                spacer2 = "   ";
                break;
            case 4:
                spacer2 = "  ";
                break;
            case 5:
                spacer2 = " ";
                break;
            case 6:
                spacer2 = "";
                break;
            default:
                spacer2 = "";
                break;
        };
        for (k=0;k<histogram_corr;k++) {
            tempstr = tempstr + "*";
        };
        console.log(v + spacer1 + " " + histogram_pres + spacer2 +  " " + tempstr);
    }
}

function histo(){
    histogram = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    cost_histo = [];
    cost_histo = cost_histo.fill(0);
    diceSum = 0;
    dice = [0,0,0,0];
    for (j=0;j<ROLLS;j++) {
        diceSum = maxThreeFromFour();
        histogram[diceSum] = histogram[diceSum]+1;
    };
    printHisto(histogram);

    modi = [-5,-5,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,2,2,3,3,4,4]
    cost = [-4,-4,-4,-4,-4,-4,-4,-4,-2,-1,0,1,2,3,5,7,10,13,17];
    // если все характеристики =< 13, либо сумма модификаторов =< +3 - переброс
    
    for (i=0;i<CHARS;i++) {
        tempChara = [10,10,10,10,10,10];
        validMods = false;
        validStats = false;
        modiSum = 0;
        costSum = 0;
        for (j=0;j<6;j++) {
            tempChara[j] = maxThreeFromFour();
        };
        for (k=0;k<tempChara.length;k++) {
             if (tempChara[k] > 13) validStats = true;
             modiSum = 
        };

        // valid by Modi?

    };
}
