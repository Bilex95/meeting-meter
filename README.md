# meeting-meter

**The problem:** meetings feel free because nobody sees the cost. A one-hour meeting with six people isn't one hour — it's six person-hours of payroll.

**The solution:** open this before the meeting, enter how many people are in the room and an average hourly rate, hit start. A live money counter ticks up in real time. Share your screen with it for maximum effect.

## Use it

Open `index.html` in any browser. Works offline. Pause/resume for breaks; reset between meetings.

## How it's built

Vanilla HTML/CSS/JS, zero dependencies. The counter uses `requestAnimationFrame` against a start timestamp instead of `setInterval` counting — so it never drifts, even if the tab is throttled in the background.

## Contribute

- Add a currency selector (₦, $, €, £) with proper `Intl.NumberFormat` formatting
- Add milestone toasts ("This meeting just passed the cost of a new monitor")
- Persist the last-used settings in the URL hash so a bookmark restores them

---

Scaffolded by an automated weekly pipeline, then refined by hand — see the factory repo for how it works.
