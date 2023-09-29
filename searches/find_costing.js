const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/costings/${bundle.inputData.id}/`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find costings in OpenSolar',
    hidden: false,
    label: 'Find Costings',
  },
  key: 'find_costing',
  noun: 'Costing',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Costing ID',
        type: 'string',
        required: true,
      },
    ],
    perform,
  },
};
