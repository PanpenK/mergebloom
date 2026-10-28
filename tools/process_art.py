"""Turn raw Codex PNGs into game sprites.
   usage: python3 process_art.py <src_dir> <edition_id>
   src_dir has 01_*.png ... 11_*.png (+ optional 12_appicon.png)."""
import sys, glob, os
from PIL import Image, ImageFilter

src, ed = sys.argv[1], sys.argv[2]
R = '/home/claude/mergebloom'
out = f'{R}/art/{ed}'; os.makedirs(out, exist_ok=True)

def tight_square(im):
    im = im.convert('RGBA')
    a = im.getchannel('A')
    # ignore faint halo pixels when measuring the silhouette
    bbox = a.point(lambda v: 255 if v > 24 else 0).getbbox()
    x0, y0, x1, y1 = bbox
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    side = max(x1 - x0, y1 - y0) * 1.01
    box = (round(cx - side/2), round(cy - side/2), round(cx + side/2), round(cy + side/2))
    sq = Image.new('RGBA', (round(side), round(side)), (0, 0, 0, 0))
    sq.alpha_composite(im.crop(box) if box[0] >= 0 and box[1] >= 0 and box[2] <= im.width and box[3] <= im.height
                       else _safe_crop(im, box))
    return sq

def _safe_crop(im, box):
    w, h = box[2] - box[0], box[3] - box[1]
    c = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    c.alpha_composite(im, (-box[0], -box[1]))
    return c

for i in range(1, 12):
    f = sorted(glob.glob(f'{src}/{i:02d}_*.png'))
    if not f: print('missing tier', i); continue
    sq = tight_square(Image.open(f[0]))
    size = 256 if i <= 3 else (384 if i <= 6 else 512)
    sq = sq.resize((size, size), Image.LANCZOS)
    sq.save(f'{out}/{i:02d}.webp', 'WEBP', quality=88, method=6)
    print(i, os.path.basename(f[0]), '->', size, os.path.getsize(f'{out}/{i:02d}.webp')//1024, 'KB')

ic = sorted(glob.glob(f'{src}/12_*.png'))
if ic:
    im = Image.open(ic[0]).convert('RGB')
    s = min(im.size); im = im.crop(((im.width - s)//2, (im.height - s)//2, (im.width + s)//2, (im.height + s)//2))
    bgc = im.getpixel((6, 6)); pad = Image.new('RGB', (s, s), bgc)
    k = int(s * .84); pad.paste(im.resize((k, k), Image.LANCZOS), ((s-k)//2, (s-k)//2 + int(s*.02))); im = pad
    im.resize((512, 512), Image.LANCZOS).save(f'{R}/icon-512.png', optimize=True)
    im.resize((192, 192), Image.LANCZOS).save(f'{R}/icon-192.png', optimize=True)
    im.resize((256, 256), Image.LANCZOS).save(f'{out}/icon.webp', 'WEBP', quality=88)
    print('icons done')
