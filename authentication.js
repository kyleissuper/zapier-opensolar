const { BASE_URL } = require('./constants');

const getHeaders = (authToken) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`,
});

const test = async (z, bundle) => {
  const response = await z.request({
    url: `${BASE_URL}/api/orgs/${bundle.authData.orgId}`,
    method: 'GET',
    headers: getHeaders(bundle.authData.sessionKey),
  });
  return response.json;
};

const renewToken = async (z, bundle) => {
  const response = await z.request({
    url: `${BASE_URL}/api-token-auth/`,
    method: 'POST',
    body: {
      username: bundle.authData.username,
      password: bundle.authData.password,
    }
  });

  if (response.status !== 200) {
    throw new Error('Authentication failed');
  }

  const results = response.json;

  await z.request({
    url: `${BASE_URL}/auth/users/${results.user.id}/`,
    method: 'PATCH',
    headers: getHeaders(results.token),
    body: {
      is_machine_user: true,
    }
  });

  return results;
};

const perform = async (z, bundle) => {
  try {
    await test(z, bundle);
    return {
      sessionKey: bundle.authData.sessionKey,
      orgId: bundle.authData.orgId,
    }
  } catch (error) {
    const results = await renewToken(z, bundle);
    return {
      sessionKey: results.token,
      orgId: results.org_id,
    };
  }
};

module.exports = {
  type: 'session',
  test,
  fields: [
    {
      computed: false,
      key: 'username',
      required: true,
      label: 'Username',
      type: 'string',
    },
    {
      computed: false,
      key: 'password',
      required: true,
      label: 'Password',
      type: 'password',
    },
  ],
  sessionConfig: { perform },
  connectionLabel: '{{bundle.authData.username}}',
};
