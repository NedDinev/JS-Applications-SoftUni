function attachEvents() {
  const locationInput = document.getElementById("location");
  const submit = document.getElementById("submit");
  const symbolsEnum = {
    Sunny: "&#x2600;", // ☀
    "Partly sunny": "&#x26C5;", // ⛅
    Overcast: "&#x2601;", // ☁
    Rain: "&#x2614;", // ☂
    Degrees: "&#176;", // °
  };

  submit.addEventListener("click", submitLocation);

  async function submitLocation() {
    const forecast = document.getElementById("forecast");
    const current = document.getElementById("current");
    const upcoming = document.getElementById("upcoming");
    const currLocationInput = locationInput.value;
    const locationsResponse = await fetch(
      `http://localhost:3030/jsonstore/forecaster/locations`
    );
    let locationsData = await locationsResponse.json();
    /*locationsData returns :
    { 
        name: locationName,
        code: locationCode
      }
*/
    let locationCode = "error";
    for (const locationInfo of locationsData) {
      if (locationInfo.name == currLocationInput) {
        locationCode = locationInfo.code;
      }
    }
    if (locationCode == "error" || locationsResponse.ok == false) {
      //If location code not found
      forecast.style.display = "block";
      current.innerHTML = `<div class="label">Error</div>`;
      upcoming.innerHTML = `<div class="label">Three-day forecast</div>`;
      return;
    }

    let todayResponse = await fetch(
      `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`
    );
    let todayData = await todayResponse.json();
    /*todayData returns:
    { 
  name: locationName,
  forecast: { low: temp,
              high: temp,
              condition: condition } 
}
 */
    current.innerHTML = `<div class="label">Current conditions</div>`;
    const forecasts = document.createElement("div");
    forecasts.classList.add("forecasts");
    forecasts.innerHTML = `
    <span class="condition symbol">${
      symbolsEnum[todayData.forecast.condition]
    }</span>
    <span class="condition">
    <span class="forecast-data">${todayData.name}</span>
    <span class="forecast-data">${todayData.forecast.low}${
      symbolsEnum.Degrees
    }/${todayData.forecast.high}${symbolsEnum.Degrees}</span>
    <span class="forecast-data">${todayData.forecast.condition}</span>
</span>
    `;
    current.appendChild(forecasts);
    forecast.style.display = "block";

    const upcomingResponse = await fetch(
      `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`
    );
    const upcomingData = await upcomingResponse.json();
    /*upcomingData returns:
     { 
  name: locationName,
  forecast: [{ low: temp,
               high: temp,
               condition: condition }, … ] 
}
*/
    upcoming.innerHTML = `<div class="label">Three-day forecast</div>`;
    const forecastInfo = document.createElement("div");
    forecastInfo.classList.add("forecast-info");
    upcomingData.forecast.forEach((obj) => {
      forecastInfo.innerHTML += `<span class="upcoming">
      <span class="symbol">${symbolsEnum[obj.condition]}</span>
      <span class="forecast-data">${obj.low}${symbolsEnum.Degrees}/${obj.high}${
        symbolsEnum.Degrees
      }</span>
      <span class="forecast-data">${obj.condition}</span>
      </span>`;
    });
    upcoming.appendChild(forecastInfo);
  }
}

attachEvents();
