window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSectionSpan = document.querySelector('.degree-section span');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.location-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d73304c6dff4c8fa9f09209197f0cc96`;
            fetch(api).then(data => {
                return data.json();
            }).then(result => {
                const { temp } = result.main;
                const { description, icon } = result.weather[0];
                // const { sunrise, sunset } = result.sys;
                //Set DOM elements from API
                temperatureDegree.textContent = convertToCelcius(temp);
                temperatureDescription.textContent = description[0].toUpperCase() + description.substr(1);
                locationTimezone.textContent = result.name;
                //set icon
                locationIcon.src = setIcon(icon);

                //Change temp to Celcius
                degreeSection.addEventListener('click', () => {
                    if (degreeSectionSpan.textContent === "°C") {
                        degreeSectionSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.round(convertToFahrenhit(temp));
                    } else {
                        degreeSectionSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.round(convertToCelcius(temp));
                    }
                });

            })
        });
    } else {
        temperatureDescription.textContent = "Please Allow Location Access";
    }

    function setIcon(icon) {
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        return iconUrl;
    }
    function convertToCelcius(tempInKelvin) {
        return (tempInKelvin - 273.15);
    }
    function convertToFahrenhit(tempInKelvin) {
        return (tempInKelvin - 273.15) * (9 / 5) + 32;
    }
});