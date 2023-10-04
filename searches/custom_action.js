const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: bundle.inputData.endpoint.slice(0, 8).toLowerCase() === 'https://'
        ? bundle.inputData.endpoint
        : `${BASE_URL}/api/orgs/${bundle.authData.orgId}/component_inverter_activations/${bundle.inputData.endpoint}/`,
      method: bundle.inputData.method,
    });
  return response.json;
};

module.exports = {
  display: {
    description: 'Custom action in OpenSolar',
    hidden: false,
    label: 'Custom API action',
  },
  key: 'custom_action',
  noun: 'Custom Action',
  operation: {
    inputFields: [
      {
        key: 'endpoint',
        label: 'Endpoint',
        type: 'string',
        helpText: `This will be appended to ${BASE_URL}/api/orgs/{org_id}, or provide entire URL to override default behavior`,
        required: true,
      },
      {
        key: 'method',
        label: 'Method',
        type: 'string',
        required: true,
        choices: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      }
    ],
    perform,
  },
};
