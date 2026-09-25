# Monthly student check-in — poll content & escalation protocol

Draft for founder review. Covers what the monthly WhatsApp check-in asks, who
sees the answers, and what happens when a student flags that they're
struggling. Not yet in production — pair this with a real WhatsApp Business
setup (see the CRM prototype notes) before sending to real students.

## 1. The monthly message

Sent once a month, one message, WhatsApp quick-reply buttons (no link, no
form — the lower the friction, the more students will actually answer):

> Hi {{code}} 👋 Quick monthly check-in from BrightPath — how are you feeling
> about things this month?
>
> 🙂 Doing well 😐 Okay 😔 Struggling

That's the whole poll. One question, three taps. A second question ("want to
tell us more?") only appears as a *reply prompt* after they tap a button —
never upfront, so answering never feels like homework.

Follow-up prompt after each tap:
- **🙂 Doing well** → "Glad to hear it! Anything you want to share with your sponsors this month?" (optional, no reply needed)
- **😐 Okay** → "Thanks for the honesty. Anything specific on your mind — coursework, finances, anything else?" (optional)
- **😔 Struggling** → "Thank you for telling us — that takes courage. Someone from the BrightPath team will reach out to you personally within 24 hours. If you need to talk to someone right now, Befrienders KL is free and confidential, 24/7: 03-7627 2929."

## 2. Who sees what

- Raw answers (which button, any free-text reply) are visible only to the
  1–2 named BrightPath staff who run student comms — never posted anywhere
  shared, never forwarded to sponsors/donors.
- Sponsors only ever see the *aggregated, anonymized* trend the student
  chooses to share (or nothing at all) — never "student X said they're
  struggling."
- A student can always say nothing. No reply is not treated as a red flag by
  itself — just re-prompt gently next month.

## 3. Escalation by response

| Response | Action | Timeframe |
|---|---|---|
| 🙂 Doing well | No action needed. Logged for trend tracking. | — |
| 😐 Okay + mentions a concrete problem (money, grades, family) | Named staff member follows up personally (WhatsApp or call) | Within 3 business days |
| 😔 Struggling | Named staff member follows up personally | **Within 24 hours** |
| No response for 2 consecutive months | Flagged on the roster for a manual wellness check, not just a comms reminder | Next working day after the 2nd miss |

**Who does the follow-up:** name a primary contact and a backup (so this
never stalls on one person's availability) before this goes live. This
should not be whoever happens to be free — it should be a specific person
students already have a relationship with.

**This is a check-in, not a crisis service.** BrightPath staff are not
counsellors. Their job on a "Struggling" reply is to reach out warmly, listen,
and connect the student to real support (family, campus counselling, or the
hotlines below) — not to diagnose or manage a mental health crisis alone.

## 4. Crisis resources (include in the "Struggling" auto-reply and in staff training)

- **Befrienders KL** — 03-7627 2929 — 24/7, free, confidential emotional support ([befrienders.org.my](https://befrienders.org.my/media-useful-links/))
- **Talian Heal (Ministry of Health national mental health crisis line)** — 15555
- **Talian Kasih** — 15999, or WhatsApp +6019-261 5999 — 24/7 government helpline, also covers family/welfare crises
- **Buddy Bear Childline** (for younger students) — 1-800-18-2327 — daily 6pm–11:59pm

Confirm these numbers again before launch — helplines occasionally change,
and this list should be re-verified any time it's reused after a long gap.

## 5. Consent — say this once, at enrollment, not buried in T&Cs

> "Once a month, BrightPath will send you a short WhatsApp check-in — just a
> tap, takes 5 seconds. If you ever let us know you're struggling, a real
> person from our team will personally reach out within a day, and we'll
> never share what you tell us with your sponsors without your OK. You can
> opt out any time by replying STOP."

## 6. Before this goes live

- [ ] Name the primary + backup staff contact for "Struggling" follow-ups
- [ ] Re-verify the hotline numbers above
- [ ] Decide the opt-out flow (STOP keyword handling)
- [ ] Pick the WhatsApp platform (see prior recommendation: Glific, free & purpose-built for this) and complete Meta Business verification
- [ ] Run one live month with a small group (5–10 students) before rolling out to everyone
