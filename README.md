# Apesv CEO Morning Brief
### A daily-updating business dashboard with a built-in junior analyst

Live dashboard: https://sakshi-raichand.github.io/apesv-company-work/

Every morning the CEO opens one page on his phone and sees yesterday's business: revenue, orders, margin, deliveries, returns, stock, support, reviews and headcount. Beside the numbers there is a question bar that works as an junior business analyst, answering routine questions from the same checked numbers.

## What it does
- Updates daily from the company's Google Sheet. Nobody runs a report by hand.
- Checks the data before showing it. If the sheet is stale or a check fails, the page says so and keeps the last good numbers.
- Opens instantly on a phone, installs to the home screen, and still opens with no internet.
- Question bar: answers routine questions (top categories, comparisons with the previous period, margin, returns, delays, stock, headcount), shows the SQL behind a number, and says which decision each alert informs. It is rules-based, not an AI model, so it only answers from the checked numbers and says so when a question is outside them.

## How it works
Google Sheet -> Google Apps Script (daily checks and summary numbers) -> JSON -> this static page on GitHub Pages -> phone.

## Proof
The dashboard has a Proof section showing the data model, the SQL behind each headline number, and the testing:
- Revenue reconciles to the Finance tab to the cent in all 13 comparable months, rechecked every morning.
- 44 of 44 headline numbers were recalculated separately in Python and matched.
- 6 failure drills passed: stale data, a mistyped amount, a renamed column, a day pasted twice, a renamed tab, and a normal new day.
- It states what it will not decide: it flags, a person decides.

## What I built, end to end
Data cleaning, the daily Apps Script, the data checks and failure handling, the data model, the dashboard design, the question bar, the installable offline phone app, hosting, and testing.

## Tools
Google Sheets, Google Apps Script, JavaScript, HTML, CSS, SVG charts, SQL, GitHub Pages, a service worker for offline mode, pandas for cross-checking.

## Not included here
The Apps Script and the company data stay private in my Google account. This repository holds only the dashboard page.

(c) Sakshi Raichand. All rights reserved. You may view this code but not copy or reuse it without permission.

Company data is synthetic.
