const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/systems/${bundle.inputData.id}/`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find systems in OpenSolar',
    hidden: false,
    label: 'Find Systems',
  },
  key: 'find_system',
  noun: 'System',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'System ID',
        type: 'string',
        required: true,
      },
    ],
    perform,
  },
};
