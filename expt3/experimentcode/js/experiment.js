var debugging = 0; 
var subjectID = ""; condition = ""; lasttime = "";
var chineseTest = [];
var pfOrder = 1; slOrder = 1;
var conds = []; instructionChecks = []; pfInstructionChecks = []; testwordsA = []; testwordsB = [];
var startPauseVal = 250; minusPauseVal = 15; minPauseVal = 10; masklen = 200;
var longpauselen = 800; shortpauselen = 200; currpauselen = startPauseVal; 
var ind = 0; itemCorr = 0;
var onSL = true; ontest = false; onPR = false; onPC = false; 
var onPFtaskA = false; onPFtaskB = false;
var pfTypeA = ''; pfTypeB = '';
var pstimsetA = []; pstimsetB = []; distractors = []; 
var pfTaskAtargets = []; pfTaskBtargets = []; pfApauses = []; pfBpauses = []; // want to save this
var pfAanswers = []; pfBanswers = []; // want to save this
var easyA = []; hardA = [];  // want to save this
var easytripletsA = []; hardtripletsA = []; // want to save this
var stimsetA = []; wordsA = []; wordseqA = []; syllseqA = []; trainseqA = []; 
var englishwordsA = []; // want to save this
var testanswersA = []; testitemsA = []; // want to save this
var patternrecogTargetA = []; patterncompletionTargetA = []; patterncompletionQuestionA = [];
var patterncompletionFoilsA = []; patternrecogFoilsoneA = []; 
var patternrecogFoilstwoA = []; patternrecogFoilsthreeA = [];
var easyB = []; hardB = [];  // want to save this
var easytripletsB = []; hardtripletsB = []; // want to save this
var stimsetB = []; wordsB = []; wordseqB = []; syllseqB = []; trainseqB = []; 
var englishwordsB = []; // want to save this
var testanswersB = []; testitemsB = []; // want to save this
var patternrecogTargetB = []; patterncompletionTargetB = []; patterncompletionQuestionB = [];
var patterncompletionFoilsB = []; patternrecogFoilsoneB = []; 
var patternrecogFoilstwoB = []; patternrecogFoilsthreeB = [];
var exp_data = {};    

// ********** START: this function runs automatically when the page is loaded
$(document).ready(function () {
  
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ ) {
      subjectID += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    pfOrder = Math.floor(Math.random() * 2) + 1;  // 1 is chinese first, 2 is medium first
    slOrder = Math.floor(Math.random() * 2) + 1;  // 1 is chinese first, 2 is medium first
    
    // shows all of the images, just to load them immediately
    hideElements();
    setExperiment();
    $('#instructions').show();
    $('#instructions').load('html/showall.html');
    if (debugging==0) {
      setTimeout(function() {showDemographics()},50);
    } else {
      setTimeout(function() {getReady()},50);
    }
    
});


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
        
      }
    }
  
    // goes to next section
    if (!ok) {
        showDemographics();
    } else {   
        takeChineseTest();
    }
}

// ********** TAKECHINESETEST: takes quick test in chinese
function takeChineseTest() {

    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/chinesetest.html');
    $('#next').show();
    $('#next').click(validateChineseChecks);
}

// ********** VALIDATECHINESECHECKS: makes sure they answered the Chinese questions
function validateChineseChecks() {
  
    chineseTest = $('#chinese').serializeArray();

    var ok = true;
    for (var i = 0; i < chineseTest.length; i++) {
        // check for empty answers 
        if (chineseTest[i].value === "") {
            alert('Please fill out all questions.');
            ok = false;
            break;    
        }
    }

    // where this is the number of questions in the instruction check
    if (chineseTest.length != 4) {
        alert('You have not answered all of the questions; please try again.');
        ok = false;
    }

    // goes to next section
    if (!ok) {
        takeChineseTest();
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
    if (instructionChecks.length != 4) {
        alert('You have not answered all of the questions; please try again.');
        ok = false;
    }

    // goes to next section
    if (!ok) {
        showGeneralInstructions(); 
    } else {
        getReady(); 
    }
}

// ********** SHOWSTATISTICALLEARNINGTRIALA: shows a single image in the standard SL task
function showStatisticalLearningTrialA() {
  
  hideElements();
  pic = 'img/' + syllseqA[ind];
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  
  setTimeout(function() {removePictureA()},longpauselen);  
}

// ********** SHOWSTATISTICALLEARNINGTRIALB: shows a single image in the standard SL task
function showStatisticalLearningTrialB() {
  
  hideElements();
  pic = 'img/' + syllseqB[ind];
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  
  setTimeout(function() {removePictureB()},longpauselen);  
}

// ********** REMOVEPICTUREA: removes the picture for shortpauselen milliseconds
function removePictureA() {
  pic = 'img/white.jpg';
  ind = ind+1;
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  if (ind < syllseqA.length) {
      setTimeout(function() {showStatisticalLearningTrialA()},shortpauselen); 
  } else {
      onSL = false; ontest = true;
      setTimeout(function() {getEnglishSequenceA()},shortpauselen); 
  }
}

// ********** REMOVEPICTUREB: removes the picture for shortpauselen milliseconds
function removePictureB() {
  pic = 'img/white.jpg';
  ind = ind+1;
  $('#instructions').show();
  $('#instructions').load('html/showpicture.html', function () {
    $('#stimulus').attr('src',pic);
  });
  if (ind < syllseqB.length) {
      setTimeout(function() {showStatisticalLearningTrialB()},shortpauselen); 
  } else {
      onSL = false; ontest = true;
      setTimeout(function() {getEnglishSequenceB()},shortpauselen); 
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
    $('#next').click(showStatisticalLearningTrialA);
}

// ********** GETENGLISHSEQUENCEA: has them report the words they saw
function getEnglishSequenceA() {
    hideElements();
    $('#demographics').show();
    $('#demographics').load('html/english.html');
    $('#next').show();
    $('#next').click(validateEnglishSequenceA);
}

// ********** GETENGLISHSEQUENCEB: has them report the words they saw
function getEnglishSequenceB() {
    hideElements();
    $('#demographics').show();
    $('#demographics').load('html/english.html');
    $('#next').show();
    $('#next').click(validateEnglishSequenceB);
}

// ********** VALIDATEENGLISHSEQUENCEA: check to make sure they report the words right
function validateEnglishSequenceA() {
  
    englishwordsA = $('#english').serializeArray();
    var ok = true;
  
    if (englishwordsA[0].value == "") {
        alert('Please put your words in the text box.');
        ok = false;
    }
  
    // goes to next section
    if (!ok) {
        getEnglishSequenceA();
    } else {   
        showTestTrialsA();
    }
}

// ********** VALIDATEENGLISHSEQUENCEB: check to make sure they report the words right
function validateEnglishSequenceB() {
  
    englishwordsB = $('#english').serializeArray();
    var ok = true;
  
    if (englishwordsB[0].value == "") {
        alert('Please put your words in the text box.');
        ok = false;
    }
  
    // goes to next section
    if (!ok) {
        getEnglishSequenceB();
    } else {   
        showTestTrialsB();
    }
}


// ********** SHOWTESTTRIALSA: begins the test trials
function showTestTrialsA() {
    hideElements();
    ind = 0; itemCorr = -1;
    var msg = "Thank you! The next step is to answer some questions about the sequence you just saw. The first set of questions involves us giving you a series of either two or four patterns. Your job is to click on which one looks most familiar to you from the sequence. We are  interested in what you think naturally, so do not overthink it, but do try to do your best.";
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(msg);
    });
    $('#next').show();
    $('#next').click(showPatternRecognitionTrialA);
}

// ********** SHOWTESTTRIALSB: begins the test trials
function showTestTrialsB() {
    hideElements();
    ind = 0; itemCorr = -1;
    var msg = "Thank you! The next step is to answer some questions about the sequence you just saw. The first set of questions involves us giving you a series of either two or four patterns. Your job is to click on which one looks most familiar to you from the sequence. We are  interested in what you think naturally, so do not overthink it, but do try to do your best.";
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(msg);
    });
    $('#next').show();
    $('#next').click(showPatternRecognitionTrialB);
}

// ********** SHOWPATTERNRECOGNITIONTRIALA: shows a pattern recognition trial A
function showPatternRecognitionTrialA() {
    hideElements();
    onPR = true;
    var strA = ''; strB = ''; strC = '';
    var objects = getTestAnswersA();
    $('#instructions').show();
    $('#instructions').load('html/patternrecognition.html', function () {
      for (var i=0; i<4; i++) {
        strA = '#'+(i+1)+'a';  strB = '#'+(i+1)+'b'; strC = '#'+(i+1)+'c'; 
        $(strA).attr('src','img/'+objects[i][0]); $(strA).on('click',{answer: i}, recordAnswerA);
        $(strB).attr('src','img/'+objects[i][1]); $(strB).on('click',{answer: i}, recordAnswerA);
        $(strC).attr('src','img/'+objects[i][2]); $(strC).on('click',{answer: i}, recordAnswerA);
      }
      $('#two').on('click',{answer: 1}, recordAnswerA);
      $('#one').on('click',{answer: 0}, recordAnswerA);
      $('#three').on('click',{answer: 2}, recordAnswerA);
      $('#four').on('click',{answer: 3}, recordAnswerA);
      if (objects[2][0]=="white.jpg") {
        $('#three').attr('src','img/white.jpg'); $('#three').click("");
        $('#four').attr('src','img/white.jpg');  $('#four').click("");
      }
    });
}


// ********** SHOWPATTERNRECOGNITIONTRIALB: shows a pattern recognition trial B
function showPatternRecognitionTrialB() {
    hideElements();
    onPR = true;
    var strA = ''; strB = ''; strC = '';
    var objects = getTestAnswersB();
    $('#instructions').show();
    $('#instructions').load('html/patternrecognition.html', function () {
      for (var i=0; i<4; i++) {
        strA = '#'+(i+1)+'a';  strB = '#'+(i+1)+'b'; strC = '#'+(i+1)+'c'; 
        $(strA).attr('src','img/'+objects[i][0]); $(strA).on('click',{answer: i}, recordAnswerB);
        $(strB).attr('src','img/'+objects[i][1]); $(strB).on('click',{answer: i}, recordAnswerB);
        $(strC).attr('src','img/'+objects[i][2]); $(strC).on('click',{answer: i}, recordAnswerB);
      }
      $('#two').on('click',{answer: 1}, recordAnswerB);
      $('#one').on('click',{answer: 0}, recordAnswerB);
      $('#three').on('click',{answer: 2}, recordAnswerB);
      $('#four').on('click',{answer: 3}, recordAnswerB);
      if (objects[2][0]=="white.jpg") {
        $('#three').attr('src','img/white.jpg'); $('#three').click("");
        $('#four').attr('src','img/white.jpg');  $('#four').click("");
      }
    });
}


// ********** recordAnswerA: records an answer for the current trial
function recordAnswerA(event) {

  var ans = event.data.answer;
  var listSize = 0;
  tempInd = ind;
  if (onPC) {
    tempInd = ind + patternrecogTargetA.length;
    listSize = patterncompletionQuestionA.length;
  } else if (onPR) {
    listSize = patternrecogTargetA.length;
  }
  
  if (itemCorr===ans)  {
      testanswersA[tempInd] = "correct";
  } else {
      testanswersA[tempInd] = "incorrect";
  } 

  ind = ind+1; itemCorr=-1;
  $('#next').show();
  if (ind < listSize) {
    if (onPR) {
      showPatternRecognitionTrialA();
    } else {
      showPatternCompletionTrialA();
    }
  } else {
    if (onPR) {
      showMidTestTrialA();
    } else if (onPC) {
      showEndSLTrialsA();
    }
  }
}

// ********** recordAnswerB: records an answer for the current trial
function recordAnswerB(event) {

  var ans = event.data.answer;
  var listSize = 0;
  tempInd = ind;
  if (onPC) {
    tempInd = ind + patternrecogTargetB.length;
    listSize = patterncompletionQuestionB.length;
  } else if (onPR) {
    listSize = patternrecogTargetB.length;
  }
  
  if (itemCorr===ans)  {
      testanswersB[tempInd] = "correct";
  } else {
      testanswersB[tempInd] = "incorrect";
  } 

  ind = ind+1; itemCorr=-1;
  $('#next').show();
  if (ind < listSize) {
    if (onPR) {
      showPatternRecognitionTrialB();
    } else {
      showPatternCompletionTrialB();
    }
  } else {
    if (onPR) {
      showMidTestTrialB();
    } else if (onPC) {
      showEndSLTrialsB();
    }
  }
}

// ********** SHOWMIDTESTRIALA: shows the page right before beginning the pattern completion items
function showMidTestTrialA() {
    hideElements();
    ind = 0; onPR = false; onPC = true;
    var str = 'Good job! That is most of the questions, but we have a few more. In these you will see part of a pattern, and be asked to choose the best symbol to complete it. As before, try not to overthink it but just choose the answer that feels best to you.'
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(str);
    });
    $('#next').show();
    $('#next').click(showPatternCompletionTrialA);
}

// ********** SHOWMIDTESTRIALB: shows the page right before beginning the pattern completion items
function showMidTestTrialB() {
    hideElements();
    ind = 0; onPR = false; onPC = true;
    var str = 'Good job! That is most of the questions, but we have a few more. In these you will see part of a pattern, and be asked to choose the best symbol to complete it. As before, try not to overthink it but just choose the answer that feels best to you.'
    $('#instructions').show();
    $('#instructions').load('html/interim.html', function () {
      $('#message').text(str);
    });
    $('#next').show();
    $('#next').click(showPatternCompletionTrialB);
}


// ********** SHOWPATTERNCOMPLETIONTRIALA: shows a pattern recognition trial
function showPatternCompletionTrialA() {
    hideElements();
    var questionStr = ''; foilsStr = ''; 
    var objects = getTestAnswersA();
    $('#instructions').show();
    $('#instructions').load('html/patterncompletion.html', function () {
      for (var i=0; i<3; i++) {
        questionStr = '#q'+(i+1);  foilsStr = '#foil'+(i+1); 
        $(questionStr).attr('src','img/'+patterncompletionQuestionA[ind][i]); 
        $(foilsStr).attr('src','img/'+objects[i]); 
        $(foilsStr).on('click',{answer: i}, recordAnswerA);
      }
      $('#one').on('click',{answer: 0}, recordAnswerA);
      $('#two').on('click',{answer: 1}, recordAnswerA);
      $('#three').on('click',{answer: 2}, recordAnswerA);
    });
}

// ********** SHOWPATTERNCOMPLETIONTRIALB: shows a pattern recognition trial
function showPatternCompletionTrialB() {
    hideElements();
    var questionStr = ''; foilsStr = ''; 
    var objects = getTestAnswersB();
    $('#instructions').show();
    $('#instructions').load('html/patterncompletion.html', function () {
      for (var i=0; i<3; i++) {
        questionStr = '#q'+(i+1);  foilsStr = '#foil'+(i+1); 
        $(questionStr).attr('src','img/'+patterncompletionQuestionB[ind][i]); 
        $(foilsStr).attr('src','img/'+objects[i]); 
        $(foilsStr).on('click',{answer: i}, recordAnswerB);
      }
      $('#one').on('click',{answer: 0}, recordAnswerB);
      $('#two').on('click',{answer: 1}, recordAnswerB);
      $('#three').on('click',{answer: 2}, recordAnswerB);
    });
}


// ********** SHOWENDSLTRIALSA: shows the page right at the end of the first SL trial
function showEndSLTrialsA() {
    hideElements();
    ind = 0; onPC = false; onPR = false; onSL = true; onSLtest = false; 
    $('#instructions').show();
    $('#instructions').load('html/newslinterim.html'); 
    $('#next').show();
    $('#next').click(showStatisticalLearningTrialB);
}

// ********** SHOWENDSLTRIALSB: shows the page right at the end of both SL trials
function showEndSLTrialsB() {
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
    var SLcorrectA = 0; numCorrA = 0; SLcorrectB = 0; numCorrB = 0; 
    exp_data["subject"] = subjectID;
    exp_data["slOrder"] = slOrder;
    exp_data["pfOrder"] = pfOrder;
    for (i = 0; i < demographics.length; i++) {
        exp_data[demographics[i].name] = demographics[i].value;
    }
    for (i = 0; i < chineseTest.length; i++) {
        exp_data[chineseTest[i].name] = chineseTest[i].value;
    }
    if (slOrder==1) {
      for (var i = 0; i<4; i++) {
        str = "SLeasyChinese" + (i+1);
        exp_data[str] = easyA[i];
        str = "SLhardChinese" + (i+1);
        exp_data[str] = hardA[i];
        str = "SLeasyMedium" + (i+1);
        exp_data[str] = easyB[i];
        str = "SLhardMedium" + (i+1);
        exp_data[str] = hardB[i];
      }
    } else {
      for (var i = 0; i<4; i++) {
        str = "SLeasyChinese" + (i+1);
        exp_data[str] = easyB[i];
        str = "SLhardChinese" + (i+1);
        exp_data[str] = hardB[i];
        str = "SLeasyMedium" + (i+1);
        exp_data[str] = easyA[i];
        str = "SLhardMedium" + (i+1);
        exp_data[str] = hardA[i];
      }
    }
        
    for (i=0; i<testitemsA.length; i++) {
      str = 'SLitemA' + (i+1);
      exp_data[str] = testitemsA[i];
      str = 'SLanswerA' + (i+1);
      exp_data[str] = testanswersA[i];
      if (testanswersA[i]=="correct") {
        SLcorrectA = SLcorrectA + 1;
      }
    }
    for (i=0; i<testitemsB.length; i++) {
      str = 'SLitemB' + (i+1);
      exp_data[str] = testitemsB[i];
      str = 'SLanswerB' + (i+1);
      exp_data[str] = testanswersB[i];
      if (testanswersB[i]=="correct") {
        SLcorrectB = SLcorrectB + 1;
      }
    }
    if (slOrder==1) {
      exp_data["SLcorrectChinese"] = SLcorrectA/(testitemsA.length);
      exp_data["SLcorrectMedium"] = SLcorrectB/(testitemsB.length);
    } else {
      exp_data["SLcorrectMedium"] = SLcorrectA/(testitemsA.length);
      exp_data["SLcorrectChinese"] = SLcorrectB/(testitemsB.length);
    }
    
    englishwordsA[0].value = englishwordsA[0].value.toLowerCase();
    englishwordsA[0].value = englishwordsA[0].value.replace(/\s+/g, '');
    englishwordsB[0].value = englishwordsB[0].value.toLowerCase();
    englishwordsB[0].value = englishwordsB[0].value.replace(/\s+/g, '');
    
    for (var i=0; i<5; i++) {
      var word = testwordsA[i].replace(".jpg","");
      if (englishwordsA[0].value.indexOf(word) > -1) {
        numCorrA = numCorrA + 1;
      }
    }
    for (var i=0; i<5; i++) {
      var word = testwordsB[i].replace(".jpg","");
      if (englishwordsB[0].value.indexOf(word) > -1) {
        numCorrB = numCorrB + 1;
      }
    }
    exp_data["SLtraincorrA"] = numCorrA;
    exp_data["SLwordsA"] = englishwordsA[0].value;
    exp_data["SLtraincorrB"] = numCorrB;
    exp_data["SLwordsB"] = englishwordsB[0].value;
    
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
      if (pfOrder==1) {
        exp_data["PFpauseavgChinese"] = firstPFpauses/pfApauses.length;
        exp_data["PFpauseavgMedium"] = secondPFpauses/pfBpauses.length;
        exp_data["PFcorrectChinese"] = firstPFcorrect/pfAanswers.length;
        exp_data["PFcorrectMedium"] = secondPFcorrect/pfBanswers.length;
      } else {
        exp_data["PFpauseavgMedium"] = firstPFpauses/pfApauses.length;
        exp_data["PFcorrectChinese"] = secondPFpauses/pfBpauses.length;
        exp_data["PFpauseavgMedium"] = firstPFcorrect/pfAanswers.length;
        exp_data["PFcorrectChinese"] = secondPFcorrect/pfBanswers.length;
      }
      
    
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
   
    sm = ["A","D","E","G","H","J","L","M","O","P","Q","T","W","Y","AA","CC"];
    sc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"];
    sm = shuffleArray(sm);
    sc = shuffleArray(sc);
    
    // set the training sequence
    trainseq = ["train4.jpg","train1.jpg","hat.jpg","train6.jpg","train2.jpg","train3.jpg"];

    // make the stimuli for statistical learning
    if (slOrder==1) {
      for (var j=0; j<16; j++) {
        stimsetA[j] = 'chinese' + sc[j] + '.jpg';
        stimsetB[j] = 'medium' + sm[j] + '.jpg';
      }
    } else {
      for (var j=0; j<16; j++) {
        stimsetA[j] = 'medium' + sm[j] + '.jpg';
        stimsetB[j] = 'chinese' + sc[j] + '.jpg';
      }
    }

    // make stimuli for the perceptual fluency tests
    if (pfOrder==1) {
      for (var j=0; j<16; j++) {
        pstimsetA[j] = 'chinese' + sc[j] + '.jpg';
        pstimsetB[j] = 'medium' + sm[j] + '.jpg';
      }
    } else {
      for (var j=0; j<16; j++) {
        pstimsetA[j] = 'medium' + sm[j] + '.jpg';
        pstimsetB[j] = 'chinese' + sc[j] + '.jpg';
      }      
    }

    createTripletsA();
    createTripletsB();

    wordseqA = getWordSequenceA();
    getSyllableSequenceA();
    makeTestTrialsA();
    wordseqB = getWordSequenceB();
    getSyllableSequenceB();
    makeTestTrialsB();
    makePerceptualFluencyTrials();

}


// ********** CREATETRIPLETSA: creates the core triplets in sequence A
function createTripletsA() {

    hardtripletsA[0] = [stimsetA[0], stimsetA[1], stimsetA[2]]; wordsA[0] = hardtripletsA[0];
    hardtripletsA[1] = [stimsetA[1], stimsetA[0], stimsetA[3]]; wordsA[1] = hardtripletsA[1];
    hardtripletsA[2] = [stimsetA[3], stimsetA[2], stimsetA[0]]; wordsA[2] = hardtripletsA[2];
    hardtripletsA[3] = [stimsetA[2], stimsetA[3], stimsetA[1]]; wordsA[3] = hardtripletsA[3];
    hardA[0] = getLetters(stimsetA[0]) + '-' + getLetters(stimsetA[1]) + '-' + getLetters(stimsetA[2]);
    hardA[1] = getLetters(stimsetA[1]) + '-' + getLetters(stimsetA[0]) + '-' + getLetters(stimsetA[3]);
    hardA[2] = getLetters(stimsetA[3]) + '-' + getLetters(stimsetA[2]) + '-' + getLetters(stimsetA[0]);
    hardA[3] = getLetters(stimsetA[2]) + '-' + getLetters(stimsetA[3]) + '-' + getLetters(stimsetA[1]);
  
    easytripletsA[0] = [stimsetA[4], stimsetA[5], stimsetA[6]]; wordsA[4] = easytripletsA[0];
    easytripletsA[1] = [stimsetA[7], stimsetA[8], stimsetA[9]]; wordsA[5] = easytripletsA[1];
    easytripletsA[2] = [stimsetA[10], stimsetA[11], stimsetA[12]]; wordsA[6] = easytripletsA[2];
    easytripletsA[3] = [stimsetA[13], stimsetA[14], stimsetA[15]]; wordsA[7] = easytripletsA[3];
    easyA[0] = getLetters(stimsetA[4]) + '-' + getLetters(stimsetA[5]) + '-' + getLetters(stimsetA[6]);
    easyA[1] = getLetters(stimsetA[7]) + '-' + getLetters(stimsetA[8]) + '-' + getLetters(stimsetA[9]);
    easyA[2] = getLetters(stimsetA[10]) + '-' + getLetters(stimsetA[11]) + '-' + getLetters(stimsetA[12]);
    easyA[3] = getLetters(stimsetA[13]) + '-' + getLetters(stimsetA[14]) + '-' + getLetters(stimsetA[15]);
 
}

// ********** CREATETRIPLETSB: creates the core triplets in sequence B
function createTripletsB() {

    hardtripletsB[0] = [stimsetB[0], stimsetB[1], stimsetB[2]]; wordsB[0] = hardtripletsB[0];
    hardtripletsB[1] = [stimsetB[1], stimsetB[0], stimsetB[3]]; wordsB[1] = hardtripletsB[1];
    hardtripletsB[2] = [stimsetB[3], stimsetB[2], stimsetB[0]]; wordsB[2] = hardtripletsB[2];
    hardtripletsB[3] = [stimsetB[2], stimsetB[3], stimsetB[1]]; wordsB[3] = hardtripletsB[3];
    hardB[0] = getLetters(stimsetB[0]) + '-' + getLetters(stimsetB[1]) + '-' + getLetters(stimsetB[2]);
    hardB[1] = getLetters(stimsetB[1]) + '-' + getLetters(stimsetB[0]) + '-' + getLetters(stimsetB[3]);
    hardB[2] = getLetters(stimsetB[3]) + '-' + getLetters(stimsetB[2]) + '-' + getLetters(stimsetB[0]);
    hardB[3] = getLetters(stimsetB[2]) + '-' + getLetters(stimsetB[3]) + '-' + getLetters(stimsetB[1]);
  
    easytripletsB[0] = [stimsetB[4], stimsetB[5], stimsetB[6]]; wordsB[4] = easytripletsB[0];
    easytripletsB[1] = [stimsetB[7], stimsetB[8], stimsetB[9]]; wordsB[5] = easytripletsB[1];
    easytripletsB[2] = [stimsetB[10], stimsetB[11], stimsetB[12]]; wordsB[6] = easytripletsB[2];
    easytripletsB[3] = [stimsetB[13], stimsetB[14], stimsetB[15]]; wordsB[7] = easytripletsB[3];
    easyB[0] = getLetters(stimsetB[4]) + '-' + getLetters(stimsetB[5]) + '-' + getLetters(stimsetB[6]);
    easyB[1] = getLetters(stimsetB[7]) + '-' + getLetters(stimsetB[8]) + '-' + getLetters(stimsetB[9]);
    easyB[2] = getLetters(stimsetB[10]) + '-' + getLetters(stimsetB[11]) + '-' + getLetters(stimsetB[12]);
    easyB[3] = getLetters(stimsetB[13]) + '-' + getLetters(stimsetB[14]) + '-' + getLetters(stimsetB[15]);
 
}

// ********** GETWORDSEQUENCEA: gets the sequence of words for training
function getWordSequenceA() {
    
      var wordseqA = [];
      if (!debugging) {
        // sets the words assuming there are eight, with 24 reps each
        for (var i=0; i<192; i++) {
          wordseqA[i] = i%8;
        }
        // puts in one of the words for them to recognise
        wordseqA[192] = 999;
        wordseqA[193] = 999;
        wordseqA[194] = 999;
        wordseqA[195] = 999;
        wordseqA[196] = 999;
        wordseqA = shuffleArrayNoRepeats(wordseqA);
      } else {
        // when debugging only shows three words
        wordseqA[0] = 3;
        wordseqA[1] = 6;
        wordseqA[2] = 999;
        wordseqA[3] = 2;
      }
    return wordseqA;
}

// ********** GETWORDSEQUENCEB: gets the sequence of words for training
function getWordSequenceB() {
    
      var wordseqB = [];
      if (!debugging) {
        // sets the words assuming there are eight, with 24 reps each
        for (var i=0; i<192; i++) {
          wordseqB[i] = i%8;
        }
        // puts in one of the words for them to recognise
        wordseqB[192] = 999;
        wordseqB[193] = 999;
        wordseqB[194] = 999;
        wordseqB[195] = 999;
        wordseqB[196] = 999;
        wordseqB = shuffleArrayNoRepeats(wordseqB);
      } else {
        // when debugging only shows three words
        wordseqB[0] = 3;
        wordseqB[1] = 6;
        wordseqB[2] = 999;
        wordseqB[3] = 2;
      }
    return wordseqB;
}


// ********** GETSYLLABLESEQUENCEA: gets the sequence of syllables. assumes wordseqA exists
function getSyllableSequenceA() {
    
  var sInd = 0; rInd = 0; tInd = 0;
  testwordsA[0] = "boat.jpg";
  testwordsA[1] = "tree.jpg";
  testwordsA[2] = "doll.jpg";
  testwordsA[3] = "koala.jpg";
  testwordsA[4] = "lady.jpg";

  for (var i=0; i<wordseqA.length; i++) {
    if (wordseqA[i] < 900) {
      for (var j=0; j<3; j++) {
        syllseqA[sInd] = wordsA[wordseqA[i]][j];
        sInd = sInd+1;
      }
    } else {
      if (debugging) {
        syllseqA[sInd] = "shoe.jpg";
      } else {
        syllseqA[sInd] = testwordsA[tInd];
        tInd = tInd+1;
      }         
      sInd = sInd+1;
    }
  }
}

// ********** GETSYLLABLESEQUENCEB: gets the sequence of syllables. assumes wordseqA exists
function getSyllableSequenceB() {
    
  var sInd = 0; rInd = 0; tInd = 0;
  testwordsB[0] = "dog.jpg";
  testwordsB[1] = "walk.jpg";
  testwordsB[2] = "train.jpg";
  testwordsB[3] = "boy.jpg";
  testwordsB[4] = "hat.jpg";

  for (var i=0; i<wordseqB.length; i++) {
    if (wordseqB[i] < 900) {
      for (var j=0; j<3; j++) {
        syllseqB[sInd] = wordsB[wordseqB[i]][j];
        sInd = sInd+1;
      }
    } else {
      if (debugging) {
        syllseqB[sInd] = "lion.jpg";
      } else {
        syllseqB[sInd] = testwordsB[tInd];
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
    //var r = Math.floor(Math.random() * 2);
    //if (r==0) {
      for (var i=0; i<pfA.length; i++) {
        pfTaskAtargets[i] = pstimsetA[pfA[i]];
      } 
      for (var i=0; i<pfB.length; i++) {
        pfTaskBtargets[i] = pstimsetB[pfB[i]];
      } 
    //} else {
      //for (var i=0; i<pfA.length; i++) {
      //  pfTaskAtargets[i] = pstimsetB[pfB[i]];
      //  pfTaskBtargets[i] = pstimsetA[pfA[i]];
      //}
    //}
    pfTypeA = pstimsetA[0].slice(0,4);
    pfTypeB = pstimsetB[0].slice(0,4);
}

// ********** MAKETESTTRIALSA: makes the test trials for sequence A, based on Siegelman, Bogaerts, Frost
// Behaviour Research Methods 2017 "Measuring individual differences in statistical learning"

function makeTestTrialsA() {
  
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
    patternrecogTargetA[pr[0]] = hardtripletsA[0]; 
      patternrecogFoilsoneA[pr[0]] = [stimsetA[1], stimsetA[12], stimsetA[7]];
      patternrecogFoilstwoA[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeA[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
    // one pattern recognition item with three foils
    patternrecogTargetA[pr[1]] = hardtripletsA[1]; 
      patternrecogFoilsoneA[pr[1]] = [stimsetA[8], stimsetA[4], stimsetA[10]];
      patternrecogFoilstwoA[pr[1]] = [stimsetA[15], stimsetA[10], stimsetA[5]];
      patternrecogFoilsthreeA[pr[1]] = [stimsetA[0], stimsetA[1], stimsetA[3]];
    // one item with only pairs, and one other answer option  
    patternrecogTargetA[pr[2]] = [stimsetA[1], stimsetA[2],"white.jpg"];
      patternrecogFoilsoneA[pr[2]] = [stimsetA[0], stimsetA[15],"white.jpg"];
      patternrecogFoilstwoA[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeA[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
    // now items with only pairs, and three other answer options  
    patternrecogTargetA[pr[3]] = [stimsetA[11], stimsetA[12],"white.jpg"];
      patternrecogFoilsoneA[pr[3]] = [stimsetA[5], stimsetA[10],"white.jpg"];
      patternrecogFoilstwoA[pr[3]] = [stimsetA[11], stimsetA[14],"white.jpg"];
      patternrecogFoilsthreeA[pr[3]] = [stimsetA[8], stimsetA[3],"white.jpg"];  
    // give them names for easy reference (here in debugging these are meaningless)
    for (var i=0; i<pr.length; i++) {
      testitemsA[pr[i]] = i+1;
    }
   // now a pattern completion item. first item in foils array is always the target
    patterncompletionQuestionA[0] = [stimsetA[0], "blank.jpg", stimsetA[2]];
      patterncompletionFoilsA[0] = [stimsetA[1], stimsetA[12], stimsetA[8]]
    testitemsA[pr.length] = 0;  
    
  // if not debugging have all test items  
  } else {
    // first set up the pattern recognition items with one foil
    patternrecogTargetA[pr[0]] = hardtripletsA[0]; 
      patternrecogFoilsoneA[pr[0]] = [stimsetA[1], stimsetA[12], stimsetA[7]];
    patternrecogTargetA[pr[1]] = hardtripletsA[1]; 
      patternrecogFoilsoneA[pr[1]] = [stimsetA[0], stimsetA[1], stimsetA[3]];
    patternrecogTargetA[pr[2]] = hardtripletsA[2]; 
      patternrecogFoilsoneA[pr[2]] = [stimsetA[3], stimsetA[2], stimsetA[8]];
    patternrecogTargetA[pr[3]] = hardtripletsA[3]; 
      patternrecogFoilsoneA[pr[3]] = [stimsetA[6], stimsetA[0], stimsetA[2]];
    patternrecogTargetA[pr[4]] = easytripletsA[0]; 
      patternrecogFoilsoneA[pr[4]] = [stimsetA[8], stimsetA[4], stimsetA[10]];
    patternrecogTargetA[pr[5]] = easytripletsA[1]; 
      patternrecogFoilsoneA[pr[5]] = [stimsetA[15], stimsetA[10], stimsetA[5]];
    patternrecogTargetA[pr[6]] = easytripletsA[2]; 
      patternrecogFoilsoneA[pr[6]] = [stimsetA[13], stimsetA[5], stimsetA[9]];
    patternrecogTargetA[pr[7]] = easytripletsA[3]; 
      patternrecogFoilsoneA[pr[7]] = [stimsetA[2], stimsetA[0], stimsetA[14]];
    patternrecogTargetA[pr[8]] = hardtripletsA[0]; 
      patternrecogFoilsoneA[pr[8]] = [stimsetA[14], stimsetA[0], stimsetA[3]];
    patternrecogTargetA[pr[9]] = hardtripletsA[1]; 
      patternrecogFoilsoneA[pr[9]] = [stimsetA[13], stimsetA[5], stimsetA[9]];
    patternrecogTargetA[pr[10]] = hardtripletsA[2]; 
      patternrecogFoilsoneA[pr[10]] = [stimsetA[1], stimsetA[7], stimsetA[3]];
    patternrecogTargetA[pr[11]] = hardtripletsA[3]; 
      patternrecogFoilsoneA[pr[11]] = [stimsetA[15], stimsetA[10], stimsetA[5]];
    patternrecogTargetA[pr[12]] = easytripletsA[0]; 
      patternrecogFoilsoneA[pr[12]] = [stimsetA[13], stimsetA[2], stimsetA[1]];
    patternrecogTargetA[pr[13]] = easytripletsA[1]; 
      patternrecogFoilsoneA[pr[13]] = [stimsetA[4], stimsetA[11], stimsetA[12]];
    patternrecogTargetA[pr[14]] = easytripletsA[2]; 
      patternrecogFoilsoneA[pr[14]] = [stimsetA[0], stimsetA[1], stimsetA[3]];
    patternrecogTargetA[pr[15]] = easytripletsA[3]; 
      patternrecogFoilsoneA[pr[15]] = [stimsetA[15], stimsetA[6], stimsetA[9]];
    for (var i=0; i<16; i++) {
      patternrecogFoilstwoA[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeA[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
    }

    // now set up the pattern recognition items with three foils  
    patternrecogTargetA[pr[16]] = hardtripletsA[0]; 
      patternrecogFoilsoneA[pr[16]] = [stimsetA[8], stimsetA[4], stimsetA[10]];
      patternrecogFoilstwoA[pr[16]] = [stimsetA[1], stimsetA[7], stimsetA[3]];
      patternrecogFoilsthreeA[pr[16]] = [stimsetA[13], stimsetA[2], stimsetA[1]];
    patternrecogTargetA[pr[17]] = hardtripletsA[1]; 
      patternrecogFoilsoneA[pr[17]] = [stimsetA[8], stimsetA[4], stimsetA[10]];
      patternrecogFoilstwoA[pr[17]] = [stimsetA[15], stimsetA[10], stimsetA[5]];
      patternrecogFoilsthreeA[pr[17]] = [stimsetA[0], stimsetA[1], stimsetA[3]];
    patternrecogTargetA[pr[18]] = hardtripletsA[2]; 
      patternrecogFoilsoneA[pr[18]] = [stimsetA[15], stimsetA[6], stimsetA[9]];
      patternrecogFoilstwoA[pr[18]] = [stimsetA[1], stimsetA[12], stimsetA[7]];
      patternrecogFoilsthreeA[pr[18]] = [stimsetA[1], stimsetA[7], stimsetA[3]];
    patternrecogTargetA[pr[19]] = hardtripletsA[3]; 
      patternrecogFoilsoneA[pr[19]] = [stimsetA[4], stimsetA[11], stimsetA[12]];
      patternrecogFoilstwoA[pr[19]] = [stimsetA[14], stimsetA[0], stimsetA[3]];
      patternrecogFoilsthreeA[pr[19]] = [stimsetA[2], stimsetA[0], stimsetA[14]];
    patternrecogTargetA[pr[20]] = easytripletsA[0]; 
      patternrecogFoilsoneA[pr[20]] = [stimsetA[15], stimsetA[6], stimsetA[9]];
      patternrecogFoilstwoA[pr[20]] = [stimsetA[13], stimsetA[5], stimsetA[9]];
      patternrecogFoilsthreeA[pr[20]] = [stimsetA[1], stimsetA[12], stimsetA[7]];
    patternrecogTargetA[pr[21]] = easytripletsA[1]; 
      patternrecogFoilsoneA[pr[21]] = [stimsetA[0], stimsetA[1], stimsetA[3]];
      patternrecogFoilstwoA[pr[21]] = [stimsetA[3], stimsetA[2], stimsetA[8]];
      patternrecogFoilsthreeA[pr[21]] = [stimsetA[14], stimsetA[0], stimsetA[3]];
    patternrecogTargetA[pr[22]] = easytripletsA[2]; 
      patternrecogFoilsoneA[pr[22]] = [stimsetA[13], stimsetA[2], stimsetA[1]];
      patternrecogFoilstwoA[pr[22]] = [stimsetA[6], stimsetA[0], stimsetA[2]];
      patternrecogFoilsthreeA[pr[22]] = [stimsetA[2], stimsetA[0], stimsetA[14]];
    patternrecogTargetA[pr[23]] = easytripletsA[3]; 
      patternrecogFoilsoneA[pr[23]] = [stimsetA[4], stimsetA[11], stimsetA[12]];
      patternrecogFoilstwoA[pr[23]] = [stimsetA[3], stimsetA[2], stimsetA[8]];
      patternrecogFoilsthreeA[pr[23]] = [stimsetA[6], stimsetA[0], stimsetA[2]];
    
    // now items with only pairs, and one other answer option  
    patternrecogTargetA[pr[24]] = [stimsetA[1], stimsetA[2],"white.jpg"];
      patternrecogFoilsoneA[pr[24]] = [stimsetA[0], stimsetA[15],"white.jpg"];
    patternrecogTargetA[pr[25]] = [stimsetA[0], stimsetA[3],"white.jpg"];
      patternrecogFoilsoneA[pr[25]] = [stimsetA[1], stimsetA[3],"white.jpg"];
    patternrecogTargetA[pr[26]] = [stimsetA[2], stimsetA[0],"white.jpg"];
      patternrecogFoilsoneA[pr[26]] = [stimsetA[5], stimsetA[2],"white.jpg"];
    patternrecogTargetA[pr[27]] = [stimsetA[3], stimsetA[1],"white.jpg"];
      patternrecogFoilsoneA[pr[27]] = [stimsetA[12], stimsetA[1],"white.jpg"];
    patternrecogTargetA[pr[28]] = [stimsetA[5], stimsetA[6],"white.jpg"];
      patternrecogFoilsoneA[pr[28]] = [stimsetA[4], stimsetA[10],"white.jpg"];
    patternrecogTargetA[pr[29]] = [stimsetA[7], stimsetA[8],"white.jpg"];
      patternrecogFoilsoneA[pr[29]] = [stimsetA[2], stimsetA[13],"white.jpg"];
    for (var i=24; i<30; i++) {
      patternrecogFoilstwoA[pr[i]] = ["white.jpg","white.jpg"];
      patternrecogFoilsthreeA[pr[i]] = ["white.jpg","white.jpg"];
    }  
    
    // now items with only pairs, and three other answer options  
    patternrecogTargetA[pr[30]] = [stimsetA[11], stimsetA[12],"white.jpg"];
      patternrecogFoilsoneA[pr[30]] = [stimsetA[5], stimsetA[10],"white.jpg"];
      patternrecogFoilstwoA[pr[30]] = [stimsetA[11], stimsetA[14],"white.jpg"];
      patternrecogFoilsthreeA[pr[30]] = [stimsetA[8], stimsetA[3],"white.jpg"];
    patternrecogTargetA[pr[31]] = [stimsetA[13], stimsetA[14],"white.jpg"];
      patternrecogFoilsoneA[pr[31]] = [stimsetA[7], stimsetA[9],"white.jpg"];
      patternrecogFoilstwoA[pr[31]] = [stimsetA[0], stimsetA[7],"white.jpg"];
      patternrecogFoilsthreeA[pr[31]] = [stimsetA[14], stimsetA[6],"white.jpg"];
    patternrecogTargetA[pr[32]] = [stimsetA[0], stimsetA[1],"white.jpg"];
      patternrecogFoilsoneA[pr[32]] = [stimsetA[6], stimsetA[0],"white.jpg"];
      patternrecogFoilstwoA[pr[32]] = [stimsetA[2], stimsetA[13],"white.jpg"];
      patternrecogFoilsthreeA[pr[32]] = [stimsetA[12], stimsetA[4],"white.jpg"];
    patternrecogTargetA[pr[33]] = [stimsetA[3], stimsetA[2],"white.jpg"];
      patternrecogFoilsoneA[pr[33]] = [stimsetA[8], stimsetA[1],"white.jpg"];
      patternrecogFoilstwoA[pr[33]] = [stimsetA[9], stimsetA[3],"white.jpg"];
      patternrecogFoilsthreeA[pr[33]] = [stimsetA[15], stimsetA[11],"white.jpg"];
  
    // give them the name as in the paper for easy reference
    for (var i=0; i<pr.length; i++) {
      testitemsA[pr[i]] = i+1;
    }
    for (var i=0; i<pc.length; i++) {
      testitemsA[pr.length+pc[i]] = 35+i;
    }
  
    // now the pattern completion items
    patterncompletionQuestionA[pc[0]] = [stimsetA[0], "blank.jpg", stimsetA[2]];
      patterncompletionFoilsA[pc[0]] = [stimsetA[1], stimsetA[12], stimsetA[8]]
    patterncompletionQuestionA[pc[1]] = [stimsetA[1], stimsetA[0], "blank.jpg"];
      patterncompletionFoilsA[pc[1]] = [stimsetA[3], stimsetA[5], stimsetA[15]]
    patterncompletionQuestionA[pc[2]] = ["blank.jpg", stimsetA[5], stimsetA[6]];
      patterncompletionFoilsA[pc[2]] = [stimsetA[4], stimsetA[13], stimsetA[2]]
    patterncompletionQuestionA[pc[3]] = [stimsetA[7], "blank.jpg", stimsetA[9]];
      patterncompletionFoilsA[pc[3]] = [stimsetA[8], stimsetA[14], stimsetA[3]]
    patterncompletionQuestionA[pc[4]] = [stimsetA[10], "blank.jpg", "white.jpg"];
      patterncompletionFoilsA[pc[4]] = [stimsetA[11], stimsetA[6], stimsetA[0]];
    patterncompletionQuestionA[pc[5]] = ["blank.jpg", stimsetA[14], "white.jpg"];
      patterncompletionFoilsA[pc[5]] = [stimsetA[13], stimsetA[7], stimsetA[11]];
    patterncompletionQuestionA[pc[6]] = [stimsetA[2], "blank.jpg", "white.jpg"];
      patterncompletionFoilsA[pc[6]] = [stimsetA[0], stimsetA[1], stimsetA[4]];
    patterncompletionQuestionA[pc[7]] = ["blank.jpg", stimsetA[3], "white.jpg"];
      patterncompletionFoilsA[pc[7]] = [stimsetA[2], stimsetA[10], stimsetA[9]];
  }

}


// ********** MAKETESTTRIALSB: makes the test trials for sequence B, based on Siegelman, Bogaerts, Frost
// Behaviour Research Methods 2017 "Measuring individual differences in statistical learning"

function makeTestTrialsB() {
  
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
    patternrecogTargetB[pr[0]] = hardtripletsB[0]; 
      patternrecogFoilsoneB[pr[0]] = [stimsetB[1], stimsetB[12], stimsetB[7]];
      patternrecogFoilstwoB[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeB[pr[0]] = ["white.jpg","white.jpg","white.jpg"];
    // one pattern recognition item with three foils
    patternrecogTargetB[pr[1]] = hardtripletsB[1]; 
      patternrecogFoilsoneB[pr[1]] = [stimsetB[8], stimsetB[4], stimsetB[10]];
      patternrecogFoilstwoB[pr[1]] = [stimsetB[15], stimsetB[10], stimsetB[5]];
      patternrecogFoilsthreeB[pr[1]] = [stimsetB[0], stimsetB[1], stimsetB[3]];
    // one item with only pairs, and one other answer option  
    patternrecogTargetB[pr[2]] = [stimsetB[1], stimsetB[2],"white.jpg"];
      patternrecogFoilsoneB[pr[2]] = [stimsetB[0], stimsetB[15],"white.jpg"];
      patternrecogFoilstwoB[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeB[pr[2]] = ["white.jpg","white.jpg","white.jpg"];
    // now items with only pairs, and three other answer options  
    patternrecogTargetB[pr[3]] = [stimsetB[11], stimsetB[12],"white.jpg"];
      patternrecogFoilsoneB[pr[3]] = [stimsetB[5], stimsetB[10],"white.jpg"];
      patternrecogFoilstwoB[pr[3]] = [stimsetB[11], stimsetB[14],"white.jpg"];
      patternrecogFoilsthreeB[pr[3]] = [stimsetB[8], stimsetB[3],"white.jpg"];  
    // give them names for easy reference (here in debugging these are meaningless)
    for (var i=0; i<pr.length; i++) {
      testitemsB[pr[i]] = i+1;
    }
   // now a pattern completion item. first item in foils array is always the target
    patterncompletionQuestionB[0] = [stimsetB[0], "blank.jpg", stimsetB[2]];
      patterncompletionFoilsB[0] = [stimsetB[1], stimsetB[12], stimsetB[8]]
    testitemsB[pr.length] = 0;  
    
  // if not debugging have all test items  
  } else {
    // first set up the pattern recognition items with one foil
    patternrecogTargetB[pr[0]] = hardtripletsB[0]; 
      patternrecogFoilsoneB[pr[0]] = [stimsetB[1], stimsetB[12], stimsetB[7]];
    patternrecogTargetB[pr[1]] = hardtripletsB[1]; 
      patternrecogFoilsoneB[pr[1]] = [stimsetB[0], stimsetB[1], stimsetB[3]];
    patternrecogTargetB[pr[2]] = hardtripletsB[2]; 
      patternrecogFoilsoneB[pr[2]] = [stimsetB[3], stimsetB[2], stimsetB[8]];
    patternrecogTargetB[pr[3]] = hardtripletsB[3]; 
      patternrecogFoilsoneB[pr[3]] = [stimsetB[6], stimsetB[0], stimsetB[2]];
    patternrecogTargetB[pr[4]] = easytripletsB[0]; 
      patternrecogFoilsoneB[pr[4]] = [stimsetB[8], stimsetB[4], stimsetB[10]];
    patternrecogTargetB[pr[5]] = easytripletsB[1]; 
      patternrecogFoilsoneB[pr[5]] = [stimsetB[15], stimsetB[10], stimsetB[5]];
    patternrecogTargetB[pr[6]] = easytripletsB[2]; 
      patternrecogFoilsoneB[pr[6]] = [stimsetB[13], stimsetB[5], stimsetB[9]];
    patternrecogTargetB[pr[7]] = easytripletsB[3]; 
      patternrecogFoilsoneB[pr[7]] = [stimsetB[2], stimsetB[0], stimsetB[14]];
    patternrecogTargetB[pr[8]] = hardtripletsB[0]; 
      patternrecogFoilsoneB[pr[8]] = [stimsetB[14], stimsetB[0], stimsetB[3]];
    patternrecogTargetB[pr[9]] = hardtripletsB[1]; 
      patternrecogFoilsoneB[pr[9]] = [stimsetB[13], stimsetB[5], stimsetB[9]];
    patternrecogTargetB[pr[10]] = hardtripletsB[2]; 
      patternrecogFoilsoneB[pr[10]] = [stimsetB[1], stimsetB[7], stimsetB[3]];
    patternrecogTargetB[pr[11]] = hardtripletsB[3]; 
      patternrecogFoilsoneB[pr[11]] = [stimsetB[15], stimsetB[10], stimsetB[5]];
    patternrecogTargetB[pr[12]] = easytripletsB[0]; 
      patternrecogFoilsoneB[pr[12]] = [stimsetB[13], stimsetB[2], stimsetB[1]];
    patternrecogTargetB[pr[13]] = easytripletsB[1]; 
      patternrecogFoilsoneB[pr[13]] = [stimsetB[4], stimsetB[11], stimsetB[12]];
    patternrecogTargetB[pr[14]] = easytripletsB[2]; 
      patternrecogFoilsoneB[pr[14]] = [stimsetB[0], stimsetB[1], stimsetB[3]];
    patternrecogTargetB[pr[15]] = easytripletsB[3]; 
      patternrecogFoilsoneB[pr[15]] = [stimsetB[15], stimsetB[6], stimsetB[9]];
    for (var i=0; i<16; i++) {
      patternrecogFoilstwoB[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
      patternrecogFoilsthreeB[pr[i]] = ["white.jpg","white.jpg","white.jpg"];
    }

    // now set up the pattern recognition items with three foils  
    patternrecogTargetB[pr[16]] = hardtripletsB[0]; 
      patternrecogFoilsoneB[pr[16]] = [stimsetB[8], stimsetB[4], stimsetB[10]];
      patternrecogFoilstwoB[pr[16]] = [stimsetB[1], stimsetB[7], stimsetB[3]];
      patternrecogFoilsthreeB[pr[16]] = [stimsetB[13], stimsetB[2], stimsetB[1]];
    patternrecogTargetB[pr[17]] = hardtripletsB[1]; 
      patternrecogFoilsoneB[pr[17]] = [stimsetB[8], stimsetB[4], stimsetB[10]];
      patternrecogFoilstwoB[pr[17]] = [stimsetB[15], stimsetB[10], stimsetB[5]];
      patternrecogFoilsthreeB[pr[17]] = [stimsetB[0], stimsetB[1], stimsetB[3]];
    patternrecogTargetB[pr[18]] = hardtripletsB[2]; 
      patternrecogFoilsoneB[pr[18]] = [stimsetB[15], stimsetB[6], stimsetB[9]];
      patternrecogFoilstwoB[pr[18]] = [stimsetB[1], stimsetB[12], stimsetB[7]];
      patternrecogFoilsthreeB[pr[18]] = [stimsetB[1], stimsetB[7], stimsetB[3]];
    patternrecogTargetB[pr[19]] = hardtripletsB[3]; 
      patternrecogFoilsoneB[pr[19]] = [stimsetB[4], stimsetB[11], stimsetB[12]];
      patternrecogFoilstwoB[pr[19]] = [stimsetB[14], stimsetB[0], stimsetB[3]];
      patternrecogFoilsthreeB[pr[19]] = [stimsetB[2], stimsetB[0], stimsetB[14]];
    patternrecogTargetB[pr[20]] = easytripletsB[0]; 
      patternrecogFoilsoneB[pr[20]] = [stimsetB[15], stimsetB[6], stimsetB[9]];
      patternrecogFoilstwoB[pr[20]] = [stimsetB[13], stimsetB[5], stimsetB[9]];
      patternrecogFoilsthreeB[pr[20]] = [stimsetB[1], stimsetB[12], stimsetB[7]];
    patternrecogTargetB[pr[21]] = easytripletsB[1]; 
      patternrecogFoilsoneB[pr[21]] = [stimsetB[0], stimsetB[1], stimsetB[3]];
      patternrecogFoilstwoB[pr[21]] = [stimsetB[3], stimsetB[2], stimsetB[8]];
      patternrecogFoilsthreeB[pr[21]] = [stimsetB[14], stimsetB[0], stimsetB[3]];
    patternrecogTargetB[pr[22]] = easytripletsB[2]; 
      patternrecogFoilsoneB[pr[22]] = [stimsetB[13], stimsetB[2], stimsetB[1]];
      patternrecogFoilstwoB[pr[22]] = [stimsetB[6], stimsetB[0], stimsetB[2]];
      patternrecogFoilsthreeB[pr[22]] = [stimsetB[2], stimsetB[0], stimsetB[14]];
    patternrecogTargetB[pr[23]] = easytripletsB[3]; 
      patternrecogFoilsoneB[pr[23]] = [stimsetB[4], stimsetB[11], stimsetB[12]];
      patternrecogFoilstwoB[pr[23]] = [stimsetB[3], stimsetB[2], stimsetB[8]];
      patternrecogFoilsthreeB[pr[23]] = [stimsetB[6], stimsetB[0], stimsetB[2]];
    
    // now items with only pairs, and one other answer option  
    patternrecogTargetB[pr[24]] = [stimsetB[1], stimsetB[2],"white.jpg"];
      patternrecogFoilsoneB[pr[24]] = [stimsetB[0], stimsetB[15],"white.jpg"];
    patternrecogTargetB[pr[25]] = [stimsetB[0], stimsetB[3],"white.jpg"];
      patternrecogFoilsoneB[pr[25]] = [stimsetB[1], stimsetB[3],"white.jpg"];
    patternrecogTargetB[pr[26]] = [stimsetB[2], stimsetB[0],"white.jpg"];
      patternrecogFoilsoneB[pr[26]] = [stimsetB[5], stimsetB[2],"white.jpg"];
    patternrecogTargetB[pr[27]] = [stimsetB[3], stimsetB[1],"white.jpg"];
      patternrecogFoilsoneB[pr[27]] = [stimsetB[12], stimsetB[1],"white.jpg"];
    patternrecogTargetB[pr[28]] = [stimsetB[5], stimsetB[6],"white.jpg"];
      patternrecogFoilsoneB[pr[28]] = [stimsetB[4], stimsetB[10],"white.jpg"];
    patternrecogTargetB[pr[29]] = [stimsetB[7], stimsetB[8],"white.jpg"];
      patternrecogFoilsoneB[pr[29]] = [stimsetB[2], stimsetB[13],"white.jpg"];
    for (var i=24; i<30; i++) {
      patternrecogFoilstwoB[pr[i]] = ["white.jpg","white.jpg"];
      patternrecogFoilsthreeB[pr[i]] = ["white.jpg","white.jpg"];
    }  
    
    // now items with only pairs, and three other answer options  
    patternrecogTargetB[pr[30]] = [stimsetB[11], stimsetB[12],"white.jpg"];
      patternrecogFoilsoneB[pr[30]] = [stimsetB[5], stimsetB[10],"white.jpg"];
      patternrecogFoilstwoB[pr[30]] = [stimsetB[11], stimsetB[14],"white.jpg"];
      patternrecogFoilsthreeB[pr[30]] = [stimsetB[8], stimsetB[3],"white.jpg"];
    patternrecogTargetB[pr[31]] = [stimsetB[13], stimsetB[14],"white.jpg"];
      patternrecogFoilsoneB[pr[31]] = [stimsetB[7], stimsetB[9],"white.jpg"];
      patternrecogFoilstwoB[pr[31]] = [stimsetB[0], stimsetB[7],"white.jpg"];
      patternrecogFoilsthreeB[pr[31]] = [stimsetB[14], stimsetB[6],"white.jpg"];
    patternrecogTargetB[pr[32]] = [stimsetB[0], stimsetB[1],"white.jpg"];
      patternrecogFoilsoneB[pr[32]] = [stimsetB[6], stimsetB[0],"white.jpg"];
      patternrecogFoilstwoB[pr[32]] = [stimsetB[2], stimsetB[13],"white.jpg"];
      patternrecogFoilsthreeB[pr[32]] = [stimsetB[12], stimsetB[4],"white.jpg"];
    patternrecogTargetB[pr[33]] = [stimsetB[3], stimsetB[2],"white.jpg"];
      patternrecogFoilsoneB[pr[33]] = [stimsetB[8], stimsetB[1],"white.jpg"];
      patternrecogFoilstwoB[pr[33]] = [stimsetB[9], stimsetB[3],"white.jpg"];
      patternrecogFoilsthreeB[pr[33]] = [stimsetB[15], stimsetB[11],"white.jpg"];
  
    // give them the name as in the paper for easy reference
    for (var i=0; i<pr.length; i++) {
      testitemsB[pr[i]] = i+1;
    }
    for (var i=0; i<pc.length; i++) {
      testitemsB[pr.length+pc[i]] = 35+i;
    }
  
    // now the pattern completion items
    patterncompletionQuestionB[pc[0]] = [stimsetB[0], "blank.jpg", stimsetB[2]];
      patterncompletionFoilsB[pc[0]] = [stimsetB[1], stimsetB[12], stimsetB[8]]
    patterncompletionQuestionB[pc[1]] = [stimsetB[1], stimsetB[0], "blank.jpg"];
      patterncompletionFoilsB[pc[1]] = [stimsetB[3], stimsetB[5], stimsetB[15]]
    patterncompletionQuestionB[pc[2]] = ["blank.jpg", stimsetB[5], stimsetB[6]];
      patterncompletionFoilsB[pc[2]] = [stimsetB[4], stimsetB[13], stimsetB[2]]
    patterncompletionQuestionB[pc[3]] = [stimsetB[7], "blank.jpg", stimsetB[9]];
      patterncompletionFoilsB[pc[3]] = [stimsetB[8], stimsetB[14], stimsetB[3]]
    patterncompletionQuestionB[pc[4]] = [stimsetB[10], "blank.jpg", "white.jpg"];
      patterncompletionFoilsB[pc[4]] = [stimsetB[11], stimsetB[6], stimsetB[0]];
    patterncompletionQuestionB[pc[5]] = ["blank.jpg", stimsetB[14], "white.jpg"];
      patterncompletionFoilsB[pc[5]] = [stimsetB[13], stimsetB[7], stimsetB[11]];
    patterncompletionQuestionB[pc[6]] = [stimsetB[2], "blank.jpg", "white.jpg"];
      patterncompletionFoilsB[pc[6]] = [stimsetB[0], stimsetB[1], stimsetB[4]];
    patterncompletionQuestionB[pc[7]] = ["blank.jpg", stimsetB[3], "white.jpg"];
      patterncompletionFoilsB[pc[7]] = [stimsetB[2], stimsetB[10], stimsetB[9]];
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

// ********** GETTESTANSWERSA: returns an array with the test items for the current situation in random order
function getTestAnswersA() {
  var t = [0,1,2,3];
  var objects = [];
  if (ontest) {
    if (onPR) {
       if (patternrecogFoilstwoA[ind][0]=="white.jpg") {
        t = [0,1];
      }
      t = shuffleArray(t);
      objects[t[0]] = patternrecogTargetA[ind];
      objects[t[1]] = patternrecogFoilsoneA[ind];
      if (t.length>2) {
        objects[t[2]] = patternrecogFoilstwoA[ind];
        objects[t[3]] = patternrecogFoilsthreeA[ind];
      } else {
        objects[2] = ["white.jpg","white.jpg","white.jpg"];
        objects[3] = ["white.jpg","white.jpg","white.jpg"];
      }
    } else if (onPC) {
      t = [0,1,2];
      t = shuffleArray(t);
      for (var i = 0; i<3; i++) {
        objects[t[i]] = patterncompletionFoilsA[ind][i];
      }
    }
  }  
  itemCorr = t[0];
  return objects;
}

// ********** GETTESTANSWERSB: returns an array with the test items for the current situation in random order
function getTestAnswersB() {
  var t = [0,1,2,3];
  var objects = [];
  if (ontest) {
    if (onPR) {
       if (patternrecogFoilstwoB[ind][0]=="white.jpg") {
        t = [0,1];
      }
      t = shuffleArray(t);
      objects[t[0]] = patternrecogTargetB[ind];
      objects[t[1]] = patternrecogFoilsoneB[ind];
      if (t.length>2) {
        objects[t[2]] = patternrecogFoilstwoB[ind];
        objects[t[3]] = patternrecogFoilsthreeB[ind];
      } else {
        objects[2] = ["white.jpg","white.jpg","white.jpg"];
        objects[3] = ["white.jpg","white.jpg","white.jpg"];
      }
    } else if (onPC) {
      t = [0,1,2];
      t = shuffleArray(t);
      for (var i = 0; i<3; i++) {
        objects[t[i]] = patterncompletionFoilsB[ind][i];
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
  if (name.slice(0,1)=="c") {
    letters = name.slice(7,8);
  } else {
    if (name.length==12) {
      letters = name.slice(6,8);
    } else {
      letters = name.slice(6,7);    
    }    
  }
  return letters;
}



// ********** SHUFFLEARRAY: permute the values of array
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        currentIndex = currentIndex - 1;
        randomIndex = Math.floor(Math.random() * (currentIndex+1));
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
