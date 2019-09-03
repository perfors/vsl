var debugging = 0; 
var subjectID = ""; condition = ""; lasttime = "";
var conds = []; instructionChecks = []; pfInstructionChecks = []; testwords = [];
var startPauseVal = 250; minusPauseVal = 15; minPauseVal = 10; masklen = 200;
var longpauselen = 800; shortpauselen = 200; currpauselen = startPauseVal; 
var ind = 0; itemCorr = 0;
var onSL = true; ontest = false; onPR = false; onPC = false; 
var onPFtaskA = false; onPFtaskB = false;
var pfTypeA = ''; pfTypeB = '';
var pstimsetA = []; pstimsetB = []; distractors = []; 
var pfTaskAtargets = []; pfTaskBtargets = []; pfApauses = []; pfBpauses = []; // want to save this
var pfAanswers = []; pfBanswers = []; // want to save this
var easy = []; hard = [];  // want to save this
var easytriplets = []; hardtriplets = []; // want to save this
var stimset = []; words = []; wordseq = []; syllseq = []; trainseq = []; 
var englishwords = []; // want to save this
var testanswers = []; testitems = []; // want to save this
var patternrecogTarget = []; patterncompletionTarget = []; patterncompletionQuestion = [];
var patterncompletionFoils = []; patternrecogFoilsone = []; 
var patternrecogFoilstwo = []; patternrecogFoilsthree = [];
var exp_data = {};    hideElements();

// ********** START: this function runs automatically when the page is loaded
$(document).ready(function () {
  
    hideElements();
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ ) {
      subjectID += possible.charAt(Math.floor(Math.random() * possible.length));
    }
        
    if (!debugging) {
        var x = Math.floor(Math.random() * 2);
        if (x===0) {
          condition = 'letter';
        } else {
          condition = 'medium';
        } 
        showAll();
    } else {
        $('#demographics').show();
        $('#demographics').load('html/conditions.html');
        $('#next').show();
        $('#next').click(validateConditions);
    }
    
});

// ********** VALIDATECONDITIONS: get the condition they are using
function validateConditions() {
    
    conds = $('#conds').serializeArray();
    var ok = true;
  
    for (var i = 0; i < conds.length; i++) {
        // test for empty answers
        if (conds[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;
        }        
        if (conds[i].name === "condition") {
            condition = conds[i].value;
        }      
    }
  
    // goes to next section
    if (!ok) {
        $('#demographics').show();
        $('#demographics').load('html/conditions.html');
        $('#next').show();
        $('#next').click(validateConditions);
    } else {   
        hideElements();
        showAll();
    } 
}

// ********** showAll: shows all of the images, just to load them immediately
function showAll() {
  
  hideElements();
  $('#instructions').show();
  $('#instructions').load('html/showall.html'); 
  setTimeout(function() {showDemographics()},50);  
}


// ********** SHOWDEMOGRAPHICS: get demographic details
function showDemographics() {
    
    hideElements();
    $('#demographics').show();
    $('#demographics').load('html/demographics.html');
    $('#next').show();
    $('#next').click(validateDemographics);
}


// ********** VALIDATEDEMOGRAPHICS: check to make sure demographic information is all okay
function validateDemographics() {
  
    demographics = $('#demo').serializeArray();
    var ok = true;
    
    if (demographics.length != 5) {
      ok = false;
      alert('Please fill out all fields.');
      
    } else {
  
      for (var i = 0; i < demographics.length; i++) {
        // validate age
        if ((demographics[i].name == "age") && (/[^0-9]/.test(demographics[i].value))) {
            alert('Please only use numbers in age.');
            ok = false;
            break;
        }
        
        // test for empty answers
        if (demographics[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;
        }
        
        // link this to their worker ID
        if (demographics[i].name == "workerID") {
          demographics[i].value = demographics[i].value.toUpperCase();
          demographics[i].value = demographics[i].value.replace(/\s+/g, '');
          lasttime = getLastTime(demographics[i].value);
        }
      }
    }
  
    // goes to next section
    if (!ok) {
        showDemographics();
    } else {   
        showGeneralInstructions();
    }
}


// ********** SHOWGENERALINSTRUCTIONS: displays general experiment instructions
function showGeneralInstructions() {

    hideElements();
    setExperiment();
    $('#instructions').show();
    $('#instructions').load('html/instructions.html');
    $('#next').show();
    $('#next').click(showInstructionChecks);
}


// ********** SHOWINSTRUCTIONCHECKS: asks the questions confirming they have read the instructions
function showInstructionChecks() {
  
    hideElements();
    $('#instructionchecks').show();
    $('#instructionchecks').load('html/instructionchecks.html');    
    $('#next').show();
    $('#next').click(validateInstructionChecks);
}


// ********** VALIDATEINSTRUCTIONCHECKS: makes sure they answered the questions about instructions correctly
function validateInstructionChecks() {
  
    hideElements();  
    instructionChecks = $('#instr').serializeArray();

    var ok = true;
    for (var i = 0; i < instructionChecks.length; i++) {
        // check for incorrect responses
        if(instructionChecks[i].value != "correct") {
            alert('At least one answer was incorrect; please read the instructions and try again.');
            ok = false;
            break;
        }
        // check for empty answers 
        if (instructionChecks[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;    
        }
    }

    // where this is the number of questions in the instruction check
    if (instructionChecks.length != 3) {
        alert('You have not answered all of the questions; please try again.');
        ok = false;
    }

    // goes to next section
    if (!ok) {
        showSecondInstructions(); 
    } else {
        hideElements();
        getReady(); 
    }
}

// ********** SHOWSTATISTICALLEARNINGTRIAL: shows a single image in the standard SL task
function showStatisticalLearningTrial() {
  
  hideElements();
  pic = 'img/' + syllseq[ind];
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  
  setTimeout(function() {removePicture()},longpauselen);  
}

// ********** REMOVEPICTURE: removes the picture for shortpauselen milliseconds
function removePicture() {
  pic = 'img/white.jpg';
  ind = ind+1;
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  if (ind < syllseq.length) {
      setTimeout(function() {showStatisticalLearningTrial()},shortpauselen); 
  } else {
      onSL = false; ontest = true;
      setTimeout(function() {getEnglishSequence()},shortpauselen); 
  }
}




// ********** GETREADY: shows the page right before beginning the SL sequence
function getReady() {
    hideElements();
    ind = 0; lastRepeat = 0;
    corrSLrepeats = 0; incorrSLrepeats = 0;  
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text('Okay, you are all set!');
    });
    $('#next').show();
    $('#next').click(showStatisticalLearningTrial);
}

// ********** GETENGLISHSEQUENCE: has them report the words they saw
function getEnglishSequence() {
    hideElements();
    $('#demographics').show();
    $('#demographics').load('html/english.html');
    $('#next').show();
    $('#next').click(validateEnglishSequence);
}


// ********** VALIDATEENGLISHSEQUENCE: check to make sure they report the words right
function validateEnglishSequence() {
  
    englishwords = $('#english').serializeArray();
    var ok = true;
  
    if (englishwords[0].value == "") {
        alert('Please put your words in the text box.');
        ok = false;
    }
  
    // goes to next section
    if (!ok) {
        getEnglishSequence();
    } else {   
        showTestTrials();
    }
}


// ********** SHOWTESTTRIALS: begins the test trials
function showTestTrials() {
    hideElements();
    ind = 0; itemCorr = -1;
    var msg = "Thank you! The next step is to answer some questions about the sequence you just saw. The first set of questions involves us giving you a series of either two or four patterns. Your job is to click on which one looks most familiar to you from the sequence. We are  interested in what you think naturally, so do not overthink it, but do try to do your best.";
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(msg);
    });
    $('#next').show();
    $('#next').click(showPatternRecognitionTrial);
}


// ********** SHOWPATTERNRECOGNITIONTRIAL: shows a pattern recognition trial
function showPatternRecognitionTrial() {
    hideElements();
    onPR = true;
    var strA = ''; strB = ''; strC = '';
    var objects = getTestAnswers();
    $('#instructions').show();
    $('#instructions').load('html/patternrecognition.html', function () {
      for (var i=0; i<4; i++) {
        strA = '#'+(i+1)+'a';  strB = '#'+(i+1)+'b'; strC = '#'+(i+1)+'c'; 
        $(strA).attr('src','img/'+objects[i][0]); $(strA).on('click',{answer: i}, recordAnswer);
        $(strB).attr('src','img/'+objects[i][1]); $(strB).on('click',{answer: i}, recordAnswer);
        $(strC).attr('src','img/'+objects[i][2]); $(strC).on('click',{answer: i}, recordAnswer);
      }
      $('#two').on('click',{answer: 1}, recordAnswer);
      $('#one').on('click',{answer: 0}, recordAnswer);
      $('#three').on('click',{answer: 2}, recordAnswer);
      $('#four').on('click',{answer: 3}, recordAnswer);
      if (objects[2][0]=="white.jpg") {
        $('#three').attr('src','img/white.jpg'); $('#three').click("");
        $('#four').attr('src','img/white.jpg');  $('#four').click("");
      }
    });
}


// ********** recordAnswer: records an answer for the current trial
function recordAnswer(event) {

  var ans = event.data.answer;
  var listSize = 0;
  tempInd = ind;
  if (onPC) {
    tempInd = ind + patternrecogTarget.length;
    listSize = patterncompletionQuestion.length;
  } else if (onPR) {
    listSize = patternrecogTarget.length;
  }
  
  if (itemCorr===ans)  {
      testanswers[tempInd] = "correct";
  } else {
      testanswers[tempInd] = "incorrect";
  } 

  ind = ind+1; itemCorr=-1;
  $('#next').show();
  if (ind < listSize) {
    if (onPR) {
      showPatternRecognitionTrial();
    } else {
      showPatternCompletionTrial();
    }
  } else {
    if (onPR) {
      showMidTestTrial();
    } else if (onPC) {
      showEndSLTrials();
    }
  }
}

// ********** SHOWMIDTESTRIAL: shows the page right before beginning the pattern completion items
function showMidTestTrial() {
    hideElements();
    ind = 0; onPR = false; onPC = true;
    var str = 'Good job! That is most of the questions, but we have a few more. In these you will see part of a pattern, and be asked to choose the best symbol to complete it. As before, try not to overthink it but just choose the answer that feels best to you.'
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(str);
    });
    $('#next').show();
    $('#next').click(showPatternCompletionTrial);
}


// ********** SHOWPATTERNCOMPLETIONTRIAL: shows a pattern recognition trial
function showPatternCompletionTrial() {
    hideElements();
    var questionStr = ''; foilsStr = ''; 
    var objects = getTestAnswers();
    $('#instructions').show();
    $('#instructions').load('html/patterncompletion.html', function () {
      for (var i=0; i<3; i++) {
        questionStr = '#q'+(i+1);  foilsStr = '#foil'+(i+1); 
        $(questionStr).attr('src','img/'+patterncompletionQuestion[ind][i]); 
        $(foilsStr).attr('src','img/'+objects[i]); 
        $(foilsStr).on('click',{answer: i}, recordAnswer);
      }
      $('#one').on('click',{answer: 0}, recordAnswer);
      $('#two').on('click',{answer: 1}, recordAnswer);
      $('#three').on('click',{answer: 2}, recordAnswer);
    });
}



// ********** SHOWENDSLTRIALS: shows the page right at the end of both SL trials
function showEndSLTrials() {
    hideElements();
    ind = 0; onPC = false; onPR = false; onSL = false; onSLtest = false; onPFtaskA = true;
    $('#instructions').show();
    $('#instructions').load('html/pfinstructions.html'); 
    $('#next').show();
    $('#next').click(showPFInstructionChecks);
}


// ********** SHOWPFINSTRUCTIONCHECKS: asks the questions confirming they have read the instructions for the
// perceptual fluency task
function showPFInstructionChecks() {
  
    hideElements();
    $('#instructionchecks').show();
    $('#instructionchecks').load('html/pfinstructionchecks.html');    
    $('#next').show();
    $('#next').click(validatePFInstructionChecks);
}


// ********** VALIDATEPFINSTRUCTIONCHECKS: makes sure they answered the questions about PF instructions correctly
function validatePFInstructionChecks() {
  
    hideElements();  
    pfInstructionChecks = $('#instr').serializeArray();

    var ok = true;
    for (var i = 0; i < pfInstructionChecks.length; i++) {
        // check for incorrect responses
        if(pfInstructionChecks[i].value != "correct") {
            alert('At least one answer was incorrect; please read the instructions and try again.');
            ok = false;
            break;
        }
        // check for empty answers 
        if (pfInstructionChecks[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;    
        }
    }

    // where this is the number of questions in the instruction check
    if (pfInstructionChecks.length != 3) {
        alert('You have not answered all of the questions; please try again.');
        ok = false;
    }

    // goes to next section
    if (!ok) {
        showEndSLTrials(); 
    } else {
        flashTrial(); 
    }
}

// ********** FLASHTRIAL: flash up the target item in the perceptual fluency task
function flashTrial() {
  hideElements();
  if (onPFtaskA) {
    pfApauses[ind] = currpauselen;
    pic = 'img/' + pfTaskAtargets[ind];
  } else {
    pfBpauses[ind] = currpauselen;
    pic = 'img/' + pfTaskBtargets[ind];
  }
  $('#instructions').show();
  $('#instructions').load('html/flashtrial.html', function () {
    $('#stimulus').attr('src',pic);
  });
  
  setTimeout(function() {flashMask()},currpauselen); 
}

// ********** flashMask: put up a mask after the target in the perceptual fluency task
function flashMask() {
  
  getDistractors();
  pic = 'img/' + distractors[Math.floor(Math.random()*3)];
  $('#instructions').load('html/flashtrial.html', function () {
    $('#stimulus').attr('src',pic);
  });
  
  setTimeout(function() {showPFTrialDistractors()},masklen); 
}

// ********** SHOWPFTRIALDISTRACTORS: give the four choices in the perceptual fluency task
function showPFTrialDistractors() {
  var tr = [0,1,2,3]; 
  var answerStr = '';
  itemCorr = tr[Math.floor(Math.random()*tr.length)];
  var distInds = removeItem(tr,itemCorr);
  $('#instructions').show();
  $('#instructions').load('html/perceptualfluency.html', function () {
    answerStr = '#ans'+(itemCorr+1);
    if (onPFtaskA) {
      $(answerStr).attr('src','img/'+pfTaskAtargets[ind]);
      $(answerStr).on('click',{answer: itemCorr}, recordPFAnswer); 
    } else {
      $(answerStr).attr('src','img/'+pfTaskBtargets[ind]); 
      $(answerStr).on('click',{answer: itemCorr}, recordPFAnswer); 
    }
    for (var i=0; i<3; i++) {
      answerStr = '#ans'+(distInds[i]+1);
      $(answerStr).attr('src','img/'+distractors[i]);
      $(answerStr).on('click',{answer: distInds[i]}, recordPFAnswer); 
    }
    $('#one').on('click',{answer: 0}, recordPFAnswer);
    $('#two').on('click',{answer: 1}, recordPFAnswer);
    $('#three').on('click',{answer: 2}, recordPFAnswer);
    $('#four').on('click',{answer: 3}, recordPFAnswer);
  });
}


// ********** recordAnswer: records an answer for the current trial
function recordPFAnswer(event) {

  var ans = event.data.answer;
  var listSize = -1; 
  if (onPFtaskA) {
    listSize = pfTaskAtargets.length;
    if (ans==itemCorr) {
      pfAanswers[ind] = "correct";
      currpauselen = currpauselen-minusPauseVal;
    } else {
      pfAanswers[ind] = "incorrect";
      currpauselen = currpauselen+minusPauseVal;
    }
  } else if (onPFtaskB) {
    listSize = pfTaskBtargets.length;
    if (ans==itemCorr) {
      pfBanswers[ind] = "correct";
      currpauselen = currpauselen-minusPauseVal;
    } else {
      pfBanswers[ind] = "incorrect";
      currpauselen = currpauselen+minusPauseVal;
    }
  }
  if (currpauselen < minPauseVal) {
    currpauselen = minPauseVal;
  }
  
  ind = ind+1; itemCorr=-1;
  $('#next').show();
  if (ind < listSize) {
    flashTrial();
  } else {
    if (onPFtaskA) {
      showMidPFTrial();
    } else {
      finishExperiment();
    }
  }
}


// ********** SHOWMIDPFTRIAL: shows the page right before beginning the next PF test
function showMidPFTrial() {
    hideElements();
    ind = 0; onPFtaskA = false; onPFtaskB = true; currpauselen = startPauseVal; 
    var str = 'Getting very close now... you finished your first test for the first set of items, and now you have just one more identical one with a different set of items. Then you will be done, you can submit your code, and we can tell you what this was all about!';
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(str);
    });
    $('#next').show();
    $('#next').click(flashTrial);
}


// ********** FINISHEXPERIMENT: show final instructions
function finishExperiment() {

    hideElements();
    saveParticipantData();
    $('#instructions').show();
    $('#instructions').load('html/instructionsfinish.html', function () {
        $('#subid').text(subjectID.toString());
        $('#next').show();
        $('#next').click(showDebrief);
    });
}

// ********** SAVEPARTICIPANTDATA: saves all the participant-level data
function saveParticipantData() {
    
    var nameStr = []; valStr = [];
    var firstPFpauses = 0; secondPFpauses = 0;
    var firstPFcorrect = 0; secondPFcorrect = 0;
    var SLcorrect = 0; numCorr = 0; 
    exp_data["SL2subject"] = subjectID;
    exp_data["SL2condition"] = condition;
    exp_data["PF1type"] = lasttime;
    exp_data["PF2type"] = condition;
    exp_data["lasttime"] = lasttime;
    for (i = 0; i < (demographics.length-1); i++) {
        exp_data[demographics[i].name] = demographics[i].value;
    }
    for (var i = 0; i<4; i++) {
      str = "SL2easy" + (i+1);
      exp_data[str] = easy[i];
      str = "SL2hard" + (i+1);
      exp_data[str] = hard[i];
    }
    for (i=0; i<testitems.length; i++) {
      str = 'SL2item' + (i+1);
      exp_data[str] = testitems[i];
      str = 'SL2answer' + (i+1);
      exp_data[str] = testanswers[i];
      if (testanswers[i]=="correct") {
        SLcorrect = SLcorrect + 1;
      }
    }
    exp_data["SL2correct"] = SLcorrect/(testitems.length);
    englishwords[0].value = englishwords[0].value.toLowerCase();
    englishwords[0].value = englishwords[0].value.replace(/\s+/g, '');
    
    for (var i=0; i<5; i++) {
      var word = testwords[i].replace(".jpg","");
      if (englishwords[0].value.indexOf(word) > -1) {
        numCorr = numCorr + 1;
      }
    }
    exp_data["SL2traincorr"] = numCorr;
    
     for (i=0; i<pfApauses.length; i++) {
        str = 'PF1pause' + (i+1);
        exp_data[str] = pfApauses[i];
        str = 'PF1answer' + (i+1);
        exp_data[str] = pfAanswers[i];
        str = 'PF1target' + (i+1);
        exp_data[str] = pfTaskAtargets[i];
        firstPFpauses = firstPFpauses + pfApauses[i];
        if (pfAanswers[i]=="correct") {
          firstPFcorrect = firstPFcorrect + 1;
        }
      }
      for (i=0; i<pfBpauses.length; i++) {
        str = 'PF2pause' + (i+1);
        exp_data[str] = pfBpauses[i];
        str = 'PF2answer' + (i+1);
        exp_data[str] = pfBanswers[i];
        str = 'PF2target' + (i+1);
        exp_data[str] = pfTaskBtargets[i];
        secondPFpauses = secondPFpauses + pfBpauses[i];
        if (pfBanswers[i]=="correct") {
          secondPFcorrect = secondPFcorrect + 1;
        }
      }
      exp_data["PF1pauseavg"] = firstPFpauses/pfApauses.length;
      exp_data["PF2pauseavg"] = secondPFpauses/pfBpauses.length;
      exp_data["PF1correct"] = firstPFcorrect/pfAanswers.length;
      exp_data["PF2correct"] = secondPFcorrect/pfBanswers.length;
    
    console.log(exp_data);
    saveData(exp_data);    
}


// ********** SHOWDEBRIEF: shows the debrief text for those interested
function showDebrief() {
    hideElements();
    $('#instructions').show();
    var str = 'html/debrief.html';
    $('#instructions').load(str, function () {
        $('#subid').text(subjectID.toString());
    });
}


// ********** SAVEDATA: writes that data to server
function saveData(args) {
    var data = args;
    (function (d) {
        $.post('submit', {"content": JSON.stringify(d)});
    })(data);
}

// ********** SETEXPERIMENT: sets all of the information for the experiment
function setExperiment() {
   
    s = ["A","D","E","G","H","J","L","M","O","P","Q","T","W","Y","AA","CC"];
    sl = ["B","C","F","I","K","N","R","S","U","V","X","Z","BB","DD","EE","FF"];
    sl = shuffleArray(sl);
    
    // set the training sequence
    trainseq = ["train4.jpg","train1.jpg","hat.jpg","train6.jpg","train2.jpg","train3.jpg"];

    // make the stimuli for statistical learning
    for (var j=0; j<16; j++) {
      stimset[j] = condition + sl[j] + '.jpg';
    }
    // make stimuli for the first perceptual fluency test (matching their statistical learning test last time)
    s = shuffleArray(s);
    for (var j=0; j<16; j++) {
      pstimsetA[j] = lasttime + s[j] + '.jpg';
    }
    
    // make stimuli for the last perceptual fluency test (matching their statistical learning test today)
    sl = shuffleArray(sl);
    for (var j=0; j<16; j++) {
      pstimsetB[j] = condition + sl[j] + '.jpg';
    }
    
    createTriplets();

    wordseq = getWordSequence();
    getSyllableSequence();
    makeTestTrials();
    makePerceptualFluencyTrials();

}


// ********** CREATETRIPLETS: creates the core triplets in each sequence
function createTriplets() {

    hardtriplets[0] = [stimset[0], stimset[1], stimset[2]]; words[0] = hardtriplets[0];
    hardtriplets[1] = [stimset[1], stimset[0], stimset[3]]; words[1] = hardtriplets[1];
    hardtriplets[2] = [stimset[3], stimset[2], stimset[0]]; words[2] = hardtriplets[2];
    hardtriplets[3] = [stimset[2], stimset[3], stimset[1]]; words[3] = hardtriplets[3];
    hard[0] = getLetters(stimset[0]) + '-' + getLetters(stimset[1]) + '-' + getLetters(stimset[2]);
    hard[1] = getLetters(stimset[1]) + '-' + getLetters(stimset[0]) + '-' + getLetters(stimset[3]);
    hard[2] = getLetters(stimset[3]) + '-' + getLetters(stimset[2]) + '-' + getLetters(stimset[0]);
    hard[3] = getLetters(stimset[2]) + '-' + getLetters(stimset[3]) + '-' + getLetters(stimset[1]);
  
    easytriplets[0] = [stimset[4], stimset[5], stimset[6]]; words[4] = easytriplets[0];
    easytriplets[1] = [stimset[7], stimset[8], stimset[9]]; words[5] = easytriplets[1];
    easytriplets[2] = [stimset[10], stimset[11], stimset[12]]; words[6] = easytriplets[2];
    easytriplets[3] = [stimset[13], stimset[14], stimset[15]]; words[7] = easytriplets[3];
    easy[0] = getLetters(stimset[4]) + '-' + getLetters(stimset[5]) + '-' + getLetters(stimset[6]);
    easy[1] = getLetters(stimset[7]) + '-' + getLetters(stimset[8]) + '-' + getLetters(stimset[9]);
    easy[2] = getLetters(stimset[10]) + '-' + getLetters(stimset[11]) + '-' + getLetters(stimset[12]);
    easy[3] = getLetters(stimset[13]) + '-' + getLetters(stimset[14]) + '-' + getLetters(stimset[15]);
 
}

// ********** GETWORDSEQUENCE: gets the sequence of words for training (specify A or B)
function getWordSequence() {
    
      var wordseq = [];
      if (!debugging) {
        // sets the words assuming there are eight, with 24 reps each
        for (var i=0; i<192; i++) {
          wordseq[i] = i%8;
        }
        // puts in one of the words for them to recognise
        wordseq[192] = 999;
        wordseq[193] = 999;
        wordseq[194] = 999;
        wordseq[195] = 999;
        wordseq[196] = 999;
        wordseq = shuffleArrayNoRepeats(wordseq);
      } else {
        // when debugging only shows three words
        wordseq[0] = 3;
        wordseq[1] = 6;
        wordseq[2] = 999;
        wordseq[3] = 2;
      }
    return wordseq;
}


// ********** GETSYLLABLESEQUENCE: gets the sequence of syllables. assumes wordseq exists
function getSyllableSequence() {
    
  var sInd = 0; rInd = 0; tInd = 0;
  testwords[0] = "boat.jpg";
  testwords[1] = "tree.jpg";
  testwords[2] = "doll.jpg";
  testwords[3] = "koala.jpg";
  testwords[4] = "lady.jpg";

  for (var i=0; i<wordseq.length; i++) {
    if (wordseq[i] < 900) {
      for (var j=0; j<3; j++) {
        syllseq[sInd] = words[wordseq[i]][j];
        sInd = sInd+1;
      }
    } else {
      if (debugging) {
        syllseq[sInd] = "shoe.jpg";
      } else {
        syllseq[sInd] = testwords[tInd];
        tInd = tInd+1;
      }         
      sInd = sInd+1;
    }
  }
}


// ********** MAKEPERCEPTUALFLUENCYTRIALS: makes the perceptual fluency trials, mainly by shuffling and coming up with the targets. at each one the distractors can be randomly sampled.

function makePerceptualFluencyTrials() {

    var pfA = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
                0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
                0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var pfB = pfA;
    pfA = shuffleArray(pfA);
    pfB = shuffleArray(pfB);
    var r = Math.floor(Math.random() * 2);
    if (r==0) {
      for (var i=0; i<pfA.length; i++) {
        pfTaskAtargets[i] = pstimsetA[pfA[i]];
        pfTaskBtargets[i] = pstimsetB[pfB[i]];
      } 
    } else {
      for (var i=0; i<pfA.length; i++) {
        pfTaskAtargets[i] = pstimsetB[pfB[i]];
        pfTaskBtargets[i] = pstimsetA[pfA[i]];
      }
    }
    pfTypeA = pstimsetA[0].slice(0,4);
    pfTypeB = pstimsetB[0].slice(0,4);
}

// ********** MAKETESTTRIALS: makes the test trials, based on Siegelman, Bogaerts, Frost
// Behaviour Research Methods 2017 "Measuring individual differences in statistical learning"

function makeTestTrials() {
  
  var pr = []; pc = [];
  if (debugging) {
    pr = [0,1,2,3];
    pc = [0];
    pr = shuffleArray(pr);
  } else {
    pr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
    pc = [0,1,2,3,4,5,6,7];
    pr = shuffleArray(pr);
    pc = shuffleArray(pc);
  }
    
  // if debugging just have one test trial of each type
  if (debugging) {
  
    // one pattern recognition item with one foil
    patternrecogTarget[pr[0]] = hardtriplets[0]; 
      patternrecogFoilsone[pr[0]] = [stimset[1], stimset[12], stimset[7]];
      patternrecogFoilstwo[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthree[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
    // one pattern recognition item with three foils
    patternrecogTarget[pr[1]] = hardtriplets[1]; 
      patternrecogFoilsone[pr[1]] = [stimset[8], stimset[4], stimset[10]];
      patternrecogFoilstwo[pr[1]] = [stimset[15], stimset[10], stimset[5]];
      patternrecogFoilsthree[pr[1]] = [stimset[0], stimset[1], stimset[3]];
    // one item with only pairs, and one other answer option  
    patternrecogTarget[pr[2]] = [stimset[1], stimset[2],"white.jpg"];
      patternrecogFoilsone[pr[2]] = [stimset[0], stimset[15],"white.jpg"];
      patternrecogFoilstwo[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthree[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
    // now items with only pairs, and three other answer options  
    patternrecogTarget[pr[3]] = [stimset[11], stimset[12],"white.jpg"];
      patternrecogFoilsone[pr[3]] = [stimset[5], stimset[10],"white.jpg"];
      patternrecogFoilstwo[pr[3]] = [stimset[11], stimset[14],"white.jpg"];
      patternrecogFoilsthree[pr[3]] = [stimset[8], stimset[3],"white.jpg"];  
    // give them names for easy reference (here in debugging these are meaningless)
    for (var i=0; i<pr.length; i++) {
      testitems[pr[i]] = i+1;
    }
   // now a pattern completion item. first item in foils array is always the target
    patterncompletionQuestion[0] = [stimset[0], "blank.jpg", stimset[2]];
      patterncompletionFoils[0] = [stimset[1], stimset[12], stimset[8]]
    testitems[pr.length] = 0;  
    
  // if not debugging have all test items  
  } else {
    // first set up the pattern recognition items with one foil
    patternrecogTarget[pr[0]] = hardtriplets[0]; 
      patternrecogFoilsone[pr[0]] = [stimset[1], stimset[12], stimset[7]];
    patternrecogTarget[pr[1]] = hardtriplets[1]; 
      patternrecogFoilsone[pr[1]] = [stimset[0], stimset[1], stimset[3]];
    patternrecogTarget[pr[2]] = hardtriplets[2]; 
      patternrecogFoilsone[pr[2]] = [stimset[3], stimset[2], stimset[8]];
    patternrecogTarget[pr[3]] = hardtriplets[3]; 
      patternrecogFoilsone[pr[3]] = [stimset[6], stimset[0], stimset[2]];
    patternrecogTarget[pr[4]] = easytriplets[0]; 
      patternrecogFoilsone[pr[4]] = [stimset[8], stimset[4], stimset[10]];
    patternrecogTarget[pr[5]] = easytriplets[1]; 
      patternrecogFoilsone[pr[5]] = [stimset[15], stimset[10], stimset[5]];
    patternrecogTarget[pr[6]] = easytriplets[2]; 
      patternrecogFoilsone[pr[6]] = [stimset[13], stimset[5], stimset[9]];
    patternrecogTarget[pr[7]] = easytriplets[3]; 
      patternrecogFoilsone[pr[7]] = [stimset[2], stimset[0], stimset[14]];
    patternrecogTarget[pr[8]] = hardtriplets[0]; 
      patternrecogFoilsone[pr[8]] = [stimset[14], stimset[0], stimset[3]];
    patternrecogTarget[pr[9]] = hardtriplets[1]; 
      patternrecogFoilsone[pr[9]] = [stimset[13], stimset[5], stimset[9]];
    patternrecogTarget[pr[10]] = hardtriplets[2]; 
      patternrecogFoilsone[pr[10]] = [stimset[1], stimset[7], stimset[3]];
    patternrecogTarget[pr[11]] = hardtriplets[3]; 
      patternrecogFoilsone[pr[11]] = [stimset[15], stimset[10], stimset[5]];
    patternrecogTarget[pr[12]] = easytriplets[0]; 
      patternrecogFoilsone[pr[12]] = [stimset[13], stimset[2], stimset[1]];
    patternrecogTarget[pr[13]] = easytriplets[1]; 
      patternrecogFoilsone[pr[13]] = [stimset[4], stimset[11], stimset[12]];
    patternrecogTarget[pr[14]] = easytriplets[2]; 
      patternrecogFoilsone[pr[14]] = [stimset[0], stimset[1], stimset[3]];
    patternrecogTarget[pr[15]] = easytriplets[3]; 
      patternrecogFoilsone[pr[15]] = [stimset[15], stimset[6], stimset[9]];
    for (var i=0; i<16; i++) {
      patternrecogFoilstwo[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthree[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
    }

    // now set up the pattern recognition items with three foils  
    patternrecogTarget[pr[16]] = hardtriplets[0]; 
      patternrecogFoilsone[pr[16]] = [stimset[8], stimset[4], stimset[10]];
      patternrecogFoilstwo[pr[16]] = [stimset[1], stimset[7], stimset[3]];
      patternrecogFoilsthree[pr[16]] = [stimset[13], stimset[2], stimset[1]];
    patternrecogTarget[pr[17]] = hardtriplets[1]; 
      patternrecogFoilsone[pr[17]] = [stimset[8], stimset[4], stimset[10]];
      patternrecogFoilstwo[pr[17]] = [stimset[15], stimset[10], stimset[5]];
      patternrecogFoilsthree[pr[17]] = [stimset[0], stimset[1], stimset[3]];
    patternrecogTarget[pr[18]] = hardtriplets[2]; 
      patternrecogFoilsone[pr[18]] = [stimset[15], stimset[6], stimset[9]];
      patternrecogFoilstwo[pr[18]] = [stimset[1], stimset[12], stimset[7]];
      patternrecogFoilsthree[pr[18]] = [stimset[1], stimset[7], stimset[3]];
    patternrecogTarget[pr[19]] = hardtriplets[3]; 
      patternrecogFoilsone[pr[19]] = [stimset[4], stimset[11], stimset[12]];
      patternrecogFoilstwo[pr[19]] = [stimset[14], stimset[0], stimset[3]];
      patternrecogFoilsthree[pr[19]] = [stimset[2], stimset[0], stimset[14]];
    patternrecogTarget[pr[20]] = easytriplets[0]; 
      patternrecogFoilsone[pr[20]] = [stimset[15], stimset[6], stimset[9]];
      patternrecogFoilstwo[pr[20]] = [stimset[13], stimset[5], stimset[9]];
      patternrecogFoilsthree[pr[20]] = [stimset[1], stimset[12], stimset[7]];
    patternrecogTarget[pr[21]] = easytriplets[1]; 
      patternrecogFoilsone[pr[21]] = [stimset[0], stimset[1], stimset[3]];
      patternrecogFoilstwo[pr[21]] = [stimset[3], stimset[2], stimset[8]];
      patternrecogFoilsthree[pr[21]] = [stimset[14], stimset[0], stimset[3]];
    patternrecogTarget[pr[22]] = easytriplets[2]; 
      patternrecogFoilsone[pr[22]] = [stimset[13], stimset[2], stimset[1]];
      patternrecogFoilstwo[pr[22]] = [stimset[6], stimset[0], stimset[2]];
      patternrecogFoilsthree[pr[22]] = [stimset[2], stimset[0], stimset[14]];
    patternrecogTarget[pr[23]] = easytriplets[3]; 
      patternrecogFoilsone[pr[23]] = [stimset[4], stimset[11], stimset[12]];
      patternrecogFoilstwo[pr[23]] = [stimset[3], stimset[2], stimset[8]];
      patternrecogFoilsthree[pr[23]] = [stimset[6], stimset[0], stimset[2]];
    
    // now items with only pairs, and one other answer option  
    patternrecogTarget[pr[24]] = [stimset[1], stimset[2],"white.jpg"];
      patternrecogFoilsone[pr[24]] = [stimset[0], stimset[15],"white.jpg"];
    patternrecogTarget[pr[25]] = [stimset[0], stimset[3],"white.jpg"];
      patternrecogFoilsone[pr[25]] = [stimset[1], stimset[3],"white.jpg"];
    patternrecogTarget[pr[26]] = [stimset[2], stimset[0],"white.jpg"];
      patternrecogFoilsone[pr[26]] = [stimset[5], stimset[2],"white.jpg"];
    patternrecogTarget[pr[27]] = [stimset[3], stimset[1],"white.jpg"];
      patternrecogFoilsone[pr[27]] = [stimset[12], stimset[1],"white.jpg"];
    patternrecogTarget[pr[28]] = [stimset[5], stimset[6],"white.jpg"];
      patternrecogFoilsone[pr[28]] = [stimset[4], stimset[10],"white.jpg"];
    patternrecogTarget[pr[29]] = [stimset[7], stimset[8],"white.jpg"];
      patternrecogFoilsone[pr[29]] = [stimset[2], stimset[13],"white.jpg"];
    for (var i=24; i<30; i++) {
      patternrecogFoilstwo[pr[i]] = ["white.jpg","white.jpg"];
      patternrecogFoilsthree[pr[i]] = ["white.jpg","white.jpg"];
    }  
    
    // now items with only pairs, and three other answer options  
    patternrecogTarget[pr[30]] = [stimset[11], stimset[12],"white.jpg"];
      patternrecogFoilsone[pr[30]] = [stimset[5], stimset[10],"white.jpg"];
      patternrecogFoilstwo[pr[30]] = [stimset[11], stimset[14],"white.jpg"];
      patternrecogFoilsthree[pr[30]] = [stimset[8], stimset[3],"white.jpg"];
    patternrecogTarget[pr[31]] = [stimset[13], stimset[14],"white.jpg"];
      patternrecogFoilsone[pr[31]] = [stimset[7], stimset[9],"white.jpg"];
      patternrecogFoilstwo[pr[31]] = [stimset[0], stimset[7],"white.jpg"];
      patternrecogFoilsthree[pr[31]] = [stimset[14], stimset[6],"white.jpg"];
    patternrecogTarget[pr[32]] = [stimset[0], stimset[1],"white.jpg"];
      patternrecogFoilsone[pr[32]] = [stimset[6], stimset[0],"white.jpg"];
      patternrecogFoilstwo[pr[32]] = [stimset[2], stimset[13],"white.jpg"];
      patternrecogFoilsthree[pr[32]] = [stimset[12], stimset[4],"white.jpg"];
    patternrecogTarget[pr[33]] = [stimset[3], stimset[2],"white.jpg"];
      patternrecogFoilsone[pr[33]] = [stimset[8], stimset[1],"white.jpg"];
      patternrecogFoilstwo[pr[33]] = [stimset[9], stimset[3],"white.jpg"];
      patternrecogFoilsthree[pr[33]] = [stimset[15], stimset[11],"white.jpg"];
  
    // give them the name as in the paper for easy reference
    for (var i=0; i<pr.length; i++) {
      testitems[pr[i]] = i+1;
    }
    for (var i=0; i<pc.length; i++) {
      testitems[pr.length+pc[i]] = 35+i;
    }
  
    // now the pattern completion items
    patterncompletionQuestion[pc[0]] = [stimset[0], "blank.jpg", stimset[2]];
      patterncompletionFoils[pc[0]] = [stimset[1], stimset[12], stimset[8]]
    patterncompletionQuestion[pc[1]] = [stimset[1], stimset[0], "blank.jpg"];
      patterncompletionFoils[pc[1]] = [stimset[3], stimset[5], stimset[15]]
    patterncompletionQuestion[pc[2]] = ["blank.jpg", stimset[5], stimset[6]];
      patterncompletionFoils[pc[2]] = [stimset[4], stimset[13], stimset[2]]
    patterncompletionQuestion[pc[3]] = [stimset[7], "blank.jpg", stimset[9]];
      patterncompletionFoils[pc[3]] = [stimset[8], stimset[14], stimset[3]]
    patterncompletionQuestion[pc[4]] = [stimset[10], "blank.jpg", "white.jpg"];
      patterncompletionFoils[pc[4]] = [stimset[11], stimset[6], stimset[0]];
    patterncompletionQuestion[pc[5]] = ["blank.jpg", stimset[14], "white.jpg"];
      patterncompletionFoils[pc[5]] = [stimset[13], stimset[7], stimset[11]];
    patterncompletionQuestion[pc[6]] = [stimset[2], "blank.jpg", "white.jpg"];
      patterncompletionFoils[pc[6]] = [stimset[0], stimset[1], stimset[4]];
    patterncompletionQuestion[pc[7]] = ["blank.jpg", stimset[3], "white.jpg"];
      patterncompletionFoils[pc[7]] = [stimset[2], stimset[10], stimset[9]];
  }

}



// ********** GETDISTRACTORS: gives three distractors for the perceptual fluency task
function getDistractors() {
  var match = true;
  if (onPFtaskA) {
    for (var i=0; i<3; i++) {
      
      while (match) {
        distractors[i] = pfTaskAtargets[Math.floor(Math.random()*16)];
        match = false;
        if (distractors[i]==pfTaskAtargets[ind]) {
          match = true;
        } else {
          for (var j=0; j<i; j++) {
            if (distractors[i]==distractors[j]) {
              match= true;
            }
          }
        }
      }
      match = true;
    }
  } else if (onPFtaskB) {
    for (var i=0; i<4; i++) {
      while (match) {
        distractors[i] = pfTaskBtargets[Math.floor(Math.random()*16)];
        match = false;
        if (distractors[i]==pfTaskBtargets[ind]) {
          match = true;
        } else {
          for (var j=0; j<i; j++) {
            if (distractors[i]==distractors[j]) {
              match= true;
            }
          }
        }
      }
      match = true;
    }
  }
}


// ********** ISREPEAT: looks inside array to see if item matches either of the things at +-index
// returns true if it does, false otherwise. e.g. in array [a,b,c,d,e] 
// if item was c and index was 1 or 3 it would be true, otherwise false
// also makes sure there are not two 900-type trials next to each other
function isRepeat(array,item,index) {
  var repeat=false;
  // if it's the first in the array, only need to check the next item up
  if (index==0) {
    if ((array[index+1]==item) || (array[index+1]==item-900) || (array[index+1]-900==item)) {
      repeat = true;
    } else {
      if ((array[index+1]>100) && (item>100)) {
        repeat = true;
      }
    }
  // if it's in the last, need to only check the next one down
  } else if (index==array.length-1) {
    if ((array[index-1]==item) || (array[index-1]==item-900) || (array[index-1]-900==item)) {
      repeat = true;
    } else {
      if ((array[index-1]>100) && (item>100)) {
        repeat = true;
      }
    } 
  // otherwise check both
  } else {
    if ((array[index-1]==item) || (array[index+1]==item) || (array[index+1]-900==item) ||
        (array[index+1]==item-900) || (array[index-1]==item-900) || (array[index-1]-900==item)) {
      repeat = true;
    } else {
      if ( ((array[index-1]>100) && (item>100)) || ((array[index+1]>100) && (item>100)) ) {
        repeat = true;
      }
    }
  }
  return repeat;  
}

// ********** GETTESTANSWERS: returns an array with the test items for the current situation in random order
function getTestAnswers() {
  var t = [0,1,2,3];
  var objects = [];
  if (ontest) {
    if (onPR) {
       if (patternrecogFoilstwo[ind][0]=="white.jpg") {
        t = [0,1];
      }
      t = shuffleArray(t);
      objects[t[0]] = patternrecogTarget[ind];
      objects[t[1]] = patternrecogFoilsone[ind];
      if (t.length>2) {
        objects[t[2]] = patternrecogFoilstwo[ind];
        objects[t[3]] = patternrecogFoilsthree[ind];
      } else {
        objects[2] = ["white.jpg","white.jpg","white.jpg"];
        objects[3] = ["white.jpg","white.jpg","white.jpg"];
      }
    } else if (onPC) {
      t = [0,1,2];
      t = shuffleArray(t);
      for (var i = 0; i<3; i++) {
        objects[t[i]] = patterncompletionFoils[ind][i];
      }
    }
  }  
  itemCorr = t[0];
  return objects;
}

// ********** SHUFFLEARRAYNOREPEATS: permute the values of array with no repeated items
function shuffleArrayNoRepeats(array) {
    var currentIndex = array.length-1, temporaryValue, randomIndex;
    var repeat = true;
    while (-1 !== currentIndex) {
        repeat = true;
        while (repeat) {
          randomIndex = Math.floor(Math.random() * (array.length-1));
          while ( (randomIndex==currentIndex) || 
                randomIndex==(currentIndex+1) || randomIndex==(currentIndex-1)) {
                  randomIndex = Math.floor(Math.random() * (array.length-1));
                }
          repeat = isRepeat(array,array[currentIndex],randomIndex);
          if (repeat==false) {
            repeat = isRepeat(array,array[randomIndex],currentIndex);
          }
        }
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        currentIndex = currentIndex - 1;
    }
    return array;
}


// ********** GETLETTERS: gets just the letters from the image file name
function getLetters(name) {
  var letters = '';
  if (name.length==12) {
    letters = name.slice(6,8);
  } else {
    letters = name.slice(6,7);    
  }
  return letters;
}


// ********** GETLASTTIME: given worker ID, returns their condition
function getLastTime(workerID) {

  var familiarIDs = [];
  var found = 0;
  
  familiarIDs[0] = 'A0017268R9SKD8U2Y3F'; familiarIDs[1] = 'A13I8ASC3JQ04P'; familiarIDs[2] = 'A15PUZKRWJH0EY';
  familiarIDs[3] = 'A15V8K8M4TXT9Y'; familiarIDs[4] = 'A160HFSRDNT91E'; familiarIDs[5] = 'A1CU9JH8JKGOKM';
  familiarIDs[6] = 'A1FP3SH704X01V'; familiarIDs[7] = 'A1H053T5EXI6EP'; familiarIDs[8] = 'A1HCTAULAAOC8A';
  familiarIDs[9] = 'A1HGSSITI7GRQS'; familiarIDs[10] = 'A1HKYY6XI2OHO1'; familiarIDs[11] = 'A1JO6AY55FG7QU'; 
  familiarIDs[12] = 'A1MJHGH55K3O0'; familiarIDs[13] = 'A1P8M5BKOTAA8I'; familiarIDs[14] = 'A1PTH9KTRO06EG'; 
  familiarIDs[15] = 'A1QCQE5XW37LN1'; familiarIDs[16] = 'A1SL65Z68BK1UT'; familiarIDs[17] = 'A1V2H0UF94ATWY'; 
  familiarIDs[18] = 'A1WMOYIMJMIV9P'; familiarIDs[19] = 'A20BMZQJS92QY2'; familiarIDs[20] = 'A21753FQKCM5DQ'; 
  familiarIDs[21]= 'A21SIPO89DP66I'; familiarIDs[22] = 'A222XREQ12K58P'; familiarIDs[23] = 'A230VUDYOCRZ4N'; 
  familiarIDs[24] = 'A29VV8U7XTHC3B'; familiarIDs[25] = 'A2HRMD4SU5X2EW'; familiarIDs[26] = 'A2KPT0PEUEXCC4'; 
  familiarIDs[27] = 'A2O2Q0LVWOWJ1G'; familiarIDs[28] = 'A2OWVYIPSQB0QP'; familiarIDs[29] = 'A2R8IV2PWFTY00'; 
  familiarIDs[30] = 'A2TCIHHKLL8LQC'; familiarIDs[31] = 'A33NK36A94Y75Y'; familiarIDs[32] = 'A36SM7QM8OK3H6';
  familiarIDs[33] = 'A36YZCJV91T1EX'; familiarIDs[34] = 'A3AO2N7BNFDGF3'; familiarIDs[35] = 'A3FABY0Q6234WK'; 
  familiarIDs[36] = 'A3G5IPGLH1IIZN'; familiarIDs[37] = 'A3HW4QDJB63OQ2'; familiarIDs[38] = 'A3L0DCUXI7X3A9';
  familiarIDs[39] = 'A3LC6M2EMDBBXP'; familiarIDs[40] = 'A3QLGMZOLGMBQ1'; familiarIDs[41] = 'A3UTFL5JHRQCM1';
  familiarIDs[42] = 'A4158R4Y06ZB4'; familiarIDs[43] = 'A44UXOE20R218'; familiarIDs[44] = 'A4J4GGMKJ68L0'; 
  familiarIDs[45] = 'A5NHP0N1XC09K'; familiarIDs[46] = 'A5TI9UQEPLNWI'; familiarIDs[47] = 'A7HJ206MCGJ18';
  familiarIDs[48] = 'A954IZFSP9UN'; familiarIDs[49] = 'A9HQ3E0F2AGVO'; familiarIDs[50] = 'AADDOP3FHMAV1';
  familiarIDs[51] = 'AAHZCL4LIPCBQ'; familiarIDs[52] = 'AAXX5LDVJ32F8'; familiarIDs[53] = 'AKVDY8OXNMQED';
  familiarIDs[54] = 'AN098C29EGJ6'; familiarIDs[55] = 'AQL960O0LTRI8'; familiarIDs[56] = 'AR1IWBDA7MC86';
  familiarIDs[57] = 'AS4WHZ0EVURW'; familiarIDs[58] = 'ASF5V3K4IFP4K'; familiarIDs[59] = 'ASTR3EPUOKEXV'; 
  familiarIDs[60] = 'ATADQXPHL10Y8'; familiarIDs[61] = 'AU2NVT51E749C'; familiarIDs[62] = 'AUI3R928P63B0'; 
  familiarIDs[63] = 'AZLKAW3V1GRPH'; familiarIDs[64] = 'AZZA3J049G7R5'; 
  
  for (var i=0; i<familiarIDs.length; i++) {
    if (workerID==familiarIDs[i]) {
      found = true;
      break;
    }
  }
  if (found==true) {
    return "letter";
  } else {
    return "medium";
  }

}


// ********** SHUFFLEARRAY: permute the values of array
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        currentIndex = currentIndex - 1;
        randomIndex = Math.floor(Math.random() * currentIndex);
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// ********** CONTAINS: returns TRUE if item is in array, FALSE otherwise
function contains(array,item) {
    var doesContain = false;
    for (var i=0; i<array.length; i++) {
      if (array[i]==item) {
        doesContain = true;
        break;
      }   
    }
    return doesContain;
}

// ********** REMOVEITEM: removes the first instance of ITEM from the array. 
function removeItem(array,item) {
  var newArray = array;
  for (var i=0; i<array.length; i++) {
    if (newArray[i]==item) {
      newArray.splice(i,1);
      break;
    }
  }
  return newArray;
}

// ********** HIDEELEMENTS: hides all DOM elements from the screen and clears the canvas
function hideElements() {
  
  $('div').hide();  // hides all divs
  $(':button').hide(); // hides all buttons
  $(':button').unbind(); // unbinds all buttons
}
