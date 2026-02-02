import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './DiscoveryCallCTA.css';

const DiscoveryCallCTA = ({
    title = "Not sure where to start?",
    description = "Book a free discovery call to identify your specialized needs.",
    buttonText = "Schedule Call",
    calculationData = null,
    activeTab = null
}) => {
    return (
        <div className="discovery-call-cta">
            <div className="discovery-call-content">
                <div className="discovery-call-text">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <Link
                    to="/schedule-call"
                    state={{ calculationData, activeTab }}
                    className="discovery-call-btn"
                >
                    {buttonText} <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default DiscoveryCallCTA;
