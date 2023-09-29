const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/projects/${bundle.inputData.id}/systems/details/`,
      method: 'GET',
    });
  return [response.json];
};

module.exports = {
  display: {
    description: 'Find system details in OpenSolar',
    hidden: false,
    label: 'Find System Details',
  },
  key: 'find_system_details',
  noun: 'System Details',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Project ID',
        type: 'string',
        required: true,
      },
    ],
    perform,
  },
};
