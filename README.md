# Mergebloom

An ad-free, cute flick-and-merge game. Slide your piece left or right below the dashed line, let go, and it shoots up the tray. Two of the same merge into the next one. Don't let pieces pile back over the line.

- **Adventure:** a level map. Each level has a goal (make a Donut, make 2 Melon Pans, crack every sugar cube) and a shot limit. Finish in fewer shots for up to ★★★. Every 10th level is a Fruit Tart boss.
- **Daily Bake:** the same board and pieces for everyone today, 30 shots, keep your streak going and copy your result to share.
- **Classic:** endless, go for a high score.
- **Boosters, earned never bought:** Rainbow Sprinkle (upgrades whatever it hits), Whisk (shakes the tray), Swap (tap NEXT). Get them from new ★★★ levels, gift levels every 5 levels, and the Daily Bake.

Bakery edition: choco chip → crown cake. Art made with ChatGPT.

**Play:** https://panpenk.github.io/mergebloom/

- **iPhone:** open the link in Safari, tap Share, then Add to Home Screen.
- **Android:** open it in Chrome, tap the menu, then Install app.

Works offline after the first visit. Progress saves on your device.

## Adding an edition
Editions live in `themes.js`. Fruit Garden, Ocean Pals and Cozy Critters are set up there with tier names and colours, marked `soon: true`.
1. Put 11 square, transparent images in `art/<edition id>/01.webp … 11.webp`, smallest to biggest, cropped tight around the item.
2. Optional scene art in the same folder: `bg.webp` (portrait scene), `board.webp` (top-down tray, cropped to the tray), `banner.webp`, `card.webp`. Turn each on in the edition's `scene` setting and set `rim` to the tray rim's share of the image width (x) and height (y).
3. Remove `soon: true`.
4. Bump `CACHE` in `sw.js` so installed copies pick up the new art.
Without scene art the game paints a sky and a wooden tray from the edition's colours.
