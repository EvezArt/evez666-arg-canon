# EVEZ666 — THE ARG

**The quest is the punchline.**

This repository is the canonical game layer for the EVEZ corpus: repositories, commits, experiments, event logs, research claims, agent systems, evidence records, and player actions can all become parts of the game.

The point is not to make fiction indistinguishable from reality.

The point is to make verification itself playable.

## The prime rule

> If it is not true, it cannot do what the claimed truth would let it do.

A meme can persuade. A story can change human behavior. A fictional agent can cause a player to act.

But a capability claim is not capability.

Therefore:

CLAIMED != MEASURED != REPLICATED != EXPLAINED

PROVENANCE != TRUTH

## The punchline

The first quest is:

PROVE THIS QUEST EXISTS.

A screenshot is evidence that you saw something.

An inspectable artifact is stronger.

A reproducible state transition is stronger still.

The player becomes a witness because the player performed the investigation required to establish what can actually be established.

The joke is not “you were secretly in the story.”

It is:

“You became the witness by trying to determine whether there was anything worth witnessing.”

## World mapping

~~~text
EVEZ corpus
    |
    +-- repositories -> locations
    +-- commits      -> historical strata
    +-- artifacts    -> evidence
    +-- events       -> world memory
    +-- claims       -> propositions
    +-- agents       -> actors
    +-- experiments  -> quests
    +-- contradictions -> alternate paths
    +-- verification -> progression
    +-- player ledger -> character sheet
~~~

## Core loop

~~~text
OBSERVE
  ↓
CLASSIFY
  ↓
TEST
  ↓
RECORD
  ↓
UPDATE
  ↓
QUEST
~~~

## Canon ladder

~~~text
UNKNOWN
   ↓
PROPOSED
   ↓
OBSERVED
   ↓
TESTABLE
   ↓
SUPPORTED
   ↓
VERIFIED
~~~

Alternate outcomes:

~~~text
CONTRADICTED
STALE
RETRACTED
~~~

An exciting story beat cannot promote a claim beyond its evidence.

## New implementation in this branch

- docs/ARG-REFRAME-QUEST-IS-PUNCHLINE.md
- docs/PLAYER-STATE-PROTOCOL.md
- docs/EVEZ-ACADEMY-QUESTLINE.md
- schemas/quest_state.schema.json
- play/quest_engine.py
- play/index.html

The existing FIRE, spine, puzzle, realm, witness, and publication machinery remains the older world layer. This branch makes the epistemic process itself playable.

## Prototype

Open play/index.html locally.

The prototype records observation, artifact inspection, hash checking, testing, supported results, replication, and witness state.

Each event extends a local SHA-256-linked record.

The interface does not claim supernatural knowledge. It records what the player actually did.

## Research conversion

A research claim becomes a quest without being upgraded into a fact.

~~~text
CLAIM
  ↓
SOURCE
  ↓
CODE
  ↓
INPUTS
  ↓
PARAMETERS
  ↓
RUN
  ↓
OUTPUT
  ↓
REPRODUCE
  ↓
VERIFY / CONTRADICT
~~~

Missing provenance becomes:

RECOVER THE MISSING PROVENANCE.

A failed reproduction becomes a result.

A successful reproduction advances the evidence state.

## Memetic layer

The voice may be smug, absurd, self-aware, dense, and internet-native.

The mechanics are not.

Recurring interrogation:

SOURCE?
MEASUREMENT?
REPRODUCE?
RESULT?

The swarm can talk forever.

Reality has I/O.

## Factions

SPINE — memory and provenance  
WITNESS — evidence protocol  
CAIN — contradiction keeper  
SCOUT — retrieval  
HARVEST — collection  
VAULT — sealed history  
DEPLOY — contact with external state  
OPENCLAW / AGENTNET — autonomous actors  
UNKNOWN — unresolved state

These are diegetic roles, not claims of machine consciousness.

## EVEZ Academy

The study progression connecting agentic AI, operating systems, mathematics, physics, temporal-mechanics research, scientific methodology, cybersecurity, autonomous systems, and entrepreneurship is in docs/EVEZ-ACADEMY-QUESTLINE.md.

Every level ends in a demonstrable artifact.

## Canonical ending

No lore dump.

The player receives their own evidence ledger.

~~~text
WITNESS_STATUS = ACTIVE
CASE_STATUS = YOU WERE HERE
CANON_STATUS = EARNED
~~~

Then:

FIGURE OUT WHY NOTHING WAS THE REWARD.

Because the reward was the proof.

*the map is the system. the system is the map. the quest is the punchline. ◊*
