# BrightPath Donor Experience

**Product Requirements Document · Draft v0.1**

*Prepared for Suresh Sakadivan · 10 July 2026 · covers the donor-facing giving, sponsorship & relationship platform, integrated with halatuju.xyz*

---

## 1. Context & Problem Statement

BrightPath exists to keep talented B40 (bottom-40%-income) Malaysian students in education after SPM. It is entirely donor-funded: a RM3,000 bursary per eligible student, with 100% of donations reaching the student and no overhead borne by donors. BrightPath's stated outcomes are 95% of sponsored students completing their post-SPM programme, and 75% going on to earn a full degree.

Today, HalaTuju (halatuju.xyz) runs the entire student-facing side: applications, verification, bucketing, and an internal tool that produces a confidential, non-identifying AI-drafted profile once a student is "ready for sponsors." There is no donor-facing counterpart. No page explains the value proposition, lets a prospective donor choose how to give, checks them out for a one-off or recurring commitment, shows them who they're supporting, lets them manage that commitment, or keeps them updated over time.

Without this, BrightPath cannot convert landing-page or campaign interest into funded students, cannot retain monthly sponsors long enough to see a student through a multi-year programme, and cannot deliver the transparency it promises. This PRD scopes the first version of that donor experience.

## 2. Goals

- **Conversion:** turn landing-page/campaign traffic into completed donor sign-ups and a first payment, at a rate benchmarked against comparable giving platforms (see Success Metrics).
- **Recurring mix:** grow the share of donations that are monthly recurring rather than one-off — recurring gifts are what let BrightPath commit RM3,000/year per student with confidence.
- **Retention:** keep recurring sponsors giving for the length of a student's programme (multi-year) by making the relationship feel real (updates) and the admin frictionless (easy edit, easy cancel).
- **Trust:** every donor can see, at any time, where their money went and how their student is doing — reinforcing the "100% to student" promise without compromising student safety.
- **Operational leverage:** let a small coordinator/mentoring team sustain "high-touch" updates across a growing number of donor-student pairs without linear headcount growth.

## 3. Non-Goals (v1)

- A full donor CRM / marketing-automation suite — v1 needs enough donor data to run the programme, not a HubSpot replacement.
- Real-time chat between donor and student — updates are structured and asynchronous by design, for child-safety reasons (mirrors the chaperoned-contact model used by Compassion International and Unbound).
- Corporate / matching-gift administration (multi-seat giving, payroll giving) — flagged as a Phase 3 consideration.
- Replacing HalaTuju's applicant/verification pipeline — this PRD covers the handoff point where a "ready for sponsors" profile reaches the donor experience, and pushes funding status back.
- A native mobile app — v1 is a responsive web experience.

## 4. Personas

**Primary — donors**

- First-time / spontaneous donor — arrives from a campaign or share, wants to grasp impact fast, may give one-off before considering recurring.
- Committed monthly sponsor — the core of BrightPath's model; wants a specific student or mentor-matched pairing, predictable updates, and zero-hassle billing.
- Mentor-donor — wants more than money: opts into a lightweight mentoring role alongside their gift.
- Major / corporate donor — funds multiple students or a cohort; needs consolidated reporting (full build deferred to Phase 3, but v1 shouldn't architecturally block it).

**Secondary — supported by the same system**

- Sponsored student — already lives in HalaTuju; this system reads their "ready for sponsors" profile and writes back funding/mentoring status.
- BrightPath coordinator / mentor — produces termly updates, moderates richer post-consent profile reveals, and re-pools a student who loses a sponsor.

## 5. Donor Journey

| Stage | What happens | Design intent |
|---|---|---|
| 1. Discover | Landing page communicates the problem, the 95/75/100 outcomes, and real (anonymized) student stories. | Grasp impact in under a minute; single clear CTA. |
| 2. Choose how to give | General Fund, browse-and-choose a student, or opt into mentor matching (chosen or random). | No wrong door — every path leads to a completed gift. |
| 3. Choose commitment | One-off amount or recurring monthly. | Recurring is the encouraged default, never the only option. |
| 4. Checkout | Guest one-off checkout, or account creation for recurring; pay via local MYR rails; receipt issued immediately. | As few fields and clicks as an e-commerce checkout. |
| 5. Onboarding | Donor profile created; if student-specific, a "you've been matched" moment. | Mirrors Compassion's "child finds out within 2–3 weeks." |
| 6. Sustain | Dashboard shows student progress; monthly automated pulse + termly human update; edit profile/payment; download receipts. | Predictable rhythm, not silence. |
| 7. Change of mind | Pause or cancel recurring giving in one click — no retention flow, no call required, immediate confirmation. | As easy to cancel as it was to sign up. |

## 6. Giving & Matching Models

**General Fund** — No student browsing; the donation pools into BrightPath's bursary fund. Simplest possible checkout — best for first-time or impulse donors.

**Choose-a-student** — Donor browses an anonymized public pool (avatar/photo optional, first name or pseudonym, state, intended field of study, funding gap). On completing the sponsorship commitment (first payment + explicit acknowledgement), the profile upgrades to the richer, post-consent tier.

**Mentor matching** — Donor opts in to mentoring, additive to a financial commitment — never a substitute for it. Can select a student (subject to coordinator approval) or accept a random match balanced against student need and wait time.

### Profile disclosure tiers

| Tier | Who sees it | Contents |
|---|---|---|
| Public pool (pre-commitment) | Any visitor | Non-identifying: first name/pseudonym, state/region, intended field, funding need, short AI-reviewed story. |
| Sponsor profile (post-consent) | Confirmed sponsor only | Fuller identifying detail (name, photo, school, grades, direct updates) — released only once payment is confirmed and the student/guardian has given specific consent to that donor. |
| Coordinator view | BrightPath staff | Full HalaTuju record (already exists today). |

## 7. Payments & Checkout

- Primary rails: Billplz and/or Curlec — FPX, DuitNow Transfer/QR, e-wallets (GrabPay, Touch 'n Go, ShopeePay), and genuine recurring/auto-debit billing, all MYR-native.
- Card payments as a fallback if local rails don't cover all donors (open question).
- One-off and recurring (monthly) both supported from the same checkout flow; recurring is opt-in, never a default trap.
- Auto-generated receipt per transaction; consolidated annual statement for tax purposes if BrightPath's tax-exempt status supports it (open question).
- Every recurring plan has a self-serve "manage payment method" and "cancel" control in the donor dashboard — no email-only or call-only path.

## 8. High-Touch Update Cadence

Literal daily huddles aren't realistic for students in school or university — but donors should still feel a rhythm, not silence. Chosen model: automated monthly pulse + human-written termly update.

- Automated monthly pulse: system-generated from HalaTuju data — attendance/grade-check status, funds utilised to date, any milestone flags. No manual writing required.
- Human-written termly update: a real note from the student and/or mentor, reviewed by a coordinator before release — consistent with the existing "each semester, upload results + a progress note" step already in the HalaTuju flow.
- All donor-student contact is mediated through structured update fields, not open chat — consistent with child-safety norms used by Compassion International and Unbound.
- Coordinators get a queue/dashboard with batch tools and templates to produce termly updates efficiently as the student pool grows.

## 9. Donor Account Management

- Edit profile: name, contact, communication preferences, language.
- Edit payment: update card/FPX/e-wallet mandate without re-entering everything.
- Pause vs. cancel: pause (skip the next few cycles, keep the relationship) offered once as a softer alternative — but never gates the cancel action itself.
- Full downloadable giving history and receipts, available any time.
- Notification preferences across email, SMS, and WhatsApp — WhatsApp is the dominant channel for Malaysian donors and worth prioritising.

## 10. Transparency & Impact Reporting

- Per-donor dashboard: their student's programme stage, grade trend, RM spent against the RM3,000 bursary, and mentoring touchpoints logged.
- Programme-wide stats surfaced platform-wide — 95% completion, 75% degree completion, 100% to student — reinforced with real aggregate cohort numbers as they accumulate.

## 11. Architecture: Standalone Site, Deep-Linked to HalaTuju

Per direction, this is a standalone, BrightPath-branded site rather than an extension of the HalaTuju codebase, integrated via deep links and a data contract:

- HalaTuju → BrightPath: once a student is "ready for sponsors," HalaTuju exposes the anonymized (and later, post-consent) profile via API/feed; deep links let a donor click straight from a HalaTuju-hosted detail page into BrightPath's checkout for that student.
- BrightPath → HalaTuju: funding status, sponsor assignment, and cancellation events flow back so HalaTuju's coordinator tools reflect who's funded and who needs re-pooling.
- This requires a defined API/webhook contract and a shared student ID — flagged as an open engineering question below.

## 12. Compliance & Trust

- Malaysia's Personal Data Protection Act (PDPA) governs student and donor personal data — especially sensitive given most students are minors or recent minors, and household income data is collected.
- Under-18 students require guardian consent for any identity disclosure beyond the anonymized tier; this system must check the same consent record HalaTuju already collects at application before unlocking the richer profile tier.
- No dark patterns in the cancellation flow, in the spirit of the (currently vacated but directionally sound) FTC click-to-cancel standard: cancel should be at least as easy as signing up.
- BrightPath's "100% to student, zero donor overhead" claim must be auditable — spend tracking shown to donors should reconcile with actual disbursement records.

## 13. User Stories

**First-time donor**

- As a first-time donor, I want to understand BrightPath's impact in under a minute on the landing page, so I can decide to give without researching the org myself.
- As a first-time donor, I want to give a one-off amount without creating an account, so my first gift has zero friction.

**Committed monthly sponsor**

- As a monthly sponsor, I want to choose a specific student from the pool, so my recurring gift feels connected to a real outcome.
- As a monthly sponsor, I want a monthly automated update and a termly written note, so I know my sponsorship is making a difference without expecting unrealistic daily contact.
- As a monthly sponsor, I want to cancel my recurring gift in one click from my dashboard — no phone call, no "are you sure" gauntlet — so I trust the platform even when I can't continue giving.
- As a monthly sponsor, I want to download all my receipts in one place, so I can claim any applicable tax relief without emailing support.

**Mentor-donor**

- As a mentor-donor, I want to opt into mentoring alongside my financial gift, and choose whether I pick my mentee or accept a random match, so I can contribute in the way that fits me.

**Student (secondary, represented via HalaTuju)**

- As a sponsored student, I want my identifying details hidden until I've consented to a specific sponsor, so I stay safe while still being able to attract support.
- As a sponsored student, I want a simple way to submit my termly update, so my sponsor stays engaged without me having to manage the relationship myself.

**Coordinator**

- As a coordinator, I want a queue of students due for a termly update, so I can keep the cadence promise across a growing pool without missing anyone.
- As a coordinator, I want to see when a sponsor cancels, so I can re-pool that student for a new match quickly.

## 14. Requirements

### P0 — Must-Have

- Public landing / value-proposition page with a clear CTA to give (general fund, choose-a-student, or mentor match).
- Guest one-off checkout (no account required) via local MYR rails (FPX/e-wallet).
- Account creation and login for recurring donors.
- Recurring monthly billing via Billplz/Curlec with a working auto-debit/mandate.
- Self-serve payment-method update and one-click cancel/pause in the donor dashboard — no manual or human step required to cancel.
- Automatic receipt generation per transaction, plus a downloadable giving history.
- Anonymized public student pool (browse/filter), fed from HalaTuju's "ready for sponsors" list.
- Post-consent profile upgrade flow, gated on confirmed payment and recorded student/guardian consent.
- Automated monthly pulse update (data-driven, no manual writing) per sponsored student.
- Termly human-written update flow with coordinator review-before-release.
- Donor profile edit (contact info, communication preferences).
- Deep-link contract between halatuju.xyz and the BrightPath site: at minimum, student-detail → checkout, and funding-status → HalaTuju coordinator view.

### P1 — Nice-to-Have

- Mentor-matching opt-in with chosen-vs-random selection.
- WhatsApp notifications alongside email.
- "Pause" as a distinct, gentler alternative surfaced once before cancel confirmation.
- Consolidated annual tax-receipt statement (pending confirmation of BrightPath's tax-exempt status).
- Donor referral / share-your-sponsorship social feature.
- Card payments as a fallback alongside local rails.

### P2 — Future Considerations

- Corporate / major-donor multi-seat and consolidated reporting.
- In-platform chat — only if a safe, chaperoned model is designed with child-safety input.
- Native mobile app.
- Donor community / donor-to-donor features.
- Alumni-fund-alumni loop (graduates funding future students, per the BrightPath deck) — worth not architecturally blocking, not building now.

## 15. Success Metrics

**Leading indicators**

- Landing-page → checkout-started conversion rate.
- Checkout-started → completed-payment rate, benchmarked against DonorsChoose/Givebutter-class checkout completion.
- Share of first gifts that are recurring vs. one-off.
- Time to complete checkout — target: comparable to a single-item e-commerce checkout.
- Cancellation-flow completion rate without contacting support (target ~100% — if donors are emailing or calling to cancel, the self-serve flow has failed).

**Lagging indicators**

- Monthly recurring sponsor retention rate at 3 / 6 / 12 months.
- Share of active recurring sponsors who engage with (open/view) their monthly pulse and termly update.
- Contribution to the programme-level 95% / 75% / 100% outcome metrics — the ultimate measure of whether the donor experience fulfils BrightPath's promise.
- Reduction in support-ticket volume related to "how do I cancel" or "where's my receipt."

## 16. Open Questions

- **Engineering/Product:** what's the exact API/webhook contract between halatuju.xyz and the new BrightPath site — shared student ID, auth model, and which system is source of truth for consent state?
- **Finance/Legal:** does BrightPath have (or need) tax-exempt status in Malaysia for donor tax receipts, and does that change the receipt format?
- **Legal/Compliance:** has counsel confirmed the PDPA basis for collecting and disclosing student financial/academic data to donors, including the guardian-consent chain for minors?
- **Design/Product:** what is the random-match balancing logic (longest-waiting student first? need-based? donor stated preference?) once mentor-matching (P1) is built?
- **Business/Stakeholder:** what's the launch timeline, budget, and team composition for the build — this determines how much of P1 can realistically move into the v1 cut.
- **Business/Stakeholder:** is a card-payment fallback needed for v1, or can local rails alone cover the expected donor base?

## 17. Timeline Considerations

No hard external deadline is set yet (see Open Questions) — recommend phasing rather than a single big-bang launch.

**Phase 1 (MVP)** — General-fund and choose-a-student giving, one-off and recurring checkout via local rails, self-serve cancel, anonymized pool, automated monthly pulse, termly update flow, basic dashboard.

**Phase 2** — Mentor-matching opt-in, WhatsApp notifications, annual tax statements, pause-before-cancel.

**Phase 3** — Corporate/major-donor tooling, referral features, deeper HalaTuju integration (real-time status sync rather than batch/webhook).

**Key dependency:** Phase 1's post-consent profile upgrade and automated monthly pulse both depend on HalaTuju exposing the right data via API — this is the single biggest cross-team dependency and should be scoped first.
