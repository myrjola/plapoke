------------------------ MODULE PusherPlanningPoker ------------------------
\**
\* This spec demonstrates data passing of a planning poker session using the
\* Pusher service. The idea is to persist data in Redis and use Pusher for
\* real-time updates.
\**

EXTENDS Integers 

CONSTANTS
    Users

VARIABLES
    userEstimates,
    revealEstimates
    
estimates == 0..2 \* Zero means that no estimate has been placed
    
vars == <<userEstimates, revealEstimates>>

TypeOK == /\ \A user \in Users : userEstimates[user] \in estimates
          /\ revealEstimates \in {TRUE, FALSE}
 

Init == /\ userEstimates = [user \in Users |-> 0]
        /\ revealEstimates = FALSE

RevealEstimates == /\ revealEstimates = FALSE
                   /\ revealEstimates' = TRUE
                   /\ UNCHANGED<<userEstimates>>

StartNewRound == /\ revealEstimates = TRUE
                 /\ revealEstimates' = FALSE
                 /\ userEstimates' = [user \in Users |-> 0]

PlaceEstimate(user, estimate) == /\ userEstimates' = [userEstimates EXCEPT ![user] = estimate]
                                 /\ UNCHANGED<<revealEstimates>>
                 
Next == \/ RevealEstimates
        \/ StartNewRound
        \/ \E user \in Users, estimate \in estimates : PlaceEstimate(user, estimate)


Spec == Init /\ [][Next]_vars

\* Still need a queue for user events coming in
\* Possible invariants:
\* - user posts estimate to wrong round (finding: needs a round id in the board state)
\* - user goes out of sync due to networking issues (should be rectified once the latest event arrives)
=============================================================================
\* Modification History
\* Last modified Tue Aug 08 18:12:10 EEST 2023 by ext-martin.yrjola
\* Created Tue Aug 08 17:17:12 EEST 2023 by ext-martin.yrjola
