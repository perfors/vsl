## Explanation of variables in the raw data file parsedresultsfinalall.csv

Throughout this refers to “Chinese” stimuli vs “medium” stimuli. Medium is not a great term but it refers to the non-Chinese ones.

**slOrder**: 1 is Chinese first, 2 is medium first

**pfOrder**: 1 is Chinese first, 2 is medium first

**english**: their rating of their English ability

**mandarin**: their rating of their Chinese ability

**question1…question4**: their answers to the four Chinese questions. 

**SLtraincorrA**: this is how many of the words hidden in the first SL training they saw they got. This is one of the exclusion criteria.

**SLwordsA**: this is the words they gave for the first SL training

**SLtraincorrB**: this is how many of the words hidden in the second SL training they saw they got. This is one of the exclusion criteria

**SLwordsB**: this is the words they gave for the second SL training

**SLanswerA1..42**: this is whether they got the answer for the 1st through 42 statistical learning question they were asked in the first sequence, coded as "correct"/"incorrect"

**SLitemA1...42**: this is the item number from Siegelman that this corresponds to. e.g. if SLitemA1 is 32 that means that this participant's first SL question in the first sequence was number 32 from Siegelman. This was all randomised

**SLanswerB1..42**: this is whether they got the answer for the 1st through 42 statistical learning question they were asked in the second sequence, coded as "correct"/"incorrect"

**SLitemB1...42**: this is the item number from Siegelman that this corresponds to. e.g. if SLitemB1 is 32 that means that this participant's first SL question in the second sequence was number 32 from Siegelman. This was all randomised

**Pf1pause2…48**: this is the latency in ms (PFscore) for each of the trials 2 through 48 (1 wasn’t saved) on the first pf task (refer to pfOrder to figure out if this was Chinese or medium stimuli).

**Pf2pause2…48**: this is the latency in ms (PFscore) for each of the trials 2 through 48 (1 wasn’t saved) on the second pf task (refer to pfOrder to figure out if this was Chinese or medium stimuli). 

**Pf1answer2…48**: this is whether they got that PF question on the first PF task correct. This turns out not to be useful for analysis because it naturally equilibriates so everyone is at that same point, getting about the same average accuracy, just at different latencies

**Pf2answer2…48**: this is whether they got that PF question on the second PF task correct. This turns out not to be useful for analysis because it naturally equilibriates so everyone is at that same point, getting about the same average accuracy, just at different latencies

**Pf1target2…48**: this is what item was the target on that PF question on the first PF task. Probably unimportant for any analyses, I saved because I'm obsessive and it was useful in debugging.

**Pf2target2…48**: this is what item was the target on that PF question on the first PF task. Probably unimportant for any analyses, I saved because I'm obsessive and it was useful in debugging.

**All of these columns which have three letter codes underneath them like L-N-E etc**: these are just notes of which stimuli were assigned to each triplet for each participant. e.g. L-N-E under SLeasyChinese4 means that for that participant, their fourth "easy" triplet with the Chinese stimuli was composed of images L, N, and E in that order. You should never need to use this, I just saved it all because I'm obsessive and it was useful to track while debugging.

## Addendum

Because we pre-registered only 160 participants but ended up reporting more, we performed all analyses with a dataset composed of just the first 160 people. That is why there is a double for everything: the ones with "first160" at the end include only those 160.
