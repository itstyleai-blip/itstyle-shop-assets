# -*- coding: utf-8 -*-
"""
티타늄 패러슈트 메인 배너 제작 (2026-09-21)
===========================================
Billy: "자사몰도 우리 티타늄 패러슈트가 메인 제품이다. 이 사진들을 활용해 메인 배너에 달고,
        갤럭시워치·애플워치 모든 스마트워치에 가능하게 판매한다. 우리만의 제품으로."

규격은 기존 메인 배너와 동일 — PC 3500x850 / 모바일 1080x1100
원본 사진: C:/Users/Billy/Pictures/애플워치 (Billy 지정 3장 중 2장)
  · PC   : 10_10_32 (한강 러닝 · 버클 정면)
  · 모바일: 10_12_23 (세로 러닝컷)

문구 근거
  · 순도 99% 티타늄 / 35g / 본체·버클 : _데이터_awti.py (KOTITI 시험성적서)
  · 전 기종        : 갤럭시워치 3종(1218·1225·1222) + 애플워치 1종(1254) 실제 판매 중
  · AI 연출 이미지이므로 각주 필수 (상세페이지 규칙과 동일)
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = Path(r"C:\Users\Billy\Pictures\애플워치")
OUT = Path(__file__).parent / "banner"
FONTS = Path(r"E:\작업\아이티스타일\detail-factory\fonts")

P = lambda t: SRC / f"Codex 이미지 2026년 9월 21일 오전 {t}.png"
PHOTO_PC = P("10_10_32")        # 남성 · 버클 정면 (정사각)
PHOTO_PC2 = P("10_19_14")       # 여성 · 버클 정면 (정사각)  ← Billy 추가 지정
PHOTO_MO = P("10_12_23")        # 남성 세로
PHOTO_MO2 = P("10_19_19")       # 여성 세로                  ← Billy 추가 지정

NOTE = "* 연출 이미지입니다. 워치 본체는 구성품에 포함되지 않습니다."


def F(name, size):
    return ImageFont.truetype(str(FONTS / f"Pretendard-{name}.otf"), size)


def cover(im, w, h, focus=0.5):
    """비율 유지하고 꽉 채우기. focus = 가로 크롭 기준점(0=왼쪽, 1=오른쪽)"""
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x = int((im.width - w) * focus)
    y = int((im.height - h) * 0.42)          # 얼굴이 잘리지 않게 위쪽 기준
    return im.crop((x, y, x + w, y + h))


def scrim(size, horizontal, strength=235):
    """텍스트가 올라가는 쪽을 어둡게 — 사진 위 글자 가독성"""
    w, h = size
    g = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(g)
    if horizontal:
        for x in range(w):
            t = max(0.0, 1 - x / (w * 0.62)) ** 1.5
            d.line([(x, 0), (x, h)], fill=int(strength * t))
    else:
        for y in range(h):
            t = max(0.0, 1 - y / (h * 0.72)) ** 1.4
            d.line([(0, y), (w, y)], fill=int(strength * t))
    black = Image.new("RGB", (w, h), (8, 10, 12))
    return black, g


def cover_at(im, w, h, cx=0.5, cy=0.5):
    """비율 유지 꽉 채우기 + 관심 지점(cx, cy)을 중앙에 두고 크롭"""
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x = min(max(int(im.width * cx - w / 2), 0), im.width - w)
    y = min(max(int(im.height * cy - h / 2), 0), im.height - h)
    return im.crop((x, y, x + w, y + h))


def build_pc():
    """좌측 텍스트 패널 + 우측 사진 2장(남성·여성) — 초광각(4.1:1)에서 제품이 잘리지 않게"""
    W, H = 3500, 850
    PANEL = 1480
    im = Image.new("RGB", (W, H), (12, 14, 17))
    half = (W - PANEL) // 2
    # 두 컷 모두 손목의 버클이 보이는 프레임으로 맞춘다 (사람이 아니라 제품이 주인공)
    a = cover_at(Image.open(PHOTO_PC).convert("RGB"), half, H, cx=0.50, cy=0.58)
    b = cover_at(Image.open(PHOTO_PC2).convert("RGB"), W - PANEL - half, H, cx=0.46, cy=0.56)
    im.paste(a, (PANEL, 0))
    im.paste(b, (PANEL + half, 0))
    # 패널 → 사진 경계를 부드럽게
    seam = Image.new("L", (260, H), 0)
    ds = ImageDraw.Draw(seam)
    for i in range(260):
        ds.line([(i, 0), (i, H)], fill=int(255 * (1 - i / 260)))
    im.paste(Image.new("RGB", (260, H), (12, 14, 17)), (PANEL, 0), seam)
    d = ImageDraw.Draw(im)

    x = 210
    d.text((x, 175), "TITANIUM PARACHUTE", font=F("SemiBold", 40), fill=(198, 168, 108), spacing=0)
    d.text((x, 248), "운동할 때 달라집니다", font=F("ExtraBold", 118), fill=(255, 255, 255))
    d.text((x, 392), "순도 99% 티타늄 · 35g · 사이드 레버 버클", font=F("Medium", 46), fill=(232, 232, 232))
    # 전 기종 배지
    bx, by = x, 492
    for label in ("갤럭시워치", "애플워치", "울트라"):
        tw = d.textlength(label, font=F("SemiBold", 38))
        d.rounded_rectangle([bx, by, bx + tw + 56, by + 78], radius=39, outline=(255, 255, 255), width=3)
        d.text((bx + 28, by + 18), label, font=F("SemiBold", 38), fill=(255, 255, 255))
        bx += tw + 56 + 22
    d.text((x, 614), "기종별로 보기 ›", font=F("Bold", 46), fill=(198, 168, 108))
    d.text((x, 762), NOTE, font=F("Regular", 26), fill=(178, 178, 178))
    im.save(OUT / "main_titanium2_pc.jpg", quality=88, optimize=True)
    return im.size


def build_mo():
    W, H = 1080, 1100
    TEXT_H = 420          # 글자가 사진 위에 겹치지 않게 위쪽은 전용 띠로 분리
    PH = H - TEXT_H
    im = Image.new("RGB", (W, H), (12, 14, 17))
    # 아래쪽 세로 2분할 — 남성 · 여성 (Billy 지정)
    im.paste(cover_at(Image.open(PHOTO_MO).convert("RGB"), W // 2 - 4, PH, cx=0.56, cy=0.46), (0, TEXT_H))
    im.paste(cover_at(Image.open(PHOTO_MO2).convert("RGB"), W - W // 2 - 4, PH, cx=0.48, cy=0.44),
             (W // 2 + 4, TEXT_H))
    d = ImageDraw.Draw(im)

    x = 74
    d.text((x, 74), "TITANIUM PARACHUTE", font=F("SemiBold", 30), fill=(198, 168, 108))
    d.text((x, 124), "운동할 때", font=F("ExtraBold", 92), fill=(255, 255, 255))
    d.text((x, 228), "달라집니다", font=F("ExtraBold", 92), fill=(255, 255, 255))
    d.text((x, 348), "순도 99% 티타늄 · 35g · 갤럭시워치 · 애플워치 전 기종",
           font=F("Medium", 31), fill=(226, 226, 226))
    # CTA · 각주는 사진 하단에 어두운 띠를 깔고 올린다
    bot = Image.new("L", (W, H), 0)
    db = ImageDraw.Draw(bot)
    for y in range(H):
        t = max(0.0, (y - H * 0.80) / (H * 0.20)) ** 1.1
        db.line([(0, y), (W, y)], fill=int(232 * t))
    im = Image.composite(Image.new("RGB", (W, H), (8, 10, 12)), im, bot)
    d = ImageDraw.Draw(im)
    d.text((x, 960), "기종별로 보기 ›", font=F("Bold", 44), fill=(198, 168, 108))
    d.text((x, 1036), NOTE, font=F("Regular", 22), fill=(190, 190, 190))
    im.save(OUT / "main_titanium2_mo.jpg", quality=88, optimize=True)
    return im.size


if __name__ == "__main__":
    print("PC :", build_pc(), (OUT / "main_titanium2_pc.jpg").stat().st_size // 1024, "KB")
    print("MO :", build_mo(), (OUT / "main_titanium2_mo.jpg").stat().st_size // 1024, "KB")
