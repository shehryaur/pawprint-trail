# The Pawprint Trail

A private study site for one complete beginner who wants to learn AI from scratch. It is a guided trail of short lessons, each with a plain explanation, one strong current source, and a five-minute thing to try. Original bears roam the page.

The front door asks for a password every time the page is opened or reloaded. The browser does not remember that login. The last den asks for a second password, which you give only when you decide the learner has finished. Paw prints and the streak do not unlock the den. With Supabase set up, finished lessons and the streak show up on every device. Without it, they stay in the browser used.

## Run it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on the computer that is running it. [http://127.0.0.1:3000](http://127.0.0.1:3000) is the same server.

## Passwords & Personalization

Configure passwords and personalization in `.env.local` (or your host's environment variables):

- `SITE_PASSWORD`: The front door gate password required to enter the trail.
- `FINALE_PASSWORD`: The secret word to unlock the final celebration den.
- `LEARNER_NAME`: Name displayed on the letter (e.g. `Learner`).
- `FRIEND_NOTE`: Personal message in the finale den.
- `FRIEND_SIGN`: Sign-off on the letter (e.g. `Your friend`).

Passwords are validated on the server. Paw prints are a separate save and do not skip the password or open the den.

## Shared progress

Progress is stored in one row for this trail, not a separate account system. The gate password is still the only way in.

1. In the Supabase SQL editor, run [`supabase/progress.sql`](supabase/progress.sql).
2. In `.env.local` (gitignored), set `SUPABASE_URL` to your project URL and `SUPABASE_SERVICE_ROLE_KEY` to the service role key. The server reads both. The service role key is never sent to the browser.
3. Restart the dev server so it picks up `.env.local`.

If either variable is missing, the site still works and progress stays in that browser only (via local storage).

## Add a topic

New lessons live in `src/content/trail.ts`. Copy a lesson, give it a new `slug`, set `part` to `"start"`, `"how"`, or `"push"`, and add that slug to a day in `days`.

## Share a link

Deploy the app somewhere that can store environment variables (Vercel works seamlessly). Set `SITE_PASSWORD`, `FINALE_PASSWORD`, and optionally `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` there. Send the site URL and only the first password. Keep the second one until the trail is complete.
