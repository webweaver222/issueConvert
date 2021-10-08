import React, {
  FC,
  useState,
  MouseEventHandler,
  RefObject,
  useEffect,
} from "react";
import useDidUpdateEffect from "../components/customHooks/didUpdateEffect";

import AuthApi from "../services/authApi";

interface AuthContainerProps {
  Authnticate: Function;
  authApi: AuthApi;
  aref: RefObject<HTMLButtonElement>;
  onOpenModal: Function;
}

interface AuthState {
  code: string;
  fetching: boolean;
  user: any;
}

interface AuthComponent {
  user: any;
  fetching: boolean;
  onAuthClick: MouseEventHandler;
  onSignOut: Function;
  aref: RefObject<HTMLButtonElement>;
}

const AuthContainer =
  (Wrapped: FC<AuthComponent>) => (props: AuthContainerProps) => {
    const { authApi, Authnticate, onOpenModal, aref } = props;

    const [state, setState] = useState<AuthState>({
      code: "",
      fetching: false,
      user: null,
    });

    const { code, fetching, user } = state;

    const onAuth = () => {
      const popup = authApi.openPopup();

      if (popup) {
        authApi.getCode(popup, (code: string) => {
          if (code) setState({ ...state, code });
        });
      }
    };

    const onSignOut = () => {
      console.log("f");
      localStorage.removeItem("data");
      setState({ ...state, user: null });
      Authnticate();
    };

    useEffect(() => {
      const data = localStorage.getItem("data");
      if (data) {
        const obj = JSON.parse(data);
        setState({ ...state, user: obj.user });
        Authnticate(obj.token);
      }
    }, []);

    useDidUpdateEffect(async () => {
      try {
        setState({ ...state, fetching: true });
        const res = await authApi.getToken(code);
        if (res.ok) {
          const body = await res.json();

          setState({ ...state, fetching: false, user: body.user });

          if (body.token) {
            localStorage.setItem(
              "data",
              JSON.stringify({ token: body.token, user: body.user })
            );

            Authnticate(body.token);
          }
        }
      } catch (e) {
        setState({ ...state, fetching: false });
        onOpenModal();
        console.log(e, "access_token fail");
      }
    }, [code]);

    return (
      <Wrapped
        fetching={fetching}
        user={user}
        onAuthClick={onAuth}
        aref={aref}
        onSignOut={onSignOut}
      />
    );
  };

export default AuthContainer;

export type { AuthComponent };
