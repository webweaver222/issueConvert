interface postParams {
  client_id: string;
  client_secret: string;
  code: string;
}

export default class TestifyApi {
  _base = "http://localhost:3000";

  getToken = async (body: postParams, path: string) => {
    return fetch(this._base + path, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
}
