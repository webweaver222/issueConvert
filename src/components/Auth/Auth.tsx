import React, { useState } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import TestifyApi from "../../services/testifyApi";

import withModal from "../hoc/withModal";
import FetchStatus from "../elements/fetchStatus";
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
  }>({
    code: "",
    error: "",
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
      <button ref={aref} onClick={onAuth}>
        LogIn with GitHub
      </button>
    </div>
  );
};

export default compose(
  withModal(() => (
    <FetchStatus
      onReset={null}
      render={() => <></>}
      fetching={false}
      status="Authentication error. Please Try again later."
    />
  ))
)(Auth);
