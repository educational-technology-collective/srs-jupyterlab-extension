import { URLExt } from '@jupyterlab/coreutils';

// import { ServerConnection } from '@jupyterlab/services';

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
// export async function requestAPI<T>(
//   endPoint = '',
//   init: RequestInit = {}
// ): Promise<T> {
//
//   // Make request to Jupyter API
//   const settings = ServerConnection.makeSettings();
//   const requestUrl = URLExt.join(
//     settings.baseUrl,
//     'srs-jupyterlab-extension', // API Namespace
//     endPoint
//   );
//
//   let response: Response;
//   try {
//     response = await ServerConnection.makeRequest(requestUrl, init, settings);
//   } catch (error) {
//     throw new ServerConnection.NetworkError(error as any);
//   }
//
//   let data: any = await response.text();
//
//   if (data.length > 0) {
//     try {
//       data = JSON.parse(data);
//     } catch (error) {
//       console.log('Not a JSON response body.', response);
//     }
//   }
//
//   if (!response.ok) {
//     throw new ServerConnection.ResponseError(response, data.message || data);
//   }
//
//   return data;
// }

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
export async function requestAPI<T>(
  endPoint = '',
  init: RequestInit = {}
): Promise<T> {

  // Make request to Jupyter API
  const settings = {
    baseUrl: "http://127.0.0.1:5000", // specify the new base URL
    // add any additional settings needed
  };

  const requestUrl = URLExt.join(
    settings.baseUrl,
    endPoint
  );

  let response: Response;
  try {
    response = await fetch(requestUrl, init); // use fetch instead of ServerConnection.makeRequest
  } catch (error) {
    throw new Error(`Network Error: ${error}`);
  }

  let data: any = await response.text();

  if (data.length > 0) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log('Not a JSON response body.', response);
    }
  }

  if (!response.ok) {
    throw new Error(`Response Error: ${data.message || data}`);
  }

  return data;
}
