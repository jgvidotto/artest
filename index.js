window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';
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
        url: './Assets/magnemite/scene.gltf',
        scale: '0.1 0.1 0.1',
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        url: './Assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        animation:'Take 001',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './Assets/dragonite/scene.gltf',
        scale: '0.01 0.01 0.01',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
        console.log(model.position);
    }

    if (model.animation) {
        entity.setAttribute('animation-mixer', {clip: model.animation});
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

        let outerEntity = document.createElement('a-entity');
        outerEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        let modelEntity = document.createElement('a-entity');
        setModel(models[modelIndex], modelEntity);

        modelEntity.setAttribute('animation-mixer', '');
        modelEntity.setAttribute("look-at", "[gps-new-camera]");

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], modelEntity);
        });

        outerEntity.appendChild(modelEntity);
        scene.appendChild(outerEntity);
    });
}