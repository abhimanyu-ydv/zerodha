import React from 'react';
import { Link } from "react-router-dom";

function Demant() {
    return ( <>
        <div className="container mt-5 py-5">
            <h2 className="text-center fs-2">Already have a demat account?</h2>
            <p className="text-center text-muted fs-5 mt-4">
                Move your holdings to Zerodha and we'll cover your transfer costs, up to ₹500,{" "}
                <Link to="/support" style={{ textDecoration: "none" }}>learn more</Link>.
            </p>
        </div>
        </> );
}

export default Demant;
