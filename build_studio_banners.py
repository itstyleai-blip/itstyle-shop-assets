# -*- coding: utf-8 -*-
"""
홈 메인 슬라이드 교체용 배너 3종 (2026-09-21)
=============================================
Billy: "홈화면 배너 보면 예전 중국 제조사에서 준 것 같은 CG 사진들 모두 변경하자.
        최근 스튜디오 사진들과 내가 공유해준 티타늄 패러슈트 등"

교체 대상 (카페24 스킨 배너 — API 가 없어 JS 로 src 를 바꿔 끼운다)
  ad97090e / d116804e  갤럭시워치 케이스 모음   ← 제조사 CG 렌더(빨간 화면 케이스 5개)
  0de2e744 / 27c55bb2  큐빅 케이스 스트랩 조합  ← 옛 제조사 컷
  dae70f35 / c6ae8c15  애플워치 케이스 모음     ← 옛 컷

사용 사진
  · `베스트 사진 참고/` 211장 = **자사 스튜디오 촬영본** (색인 문서에 저작권 문제 없음 명시)
  · 티타늄 패러슈트 러닝컷 = Billy 공유본 (AI 연출 → 각주 표기)
  · 블로그 리뷰어(MOIMOI) 사진은 제3자 촬영본이라 사용하지 않는다

규격은 기존과 동일 PC 3500x850 / 모바일 1080x1100
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"E:\작업\아이티스타일")
BEST = ROOT / "베스트 사진 참고"
PIC = Path(r"C:\Users\Billy\Pictures\애플워치")
OUT = Path(__file__).parent / "banner"
FONTS = ROOT / "detail-factory" / "fonts"

INK = (26, 26, 28)
SUB = (92, 92, 96)
GOLD = (150, 122, 62)
BG = (247, 245, 241)
NOTE_AI = "* 연출 이미지입니다. 워치 본체는 구성품에 포함되지 않습니다."


def F(n, s):
    return ImageFont.truetype(str(FONTS / f"Pretendard-{n}.otf"), s)


def fit_h(p, h):
    im = Image.open(p).convert("RGB")
    r = h / im.height
    return im.resize((round(im.width * r), h), Image.LANCZOS)


def crop_at(p, w, h, cx=0.5, cy=0.5):
    im = Image.open(p).convert("RGB")
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x = min(max(int(im.width * cx - w / 2), 0), im.width - w)
    y = min(max(int(im.height * cy - h / 2), 0), im.height - h)
    return im.crop((x, y, x + w, y + h))


def make(name, photos, title, sub, cta, note=None, dark=False):
    """photos = [(경로, cx, cy)] — PC 는 오른쪽에 가로로 이어 붙이고, 모바일은 아래에 1~2장"""
    ink, sub_c, bg = ((255, 255, 255), (222, 222, 224), (16, 18, 20)) if dark else (INK, SUB, BG)

    # ── PC 3500x850 : 좌측 텍스트(1400) + 우측 사진들
    W, H, PANEL = 3500, 850, 1400
    im = Image.new("RGB", (W, H), bg)
    seg = (W - PANEL) // len(photos)
    for i, (p, cx, cy) in enumerate(photos):
        w = seg if i < len(photos) - 1 else W - PANEL - seg * (len(photos) - 1)
        im.paste(crop_at(p, w, H, cx, cy), (PANEL + seg * i, 0))
    d = ImageDraw.Draw(im)
    d.text((190, 300), title, font=F("ExtraBold", 104), fill=ink)
    d.text((190, 448), sub, font=F("Medium", 42), fill=sub_c)
    d.text((190, 556), cta, font=F("Bold", 42), fill=GOLD)
    if note:
        d.text((190, 762), note, font=F("Regular", 24), fill=sub_c)
    im.save(OUT / f"{name}_pc.jpg", quality=88, optimize=True)

    # ── 모바일 1080x1100 : 위 텍스트(380) + 아래 사진
    W, H, TH = 1080, 1100, 380
    im = Image.new("RGB", (W, H), bg)
    ph = H - TH
    if len(photos) >= 2:
        im.paste(crop_at(photos[0][0], W // 2 - 3, ph, photos[0][1], photos[0][2]), (0, TH))
        im.paste(crop_at(photos[1][0], W - W // 2 - 3, ph, photos[1][1], photos[1][2]), (W // 2 + 3, TH))
    else:
        im.paste(crop_at(photos[0][0], W, ph, photos[0][1], photos[0][2]), (0, TH))
    d = ImageDraw.Draw(im)
    d.text((70, 112), title, font=F("ExtraBold", 86), fill=ink)
    d.text((70, 232), sub, font=F("Medium", 34), fill=sub_c)
    d.text((70, 292), cta, font=F("Bold", 34), fill=GOLD)
    if note:
        band = Image.new("L", (W, H), 0)
        db = ImageDraw.Draw(band)
        for y in range(H):
            t = max(0.0, (y - H * 0.88) / (H * 0.12))
            db.line([(0, y), (W, y)], fill=int(225 * t))
        im = Image.composite(Image.new("RGB", (W, H), (10, 12, 14)), im, band)
        ImageDraw.Draw(im).text((70, 1040), note, font=F("Regular", 21), fill=(198, 198, 198))
    im.save(OUT / f"{name}_mo.jpg", quality=88, optimize=True)
    print(f"{name}: pc {(OUT / f'{name}_pc.jpg').stat().st_size//1024}KB · mo {(OUT / f'{name}_mo.jpg').stat().st_size//1024}KB")


U = BEST / "갤럭시워치 울트라"
A = BEST / "애플"

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    # ① 갤럭시워치 케이스 — 제조사 CG → 자사 스튜디오 플랫레이
    make("band_gwcase",
         [(U / "batch_itstyle-064.jpg", 0.5, 0.5), (U / "batch_itstyle-012.jpg", 0.5, 0.5)],
         "갤럭시워치 케이스", "베젤링 · 풀커버 · 하드 · 컬러별로 준비했습니다", "케이스 보러 가기 ›")

    # ② 구 큐빅 슬라이드 → 스트랩 컬렉션 (자사 스튜디오)
    make("band_strap",
         [(U / "batch_itstyle-190.jpg", 0.5, 0.5), (U / "batch_itstyle-130.jpg", 0.5, 0.5)],
         "스트랩 컬렉션", "가죽 · 메탈 · 스포츠 · 나일론까지 한 자리에", "스트랩 보러 가기 ›")

    # ③ 애플워치 — 자사 스튜디오 + 티타늄 러닝컷(연출)
    make("band_apple",
         [(A / "DSC09478.JPG", 0.52, 0.5),
          (PIC / "Codex 이미지 2026년 9월 21일 오전 10_19_14.png", 0.46, 0.56)],
         "애플워치", "케이스 · 보호필름 · 티타늄 스트랩까지", "애플워치 보러 가기 ›", note=NOTE_AI)
