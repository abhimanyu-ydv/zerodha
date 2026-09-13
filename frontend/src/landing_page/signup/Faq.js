import React from 'react';

const FAQS = [
    {
        q: "What is a Zerodha account",
        a: "A Zerodha account gives you a single login to invest in stocks, mutual funds, IPOs, and F&O. It combines a trading account, used to place orders on the exchanges, with a demat account that holds your securities in electronic form.",
    },
    {
        q: "What documents are required to open a demat account?",
        a: "You need your PAN card, Aadhaar linked to your mobile number for e-sign, a bank proof (cancelled cheque or bank statement), your signature on white paper, and a passport-size photograph. Income proof is required only if you want to trade F&O.",
    },
    {
        q: "Is Zerodha account opening free?",
        a: "Yes. Opening a demat and trading account online is free. Commodity account opening is free as well, while offline applications carry a nominal charge.",
    },
    {
        q: "Are there any AMC (Account Maintenance Charges) for a demat account?",
        a: "There are no AMC charges for a Basic Services Demat Account (BSDA), where holdings stay below the prescribed limit. For regular demat accounts, AMC is charged quarterly.",
    },
    {
        q: "Can I open a demat account without a bank account?",
        a: "No. A bank account in your own name is mandatory — it is used to verify your identity and to transfer funds in and out of your trading account.",
    },
    {
        q: "What is a Basic Services Demat Account (BSDA)?",
        a: "BSDA is a demat account for small investors, with reduced or zero maintenance charges as long as the value of holdings stays under the limit set by SEBI. Accounts qualify automatically when the criteria are met.",
    },
    {
        q: "Can I open a demat and trading account using the mobile app?",
        a: "Yes. The entire process — filling in your details, uploading documents, and completing Aadhaar e-sign — can be done from your phone, and typically takes a few minutes.",
    },
];

function Faq() {
    return ( <>
        <div className="container py-5">
            <h2 className="fs-2 mb-5">FAQs</h2>

            <div className="accordion accordion-flush signup-faq" id="signupFaq">
                {FAQS.map((faq, i) => (
                    <div className="accordion-item border-0" key={faq.q}>
                        <div style={{ width: "150px", height: "3px", backgroundColor: "#387ed1" }} />
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed bg-white shadow-none px-0 py-4 fs-5"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#faq${i}`}
                            >
                                {faq.q}
                            </button>
                        </h2>
                        <div id={`faq${i}`} className="accordion-collapse collapse" data-bs-parent="#signupFaq">
                            <div className="accordion-body text-muted px-0 pt-0 pb-4">{faq.a}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </> );
}

export default Faq;
