const { config } = require('./config');
const  CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

async function getPersonalizer() {
    const credentials = new CognitiveServicesCredentials(config.personalizer_api_key);
    // Initialize Personalization client.
    return new Personalizer.PersonalizerClient(credentials, config.personalizer_endpoint);
}

module.exports = { getPersonalizer };