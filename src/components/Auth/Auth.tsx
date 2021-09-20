import React, { useState } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import TestifyApi from "../../services/testifyApi";

import config from "../../../config";
const { client_id, client_secret } = config;

import "./Auth.scss";

const Auth = ({
  Authnticate,
  testifyApi,
  aref,
}: {
  Authnticate: Function;
  testifyApi: TestifyApi;
  aref: any;
}) => {
  const codeLink =
    "https://github.com/login/oauth/authorize?client_id=" +
    client_id +
    "&login=" +
    "&scope=public_repo";

  const [state, setState] = useState<{
    code: string;
  }>({
    code: "",
  });

  const { code } = state;

  useDidUpdateEffect(() => {
    const data = {
      client_id,
      client_secret,
      code,
    };

    (async () => {
      try {
        const res = await testifyApi.getToken(data, "/test/token");

        if (res.ok) {
          const body = await res.json();

          if (body.token) Authnticate(body.token);
        }
      } catch (e) {
        console.log(e, "access_token fail");
      }
    })();
  }, [code]);

  const onAuth = async () => {
    const popup = window.open(codeLink, "GitHub OAuth", "width=500,height=500");

    const pollTimer = window.setInterval(async function () {
      try {
        if (popup!.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup!.document.URL.includes(location.origin)) {
          window.clearInterval(pollTimer);

          const url = new URL(popup!.location.href);

          setState({ ...state, code: url.searchParams.get("code")! });
          await new Promise((resolve) =>
            setTimeout(() => resolve(popup!.close()), 100)
          );
        }
      } catch (e) {
        console.log(e, "popup error");
      }
    }, 100);
  };

  return (
    <div className="AuthWrapper">
      <button ref={aref} onClick={onAuth}>
        Auth
      </button>
    </div>
  );
};

export default Auth;
