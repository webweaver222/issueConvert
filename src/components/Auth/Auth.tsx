import React, { useState } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import TestifyApi from "../../services/testifyApi";

import withModal from "../hoc/withModal";
import { AuthErrorMessage } from "../elements/authErrorMsg";
import { compose } from "../../utils";

import config from "../../../config";
const { client_id, client_secret } = config;

import "./Auth.scss";

const Auth = ({
  Authnticate,
  testifyApi,
  aref,
  onOpenModal,
}: {
  Authnticate: Function;
  testifyApi: TestifyApi;
  aref: any;
  onOpenModal: () => void;
}) => {
  const codeLink =
    "https://github.com/login/oauth/authorize?client_id=" +
    client_id +
    "&login=" +
    "&scope=public_repo";

  const [state, setState] = useState<{
    code: string;
    error: string;
    fetching: boolean;
    user: any;
  }>({
    code: "",
    error: "",
    fetching: false,
    user: null,
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
        setState({ ...state, fetching: true });
        const res = await testifyApi.getToken(data, "/test/token");

        if (res.ok) {
          const body = await res.json();

          setState({ ...state, fetching: false, user: body.user });

          if (body.token) Authnticate(body.token);
        }
      } catch (e) {
        setState({ ...state, fetching: false });
        onOpenModal();
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
      {state.user && !state.fetching ? (
        <div className="userWrapper">
          <span>{state.user.login}</span>
          <img src={state.user.avatar_url} alt="userAvatar" />
        </div>
      ) : !state.fetching && !state.user ? (
        <button ref={aref} onClick={onAuth}>
          LogIn with GitHub
        </button>
      ) : (
        <div className="loaderWrapper">
          <span>Authenticating...</span>
        </div>
      )}
    </div>
  );
};

export default compose(withModal(AuthErrorMessage))(Auth);
