import React, { useState, useEffect } from "react";

import "./Auth.scss";

const Auth = () => {
  const cid = "d33058c99559a964904b";
  const login = "";

  const [code, setCode] = useState<any>(null);

  useEffect(() => {
    if (code) {
      const url = new URL(code);
      var c = url.searchParams.get("code");
      console.log(c);
    }
  }, [code]);

  const onAuth = async () => {
    const popup = window.open(
      "https://github.com/login/oauth/authorize?client_id=" + cid + "&login=",

      "test",
      "width=500,height=500"
    );

    const pollTimer = window.setInterval(async function () {
      try {
        if (popup.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup.document.URL.includes("http://localhost:8000")) {
          window.clearInterval(pollTimer);

          /*const token = new URLSearchParams(popup.location.hash.substr(1)).get(
            "code"
          );*/

          //console.log(popup);

          setCode(popup?.location.href);

          await new Promise((resolve) =>
            setTimeout(() => resolve(popup.close()), 50)
          );
        }
      } catch (e) {}
    }, 100);
  };

  return (
    <div className="AuthWrapper">
      <button onClick={onAuth}>auth</button>
    </div>
  );
};

export default Auth;
