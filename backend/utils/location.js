const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );

  const data = response.data;

  if (!data || data.length === 0) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const firstResult = data[0];
  const longitude = parseFloat(firstResult.lon);
  const latitude = parseFloat(firstResult.lat);

  return { lat: latitude, lng: longitude };
}

module.exports = getCoordsForAddress;
