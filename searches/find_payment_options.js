const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/payment_options/${bundle.inputData.id}/`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find payment options in OpenSolar',
    hidden: false,
    label: 'Find Payment Options',
  },
  key: 'find_payment_options',
  noun: 'Payment Options',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Payment Options ID',
        type: 'string',
        required: true,
      },
    ],
    perform,
  },
};
