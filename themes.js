/* =====================================================================
   Mergebloom editions
   ---------------------------------------------------------------------
   Each edition = 11 tiers, smallest -> biggest. Merging two of the same
   tier makes the next one; two of the last tier pop for a big bonus.

   To add an edition:
     1. Put 11 square, transparent, tightly-cropped images in
        art/<id>/01.webp ... 11.webp.
     2. Optional scene art in the same folder: bg.webp (portrait scene),
        board.webp (top-down tray, transparent, cropped to the tray),
        banner.webp and card.webp (blank UI plaques).
        Set `scene` flags below for the ones you have.
     3. Copy the bakery block, change id/name/colours/tier names,
        remove `soon: true`.
   Missing art falls back to code-drawn blobs, a gradient sky and a
   painted wooden board, so balance can be tested before art exists.
   ===================================================================== */
const EDITIONS = [
  {
    id: 'bakery',
    name: 'Bakery',
    blurb: 'Crumbs to crown cake',
    sky: 'linear-gradient(180deg, #ffb59c 0%, #ffc9cf 38%, #ffe0d2 70%, #ffd3b8 100%)',
    accent: '#ff6f9f', accentDark: '#c9466f', ink: '#5a2a35',
    wood: { top: '#f8dccd', bottom: '#f3cbb8', rim: '#eab3a0', rimDark: '#c98a78', grain: 'rgba(190,120,100,.10)' },
    scene: { bg: true, board: true, banner: true, card: true, map: true, rim: { x: .073, y: .048 } },
    icon: 'art/bakery/icon.webp',
    tiers: [
      { name: 'Choco Chip',     color: '#7a4630' },
      { name: 'Macaron',        color: '#ff9fbd' },
      { name: 'Cookie',         color: '#e2a65c' },
      { name: 'Cream Puff',     color: '#f3cf8e' },
      { name: 'Donut',          color: '#b58cff' },
      { name: 'Cinnamon Roll',  color: '#d8955a' },
      { name: 'Melon Pan',      color: '#c8e07a' },
      { name: 'Cupcake',        color: '#7fdccb' },
      { name: 'Fruit Tart',     color: '#ff6b6b' },
      { name: 'Shortcake',      color: '#fff1f4' },
      { name: 'Crown Cake',     color: '#ffb4d0' },
    ],
  },

  /* ---- coming soon: tier names + colours are ready, art is not ---- */
  {
    id: 'garden',
    name: 'Fruit Garden', blurb: 'Blueberry to watermelon',
    sky: 'linear-gradient(180deg, #bfe8ff 0%, #d9f7c9 60%, #fff4c4 100%)',
    accent: '#3fb45e', accentDark: '#26803f', ink: '#2c3d1e',
    wood: { top: '#f6e2bf', bottom: '#efd3a5', rim: '#e2b980', rimDark: '#b9864f', grain: 'rgba(140,100,50,.10)' },
    scene: { bg: true, board: true, banner: true, card: true, map: true, rim: { x: .06, y: .036 } },
    faces: false,
    tiers: [
      { name: 'Blueberry', color: '#4b5bd6' }, { name: 'Cherry', color: '#e0283a' },
      { name: 'Lime', color: '#8fd14f' }, { name: 'Lemon', color: '#ffd93b' },
      { name: 'Plum', color: '#8e44ad' }, { name: 'Peach', color: '#ffb38a' },
      { name: 'Orange', color: '#ff8a1f' }, { name: 'Apple', color: '#ff4d4d' },
      { name: 'Coconut', color: '#8b5a2b' }, { name: 'Melon', color: '#c5e88c' },
      { name: 'Watermelon', color: '#2fa84f' },
    ],
  },
  {
    id: 'cloud',
    name: 'Sweet Cloud', blurb: 'Mini mallow to cloud parfait',
    sky: 'linear-gradient(180deg, #ffd6ec 0%, #e6dcff 50%, #fff0f6 100%)',
    accent: '#ec7fbf', accentDark: '#b9548f', ink: '#5b3a66',
    wood: { top: '#fff3f1', bottom: '#fde3ea', rim: '#f5c3d5', rimDark: '#d496ae', grain: 'rgba(200,120,150,.08)' },
    scene: { bg: true, board: true, banner: true, card: true, map: true, extras: true, rim: { x: .10, y: .068 } },
    faces: false,
    tiers: [
      { name: 'Mini Mallow', color: '#fff4f6' }, { name: 'Strawberry Jam', color: '#ff5f7e' },
      { name: 'Mint Scoop', color: '#b8f0d8' }, { name: 'Lemon Sorbet', color: '#fff1a0' },
      { name: 'Toasted Mallow', color: '#f2c27e' }, { name: 'Blueberry Scoop', color: '#a9b8ff' },
      { name: 'Ube Swirl', color: '#c9a6f2' }, { name: 'Whipped Cream', color: '#fff6f8' },
      { name: 'Rainbow Mallow', color: '#ffd1e6' }, { name: 'Sundae Bowl', color: '#ff9fbf' },
      { name: 'Cloud Parfait', color: '#e4d6ff' },
    ],
  },
  {
    id: 'ocean', soon: true,
    name: 'Ocean Pals', blurb: 'Bubbles to big whale',
    sky: 'linear-gradient(180deg, #9fdcff 0%, #c7ecff 55%, #e6f7ff 100%)',
    accent: '#3fa7e8', accentDark: '#1f74ad', ink: '#163a55',
    wood: { top: '#f5ead2', bottom: '#ecdcba', rim: '#d8c094', rimDark: '#a88d62', grain: 'rgba(120,100,60,.10)' },
    tiers: [
      { name: 'Bubble', color: '#bfe9ff' }, { name: 'Shrimp', color: '#ff9f8a' },
      { name: 'Clownfish', color: '#ff8c42' }, { name: 'Jellyfish', color: '#e0a3ff' },
      { name: 'Pufferfish', color: '#ffd166' }, { name: 'Octopus', color: '#ff70a6' },
      { name: 'Turtle', color: '#7bd389' }, { name: 'Seal', color: '#c9d6df' },
      { name: 'Dolphin', color: '#70a1ff' }, { name: 'Orca', color: '#3d3d5c' },
      { name: 'Whale', color: '#4d96ff' },
    ],
  },
  {
    id: 'critters', soon: true,
    name: 'Cozy Critters', blurb: 'Chick to big bear',
    sky: 'linear-gradient(180deg, #ffd6a8 0%, #ffe8c7 55%, #fff6e9 100%)',
    accent: '#e8935a', accentDark: '#b0632f', ink: '#4a2e1c',
    wood: { top: '#f1dcc2', bottom: '#e6c8a6', rim: '#cfa77d', rimDark: '#9b7350', grain: 'rgba(120,70,30,.10)' },
    tiers: [
      { name: 'Chick', color: '#ffe066' }, { name: 'Hamster', color: '#f4c27a' },
      { name: 'Bunny', color: '#fff0f3' }, { name: 'Kitten', color: '#ffb36b' },
      { name: 'Puppy', color: '#d9a066' }, { name: 'Fox', color: '#ff8c42' },
      { name: 'Panda', color: '#f1f1f1' }, { name: 'Koala', color: '#b8c4cc' },
      { name: 'Capybara', color: '#b98b5e' }, { name: 'Shiba', color: '#f0a35e' },
      { name: 'Big Bear', color: '#a0714f' },
    ],
  },
];
