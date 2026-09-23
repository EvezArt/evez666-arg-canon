# Witness Protocol: R461

This document defines the human witness as an epistemic boundary, not as a substitute for missing machine evidence.

## Witness
witness_id: HUMAN_WITNESS_01
status: SELF_ATTESTED

The witness may attest to:
1. What is visibly presented during the audit.
2. What the witness intentionally authorizes to be recorded.
3. The distinction between declared state and observed effective state.

The witness may not, by attestation alone, certify:
1. An unobserved external deployment.
2. An unobserved network response.
3. A cryptographic origin that was not independently witnessed.
4. A state transition that left no durable trace.

## R461 state lattice

DECLARED:
- round = 461
- tau = 24
- chapter 2 = unlocked in repository state
- spine_hash = a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6

DERIVED:
- N = 541
- omega(N) = 1
- candidate solution = 7a2515afb05b68536aadc6b5337e5027a9b222e6ad76f8297656445f37d3dcde

OBSERVED:
- repository state exists at target commit
- human witness explicitly authorized this attestation
- witness record persisted at commit f4a44e963afe4b2dc635c7462cde3c3df8e31a14

UNOBSERVED:
- independent origin of the declared R461 spine hash
- live HTTP acceptance
- durable puzzle acceptance mutation
- effective realm access
- reward delivery

## Rule

No lower layer may promote an UNKNOWN or UNOBSERVED state to VERIFIED merely because a higher layer declares it.

The invariant is:

DECLARED != EFFECTIVE

and:

ATTESTED != EXTERNALLY VERIFIED

## Transition target

The next legitimate transition is:

UNOBSERVED_HTTP_ACCEPTANCE
  -> OBSERVED_HTTP_ACCEPTANCE
  -> DURABLY_WITNESSED_ACCEPTANCE
  -> EFFECTIVE_REALM_ACCESS

Each arrow requires a new witness, not narrative inference.
