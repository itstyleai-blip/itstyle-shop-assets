# itstyle-shop-assets

아이티스타일 자사몰(itstyle.shop) 프론트에서 참조하는 **공개 이미지 자산**.

## 왜 외부에 두나
카페24는 배너 관리 API가 없고(`/admin/banners` → 404), 메인 슬라이더는 스킨 이미지라
스마트디자인 편집기에서만 교체 가능한데 이 편집기는 자동화가 불가하다.
그래서 이미지는 여기(GitHub raw)에 두고, **SEO > 코드 직접입력**으로 프론트에서 치환한다.

> 이미지는 `<script>`와 달리 CORS·MIME 제약이 없다.
> `raw.githubusercontent.com`이 `Content-Type: image/png|jpeg`를 정확히 반환하므로 `<img>`에 바로 쓸 수 있다.

## 구성
```
banner/
  main_titanium_pc.jpg   3500x850   메인 슬라이더 PC용
  main_titanium_mo.jpg   1080x1100  메인 슬라이더 모바일용
```
- 내용: 티타늄 패러슈트 밀레니즈 B안 — "러닝용 메탈 스트랩은 왜 없을까? / 그래서, 만들었습니다"
- 원본·재생성: `../티타늄패러슈트_메인배너/render_main_banner.py`

## 참조 URL 형식
```
https://raw.githubusercontent.com/itstyleai-blip/itstyle-shop-assets/main/banner/main_titanium_pc.jpg
```

## 주의
- 이 저장소는 **public**이다. 자사몰에 공개 노출되는 이미지만 둘 것.
- 내부 자료·원가·계정 정보 등은 절대 넣지 말 것.
