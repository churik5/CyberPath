create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  icon text not null,
  difficulty text not null,
  category text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  prompt text not null,
  helper text,
  type text not null check (type in ('single', 'scale')),
  display_order int not null,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  label text not null,
  description text,
  display_order int not null,
  weights_json jsonb not null default '{}'::jsonb
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  progress_state jsonb not null default '{}'::jsonb
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  option_id uuid references public.quiz_options(id) on delete set null,
  numeric_value int,
  created_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

create table if not exists public.user_track_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  attempt_id uuid references public.quiz_attempts(id) on delete set null,
  primary_track_id uuid references public.tracks(id) on delete set null,
  secondary_track_id uuid references public.tracks(id) on delete set null,
  tertiary_track_id uuid references public.tracks(id) on delete set null,
  scores_json jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.tracks(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text not null,
  display_order int not null,
  created_at timestamptz not null default now(),
  unique (track_id, slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  duration_minutes int,
  content jsonb not null default '{}'::jsonb,
  display_order int not null
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id uuid not null references public.tracks(id) on delete cascade,
  module_id uuid references public.modules(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  progress_percent int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id uuid not null references public.tracks(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, track_id)
);

create index if not exists quiz_attempts_user_id_idx on public.quiz_attempts(user_id);
create index if not exists quiz_answers_attempt_id_idx on public.quiz_answers(attempt_id);
create index if not exists user_track_results_user_id_idx on public.user_track_results(user_id);
create index if not exists modules_track_id_idx on public.modules(track_id);
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
