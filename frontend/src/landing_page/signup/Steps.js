import React from 'react';

const STEPS = [
    { no: "01", text: "Enter the requested details" },
    { no: "02", text: "Complete e-sign & verification" },
    { no: "03", text: "Start investing!" },
];

function StepsIllustration() {
    return (
        <svg viewBox="0 0 420 300" className="img-fluid" style={{ maxWidth: "480px" }}>
            <ellipse cx="210" cy="160" rx="185" ry="130" fill="#f4f4f4" />
            <rect x="70" y="55" width="180" height="150" rx="4" fill="#3d6fc4" />
            <circle cx="84" cy="68" r="3" fill="#fff" opacity="0.8" />
            <circle cx="94" cy="68" r="3" fill="#fff" opacity="0.8" />
            <circle cx="104" cy="68" r="3" fill="#fff" opacity="0.8" />
            <rect x="84" y="88" width="34" height="7" rx="3.5" fill="#a8c2e8" />
            <rect x="126" y="88" width="46" height="7" rx="3.5" fill="#f0a93b" />
            <rect x="180" y="88" width="46" height="7" rx="3.5" fill="#a8c2e8" />
            <rect x="84" y="108" width="100" height="7" rx="3.5" fill="#5d88d4" />
            <rect x="190" y="115" width="130" height="105" rx="4" fill="#cfdff5" />
            <circle cx="215" cy="127" r="2.5" fill="#fff" />
            <circle cx="224" cy="127" r="2.5" fill="#fff" />
            <circle cx="233" cy="127" r="2.5" fill="#fff" />
            <circle cx="255" cy="172" r="22" fill="#3d6fc4" />
            <circle cx="255" cy="165" r="7" fill="#cfdff5" />
            <path d="M242 186 a13 13 0 0 1 26 0 z" fill="#cfdff5" />
            <rect x="145" y="152" width="50" height="34" rx="8" fill="#e8483c" />
            <path d="M164 162 l14 7 -14 7 z" fill="#fff" />
            <rect x="200" y="48" width="120" height="34" rx="3" fill="#fff" stroke="#e3e3e3" />
            <rect x="208" y="58" width="90" height="4" rx="2" fill="#9aa0a6" />
            <rect x="208" y="68" width="70" height="4" rx="2" fill="#9aa0a6" />
            <rect x="30" y="175" width="110" height="70" rx="3" fill="#f0b862" />
            <circle cx="42" cy="185" r="2.5" fill="#fff" />
            <circle cx="50" cy="185" r="2.5" fill="#fff" />
            <circle cx="58" cy="185" r="2.5" fill="#fff" />
            <rect x="42" y="198" width="80" height="26" fill="#fff" stroke="#3d6fc4" strokeDasharray="3 3" />
            <path d="M52 216 q8 -14 16 0 t14 -8" stroke="#3d6fc4" strokeWidth="2" fill="none" />
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
                <circle key={`${r}-${c}`} cx={52 + c * 12} cy={80 + r * 12} r="2.5" fill="#f0b862" />
            )))}
            <path d="M330 120 l10 5 -10 5 z" fill="#e8483c" />
            <path d="M175 205 l9 5 -9 5 z" fill="#e8483c" />
        </svg>
    );
}

function Steps() {
    return (
        <>
        <div style={{ backgroundColor: "#fbfbfb" }} className="py-5">
            <div className="container py-5">
                <h2 className="text-center fs-2 mb-5">Steps to open a demat account with Zerodha</h2>

                <div className="row align-items-center">
                    <div className="col-lg-6 text-center">
                        <StepsIllustration />
                    </div>
                    <div className="col-lg-6 pe-lg-5 mt-4 mt-lg-0">
                        {STEPS.map((step, i) => (
                            <div key={step.no}>
                                <div className="d-flex align-items-center py-4">
                                    <span
                                        className="step-number d-flex align-items-center justify-content-center rounded-circle border text-muted flex-shrink-0"
                                    >
                                        {step.no}
                                    </span>
                                    <h4 className="fs-4 mb-0 ms-4">{step.text}</h4>
                                </div>
                                {i < STEPS.length - 1 && <hr className="m-0" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
      );
}

export default Steps;
