/*!
 * 아이티스타일 자사몰 프론트 보정 — 2026-07-31
 * 카페24는 배너 API가 없어 SEO 코드로 주입한다. Head 영역이 8KB 한계에 닿아
 * 본문은 이 파일로 분리하고, 관리자에는 <script src> 한 줄만 넣는다.
 *   갱신 방법: 이 파일을 고쳐 push → 관리자 수정 불필요
 *   즉시 반영: https://purge.jsdelivr.net/gh/itstyleai-blip/itstyle-shop-assets@main/js/itstyle-main.js
 */
(function(){
  var BASE  = "https://raw.githubusercontent.com/itstyleai-blip/itstyle-shop-assets/main/banner/";
  var PC    = BASE + "main_glass_pc.jpg";
  var MO    = BASE + "main_glass_mo.jpg";
  var POPUP = BASE + "popup_glass.jpg";
  // 자사몰 배너는 네이버 mkt 마케팅 링크로 보낸다 (유입 추적 — cta_products.json 규칙)
  // 배너별로 목적지가 다르다 (Billy 지정 2026-07-31)
  var LINK  = "https://mkt.shopping.naver.com/link/6839104e8f1c490586c4bf3d"; // 강화유리 배너·팝업
  var TITAN = "https://mkt.shopping.naver.com/link/6a60b054da16a67bd50a7f18"; // 티타늄 패러슈트 배너
  var ID    = "glassFreeSlide";
  var ALT   = "출시기념 강화유리 100% 무료 증정";

  /* ── 티타늄 패러슈트 메인 배너 (2026-09-21) ──────────────────────────────
     Billy: "자사몰도 우리 티타늄 패러슈트가 메인 제품이다. 메인 배너에 달고,
             갤럭시워치·애플워치 모든 스마트워치에 가능하게 판매한다."
     기존 티타늄 배너(main_titanium_*)는 네이버 mkt 로 보내지만, 이 배너는 **자사몰**
     [181] 티타늄 패러슈트 카테고리(갤럭시 3종 + 애플 1종)로 보낸다. */
  var TI_ID   = "titaniumSeriesSlide";
  var TI_PC   = BASE + "main_titanium2_pc.jpg";
  var TI_MO   = BASE + "main_titanium2_mo.jpg";
  var TI_LINK = "/product/list.html?cate_no=181";
  var TI_ALT  = "티타늄 패러슈트 밀레니즈 루프 스트랩 - 갤럭시워치 애플워치 전 기종";

  /* ── 옛 제조사 CG 배너 교체 (2026-09-21) ────────────────────────────────
     Billy: "예전 중국 제조사에서 준 것 같은 CG 사진들 모두 변경하자.
             최근 스튜디오 사진들과 내가 공유해준 티타늄 패러슈트 등"
     카페24 스킨 배너는 API 가 없어 파일 해시로 찾아 src·링크를 바꿔 끼운다.
     새 배너는 자사 스튜디오 촬영본(베스트 사진 참고 211장) 기반.
     ※ cate_no=89 는 **존재하지 않는 카테고리**였다(죽은 링크) → 125(케이스)로 교정 */
  var SWAP = [
    { re: /ad97090e2102bf174d61123418b164d3/, img: BASE + "band_gwcase_pc.jpg",
      href: "/product/list.html?cate_no=125", alt: "갤럭시워치 케이스 - 베젤링 풀커버 하드 컬러별" },
    { re: /d116804e8c49652d6e2ab675cc1902d2/, img: BASE + "band_gwcase_mo.jpg",
      href: "/product/list.html?cate_no=125", alt: "갤럭시워치 케이스 - 베젤링 풀커버 하드 컬러별" },
    { re: /0de2e744e8f7ce3d6dba3f66a4438474/, img: BASE + "band_strap_pc.jpg",
      href: "/product/list.html?cate_no=73", alt: "갤럭시워치 스트랩 컬렉션 - 가죽 메탈 스포츠 나일론" },
    { re: /27c55bb2a2c05d5dc0547abf385424c5/, img: BASE + "band_strap_mo.jpg",
      href: "/product/list.html?cate_no=73", alt: "갤럭시워치 스트랩 컬렉션 - 가죽 메탈 스포츠 나일론" },
    { re: /dae70f353e8fff1e2657ed1c4a961aec/, img: BASE + "band_apple_pc.jpg",
      href: "/product/list.html?cate_no=24", alt: "애플워치 케이스 보호필름 티타늄 스트랩" },
    { re: /c6ae8c158ea2f0e50839d03bf4efe213/, img: BASE + "band_apple_mo.jpg",
      href: "/product/list.html?cate_no=24", alt: "애플워치 케이스 보호필름 티타늄 스트랩" },
    /* 이벤트 섹션(index_ban_400) — 스킨 기본 이미지
       m__bn_402 는 **타임엑스 스누피·찰리브라운 시계** 사진이었다(타사 제품 + 라이선스 캐릭터)
       p__bn_403 은 "최대 30% + 친구추가 1,000원 쿠폰" 표기였으나 실제 카카오 쿠폰은 3,000원 */
    { re: /SkinImg\/m__bn_402\.jpg/, img: BASE + "band_event_metal.jpg",
      href: "/product/list.html?cate_no=73", alt: "메탈 스트랩 - 밀레니즈 메쉬 링크 브레이슬릿 티타늄" },
    { re: /SkinImg\/p__bn_403\.jpg/, img: BASE + "band_event_member.jpg",
      href: "/member/join.html", alt: "공식몰 회원 혜택 - 가입 즉시 쿠폰 8장 합계 52,000원" },
    { re: /SkinImg\/m__bn_403\.jpg/, img: BASE + "band_event_member_mo.jpg",
      href: "/member/join.html", alt: "공식몰 회원 혜택 - 가입 즉시 쿠폰 8장 합계 52,000원" }
  ];

  /* 슬라이드 3(main_titanium_pc/mo)은 7/28 사전예약 배너로 **98,000원**이 박혀 있다.
     현재 판매가는 118,000~128,000원 → 표시광고 문제라 노출에서 내린다.
     (파일은 지우지 않는다. 가격을 새로 박아 다시 쓰려면 배너만 갈아끼우면 된다) */
  function hideStaleTitanium(){
    document.querySelectorAll(".index_ban_100 img").forEach(function(im){
      if (!/main_titanium_(pc|mo)\.jpg/.test(im.src)) return;
      var s = im.closest(".swiper-slide");
      if (s && !s.dataset.staleHidden) {
        s.dataset.staleHidden = "1";
        s.style.setProperty("display", "none", "important");
      }
    });
  }

  function swapOldBanners(){
    hideStaleTitanium();
    document.querySelectorAll(".index_ban_100 img, .index_ban_400 img").forEach(function(im){
      if (im.dataset.swapped) return;
      for (var i = 0; i < SWAP.length; i++) {
        if (!SWAP[i].re.test(im.src)) continue;
        im.dataset.swapped = "1";
        im.src = SWAP[i].img;
        im.alt = SWAP[i].alt;
        var a = im.closest("a");
        if (a) { a.setAttribute("href", SWAP[i].href); a.removeAttribute("onclick"); }
        // 새 배너에는 문구가 이미 들어 있어 스킨 오버레이(.txt)는 가린다
        var s = im.closest(".swiper-slide");
        var t = s && s.querySelector(".txt");
        if (t) t.style.setProperty("display", "none", "important");
        break;
      }
    });
  }

  /* ── 1) 메인 슬라이더에 강화유리 슬라이드를 맨 앞에 추가 ─────────────── */
  function build(){
    var d = document.createElement("div");
    d.className = "swiper-slide";
    d.id = ID;
    d.innerHTML =
      '<a href="' + LINK + '" target="_blank" rel="noopener">' +
      '<div class="img pc_view"><img src="' + PC + '" width="100%" alt="' + ALT + '"></div>' +
      '<div class="img m_view"><img src="' + MO + '" width="100%" alt="' + ALT + '"></div>' +
      '</a>';
    return d;
  }

  /* 우리 배너는 문구가 이미지에 새겨져 있다. 스킨 기본 오버레이(.txt)가 그 위에 겹쳐
     "원터치 메탈 스트랩" 같은 엉뚱한 카피가 같이 뜨므로 해당 슬라이드만 오버레이를 숨긴다.
     티타늄 배너 링크도 자사몰 상세 → 네이버 mkt 로 바꾼다. */
  function fixOurSlides(){
    document.querySelectorAll(".index_ban_100 .swiper-slide").forEach(function(s){
      var im = s.querySelector("img");
      if (!im || !/main_(glass|titanium)_|main_titanium2_/.test(im.src)) return;
      var t = s.querySelector(".txt");
      if (t) t.style.display = "none";
      var a = s.querySelector("a");
      if (a && /main_titanium_/.test(im.src)) {
        a.setAttribute("href", TITAN);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
  }

  function buildTitanium(){
    var d = document.createElement("div");
    d.className = "swiper-slide";
    d.id = TI_ID;
    d.innerHTML =
      '<a href="' + TI_LINK + '">' +
      '<div class="img pc_view"><img src="' + TI_PC + '" width="100%" alt="' + TI_ALT + '"></div>' +
      '<div class="img m_view"><img src="' + TI_MO + '" width="100%" alt="' + TI_ALT + '"></div>' +
      '</a>';
    return d;
  }

  function inject(w){
    if (!w) return false;                            // 아직 DOM에 없음 → 감시 계속
    if (document.getElementById(ID)) return true;    // 이미 넣음
    var c = w.closest ? w.closest(".swiper-container") : null;
    // 순서: ① 티타늄 패러슈트(자사몰 메인 제품) ② 강화유리 증정
    if (c && c.swiper) {
      // 이미 초기화된 뒤라면 swiper API로 넣어야 loop 복제·페이지네이션이 함께 갱신된다
      c.swiper.prependSlide(build().outerHTML);
      c.swiper.prependSlide(buildTitanium().outerHTML);
      c.swiper.slideTo(0, 0);
    } else {
      w.insertBefore(build(), w.firstChild);         // 초기화 전이면 맨 앞에 그냥 삽입
      w.insertBefore(buildTitanium(), w.firstChild);
    }
    // swiper가 loop 복제 슬라이드를 나중에 만들므로 몇 차례 더 훑는다
    [0, 300, 1000, 2500].forEach(function(ms){ setTimeout(fixOurSlides, ms); });
    return true;
  }

  /* ── 2) 메인 팝업(.main--modal)에도 강화유리 슬라이드 추가 ──────────── */
  var popupDone = false;
  function injectPopup(){
    if (popupDone) return;
    var c = document.querySelector(".main--modal .swiper-container");
    if (!c) return;
    var html =
      '<div class="swiper-slide" data-glass="1">' +
      '<a href="' + LINK + '" target="_blank" rel="noopener">' +
      '<img src="' + POPUP + '" alt="' + ALT + '"></a></div>';
    if (c.swiper) {
      c.swiper.appendSlide(html);                    // loop·pagination까지 알아서 갱신
    } else {
      var w = c.querySelector(".swiper-wrapper");
      if (!w) return;
      w.insertAdjacentHTML("beforeend", html);
    }
    popupDone = true;
  }

  /* ── 3) 팝업 겹침 해소 ────────────────────────────────────────────────
     홈에 레이어가 세 종류 뜬다 (2026-07-31 실측):
       · .main--modal                        — 스킨 모달 슬라이더 (원버튼 스트랩 + 강화유리 이벤트) z=9999
       · #popup_N                            — 카페24 레이어 팝업 z=9999
       · #app-saladlab-alphareview-onsite-*  — AlphaPush 추천 위젯 z=**1000001** (shadow DOM)
     AlphaPush가 z-index 100만이라 자사몰 팝업을 완전히 덮어버려서, 정작 우리 팝업이 안 보였다.
     → 셋 다 살리되 **동시에 띄우지 않는다.** 모달이 열려 있는 동안 나머지를 감췄다가,
       모달을 닫으면 그때 보여준다. (앱을 끄는 게 아니라 순서만 만드는 것 — 되돌리기 쉬움) */
  var OVERLAY_SEL = '[id^="popup_"],[id^="app-saladlab-"],push-script-onsite-campaign-factory';
  function stackPopups(){
    var m = document.querySelector(".main--modal");
    var open = !!(m && m.classList.contains("active") && getComputedStyle(m).display !== "none");
    document.querySelectorAll(OVERLAY_SEL).forEach(function(pop){
      if (open) {
        if (pop.style.display !== "none") { pop.dataset.glassHidden = "1"; pop.style.display = "none"; }
      } else if (pop.dataset.glassHidden) {
        pop.style.display = ""; delete pop.dataset.glassHidden;
      }
    });
  }

  /* ── 4) 갤럭시워치 하위 카테고리 순서 정리 ───────────────────────────────
     171(울트라1)·172(8클래식)를 새로 만들었더니 GNB 맨 뒤에 붙어 기종 순서가 뒤죽박죽이 됐다.
     API의 `display_order` PUT은 **200을 주고도 실제로 반영되지 않아**(무효 응답) 프론트에서 정렬한다.
     정렬 원칙: 최신 → 구형, 클래식은 해당 기본 모델 바로 뒤.
     주의: 화면 표시 순서만 바꾼다. 관리자 데이터는 그대로다. */
  var CATE_ORDER = [125, 73, 74, 75, 150,   // 품목별 (기존 순서 유지)
                    155,   // 갤럭시워치9/8
                    172,   // 갤럭시워치8 클래식(46mm)
                    156,   // 갤럭시워치 울트라2
                    171,   // 갤럭시워치 울트라1
                    157,   // 갤럭시워치7·6·5·4
                    158];  // 갤럭시워치6·4 클래식

  function sortCategories(){
    var uls = new Set();
    document.querySelectorAll("li.cate_no_155").forEach(function(li){
      var ul = li.parentElement;
      if (ul) uls.add(ul);
    });
    uls.forEach(function(ul){
      var items = [], anchor = null;
      CATE_ORDER.forEach(function(no){
        var li = ul.querySelector(":scope > li.cate_no_" + no);
        if (!li) return;
        if (!anchor) anchor = li.previousElementSibling;   // 삽입 기준점
        items.push(li);
      });
      if (items.length < 2) return;
      items.forEach(function(li){
        if (anchor) { anchor.after(li); anchor = li; }
        else { ul.insertBefore(li, ul.firstChild); anchor = li; }
      });
    });
  }

  /* ── 5) 상단 띠배너 문구·링크 정정 ────────────────────────────────────
     실측(2026-09-06) 문제 2가지
       · 카카오톡 배너가 "1000원 쿠폰"으로 적혀 있으나 실제 발급 쿠폰은
         **'카카오톡 친구 전용 3,000원 할인'** — 실제보다 낮게 표기해 손해
       · 그 배너가 카카오 채널이 아니라 **회원가입 페이지**로 연결됨
     스킨 HTML(#tbanner)이라 API가 없어 여기서 바로잡는다. */
  var KAKAO_CH = "https://pf.kakao.com/_TrfdK";   // 아이티스타일 ITStyle 편집샵 (200 확인)

  function fixTopBanner(){
    document.querySelectorAll("#tbanner .swiper-slide a").forEach(function(a){
      var t = a.textContent || "";
      // "5만원쿠폰" → "5만원 쿠폰팩" (2026-09-18)
      //   실제 가입 혜택은 한 장이 아니라 8장 묶음: 가입 즉시 3,000원 + 금액대별 7장(1천~2만원, 최소주문 조건)
      //   합계 52,000원. 한 장짜리로 읽히지 않게 '쿠폰팩'으로 표기 (표시광고법)
      if (t.indexOf("회원가입") >= 0 && !a.dataset.packFixed) {
        a.dataset.packFixed = "1";
        a.innerHTML = a.innerHTML.replace(/(5만원)\s*(<\/[a-z]+>)?\s*쿠폰(?!팩)/, "$1$2 쿠폰팩");
      }
      if (t.indexOf("카카오톡") < 0) return;
      // 금액 정정: 1000원 → 3,000원 (strong 태그 안의 숫자만 교체)
      var st = a.querySelector("strong");
      if (st && /1[,]?000\s*원?/.test(st.textContent)) st.textContent = "3,000원";
      else if (st && st.textContent.indexOf("3,000") < 0) st.textContent = "3,000원";
      // '3,000원쿠폰' 처럼 붙어 보이지 않도록 뒤 텍스트를 다듬는다
      a.innerHTML = a.innerHTML.replace(/(<\/strong>)\s*쿠폰/, "$1 쿠폰");
      // 링크: 회원가입 → 카카오 채널
      if ((a.getAttribute("href") || "").indexOf("pf.kakao.com") < 0) {
        a.setAttribute("href", KAKAO_CH);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
  }

  /* ── 6) 메인 슬라이드 "애플워치 케이스 모음" 죽은 링크 정정 ──────────────────
     실측(2026-09-17): 5번째 슬라이드(dae70f35…jpg) 링크가 "/" — 클릭하면 홈으로 되돌아온다.
     배너 관리에 API 가 없어 이미지 해시 기준으로 [24] 애플워치 카테고리로 보낸다. */
  var APPLE_BANNER = /dae70f353e8fff1e2657ed1c4a961aec/;
  var APPLE_CATE   = "/product/list.html?cate_no=24";

  function fixAppleBanner(){
    document.querySelectorAll(".index_ban_100 .swiper-slide img").forEach(function(im){
      if (!APPLE_BANNER.test(im.src)) return;
      var a = im.closest("a");
      if (!a || a.dataset.appleFixed) return;
      var href = a.getAttribute("href") || "";
      if (href === "/" || href === "" || /itstyle\.shop\/?$/.test(href)) {
        a.setAttribute("href", APPLE_CATE);
        a.removeAttribute("onclick");
      }
      a.dataset.appleFixed = "1";
    });
  }

  /* ── 실행 ──────────────────────────────────────────────────────────── */
  var sel = ".index_ban_100 .swiper-wrapper";
  var ok = inject(document.querySelector(sel));

  // 스킨이 swiper를 초기화하기 "전에" 끼워 넣어야 하므로 파싱 중 감시한다.
  // head 실행 시점엔 documentElement가 아직 없을 수 있어 document를 관찰한다.
  if (!ok) {
    var mo = new MutationObserver(function(){
      var w = document.querySelector(sel);
      if (w) { inject(w); mo.disconnect(); }
    });
    mo.observe(document, {childList:true, subtree:true});
    document.addEventListener("DOMContentLoaded", function(){
      inject(document.querySelector(sel)); mo.disconnect();
    });
  }

  // 팝업은 스킨 스크립트가 늦게 초기화하므로 여러 시점에 시도
  [600, 1500, 3000, 5000].forEach(function(ms){ setTimeout(injectPopup, ms); });

  // 카테고리 정렬은 전 페이지 공통(GNB) — DOM이 준비되는 대로 한 번, 이후 보정
  document.addEventListener("DOMContentLoaded", sortCategories);
  [400, 1200, 3000].forEach(function(ms){ setTimeout(sortCategories, ms); });

  // 띠배너도 전 페이지 공통. swiper가 loop 복제를 만들므로 몇 차례 더 훑는다
  document.addEventListener("DOMContentLoaded", fixTopBanner);
  [300, 900, 2000, 4000].forEach(function(ms){ setTimeout(fixTopBanner, ms); });

  // 애플워치 배너 링크 — swiper 복제 슬라이드까지 몇 차례
  document.addEventListener("DOMContentLoaded", fixAppleBanner);
  [300, 1000, 2500, 5000].forEach(function(ms){ setTimeout(fixAppleBanner, ms); });

  // 옛 CG 배너 교체 — 복제 슬라이드가 나중에 생기므로 반복 + DOM 감시
  document.addEventListener("DOMContentLoaded", swapOldBanners);
  [0, 300, 900, 2000, 4000].forEach(function(ms){ setTimeout(swapOldBanners, ms); });
  if (window.MutationObserver) {
    new MutationObserver(function(){ swapOldBanners(); })
      .observe(document.documentElement, { childList: true, subtree: true });
  }

  // 겹침 정리: 초기 몇 초는 촘촘히, 이후 모달 닫힘을 감지해 복구
  [300, 900, 1800, 3000, 5000].forEach(function(ms){ setTimeout(stackPopups, ms); });
  document.addEventListener("click", function(e){
    if (e.target.closest && e.target.closest(".main--modal .close")) {
      [0, 120, 400].forEach(function(ms){ setTimeout(stackPopups, ms); });
    }
  }, true);
  document.addEventListener("DOMContentLoaded", function(){
    var m = document.querySelector(".main--modal");
    if (m) new MutationObserver(stackPopups).observe(m, {attributes:true, attributeFilter:["class","style"]});
    // AlphaPush 위젯은 외부 스크립트가 나중에 body에 붙이므로, 새로 생기는 것도 잡는다
    var bo = new MutationObserver(stackPopups);
    bo.observe(document.body, {childList:true});
    setTimeout(function(){ bo.disconnect(); }, 20000);
  });
})();
