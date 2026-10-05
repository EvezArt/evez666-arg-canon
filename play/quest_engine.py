"""Minimal deterministic EVEZ quest engine.

Progression is driven by recorded actions, not narrative assertions.
"""

from __future__ import annotations

import hashlib
import json
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

ORDER = {
    "UNSEEN": 0,
    "OBSERVED": 1,
    "CORRELATED": 2,
    "TESTED": 3,
    "SUPPORTED": 4,
    "REPLICATED": 5,
    "WITNESS": 6,
    "COMPLETE": 7,
}

@dataclass
class Quest:
    quest_id: str
    status: str = "UNSEEN"
    events: list[dict[str, Any]] = field(default_factory=list)
    claims: list[str] = field(default_factory=list)
    artifacts: list[str] = field(default_factory=list)
    prev_hash: str = "0" * 64

    def _event_hash(self, event: dict[str, Any]) -> str:
        payload = json.dumps(event, sort_keys=True, separators=(",", ":")).encode()
        return hashlib.sha256(payload).hexdigest()

    def record(self, event_type: str, *, result: str | None = None,
               artifact_id: str | None = None,
               claim_id: str | None = None,
               player_id: str | None = None,
               extra: dict[str, Any] | None = None) -> dict[str, Any]:
        event = {
            "event_id": str(uuid.uuid4()),
            "event_type": event_type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "player_id": player_id or "local",
            "quest_id": self.quest_id,
            "artifact_id": artifact_id,
            "claim_id": claim_id,
            "result": {"status": result} if result else {},
            "prev_hash": self.prev_hash,
        }
        if extra:
            event.update(extra)
        event["hash"] = self._event_hash(event)
        self.events.append(event)
        self.prev_hash = event["hash"]
        self._advance(event_type, result)
        return event

    def _advance(self, event_type: str, result: str | None) -> None:
        transition = {
            "PLAYER_VIEW": "OBSERVED",
            "PLAYER_OPEN_ARTIFACT": "OBSERVED",
            "PLAYER_HASH_CHECK": "CORRELATED",
            "PLAYER_RUN_TEST": "TESTED",
            "PLAYER_SUBMIT_RESULT": "SUPPORTED" if result == "SUPPORTED" else self.status,
            "PLAYER_REPRODUCE": "REPLICATED" if result == "REPLICATED" else self.status,
            "PLAYER_RECORD_WITNESS": "WITNESS",
        }
        candidate = transition.get(event_type, self.status)
        if ORDER.get(candidate, 0) > ORDER.get(self.status, 0):
            self.status = candidate
        if self.status == "WITNESS":
            self.status = "COMPLETE"

    def export(self) -> str:
        return json.dumps({
            "quest_id": self.quest_id,
            "status": self.status,
            "events": self.events,
            "claims": self.claims,
            "artifacts": self.artifacts,
            "chain_head": self.prev_hash,
        }, indent=2)

if __name__ == "__main__":
    quest = Quest("Q-001", claims=["Prove this quest exists"])
    quest.record("PLAYER_VIEW")
    quest.record("PLAYER_OPEN_ARTIFACT", artifact_id="docs/ARG-REFRAME-QUEST-IS-PUNCHLINE.md")
    quest.record("PLAYER_HASH_CHECK", artifact_id="docs/ARG-REFRAME-QUEST-IS-PUNCHLINE.md")
    quest.record("PLAYER_RUN_TEST", result="SUPPORTED")
    quest.record("PLAYER_REPRODUCE", result="REPLICATED")
    quest.record("PLAYER_RECORD_WITNESS")
    print(quest.export())
