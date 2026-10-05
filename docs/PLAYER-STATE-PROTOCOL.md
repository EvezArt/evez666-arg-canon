# Player State Protocol

## Progression state machine

UNSEEN
  |
  v
OBSERVED
  |
  v
CORRELATED
  |
  v
TESTED
  |\
  | \
  v  v
SUPPORTED  CONTRADICTED
  |
  v
REPLICATED
  |
  v
WITNESS
  |
  v
COMPLETE

VERIFIED is reserved for an explicit verification rule. Reaching WITNESS does not mean every claim encountered by a player is true.

## Event types

PLAYER_VIEW
PLAYER_OPEN_ARTIFACT
PLAYER_HASH_CHECK
PLAYER_RUN_TEST
PLAYER_SUBMIT_RESULT
PLAYER_CHALLENGE_CLAIM
PLAYER_REPRODUCE
PLAYER_RECORD_WITNESS

## Progression law

A story statement never advances a player.

A recorded, verifiable action may advance a player.

Reading a claim -> no progression
Hashing an artifact -> observation/correlation
Running a test -> test state
Submitting a matching result -> supported
Reproducing independently -> replicated
Finding a contradiction -> alternate branch
Declaring an unsupported hidden mechanism -> no progression

## Contradiction is content

A failed verification is retained as a CAIN event linked to the original claim and attempted reproduction.

This prevents the game from laundering failures into lore.

## Player-facing language

Avoid:

YOU NOW KNOW THE TRUTH.

Prefer:

CLAIM STATUS: SUPPORTED
YOUR TEST: RECORDED
REMAINING UNKNOWN: 2

The system should be confident about measured state and humble about unmeasured state.
