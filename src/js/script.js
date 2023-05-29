/* DATE */
const time = setInterval(function () {
    let date = new Date();

    date.setHours(date.getHours() - 6)

    document.getElementById("time").innerHTML = ('UTC: ' + getZero(date.getHours()) + ":" + getZero(date.getMinutes()) + ":" + getZero(date.getSeconds()));
}, 1000);


function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

/* TABS */
const tabsParent = document.querySelector('.main__tabs__wrapper')
const tabs = document.querySelectorAll('.main__tabs__item')
const tabsContent = document.querySelectorAll('.tab-content')

function hideTabsContent() {
    tabsContent.forEach((item) => {
        item.style.cssText = 'display: none;';
    })

    tabs.forEach((item) => {
        item.classList.remove('main__tabs__item_active');
    })
}

function showTabContent(i = 0) {
    tabsContent[i].style.cssText = 'display: flex;';
    tabs[i].classList.add('main__tabs__item_active');
}

hideTabsContent();
showTabContent();

tabsParent.addEventListener('click', (e) => {
    if (e.target && e.target.matches('div.main__tabs__item')) {
        tabs.forEach((item, i) => {
            if (e.target == item) {
                hideTabsContent();
                showTabContent(i);
            }
        })
    }
});

const startSimulationBTN = document.querySelector('.tab-content__button'),
    modalOvelay = document.querySelector('.overlay'),
    modalWindow = document.querySelector('.modal'),
    modalClose = document.querySelector('.modal__cross'),
    cities = document.querySelectorAll('[data-city]'),
    maps = document.querySelectorAll('[data-map]'),
    gifs = document.querySelectorAll('[data-simpic]'),
    modalText = document.querySelector('.modal__text')

// console.log(cities)
// console.log(maps)
// console.log(gifs)

startSimulationBTN.addEventListener('click', () => {
    openModal()
    activeGifs = []
    activeMaps = []

    let gifSelector;
    let mapSelector;

    cities.forEach((item, i) => {
        if (item.checked == true) {
            gifSelector = i
            activeGifs.push(item.checked)
        }
    })
    maps.forEach((item, i) => {
        if (item.checked == true) {
            mapSelector = i
            activeMaps.push(item.checked)
        }
    })

    // GIFS 
    const sumG = activeGifs.reduce((partialSum, a) => partialSum + a, 0);
    if (sumG < 1) {
        hideAllGifs()
        modalText.innerHTML = 'Для начала моделирования выберите аэропорт города.'
    }
    if (sumG > 1) {
        hideAllGifs()
        modalText.innerHTML = 'Вы не можете выбрать более одного городского аэропорта.<br>Для начала моделирования выберите только один.'
    };

    // MAPS 
    const sumM = activeMaps.reduce((partialSum, a) => partialSum + a, 0);
    if (sumM < 1) {
        hideAllGifs()
        modalText.innerHTML = 'Для начала моделирования выберите хотябы одну карту.'
    }
    if (sumM > 1) {
        hideAllGifs()
        modalText.innerHTML = 'Вы не можете выбрать более одной анимации.<br>Для начала моделирования выберите только одну карту.'
    };

    if (sumG == 1 & sumM == 1) {
        showGif(gifSelector, mapSelector)
    }

})

modalClose.addEventListener('click', () => {
    closeModal()
})

window.addEventListener('click', (e) => {
    if (e.target == modalOvelay) {
        closeModal()
    }
});

function openModal() {
    modalOvelay.style.display = 'block'
    modalWindow.classList.add('modal__active')

    // modal scroll lock
    // document.body.style.overflow = 'hidden'
}

function closeModal() {
    modalOvelay.style.display = 'none'
    hideAllGifs()

    modalWindow.classList.remove('modal__active')
    modalText.innerHTML = ''

    // modal scroll unlock
    // document.body.style.overflow = ''
}

function hideAllGifs() {
    gifs.forEach(item => {
        item.firstElementChild.style.display = 'none'
        item.lastElementChild.style.display = 'none'
    })
}
function showGif(airport, map) {
    gifs[airport].children[map].style.display = 'block'
}

// showGif(0, 1)




































// const animation = document.getElementById('animation');
// const atclinks = document.getElementById('atclinks');
// const flightplan = document.getElementById('flightplan');
// const metar = document.getElementById('metar');
// if (e.target.id === '1'){
//     animation.classList.remove('disabled');
//     atclinks.classList.add('disabled');
//     flightplan.classList.add('disabled');
//     metar.classList.add('disabled');
// }else if (e.target.id === '2'){
//     atclinks.classList.remove('disabled');
//     animation.classList.add('disabled');
//     flightplan.classList.add('disabled');
//     metar.classList.add('disabled');
// }else if (e.target.id === '3'){
//     flightplan.classList.remove('disabled');
//     animation.classList.add('disabled');
//     atclinks.classList.add('disabled');
//     metar.classList.add('disabled');
// }else if (e.target.id === '4'){
//     metar.classList.remove('disabled');
//     animation.classList.add('disabled');
//     atclinks.classList.add('disabled');
//     flightplan.classList.add('disabled');
// }


