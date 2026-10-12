**Autenticación segura con Next.js 16 y Supabase**

Aplicación web con sistema de autenticación completo construida con Next.js, Supabase y TypeScript. 

Sitio en producción: autenticacion-dpnerjfdr-abner007-otoniel-2007.vercel.app
Repositorio: https://github.com/Abner007-otoniel-2007/autenticacion.git

**Funcionalidades**

-Registro con validación de formularios.
-Inicio y cierre de sesión.
-Verificación de correo electrónico.
-Recuperación y restablecimiento de contraseña.
-Dashboard privado con la información del usuario autenticado.
-Navegación condicional según el estado de la sesión.
-Refresco automático de la sesión.
-Estados de carga y mensajes de error informativos pero seguros.

**Instalación**

1. Clona el repositorio (link arriba) y descarga las dependencias:
pnpm install

2. Crea el archivo .env.local en la raíz del proyecto y colocar las variables de entorno: 
NEXT_PUBLIC_SUPABASE_URL=https://tvmqhvnwlhcnadkjypuy.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_qNSiywtexm4W2PXVRX3vDQ_Su-7Xw6L
NEXT_PUBLIC_SITE_URL=http://localhost:3000

3. Configura supabase:

para realizarlo tienes que crear la base de datos con el siguiente script:

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Ver mi perfil" on public.profiles
  for select using ((select auth.uid()) = id);

create policy "Actualizar mi perfil" on public.profiles
  for update using ((select auth.uid()) = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

4. Inicia el servidor (pnpm dev)

5. Abre la url que te proporciona: http://localhost:3000.