const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z
    .request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/roles/`,
      method: 'GET',
    });
  return [{"result": JSON.stringify(response.json)}];
};

module.exports = {
  display: {
    description: 'List roles in OpenSolar',
    hidden: false,
    label: 'List roles',
  },
  key: 'find_role',
  noun: 'Role',
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        type: 'string',
        required: false,
      }
    ],
    perform,
  },
};
