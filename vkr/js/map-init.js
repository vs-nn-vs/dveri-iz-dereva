ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [56.484680, 84.948197], // Координаты Томска
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    var myPlacemark = new ymaps.Placemark([56.484680, 84.948197], {
        hintContent: 'ПСК Стройкаркас',
        balloonContent: 'Собственное производство дверей и лестниц'
    }, {
        preset: 'islands#darkGreenDotIcon'
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom'); // Чтобы карта не зумилась случайно при скролле
}