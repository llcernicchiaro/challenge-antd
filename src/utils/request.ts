/** Request api: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage: Record<number, string> = {
  200: 'The server successfully returns the requested data.',
  201: 'New or modified data successfully.',
  202: 'A request has been queued task (asynchronous) into the background.',
  204: 'Delete the data successfully.',
  400: 'Server requests from incorrect. No new or modified data operation.',
  401: 'Users do not have permissions (token, the user name and password error).',
  403: 'The user has the authority, but access is prohibited.',
  404: 'The user has the authority, but access is prohibited.',
  406: 'If I cannot get the requested format.',
  410: "Requested resource is permanently deleted, and won't get.",
  422: 'When creating an object, a validation error occurs.',
  500: 'Server error, please check the server.',
  502: 'Gateway error.',
  503: 'Service is not available, the server is temporarily overloading or maintain.',
  504: 'Gateway timeout.',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network anomalies, unable to connect to the server',
      message: 'Network anomalies',
    });
  }
  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

export default request;
