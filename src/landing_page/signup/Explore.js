import React from 'react';

const BLUE = "#387ed1";

function Circle({ children }) {
    return (
        <span
            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 me-3"
            style={{ width: "40px", height: "40px", backgroundColor: "#eef3fb" }}
        >
            {children}
        </span>
    );
}

const IndividualIcon = () => (
    <Circle>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
            <path d="M12 22c4-4 7-6.8 7-10a7 7 0 1 0-14 0c0 3.2 3 6 7 10z" />
            <circle cx="12" cy="11" r="2.6" />
        </svg>
    </Circle>
);

const HufIcon = () => (
    <Circle>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
            <circle cx="9" cy="8" r="3" />
            <circle cx="17" cy="9" r="2.4" />
            <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" />
            <path d="M16 14c2.8 0 5 1.6 5 5" />
        </svg>
    </Circle>
);

const NriIcon = () => (
    <Circle>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
        </svg>
    </Circle>
);

const MinorIcon = () => (
    <Circle>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="10.5" r="1" fill={BLUE} />
            <circle cx="15" cy="10.5" r="1" fill={BLUE} />
            <path d="M9 15.5c1.8 1.4 4.2 1.4 6 0" />
        </svg>
    </Circle>
);

const CorporateIcon = () => (
    <Circle>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
            <rect x="3" y="8" width="8" height="13" />
            <rect x="11" y="3" width="10" height="18" />
            <path d="M14 7h4M14 11h4M14 15h4M6 12h2M6 16h2" />
        </svg>
    </Circle>
);

const ACCOUNTS = [
    { icon: <IndividualIcon />, title: "Individual Account", desc: "Invest in equity, mutual funds and derivatives" },
    { icon: <HufIcon />, title: "HUF Account", desc: "Make tax-efficient investments for your family" },
    { icon: <NriIcon />, title: "NRI Account", desc: "Invest in equity, mutual funds, debentures, and more" },
    { icon: <MinorIcon />, title: "Minor Account", desc: "Teach your little ones about money & invest for their future with them" },
    { icon: <CorporateIcon />, title: "Corporate / LLP/ Partnership", desc: "Manage your business surplus and investments easily" },
];

function Explore() {
    return (  <>
        <div className="container py-5">
            <h2 className="text-center fs-2 mb-5">Explore different account types</h2>

            <div className="row g-4">
                {ACCOUNTS.map((account) => (
                    <div className="col-4" key={account.title}>
                        <a
                            href=""
                            className="d-block h-100 p-4 border rounded text-decoration-none text-reset"
                        >
                            <div className="d-flex align-items-center">
                                {account.icon}
                                <h5 className="fs-5 mb-0">{account.title}</h5>
                            </div>
                            <p className="text-muted mt-3 mb-0">{account.desc}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
        </>);
}

export default Explore;
