import React from 'react';

const BLUE = "#387ed1";
const CORAL = "#ec5f51";

function StocksIcon() {
    return (
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
            <rect x="26" y="4" width="60" height="52" rx="2" stroke="#d5d5d5" strokeWidth="2" />
            <rect x="56" y="14" width="6" height="26" fill={BLUE} />
            <rect x="68" y="22" width="6" height="18" fill={BLUE} />
            <circle cx="6" cy="22" r="3" fill={CORAL} />
            <circle cx="18" cy="22" r="3" fill={CORAL} />
            <circle cx="6" cy="34" r="3" fill={CORAL} />
            <circle cx="18" cy="34" r="3" fill={CORAL} />
            <path d="M30 50 Q42 30 52 40 T74 24" stroke={BLUE} strokeWidth="2" fill="none" />
        </svg>
    );
}

function MutualFundsIcon() {
    return (
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
            <rect x="6" y="10" width="34" height="26" rx="2" fill={BLUE} />
            <circle cx="15" cy="19" r="2.5" fill="#fff" />
            <circle cx="24" cy="19" r="2.5" fill="#fff" />
            <circle cx="33" cy="19" r="2.5" fill="#fff" />
            <circle cx="15" cy="28" r="2.5" fill="#fff" />
            <circle cx="24" cy="28" r="2.5" fill="#fff" />
            <rect x="46" y="8" width="10" height="12" fill={CORAL} />
            <rect x="46" y="30" width="30" height="4" fill={BLUE} />
            <path d="M62 22 l6 8 h-12 z" fill={BLUE} />
            <rect x="10" y="46" width="10" height="4" fill={CORAL} />
            <rect x="28" y="46" width="10" height="4" fill={CORAL} />
        </svg>
    );
}

function IpoIcon() {
    return (
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
            <rect x="6" y="10" width="6" height="16" fill="#d5d5d5" />
            <rect x="16" y="4" width="6" height="22" fill="#d5d5d5" />
            <rect x="44" y="6" width="28" height="14" fill={CORAL} />
            <rect x="20" y="22" width="52" height="34" rx="2" fill={BLUE} />
            <rect x="28" y="32" width="36" height="2" fill="#fff" opacity="0.7" />
            <rect x="28" y="40" width="24" height="2" fill="#fff" opacity="0.7" />
            <rect x="28" y="48" width="16" height="3" fill="#fff" />
        </svg>
    );
}

function FnoIcon() {
    return (
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
            <path d="M8 20 h52 a4 4 0 0 1 4 4 v20 a4 4 0 0 1 -4 4 h-52 z" fill="#eef1f4" />
            <rect x="14" y="14" width="34" height="18" rx="2" fill={BLUE} />
            <circle cx="60" cy="16" r="3" fill={CORAL} />
            <circle cx="72" cy="16" r="3" fill={CORAL} />
            <circle cx="60" cy="28" r="3" fill={CORAL} />
            <circle cx="72" cy="28" r="3" fill={CORAL} />
            <rect x="14" y="42" width="18" height="5" rx="2.5" fill={BLUE} />
            <rect x="38" y="42" width="18" height="5" rx="2.5" fill={CORAL} />
        </svg>
    );
}

const OPTIONS = [
    { icon: <StocksIcon />, title: "Stocks", desc: "Invest in all exchange-listed securities" },
    { icon: <MutualFundsIcon />, title: "Mutual funds", desc: "Invest in commission-free direct mutual funds" },
    { icon: <IpoIcon />, title: "IPO", desc: "Apply to the latest IPOs instantly via UPI" },
    { icon: <FnoIcon />, title: "Futures & options", desc: "Hedge and mitigate market risk through simplified F&O trading" },
];

function Investment() {
    return ( <>
        <div className="container py-5">
            <h2 className="text-center fs-2 mb-5">Investment options with Zerodha demat account</h2>

            <div className="row">
                {OPTIONS.map((option) => (
                    <div className="col-6 d-flex mb-5 px-5" key={option.title}>
                        <div className="me-4 flex-shrink-0">{option.icon}</div>
                        <div>
                            <h4 className="fs-4">{option.title}</h4>
                            <p className="text-muted fs-5 mb-0">{option.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-primary btn-lg px-5 py-3">Explore Investments</button>
            </div>
        </div>
        </> );
}

export default Investment;
