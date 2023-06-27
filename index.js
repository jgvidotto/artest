if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(`Latitude: ${position.coords.latitude}`);
        console.log(`Longitude: ${position.coords.longitude}`);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}