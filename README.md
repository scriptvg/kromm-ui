# kromm-ui

Librería de componentes UI estilo shadcn, distribuida como **registro shadcn**
(JSON estático servido por HTTPS). Mantenedor único: **@scriptvg**.

URL pública del registro: `https://kromm-ui.vercel.app/r/{name}.json`

## Items publicados

| Item | Tipo | Descripción |
|---|---|---|
| `banner` | block | Banner superior (aviso rotativo). |
| `use-controllable-state` | hook | Estado controlable (controlado/no-controlado), estilo `use-mobile`. |
| `tema-base` | theme | Tema casa (tokens light/dark). |
| `tema-vans` | theme | Tema Vans: monocromo de alto contraste, esquinas rectas. |

## Consumir kromm-ui (en otro proyecto shadcn)

1. Registra el namespace en tu `components.json`:

   ```json
   {
     "registries": {
       "@kromm-ui": "https://kromm-ui.vercel.app/r/{name}.json"
     }
   }
   ```

2. Instala lo que quieras (las dependencias se resuelven solas):

   ```bash
   npx shadcn@latest add @kromm-ui/banner
   npx shadcn@latest add @kromm-ui/tema-vans
   ```

   `@kromm-ui/banner` arrastra automáticamente `@shadcn/button` y
   `@kromm-ui/use-controllable-state`.

## Mantenimiento (solo el autor)

El registro se **regenera en cada deploy** (`build` corre `shadcn build` antes de
`next build`), así que el flujo es:

```bash
# 1. crear/editar fuente bajo registry/<scope>/<tipo>/
#    p.ej. registry/kromm-ui/ui/mi-componente.tsx
# 2. declararlo en registry.json (path + target + type, deps cualificadas)
# 3. validar y previsualizar el build local
pnpm registry:validate
pnpm registry:build           # genera public/r/ (ignorado en git)
# 4. publicar
git push                      # Vercel despliega y regenera el registro
```

### Convenciones de autoría

- **Fuentes** → `registry/<scope>/<tipo>/` (`kromm-ui/ui`, `kromm-ui/hooks`,
  `kromm-ui/themes`; `vans/...` para específicos de Vans).
- **Imports propios** → `@/registry/kromm-ui/...` (shadcn los reescribe al alias
  del consumidor al instalar).
- **Deps externas** (`button`) → import `@/components/ui/button` +
  `registryDependencies: ["@shadcn/button"]`.
- **Deps internas** → `registryDependencies: ["@kromm-ui/<item>"]` (cualificadas;
  las bare no resuelven).

## Stack

Next.js 16 · shadcn 4.11 · Tailwind v4 · style base `radix-lyra` (neutral).
