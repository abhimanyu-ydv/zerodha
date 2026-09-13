import React, { useEffect, useState } from "react";

import api, { SIGNUP_URL } from "../api";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/me")
      .then((res) => {
        setUser(res.data);
        setStatus("ready");
      })
      .catch((err) => {
        const loggedOut = err.response && err.response.status === 401;
        setStatus(loggedOut ? "loggedOut" : "serverDown");
      });
  }, []);

  if (status === "loading") {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  if (status === "loggedOut" || status === "serverDown") {
    return (
      <div className="auth-gate">
        <img src="/logo.png" alt="Kite" style={{ width: "60px" }} />
        {status === "loggedOut" ? (
          <>
            <h3>You are not logged in</h3>
            <p>Log in or create an account to open your dashboard.</p>
            <a className="btn btn-blue" href={SIGNUP_URL}>
              Login / Signup
            </a>
          </>
        ) : (
          <>
            <h3>Cannot reach the server</h3>
            <p>
              Make sure the backend is running (<code>cd backend && npm start</code>)
              and then reload this page.
            </p>
            <button
              className="btn btn-blue"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <GeneralContextProvider user={user}>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;
