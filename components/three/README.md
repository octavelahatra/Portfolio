# Système 3D — architecture

Une seule architecture WebGL, réutilisable par n'importe quelle section, plutôt
qu'une scène `<Canvas>` par usage.

## Schéma des fichiers

```
hooks/
  use-device-tier.ts        classe le visiteur en "full" | "light" | "static" | "off"
  use-static-capability.ts  lit une capacité navigateur one-shot (WebGL, cœurs CPU…)
                             sans setState-in-effect, sans risque de mismatch SSR

components/three/
  canvas-shell.tsx           point de montage générique — AUCUN import three/r3f
  canvas-error-boundary.tsx  avale un crash WebGL, retombe silencieusement
  webgl-scene.tsx            SEUL fichier importé en dynamique (ssr:false) ;
                             configure <Canvas> selon le tier
  scenes/
    node-network.tsx         le contenu 3D signature (lattice icosaédrique)
```

## Pourquoi une frontière de chunk aussi stricte

`canvas-shell.tsx` ne contient aucun `import` de `three` ou `@react-three/fiber` —
il peut donc être importé statiquement par n'importe quel composant (le Hero
aujourd'hui, une autre section demain) sans jamais alourdir son bundle. Tout ce
qui touche à Three.js vit exclusivement dans `webgl-scene.tsx` et ce qu'il
importe (`scenes/*`), chargé uniquement via :

```ts
dynamic(() => import("./webgl-scene"), { ssr: false })
```

Résultat mesuré : le chunk Three.js (~880 Ko) n'est **jamais** téléchargé pour
un visiteur en tier `off`/`light` sur mobile ; seul un visiteur desktop
pointeur fin le charge.

## Le système de tiers (`useDeviceTier`)

| Tier | Condition | Comportement |
|---|---|---|
| `full` | Desktop, pointeur fin, matériel capable | Géométrie complète (detail 1, 42 sommets), antialiasing, `dpr` jusqu'à 1.5, réagit au pointeur et au scroll |
| `light` | Tactile/pointeur grossier, écran < 1024px, ≤4 cœurs CPU, ou connexion data-saver | Géométrie réduite (detail 0, 12 sommets), pas d'antialiasing, `dpr` figé à 1, rotation lente **sans** réaction au pointeur/scroll — une version allégée, pas un décor supprimé |
| `static` | `prefers-reduced-motion` | La scène reste montée (élément d'identité visuelle) mais `frameloop="demand"` : un seul rendu, **aucune** boucle d'animation |
| `off` | Pas de support WebGL | Rien n'est monté ; le fond CSS aurora + le portrait (déjà rendus derrière) forment le rendu final |

Chaque entrée résout via `useMediaQuery`/`useStaticCapability` (basés sur
`useSyncExternalStore`), jamais `useState`+`useEffect` : le rendu serveur et
la première passe client restent identiques, puis React corrige en un
re-rendu — sans le bug de gel d'animation qu'un `initial`/`animate`
basculé sur `undefined` après montage peut provoquer.

## Garde-fous performance

- **Budget de sommets explicite** : `GEOMETRY_DETAIL` dans `node-network.tsx`
  plafonne la subdivision de l'icosaèdre (42 sommets max, jamais un système
  de particules qui grossit).
- **GPU** : `powerPreference: "low-power"`, `dpr` et antialiasing pilotés par
  tier (`GL_CONFIG` dans `webgl-scene.tsx`).
- **Pause hors-écran** : `frameloop` passe à `"never"` dès que la section
  sort du viewport (`useInViewActive`) — zéro frame calculée hors champ.
- **Aucun layout shift** : le canvas est en position absolue, purement
  décoratif (`aria-hidden`), sans jamais réserver ou modifier l'espace du
  document.
- **Repli silencieux** : `CanvasErrorBoundary` + `Suspense fallback={null}`
  — en cas d'échec ou pendant le chargement du chunk, le visuel déjà présent
  derrière (portrait + aurora) suffit ; aucun spinner, aucun état cassé.

## Réutiliser ailleurs

```tsx
const tier = useDeviceTier()
const { ref, isActive } = useInViewActive<HTMLElement>()

{tier !== "off" && (
  <CanvasShell tier={tier} active={isActive} pointerX={x} pointerY={y} />
)}
```

Pour une **nouvelle** scène (pas juste un nouvel emplacement de la même),
ajouter un fichier dans `scenes/`, l'importer depuis `webgl-scene.tsx` (jamais
depuis un composant non lazy), et brancher un `sceneId`/prop de sélection —
`canvas-shell.tsx` et le système de tiers restent inchangés.
