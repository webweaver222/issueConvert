import React, { useState, useEffect } from "react";

import AuthContainer from "../../containers/AuthContainer";
import withModal from "../hoc/withModal";
import { AuthComponent } from "../../containers/AuthContainer";
import { AuthErrorMessage } from "../elements/authErrorMsg";
import { compose } from "../../utils";

import "./Auth.scss";

const Auth = (props: AuthComponent) => {
  const { user, fetching, onAuthClick, aref } = props;

  const [state, setState] = useState({
    menuOpened: false,
  });

  const el = function () {
    setState({ ...state, menuOpened: false });
  };

  useEffect(() => {
    document.addEventListener("click", el);
    console.log("ds");
    return () => document.removeEventListener("click", el, false);
  }, []);

  return (
    <div className="AuthWrapper">
      {user && !fetching && (
        <div className="userWrapper">
          <span>{user.login}</span>
          <img
            src={user.avatar_url}
            alt="userAvatar"
            onClick={(e) => {
              e.stopPropagation();
              setState({ ...state, menuOpened: true });
            }}
          />

          {state.menuOpened && (
            <div className="dropdown">
              <ul>
                <li>Log out</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {!fetching && !user && (
        <button ref={aref} onClick={onAuthClick}>
          LogIn with GitHub
        </button>
      )}

      {fetching && (
        <div className="loaderWrapper">
          <span>Authenticating...</span>
        </div>
      )}
    </div>
  );
};

export default compose(withModal(AuthErrorMessage), AuthContainer)(Auth);
