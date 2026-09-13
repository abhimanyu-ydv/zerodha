import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { API_URL, DASHBOARD_URL } from "../../config";

function Hero() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/${isLogin ? "login" : "signup"}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Invalid mobile number or password");
                return;
            }

            window.location.href = DASHBOARD_URL;
        } catch (err) {
            setError("Could not reach the server. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <div  className="container  mb-5" >
           <h3 className="text-center mt-5 p-3" >Open a free demat and trading account online</h3>
           <h2 className="text-muted  text-center mt-3 fs-5 pd-5">Start investing brokerage free and join a community of 1.8+ crore investors and traders</h2>
        </div>
        <div className="container mb-5">
        <div className="row align-items-center">
            <div className="col-lg-6 text-lg-end text-center">
            <img className="img-fluid" src="/media/images/signup.png" alt="Zerodha Kite and Console dashboards" style={{ maxWidth: "600px" }} />
            </div>
            <div className="col-lg-6 ps-lg-5 mt-5 mt-lg-0">
                <h2 className="fs-2">{isLogin ? "Login" : "Signup now"}</h2>
                <p className="text-muted fs-5">
                    {isLogin ? "New to Zerodha? " : "Already have an account? "}
                    <button
                        type="button"
                        className="btn btn-link p-0 fs-5 align-baseline text-decoration-none"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-lg mt-4">
                        <span className="input-group-text bg-white">🇮🇳 +91</span>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter your mobile number"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            pattern="[0-9]{10}"
                            title="Enter a 10-digit mobile number"
                            required
                        />
                    </div>

                    <input
                        type="password"
                        className="form-control form-control-lg mt-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    {error && <div className="alert alert-danger mt-3 mb-0 py-2">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mt-4 py-3"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
                    </button>
                </form>

                <p className="text-muted mt-4">
                    By proceeding, you agree to the Zerodha <Link to="/support" style={{ textDecoration: "none" }}>terms</Link> &amp; <Link to="/support" style={{ textDecoration: "none" }}>privacy policy</Link>
                </p>

                <hr />

                <p className="text-muted">
                    Looking to open NRI account? <Link to="/support" style={{ textDecoration: "none" }}>Click here</Link>
                </p>
            </div>

        </div>
        </div>
        </> );
}

export default Hero;
