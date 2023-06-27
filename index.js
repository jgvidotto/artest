window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    //button.innerText = '﹖';
    staticLoadPlaces().then(places => {
        renderPlaces(places);
    }).catch(error => {
        console.error(error);
    });
};

function staticLoadPlaces() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                resolve([{
                    name: 'Pokèmon',
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                }]);
            }, error => {
                reject(error);
            });
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
        
    });
}

var models = [
    {
        url: './Assets/avocado/Avocado.gltf',
        scale: '10 10 10',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '90 0 0',
    },
    {
        url: './Assets/articuno/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './Assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
        console.log(model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}