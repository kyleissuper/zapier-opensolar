const { BASE_URL } = require('../constants');

const matchingFields = async (z, bundle) => {
  if (bundle.inputData.findBy == 'Email') {
    return [
      {
        key: 'email',
        label: 'Email',
        required: true
      },
    ];
  } else if (bundle.inputData.findBy == 'OpenSolar ID') {
    return [
      {
        key: 'openSolarId',
        label: 'Open Solar Contact ID',
        required: true
      },
    ];
  }
};

const findContactByEmail = async (z, bundle) => {
  const email = bundle.inputData.email.toLowerCase();
  const contacts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await z.request({
      url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/contacts/`,
      skipThrowForStatus: true,
      method: 'GET',
      params: { page },
    });

    if (response.status !== 200 || !response.json.length) {
      hasMore = false;
      break;
    }

    contacts.push(...response.json.filter(c => c.email && c.email.toLowerCase() === email));
    page++;
  }

  return contacts;
};

const findContactByOpenSolarId = async (z, bundle) => {
  const response = await z.request({
    url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/contacts/${bundle.inputData.openSolarId}`,
    method: 'GET',
  })
};

const perform = async (z, bundle) => {
  if (bundle.inputData.email) {
    return await findContactByEmail(z, bundle);
  } else {
    return await findContactByOpenSolarId(z, bundle);
  }
};

module.exports = {
  display: {
    description: 'Find contact in OpenSolar',
    hidden: false,
    label: 'Find Contact',
  },
  key: 'find_contact',
  noun: 'Contact',
  operation: {
    inputFields: [
      {
        key: 'findBy',
        label: 'Find By',
        type: 'string',
        choices: ['Email', 'OpenSolar ID'],
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      matchingFields,
    ],
    perform,
  },
};
