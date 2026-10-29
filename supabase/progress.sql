-- Shared progress for The Pawprint Trail.
-- One private learner, one row. Run this once in the Supabase SQL editor.
--
-- The site writes this table only from the server, with the service role key.
-- That key bypasses row level security. The anon and authenticated keys cannot
-- read or change the row, so progress is not exposed in the browser.

create table if not exists public.progress (
  id text primary key default 'main',
  done text[] not null default '{}',
  study_dates text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

revoke all on table public.progress from public, anon, authenticated;
grant select, insert, update, delete on table public.progress to service_role;

drop policy if exists "progress is server only" on public.progress;
create policy "progress is server only"
  on public.progress
  for all
  to anon, authenticated
  using (false)
  with check (false);

insert into public.progress (id)
values ('main')
on conflict (id) do nothing;
