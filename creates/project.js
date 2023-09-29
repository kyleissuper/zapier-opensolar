const { BASE_URL } = require('../constants');

module.exports = {
  key: 'project',
  noun: 'Project',
  display: {
    label: 'Update Project',
    description: 'Updates a project in OpenSolar'
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
      },
      { key: 'notes', type: 'string' },
    ],
    perform: (z, bundle) => {
      const { id, ...requestBody } = bundle.inputData;
      const options = {
        url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/projects/${bundle.inputData.id}/`,
        method: 'PATCH',
        body: requestBody,
      }
      return z.request(options).then((response) => response.data);
    }
  }
};
