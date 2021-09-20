import React, { MouseEventHandler } from "react";

export const AuthRedirect = ({ onAuth }: { onAuth: MouseEventHandler }) => {
  return (
    <div className="authRedirect">
      <span>
        To preform this action you have to authorize with your gitHub account
      </span>
      <button onClick={onAuth}>Login with Github</button>
    </div>
  );
};
