document.addEventListener('DOMContentLoaded', function () {
    // 1. item 클릭 시 popup.html 불러오기
    document.querySelectorAll('.item_wrap .item').forEach(function (item) {
        item.addEventListener('click', function () {
            const portfolioName = item.getAttribute('data-portfolio');
            const filePath = `popup/portfolio/${portfolioName}_popup.html`;

            fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("파일을 불러올 수 없습니다.");
                return response.text();
            })
            .then(html => {
                const popupWrap = document.getElementById('portfolio_popup_wrap');
                popupWrap.innerHTML = html;
                popupWrap.style.display = 'flex';

                // 팝업 내부 요소가 로드된 후에 이벤트 바인딩
                bindPopupCloseEvents();

                 // 1. CSS 동적 로드
                const popupCSS = document.createElement('link');
                popupCSS.rel = 'stylesheet';
                popupCSS.href = '/css/popup.css'; // popup.html에 맞는 CSS 경로
                document.head.appendChild(popupCSS);

                // 2. JS 동적 로드
                const popupScript = document.createElement('script');
                popupScript.src = '/js/popup_cont_load.js'; // popup.html용 JS
                popupScript.defer = true; // 로딩 순서 안정성 확보
                document.body.appendChild(popupScript);
            })
            .catch(err => {
                console.error('에러 발생:', err);
            });

            // 스크롤 애니메이션 표시/숨김 기능
            // 팝업이 생성되거나 표시된 직후에 호출
            setTimeout(() => {
                const popup = document.querySelector('.popup_cont_wrap');
                const scrollAni = document.querySelector('.scroll_ani');
                if (popup && scrollAni) {
                function updateScrollAniDisplay() {
                    if (popup.scrollTop === 0) {
                    scrollAni.classList.remove('hidden');
                    } else {
                    scrollAni.classList.add('hidden');
                    }
                }

                popup.addEventListener('scroll', updateScrollAniDisplay);
                updateScrollAniDisplay();
                }
            }, 50); // 팝업 생성 시간 고려해 약간의 지연
        });
    });

    // 2. 닫기 버튼과 배경 클릭 시 popup 제거
    function bindPopupCloseEvents() {
        const popupWrap = document.getElementById('portfolio_popup_wrap');

        const closeBtn = popupWrap.querySelector('.popup_close_btn');
        const background = popupWrap.querySelector('.bk_bg');

        const closePopup = () => {
            popupWrap.innerHTML = '';           // popup html 제거
            popupWrap.style.display = 'none';  // 숨기기
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        if (background) {
            background.addEventListener('click', closePopup);
        }
    }
});