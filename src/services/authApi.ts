import config from "../../config";

export default class AuthApi {
  _base = `${location.protocol}//${location.hostname}/testifyapi`;

  _path = "/test/token";

  _client_id = config.client_id;

  _client_secret = config.client_secret;

  _auth_code_link =
    "https://github.com/login/oauth/authorize?client_id=" +
    this._client_id +
    "&login=" +
    "&scope=public_repo";

  openPopup = () =>
    window.open(this._auth_code_link, "GitHub OAuth", "width=500,height=500");

  getCode = (popup: Window, cb: CallableFunction) => {
    const pollTimer = setInterval(async function () {
      try {
        if (popup!.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup!.document.URL.includes(location.origin)) {
          window.clearInterval(pollTimer);

          const url = new URL(popup!.location.href);

          setTimeout(() => popup!.close(), 100);

          cb(url.searchParams.get("code"));
        }
      } catch (e) {
        console.log(e, "popup error");
      }
    }, 100);
  };

  getToken = async (code: string) => {
    return fetch(this._base + this._path, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this._client_id,
        client_secret: this._client_secret,
        code,
      }),
    });
  };

  authenticate = (token: string) => {};
}
