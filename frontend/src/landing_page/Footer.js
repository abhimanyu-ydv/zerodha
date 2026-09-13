import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="/media/images/logo.svg" style={{ width: "50%" }} alt="Zerodha logo" />
            <p>
              &copy; 2010 - {new Date().getFullYear()}, Not Zerodha Broking Ltd.
              All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <Link to="/about">About</Link>
            <br />
            <Link to="/product">Products</Link>
            <br />
            <Link to="/pricing">Pricing</Link>
            <br />
            <Link to="/support">Referral programme</Link>
            <br />
            <Link to="/support">Careers</Link>
            <br />
            <Link to="/support">Zerodha.tech</Link>
            <br />
            <Link to="/support">Press & media</Link>
            <br />
            <Link to="/support">Zerodha cares (CSR)</Link>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <Link to="/support">Contact</Link>
            <br />
            <Link to="/support">Support portal</Link>
            <br />
            <Link to="/support">Z-Connect blog</Link>
            <br />
            <Link to="/support">List of charges</Link>
            <br />
            <Link to="/support">Downloads & resources</Link>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <Link to="/signup">Open an account</Link>
            <br />
            <Link to="/signup">Fund transfer</Link>
            <br />
            <Link to="/signup">60 day challenge</Link>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            This website is a clone of Zerodha, built only as a learning
            project. It is not affiliated with, endorsed by, or connected to
            Zerodha Broking Ltd. in any way. All product names, logos and brands
            belong to their respective owners. No real trades are placed and no
            real money is involved.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please{" "}
            <Link to="/support">create a ticket here</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
