
    function loaded() {
        document.body.querySelector('#buttonOpenAsideFilters')?.addEventListener('click', () => openAside('asideFilters'))
        document.body.querySelector('#buttonCloseAsideFilters')?.addEventListener('click', () => closeAside('asideFilters'))

        document.body.querySelector('#buttonOpenAsideProfile')?.addEventListener('click', () => openAside('asideProfile'))
        document.body.querySelector('#closeAsideProfile')?.addEventListener('click', () => closeAside('asideProfile'))

        document.body.querySelector('#buttonOpenNavigationMobile')?.addEventListener('click', openNavigationMobile)
        document.body.querySelector('#buttonCloseNavigationMobile')?.addEventListener('click', closeNavigationMobile)
        document.body.querySelector('#buttonCloseCatalog')?.addEventListener('click', closeCatalog)

        document.body.querySelector('#buttonOpenContactsModal')?.addEventListener('click', openContactsModal)

        const buttonCatalogMenu = document.body.querySelector('#buttonCatalogMenu')
        buttonCatalogMenu?.addEventListener('click', openCatalog)
        buttonCatalogMenu?.addEventListener('mouseenter', openCatalog)
        buttonCatalogMenu?.addEventListener('mouseleave', catalogButtonMouseLeave)

        window.addEventListener('resize', closeAll)
        const headerHeight = document.body.querySelector('.app-header')?.clientHeight ?? 0;
        const breadcrumbsHeight = document.body.querySelector('.app-breadcrumbs')?.clientHeight ?? 0;
        document.body.style.setProperty('--header-height', (`${headerHeight + breadcrumbsHeight}px`))

        const sliderSections = document.body.querySelectorAll(".range-slider")
        if (sliderSections.length) {
            for (let x = 0; x < sliderSections.length; x++) {
                let sliders = sliderSections[x].getElementsByTagName("input");
                for (let y = 0; y < sliders.length; y++) {
                    if (sliders[y].type === "range") {
                        sliders[y].oninput = () => getValuesRange(sliders[y]);
                        // Manually trigger event first time to display values
                        sliders[y].oninput();
                    }
                }
            }
        }
    }

    function getHeaderHeight() {
        const headerHeight = document.body.querySelector('.header-top').clientHeight || 0;
        document.body.style.setProperty('--header-height', (`${headerHeight}px`))
    }

    function openAside(idAside) {
        const elementAside = document.body.querySelector(`#${idAside}`)
        getHeaderHeight()
        closeNavigationMobile()
        elementAside.classList.add('-show');
        setTimeout(() => {
            elementAside.classList.add('-open');
        }, 10)
    }
    function closeAside(idAside) {
        let elementAside = null
        if (idAside) {
            elementAside = document.body.querySelector(`#${idAside}`)
        } else {
            elementAside = document.body.querySelector('.aside.-open.-show')
        }
        if (elementAside) {
            elementAside.classList.remove('-open');
            setTimeout(() => {
                elementAside.classList.remove('-show');
            }, 250)
        }

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
        document.body.querySelector('#catalog')?.classList.add('-show')
        document.body.querySelector('#buttonCatalogMenu')?.classList.add('-active')
    }

    function trackCursorOnCatalog(event) {
        const catalogContent = document.body.querySelector('.app-catalog')
        if (catalogContent && !isCursorOnElem(event, catalogContent)) {
            closeCatalog()
        }
    }

    function closeCatalog() {
        const catalog = document.body.querySelector('#catalog')
        if (catalog) {
            catalog.classList.remove('-show')
            document.body.querySelector('.button-accent.-active')?.classList?.remove('-active')
            document.body.removeEventListener('mousemove', trackCursorOnCatalog)
        }
    }
    function catalogButtonMouseLeave(event) {
        setTimeout(() => {
            document.body.addEventListener( 'mousemove', trackCursorOnCatalog)
        }, 200)
    }

    function openNavigationMobile() {
        document.body.classList.add('--hidden');
        getHeaderHeight()
        closeAside()

        const elementNavigationWrap = document.body.querySelector('#navigationWrap');
        const elementNavigationContent = document.body.querySelector('#navigationMobile');
        elementNavigationWrap.classList.add('-show');
        elementNavigationContent.classList.add('-show');
        setTimeout(() => {
            elementNavigationWrap.classList.add('-open');
            elementNavigationContent.classList.add('-move');
        }, 20)
    }

    function closeNavigationMobile() {
        closeCatalog()
        const elementNavigationWrap = document.body.querySelector('#navigationWrap');
        const elementNavigationContent = document.body.querySelector('#navigationMobile');

        if (elementNavigationWrap && elementNavigationContent) {
            elementNavigationWrap.classList.remove('-open');
            elementNavigationContent.classList.remove('-move');
            setTimeout(() => {
                elementNavigationWrap.classList.remove('-show');
                elementNavigationContent.classList.remove('-show');
                document.body.classList.remove('--hidden');
            }, 500)
        }
    }

    function getValuesRange(slider){
        // Get slider values
        let parent = slider.parentElement
        let slides = parent.getElementsByTagName("input");
        let slide1 = parseFloat( slides[0].value );
        let slide2 = parseFloat( slides[1].value );
        // Neither slider will clip the other, so make sure we determine which is larger
        if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

        const displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = "от " + slide1.toLocaleString() + " до " + slide2.toLocaleString();
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
        unit.textContent = transChoose(Number(event.target.value), ['человек', 'человека', 'человек']);
    }

    function openContactsModal() {
        console.debug('************** click openContactsModal')
        const template = document.body.querySelector('#formContacts');
        if (template) {
            const clone = template.content.cloneNode(true);
            openModal(clone);
        }
    }

    function openModal(clone) {
        const elementModal = document.body.querySelector('#modal');
        if (elementModal) {
            const elementModalOuter = elementModal.querySelector('#modalOuter');
            const modalContent = elementModal.querySelector('#modalContent');
            elementModal.querySelector('#buttonModalClose')?.addEventListener('click', closeModal)

            document.body.classList.add('--hidden');
            elementModalOuter.addEventListener('click', closeModal);
            modalContent.appendChild(clone);
            elementModal.classList.add('-show');
            setTimeout(() => {
                elementModal.classList.add('-animate');
            }, 20)
        }
    }

    function closeModal() {
        const elementModal = document.body.querySelector('#modal');
        if (elementModal) {
            elementModal.classList.remove('-animate');
            setTimeout(() => {
                elementModal.classList.remove('-show');
                document.body.classList.remove('--hidden');
            }, 500)
            setTimeout(() => {
                const modalContent = document.body.querySelector('#modalContent');
                modalContent.innerHTML = '';
            }, 800)
        }
    }

    function closeAll() {
        closeNavigationMobile()
        closeModal()
        closeAside()
    }







