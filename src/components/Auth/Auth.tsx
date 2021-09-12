import React, { useState, useEffect } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import GithubApolloService from "../../services/githubApolloService";

import config from "../../../config";

import "./Auth.scss";

const Auth = ({ Authnticate }: { Authnticate: Function }) => {
  const { client_id, client_secret } = config;

  const codeLink =
    "https://github.com/login/oauth/authorize?client_id=" +
    client_id +
    "&login=" +
    "&scope=public_repo";
  const tokenLink = "https://github.com/login/oauth/access_token";

  const [state, setState] = useState<{
    code: string | null;
    token: string;
  }>({
    code: "",
    token: "",
  });

  const { code, token } = state;

  useDidUpdateEffect(() => {
    const data = {
      client_id,
      client_secret,
      code,
    };

    (async () => {
      try {
        const res = await fetch(tokenLink, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const body = await res.json();
          if (body.access_token)
            setState({ ...state, token: body.access_token });
        }
      } catch (e) {
        console.log(e, "access_token fail");
      }
    })();
  }, [code]);

  useDidUpdateEffect(() => Authnticate(token), [token]);

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

          setState({ ...state, code: url.searchParams.get("code") });

          await new Promise((resolve) =>
            setTimeout(() => resolve(popup!.close()), 50)
          );
        }
      } catch (e) {}
    }, 100);
  };

  const onLogout = () => {
    setState({
      code: "",
      token: "",
    });

    Authnticate();
  };

  return (
    <div className="AuthWrapper">
      <button onClick={token ? onLogout : onAuth}>
        {token ? "Logout" : "Auth"}
      </button>
    </div>
  );
};

export default Auth;
