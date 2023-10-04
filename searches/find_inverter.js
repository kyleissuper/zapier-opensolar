const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/component_inverter_activations/${bundle.inputData.id}/`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find inverter in OpenSolar',
    hidden: false,
    label: 'Find Inverter',
  },
  key: 'find_inverter',
  noun: 'Inverter',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Inverter Activations ID',
        type: 'string',
        helpText: 'Use the Inverter Activations ID from your Project',
        required: true,
      },
    ],
    perform,
  },
};
