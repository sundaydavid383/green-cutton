const axios = require('axios');

exports.getPreferredCurrency = async (req) => {
  try {
    const geoResponse = await axios.get('http://ip-api.com/json');
    const country = geoResponse.data.country;

    let preferredCurrency = 'NGN'; // Default to NGN
    if (country !== 'Nigeria') {
      preferredCurrency = 'USD'; // or another currency
    }

    return preferredCurrency;
  } catch (err) {
    console.error("Error getting preferred currency:", err);
    return 'NGN'; // Default to NGN if error occurs
  }
};