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
      if (!im || !/main_(glass|titanium)_/.test(im.src)) return;
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

  function inject(w){
    if (!w) return false;                            // 아직 DOM에 없음 → 감시 계속
    if (document.getElementById(ID)) return true;    // 이미 넣음
    var c = w.closest ? w.closest(".swiper-container") : null;
    if (c && c.swiper) {
      // 이미 초기화된 뒤라면 swiper API로 넣어야 loop 복제·페이지네이션이 함께 갱신된다
      c.swiper.prependSlide(build().outerHTML);
      c.swiper.slideTo(0, 0);
    } else {
      w.insertBefore(build(), w.firstChild);         // 초기화 전이면 맨 앞에 그냥 삽입
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
