const authentication = require('./authentication');
const newWebhookTrigger = require('./triggers/new_webhook.js');
const findContactSearch = require('./searches/find_contact.js');
const findProjectSearch = require('./searches/find_project.js');
const findSystemSearch = require('./searches/find_system.js');
const findSystemDetailsSearch = require('./searches/find_system_details.js');
const findRoleSearch = require('./searches/find_role.js');
const findCostingSearch = require('./searches/find_costing.js');
const findPaymentOptionsSearch = require('./searches/find_payment_options.js');
const contact = require('./creates/contact.js');
const project = require('./creates/project.js');

const addHeader = (request, z, bundle) => {
  request.headers['Content-Type'] = 'application/json';
  const authToken = bundle.authData.sessionKey;
  request.headers['Authorization'] = authToken ? `Bearer ${authToken}`: undefined;
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  beforeRequest: [addHeader],
  searches: {
    [findContactSearch.key]: findContactSearch,
    [findProjectSearch.key]: findProjectSearch,
    [findRoleSearch.key]: findRoleSearch,
    [findSystemSearch.key]: findSystemSearch,
    [findSystemDetailsSearch.key]: findSystemDetailsSearch,
    [findCostingSearch.key]: findCostingSearch,
    [findPaymentOptionsSearch.key]: findPaymentOptionsSearch,
  },
  triggers: { 
    [newWebhookTrigger.key]: newWebhookTrigger,
  },
  creates: {
    [contact.key]: contact,
    [project.key]: project
  }
};
