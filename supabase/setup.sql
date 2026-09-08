-- =========================================================
-- Lahev & Tvar — tabulka objednávek pro Supabase
-- Spusťte celý tento skript v Supabase: SQL Editor -> New query -> Run
-- =========================================================

create table if not exists orders (
  id                bigint generated always as identity primary key,
  reference_code    text,                          -- dočasný kód z webu (REF-...), pro spárování s e-mailem
  created_at        timestamptz not null default now(),

  customer_name     text not null,
  customer_email    text not null,
  customer_address  text not null,

  items             jsonb not null,                -- pole položek: sku, name, qty, unitPrice, lineTotal

  shipping_method   text,                          -- 'prague' | 'pickup' | 'outside'
  shipping_label    text,
  shipping_cost     numeric not null default 0,

  payment_method    text not null default 'online',
  payment_note      text,

  products_total    numeric not null,
  shipping_total    numeric not null default 0,
  grand_total       numeric not null,

  status            text not null default 'new'    -- sem si můžete psát vlastní stavy (new, paid, produced, shipped...)
);

-- Zapne řádkové zabezpečení (Row Level Security) — bez policy by k tabulce
-- nešlo přistupovat vůbec, ani zapisovat.
alter table orders enable row level security;

-- Povolí komukoliv s veřejným "anon" klíčem POUZE VKLÁDAT nové objednávky.
-- Číst, mazat nebo upravovat cizí objednávky s tímto klíčem nejde —
-- proto je bezpečné mít "anon" klíč přímo ve veřejném kódu webu.
create policy "Public can insert orders"
  on orders
  for insert
  to anon
  with check (true);

-- Pro čtení objednávek ve vašem vlastním programu použijte "service_role"
-- klíč (tajný, NIKDY ho nedávejte do webu ani do veřejného repozitáře) —
-- ten obchází RLS a vidí všechno. Najdete ho v Supabase:
-- Project Settings -> API -> Project API keys -> service_role.
