document.addEventListener("DOMContentLoaded", function () {
    const pageSelectButtons = document.querySelectorAll("#page_1 .tag");
    const gnbButtons = document.querySelectorAll(".gnb li button");
    const pages = document.querySelectorAll("main .center .page");
    const footerRight = document.querySelector("footer .center .right");
    const gnb = document.querySelector('header .gnb');
    const hamBtn = document.getElementById('ham_btn');

    const pageMap = {
        profile_open: {
            pageId: "page_2",
            footerText: "프로필"
        },
        works_list_open: {
            pageId: "page_3",
            footerText: "작업물&참여프로젝트 목록"
        },
        portfolio_open: {
            pageId: "page_4",
            footerText: "포트폴리오"
        }
    };

    // 각 gnb 버튼 이름을 키로 쓰는 매핑
    const gnbMap = {
        "홈": {
            pageId: "page_1",
            footerText: ""
        },
        "프로필": {
            pageId: "page_2",
            footerText: "프로필"
        },
        "작업물&참여프로젝트 목록": {
            pageId: "page_3",
            footerText: "작업물&참여프로젝트 목록"
        },
        "포트폴리오": {
            pageId: "page_4",
            footerText: "포트폴리오"
        }
    };

    // 기본 상태 초기화
    pages.forEach(page => {
        if (page.id !== "page_1") {
            page.style.transform = "translate(100%,-50%)";
            page.style.zIndex = 0;
        } else {
            page.style.transform = "translate(0%, -50%)";
            page.style.zIndex = 1;
        }
    });

    let currentPage = document.getElementById("page_1");

    // 메인페이지 태그 버튼 이벤트
    pageSelectButtons.forEach(button => {
        button.addEventListener("click", function () {
            let { pageId, footerText } = pageMap[button.id];
            let nextPage = document.getElementById(pageId);
            document.body.classList.add("paperBG");
            transitionPage(nextPage, footerText);
            // 홈일 경우 배경 클래스 제거
            if (pageId === "page_1") {
                document.body.classList.remove("paperBG");
                hamBtn.classList.add("white");
            } else {
                document.body.classList.add("paperBG");
                hamBtn.classList.remove("white");
            }
        });
    });

    // gnb 버튼 클릭 이벤트
    gnbButtons.forEach(button => {
        button.addEventListener("click", function () {
            const text = button.textContent.trim();
            const { pageId, footerText } = gnbMap[text] || {};
            if (!pageId) return;

            let nextPage = document.getElementById(pageId);

            // 홈일 경우 배경 클래스 제거
            if (pageId === "page_1") {
                document.body.classList.remove("paperBG");
                hamBtn.classList.add("white");
            } else {
                document.body.classList.add("paperBG");
                hamBtn.classList.remove("white");
            }

            transitionPage(nextPage, footerText);

            //모바일에서 gnb를 안 보이게 하기
            gnb.style.left = '100%';
        });
    });

    // 페이지 전환 공통 함수
    function transitionPage(nextPage, footerText) {
        if (nextPage === currentPage) return;

        // 현재 페이지 슬라이드 아웃
        currentPage.style.transform = "translate(-100%, -50%)";
        currentPage.style.zIndex = 0;

        // 다음 페이지 초기 위치 설정
        nextPage.style.transform = "translate(100%, -50%)";
        nextPage.style.zIndex = 1;

        setTimeout(() => {
            nextPage.style.transform = "translate(0, -50%)";
            currentPage = nextPage;
        }, 50);

        // footer 텍스트 업데이트
        footerRight.textContent = footerText || "";
    }

    //모바일 전용 ham 버튼 클릭 이벤트와 스와이프로 밀어내는 기능
    function initHam() {
        let touchStartX = 0;
        let touchEndX = 0;

        function isMobileView() {
            return window.innerWidth <= 768;
        }

        function openMenu() {
            if (isMobileView()) {
                gnb.style.left = '0';
            }
        }

        function closeMenu() {
            if (isMobileView()) {
                gnb.style.left = '100%';
            }
        }

       function handleTouchStart(e) {
            // 터치 시작 시점의 X 좌표 저장
            touchStartX = e.touches[0].screenX;
        }


       function handleTouchEnd(e) {
            // 터치 종료 시점의 X 좌표 저장
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            const swipeThreshold = 50;

            if (swipeDistance > swipeThreshold) {
                closeMenu();
            }
        }

        function handleResize() {
            if (!isMobileView()) {
                gnb.style.left = ''; // 데스크탑일 땐 기본 스타일로 복귀
            }
        }

        function addEventListeners() {
            hamBtn.addEventListener('click', openMenu);
            gnb.addEventListener('touchstart', handleTouchStart);
            gnb.addEventListener('touchend', handleTouchEnd);
            window.addEventListener('resize', handleResize);
        }

        addEventListeners();
    }

    initHam();
});