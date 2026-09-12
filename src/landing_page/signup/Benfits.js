import React from 'react'

const BENEFITS = [
    {
        title: "Unbeatable pricing",
        desc: "Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.",
    },
    {
        title: "Best investing experience",
        desc: "Simple and intuitive trading platform with an easy-to-understand user interface.",
    },
    {
        title: "No spam or gimmicks",
        desc: "Committed to transparency — no gimmicks, spam, \"gamification\", or intrusive push notifications.",
    },
    {
        title: "The Zerodha universe",
        desc: "More than just an app — gain free access to the entire ecosystem of our partner products.",
    },
];

function BenefitsIllustration() {
    return (
        <svg viewBox="0 0 420 300" className="img-fluid" style={{ maxWidth: "440px" }}>
            {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
                <circle key={`${r}-${c}`} cx={30 + c * 22} cy={60 + r * 22} r="3.5" fill="#e8735f" />
            )))}
            <rect x="60" y="88" width="230" height="140" fill="#fff" stroke="#ececec" />
            <rect x="40" y="120" width="60" height="120" fill="#eaf1fb" />
            <path d="M75 170 h55 v55 h-55 a0 0 0 0 1 0 0 z" fill="#3d6fc4" />
            <path d="M75 170 a55 55 0 0 1 55 55 h-55 z" fill="#5d88d4" />
            <rect x="140" y="80" width="20" height="105" fill="#3d6fc4" />
            <rect x="172" y="120" width="18" height="80" fill="#e8735f" />
            <rect x="205" y="95" width="20" height="75" fill="#3d6fc4" />
            {[1, 2, 3, 4].map((i) => (
                <circle key={i} cx="290" cy="140" r={i * 22} fill="none" stroke="#ececec" />
            ))}
            <text x="282" y="148" fontSize="22" fill="#5d88d4">₹</text>
            <circle cx="290" cy="52" r="3.5" fill="#f0b862" />
            <circle cx="356" cy="190" r="3" fill="#e8735f" />
            <circle cx="322" cy="118" r="2.5" fill="#8a7fd4" />
            <text x="288" y="252" fontSize="42" fill="#f0b862">%</text>
        </svg>
    );
}

function Benfits() {
    return ( <>
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-6 text-center">
                    <BenefitsIllustration />
                    <h2 className="fs-2 mt-4">Benefits of opening a Zerodha demat account</h2>
                </div>
                <div className="col-6 ps-5">
                    {BENEFITS.map((benefit) => (
                        <div className="mb-5" key={benefit.title}>
                            <h4 className="fs-4">{benefit.title}</h4>
                            <p className="text-muted fs-5 mt-3 mb-0">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </> );
}

export default Benfits;
