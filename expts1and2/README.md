# README: file names and variable names\

Everything is in the fulldataset.RData data file. It contains several smaller datasets, as follows:

### ** Dataset d **

This is the primary dataset with the 132 participants in Experiment 1, with data from both sessions.

workerID: unique identifier for each participant

Education: education level for each participant

Gender: gender

Age: age in years

Country: where they live

SL1condition: condition in session 1, could be either Unfamiliar or Familiar

SL2 condition: condition on SL task in session 2, could be either Unfamiliar or Familiar

Condition: Same if the SL condition was the same in both sessions, different otherwise

SL1correct: this is SLscore on the SL task in session 1, could be between 0 and 1 

Sl1traincorr: how many of the words embedded in the stream they got correct (check question) in session 1

PF1type: matches SL1 condition, it is the first PF task, can be Unfamiliar or Familiar

PF2type: matches SL2 condition, it is the second PF task, can be Unfamiliar or Familiar

SL2 correct: this is SLscore on the SL task in session 2, could be between 0 and 1

Sl2traincorr: how many of the words embedded in the stream they got correct (check question) in session 2

PF1pauseavg: avg latency on first set of PF trials (PFscore)

PF2pauseavg: avg latency on second set of PF trials (PFscore)

PF1correct: # of first set of PF trials correct, this is less meaningful because it equilibrates by changing the latency

PF2correct: # of second set of PF trials correct, this is less meaningful because it equilibrates by changing the latency

### ** Dataset d1all **

Contains all session 1 data including the participants in Experiment 2. All variable names are the same as in dataset d.

### ** Dataset dl **

Long form of the data in dataset d: each row is a session rather than each row is a participant. Necessary for some analyses. All variable names should be straightforward extensions of d (e.g., SLcorrect contains either SL1correct or SL2correct, with the additional variable session indicating which is which)

### ** Dataset PFmeans **

Dataset for all 48 PF trials. On each one, it has the average mean across all participants. 

PF1: all first PF trials

PF2: all second PF trials

Familiar: all Familiar PF trials

Unfamiliar: all Unfamiliar PF trials

### ** Dataset PFsds **

Same as PFmeans, but standard deviations instead.

### ** Dataset SL1 **

Used for calculating the item-by-item correlation between each of the SL tasks in session 1 and the items in Siegelman et al (2017). Each row is an item (item #s correspond to the item numbers in Siegelman et al (2017). 

Base: accuracy (SLscore) reported in Siegelman et al (2017) for that item

All: accuracy over all Session 1 conditions for that item in our task

Familiar: accuracy on Familiar trials for that item in our task

Unfamiliar: accuracy on Unfamiliar trials for that item in our task

UnfSimple: accuracy on UnfSimple trials for that item in our task

### ** Dataset SL2 **

Same thing as SL1 except for session 2 (so there is no UnfSimple)
