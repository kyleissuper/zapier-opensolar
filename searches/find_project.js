const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/projects/${bundle.inputData.id}`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find project in OpenSolar',
    hidden: false,
    label: 'Find Project',
  },
  key: 'find_project',
  noun: 'Project',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        type: 'string',
        required: true,
      },
    ],
    perform,
  },
};
