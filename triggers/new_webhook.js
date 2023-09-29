const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performUnsubscribe = async (z, bundle) => {
  const fields = {
    Project: ['project.*'],
    Event: ['event.*'],
    Contact: ['contact.*'],
  }[bundle.inputData.object_type];

  const options = {
    url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/webhooks/${bundle.subscribeData.id}`,
    method: 'PATCH',
    body: {
      enabled: false,
      endpoint: bundle.targetUrl,
      trigger_fields: fields,
      payload_fields: fields,
      debug: false,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    return response.json;
  });
};

const performSubscribe = async (z, bundle) => {
  const fields = [];

  for (const object_type of bundle.inputData.object_types) {
    fields.push({
      Project: 'project.*',
      Event: 'event.*',
      Contact: 'contact.*',
    }[object_type]);
  }

  const options = {
    url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}/webhooks/`,
    method: 'POST',
    body: {
      enabled: true,
      endpoint: bundle.targetUrl,
      trigger_fields: fields,
      payload_fields: fields,
      debug: false,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    return response.json;
  });
};

module.exports = {
  operation: {
    perform,
    type: 'hook',
    performUnsubscribe,
    performSubscribe,
    inputFields: [
      {
        key: 'object_types',
        type: 'string',
        label: 'Object Types',
        choices: ['Project', 'Contact', 'Event'],
        required: true,
        list: true,
        altersDynamicFields: false,
      },
    ],
  },
  display: {
    description: 'New change webhook from OpenSolar',
    hidden: false,
    label: 'New Changes',
  },
  key: 'new_webhook',
  noun: 'Change',
};
