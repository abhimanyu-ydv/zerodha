import React from 'react';

function Hero() {
    return (<>
        <div  className="container  mb-5" >
           <h3 className="text-center mt-5 p-3" >Open a free demat and trading account online</h3>
           <h2 className="text-muted  text-center mt-3 fs-5 pd-5">Start investing brokerage free and join a community of 1.8+ crore investors and traders</h2>
        </div>
        <div className="container mb-5">
        <div className="row align-items-center">
            <div className="col-6 text-end">
            <img className="img-fluid" src="media/images/signup.png" style={{ width: "600px" }} />
            </div>
            <div className="col-6 ps-5">
                <h2 className="fs-2">Signup now</h2>
                <p className="text-muted fs-5">Or track your existing application</p>

                <div className="input-group input-group-lg mt-4">
                    <span className="input-group-text bg-white">🇮🇳 +91</span>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your mobile number"
                    />
                </div>

                <button className="btn btn-primary btn-lg w-100 mt-4 py-3">Get OTP</button>

                <p className="text-muted mt-4">
                    By proceeding, you agree to the Zerodha <a href="" style={{ textDecoration: "none" }}>terms</a> &amp; <a href="" style={{ textDecoration: "none" }}>privacy policy</a>
                </p>

                <hr />

                <p className="text-muted">
                    Looking to open NRI account? <a href="" style={{ textDecoration: "none" }}>Click here</a>
                </p>
            </div>

        </div>
        </div>
        </> );
}

export default Hero;
