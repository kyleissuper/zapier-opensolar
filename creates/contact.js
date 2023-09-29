const { BASE_URL } = require('../constants');

module.exports = {
  key: 'contact',
  noun: 'Contact',
  display: {
    label: 'Create or Update Contact',
    description: 'Creates or Updates a contact in OpenSolar'
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        helpText: 'If included, contact will be updated'
      },
      { key: 'email', type: 'string' },
      { key: 'phone', type: 'string' },
      { key: 'first_name', type: 'string' },
      { key: 'middle_name', type: 'string' },
      { key: 'family_name', type: 'string' }
    ],
    perform: (z, bundle) => {
      const { id, ...requestBody } = bundle.inputData;
      const isUpdating = Boolean(id);

      const endpoint = isUpdating
        ? `/api/orgs/${bundle.authData.orgId}/contacts/${id}/`
        : `/api/orgs/${bundle.authData.orgId}/contacts/`;

      const options = {
        url: `${BASE_URL}${endpoint}`,
        method: isUpdating ? 'PUT' : 'POST',
        body: requestBody,
      };

      return z.request(options).then((response) => response.data);
    }
  }
};
