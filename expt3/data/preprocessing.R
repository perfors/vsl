library(tidyverse)

fullD <- read.csv(file="parsedresultsfinalall.csv")

# first create columns with aggregate stats
dsa <- select(fullD,contains("SLAnswerA"))
fullD$SL1correct <- rowSums(dsa=="correct")/42
dsb <- select(fullD,contains("SLAnswerB"))
fullD$SL2correct <- rowSums(dsb=="correct")/42
dpa <- select(fullD,contains("PF1pause"))
fullD$PF1avg <- rowMeans(dpa,na.rm=TRUE)
dpb <- select(fullD,contains("PF2pause"))
fullD$PF2avg <- rowMeans(dpb,na.rm=TRUE)

# now assign those to Chinese or Unfamiliar
# slOrder: 1 is Chinese first, 2 is medium first
# pfOrder: 1 is Chinese first, 2 is medium first
fullD$SLcorrectChinese <- NA
fullD$SLcorrectChinese[fullD$slOrder==1] <- fullD$SL1correct[fullD$slOrder==1]
fullD$SLcorrectChinese[fullD$slOrder==2] <- fullD$SL2correct[fullD$slOrder==2]
fullD$SLcorrectUnfamiliar <- NA
fullD$SLcorrectUnfamiliar[fullD$slOrder==1] <- fullD$SL2correct[fullD$slOrder==1]
fullD$SLcorrectUnfamiliar[fullD$slOrder==2] <- fullD$SL1correct[fullD$slOrder==2]
fullD$PFavgChinese <- NA
fullD$PFavgChinese[fullD$pfOrder==1] <- fullD$PF1avg[fullD$pfOrder==1]
fullD$PFavgChinese[fullD$pfOrder==2] <- fullD$PF2avg[fullD$pfOrder==2]
fullD$PFavgUnfamiliar <- NA
fullD$PFavgUnfamiliar[fullD$pfOrder==1] <- fullD$PF2avg[fullD$pfOrder==1]
fullD$PFavgUnfamiliar[fullD$pfOrder==2] <- fullD$PF1avg[fullD$pfOrder==2]

# get overall details
orig <- select(fullD,gender,age,SLtraincorrA,SLtraincorrB)

# now we need to do the exclusions
# people removed for failing the attention check
nBad <- sum(fullD$SLtraincorrA<3 | fullD$SLtraincorrB<3)
fullD <- fullD[fullD$SLtraincorrA>2 & fullD$SLtraincorrB>2,]
# remove PF outliers
fullD$PFavgChinese[fullD$PFavgChinese>mean(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE) +
                     4*sd(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE)] <- NA
nPFoutChinese <- sum(is.na(fullD$PFavgChinese))
fullD$PFavgUnfamiliar[fullD$PFavgUnfamiliar>mean(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE) +
                    4*sd(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE)] <- NA
nPFoutUnfamiliar <- sum(is.na(fullD$PFavgUnfamiliar))
fullD$PF1avg[fullD$PF1avg>mean(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE) +
               4*sd(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE)] <- NA
fullD$PF2avg[fullD$PF2avg>mean(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE) +
               4*sd(c(fullD$PFavgChinese,fullD$PFavgUnfamiliar),na.rm=TRUE)] <- NA
  
# now classify people into the right condition based on their check questions
dq <- select(fullD,contains("question"))
fullD$chineseQs <- rowSums(dq=="correct",na.rm=TRUE)

fullD$languageA <- "English"
fullD$languageA[fullD$chineseQs>2] <- "Chinese"
# put the ones who got 3+ correct but did not self-identify as a native speaker 
fullD$languageA[fullD$mandarin!="native"] <- "English"
# this ends up excluding a lot of people who got 4 correct which seems odd so we'll also do a (non-preregistered) laxer version which excludes people who self-identified as minimal or none
fullD$languageB <- "English"
fullD$languageB[fullD$chineseQs>2] <- "Chinese"
fullD$languageB[fullD$mandarin=="none" | fullD$mandarin=="minimal"] <- "English"

# okay now let's make a smaller and more tractable dataset
ds <- select(fullD,subject,slOrder,pfOrder,languageA,languageB,SLcorrectChinese,SLcorrectUnfamiliar,
            PFavgChinese,PFavgUnfamiliar,SL1correct,SL2correct,PF1avg,PF2avg)
# and also one that is in longer form
dl <- gather(ds,"SLtype","SLcorrect",6:7)
dl <- gather(dl,"PFtype","PFavg",6:7)
dl$SLtype <- plyr::revalue(dl$SLtype, c("SLcorrectChinese" = "Chinese", 
                                  "SLcorrectUnfamiliar" = "Unfamiliar"))
dl$PFtype <- plyr::revalue(dl$PFtype, c("PFavgChinese" = "Chinese", 
                                  "PFavgUnfamiliar" = "Unfamiliar"))

# now let's look at the trends in PF over time
dpa <- select(fullD,contains("PF1pause")) %>% select(-PF1pause1)
dpb <- select(fullD,contains("PF2pause")) %>% select(-PF2pause1)
means1 <- colMeans(dpa,na.rm=TRUE)
se1 <- apply(dpa,FUN=sd,MARGIN = 2)/sqrt(nrow(dpa))
means2 <- colMeans(dpb,na.rm=TRUE)
se2 <- apply(dpb,FUN=sd,MARGIN = 2)/sqrt(nrow(dpb))
pf <- data.frame(means1,means2,se1,se2)

# and now compare to siegelman et al items
dsa <- select(fullD,contains("SLAnswerA")) 
dsb <- select(fullD,contains("SLAnswerB"))
baseitems <- c(0.66,0.39,0.77,0.77,0.68,0.73,0.77,0.73,0.63,0.68,0.63,0.81,0.76,
               0.63,0.63,0.73,0.53,0.34,0.56,0.47,0.52,0.53,0.53,0.5,0.73,0.5,
               0.68,0.74,0.68,0.76,0.56,0.47,0.52,0.61,0.68,0.71,0.63,0.68,0.69,
               0.63,0.48,0.65)
sl1items <- NA
dsit <- select(fullD,contains("SLitemA"))
for (i in 1:42) {
  sl1items[i] <- sum(dsa[dsit==i]=="correct")/nrow(dsa)
}
sl2items <- NA
dsit <- select(fullD,contains("SLitemB"))
for (i in 1:42) {
  sl2items[i] <- sum(dsb[dsit==i]=="correct")/nrow(dsb)
}
sl <- data.frame(sl1items,sl2items,baseitems)
save(orig,fullD,ds,dl,sl,pf,nBad,nPFoutChinese,nPFoutUnfamiliar,file="alldata.RData")
write.csv(ds,'shortdata.csv')
write.csv(dl,'longdata.csv')