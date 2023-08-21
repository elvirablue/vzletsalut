
    function loaded() {
        window.addEventListener('resize', closeNavigationMobile)
        const headerHeight = document.querySelector('.app-header')?.clientHeight ?? 0;
        const breadcrumbsHeight = document.querySelector('.app-breadcrumbs')?.clientHeight ?? 0;
        document.body.style.setProperty('--header-height', (`${headerHeight + breadcrumbsHeight}px`))

    }

    function isCursorOnElem( event, elem ){
        const mouseX = event.clientX
        const mouseY = event.clientY
        const rect = elem.getBoundingClientRect()

        return (
                mouseX > rect.x && mouseX < rect.right
                &&
                mouseY > rect.y && mouseY < rect.bottom
        )
    }

    function openCatalog() {
    console.debug('openCatalog')
        const catalog = document.body.querySelector('#catalog')
        const catalogButton = document.body.querySelector('#catalogButton')
        catalog.classList.add('-show')
        catalogButton.querySelector('.app-navigation__button').classList.add('-active')
    }

    function trackCursorOnCatalog(event) {
        const catalogContent = document.body.querySelector('.app-catalog')
        if (catalogContent && !isCursorOnElem(event, catalogContent)) {
            closeCatalog()
        }
    }

    function closeCatalog() {
        console.debug('closeCatalog')
        const catalog = document.body.querySelector('#catalog')
        catalog.classList.remove('-show')
        document.body.querySelector('.app-navigation__button.-active')?.classList?.remove('-active')
        document.body.removeEventListener( 'mousemove', trackCursorOnCatalog)
    }
    function catalogButtonMouseLeave(event) {
        setTimeout(() => {
            document.body.addEventListener( 'mousemove', trackCursorOnCatalog)
        }, 200)
    }

    //function toggleNavigation(event) {
    //    const target = event.currentTarget;
    //    if (target.classList.contains('-open')) {
    //        closeNavigation()
    //    } else {
    //        openNavigation()
    //    }
    //}

    function openNavigationMobile() {
        document.body.classList.add('--hidden');

        const headerHeight = document.querySelector('.header-top').clientHeight || 0;
        const elementNavigationWrap = document.querySelector('#navigationWrap');
        const elementNavigationContent = document.querySelector('#navigationMobile');
        document.body.style.setProperty('--header-height', (`${headerHeight}px`))
        elementNavigationWrap.classList.add('-show');
        elementNavigationContent.classList.add('-show');
        setTimeout(() => {
            elementNavigationWrap.classList.add('-open');
            elementNavigationContent.classList.add('-move');
        }, 20)
    }

    function closeNavigationMobile() {
        closeCatalog()
        const elementNavigationWrap = document.querySelector('#navigationWrap');
        elementNavigationWrap.classList.remove('-open');
        const elementNavigationContent = document.querySelector('#navigationMobile');
        elementNavigationContent.classList.remove('-move');
        setTimeout(() => {
            elementNavigationWrap.classList.remove('-show');
            elementNavigationContent.classList.remove('-show');
            document.body.classList.remove('--hidden');
        }, 500)



    }

    /* Функция предназначена для склонения слов используемых вместе с числительными
    * @param number (Number) - число
    * @param words (Array) - 3 слова соответствующие числительным (1, 2, 10)
    * @return string - 1 слово, соответствующее числу
    */
    function transChoose (number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function changeInputNumber(event) {
        const unit = event.target.nextElementSibling;
        console.debug(unit, event.target.value)
        unit.textContent = transChoose(Number(event.target.value), ['человек', 'человека', 'человек']);
    }

    function openPopupBuyTicket() {
        const template = document.querySelector('#formBuyTicket');
        const clone = template.content.cloneNode(true);
        openPopup(clone);
    }

    function openPopup(clone) {
        document.body.classList.add('--hidden');
        const elementPopup = document.querySelector('#popup');
        const popupContent = document.querySelector('#popupContent');
        const headerPopup = elementPopup.querySelector('.app-popup__header')
        popupContent.appendChild(clone);
        elementPopup.style.setProperty('--popup-header-height', (headerPopup?.clientHeight ?? 0).toString() + 'px');
        elementPopup.classList.add('-show');
        setTimeout(() => {
            elementPopup.classList.add('-animate');
        }, 20)
    }

    function submitFormBuyTicket(event) {
        event.preventDefault();
        const popupContent = document.querySelector('#popupContent');
        const form = popupContent.querySelector('.form');
        form.classList.add('-hide');
        setTimeout(() => {
            form.style.display = 'none';
            popupContent.querySelector('#formSuccess').classList.add('-show');
        }, 200)
    }

    function closePopup() {
        const elementPopup = document.querySelector('#popup');
        elementPopup.classList.remove('-animate');
        setTimeout(() => {
            elementPopup.classList.remove('-show');
            document.body.classList.remove('--hidden');
        }, 500)
        setTimeout(() => {
            const popupContent = document.querySelector('#popupContent');
            popupContent.innerHTML = '';
        }, 800)
    }







