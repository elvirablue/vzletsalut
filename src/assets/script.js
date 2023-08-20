
    function loaded() {
        const catalogButton = document.body.querySelector('#catalogButton');
        catalogButton.addEventListener('mouseenter', openCatalog)
        catalogButton.addEventListener('mouseleave', catalogButtonMouseLeave)
        window.addEventListener('resize', closeNavigation)
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
        const catalog = document.body.querySelector('#catalog')
        const catalogButton = document.body.querySelector('#catalogButton')
        catalog.classList.add('-show')
        catalogButton.querySelector('.app-navigation__button').classList.add('-active')
    }

    function trackCursorOnCatalog(event) {
        const catalogContent = document.body.querySelector('.app-catalog')
        if (catalogContent && !isCursorOnElem(event, catalogContent)) {
            document.body.removeEventListener( 'mousemove', trackCursorOnCatalog)
            closeCatalog()
        }
    }
    function closeCatalog() {
        const catalog = document.body.querySelector('#catalog')
        catalog.classList.remove('-show')
        document.body.querySelector('.app-navigation__button.-active')?.classList?.remove('-active')
    }
    function catalogButtonMouseLeave(event) {
        setTimeout(() => {
            document.body.addEventListener( 'mousemove', trackCursorOnCatalog)
        }, 200)
    }

    function toggleNavigation(event) {
        const target = event.currentTarget;
        if (target.classList.contains('-open')) {
            closeNavigation()
        } else {
            openNavigation()
        }
    }

    function openNavigation() {
        const elementHamburger = document.body.querySelector('#hamburgerMenu');
        elementHamburger.classList.add('-open');
        document.body.classList.add('--hidden');

        const elementNavigation = document.querySelector('#navigation');
        elementNavigation.classList.add('-show');
        setTimeout(() => {
            elementNavigation.classList.add('-open');
        }, 20)

        const elementHeaderActions = document.querySelector('#headerActions');
        elementHeaderActions.classList.add('-move');
    }

    function closeNavigation() {
        const elementHamburger = document.body.querySelector('#hamburgerMenu');
        elementHamburger.classList.remove('-open');

        const elementHeaderActions = document.querySelector('#headerActions');
        elementHeaderActions.classList.remove('-move');

        const elementNavigation = document.querySelector('#navigation');
        elementNavigation.classList.remove('-open');
        setTimeout(() => {
            elementNavigation.classList.remove('-show');
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







