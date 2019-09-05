# Experiment 3
This was the experiment with Chinese and English speakers seeing the same stimuli

The code for running the experiment is in the *experimentcode* folder, and the stimuli are in a separate *stimuli* folder (they can also be found in the experiment code folder)

The *docs* folder right now contains only a copy of the pre-registration document

The *data* folder contains the raw data and all analyses. All of the raw data is in the *parsedresultsfinalall.csv* file. Preprocessing is done with the *preprocessing.R* script, which produces the *alldata.RData* file and two csv files corresponding to the main information in the RData one. Then the R Markdown file *fullanalysis.Rmd* file reads in the RData and produces all of the analyses, which can be seein the html output file.


