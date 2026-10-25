create table public.visitor_notes (
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(name) between 1 and 40),
 message text not null check (char_length(message) between 5 and 500),
 approved boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.visitor_notes enable row level security;
create table public.note_limits (fingerprint text primary key,last_submitted timestamptz not null);
alter table public.note_limits enable row level security;
create or replace function public.submit_visitor_note(note_name text,note_message text,client_fingerprint text)
returns void language plpgsql security definer set search_path=public as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(client_fingerprint,0));
 if exists(select 1 from note_limits where fingerprint=client_fingerprint and last_submitted>now()-interval '60 seconds') then
 raise exception 'rate_limit';
 end if;
 insert into visitor_notes(name,message) values(note_name,note_message);
 insert into note_limits values(client_fingerprint,now()) on conflict(fingerprint) do update set last_submitted=excluded.last_submitted;
 delete from note_limits where last_submitted<now()-interval '1 day';
end;$$;
revoke all on function public.submit_visitor_note(text,text,text) from public,anon,authenticated;
grant execute on function public.submit_visitor_note(text,text,text) to service_role;
-- Moderate with the Supabase dashboard: set approved=true only after review.
-- Never grant anonymous insert/update access to either table.
