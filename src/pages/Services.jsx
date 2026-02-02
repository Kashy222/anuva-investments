import React from 'react';
import { ScrollText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DiscoveryCallCTA from '../components/DiscoveryCallCTA';
import './Services.css';

import iconTarget from '../assets/icons/icon-target.png';
import iconCoin from '../assets/icons/icon-coin.png';
import iconShield from '../assets/icons/icon-shield.png';
import iconSearch from '../assets/icons/icon-search.png';
import iconPie from '../assets/icons/icon-pie.png';

const Services = () => {
    const services = [
        {
            id: 'goals',
            title: 'Goal-Based Planning',
            icon: <img src={iconTarget} alt="Goal-Based Planning" />,
            features: [
                'Defining Financial Goals',
                'Financial Freedom Planning',
                'Kids’ Education & Wedding Planning',
                'Buying a Dream House/Car',
                'Vacation & Life Stage Goals'
            ]
        },
        {
            id: 'cashflow',
            title: 'Cash Flow & Net Worth',
            icon: <img src={iconCoin} alt="Cash Flow & Net Worth" />,
            features: [
                'Income & Expenses Analysis',
                'Financial Ratios & Budgeting',
                'Net Worth Analysis',
                'Inflation Impact Modeling'
            ]
        },
        {
            id: 'retirement',
            title: 'Retirement Strategy',
            icon: <img src={iconPie} alt="Retirement Strategy" />,
            features: [
                'Future Expense Mapping',
                'Retirement Corpus Calculation',
                'Income Strategy (SWP & Annuities)',
                'India & Overseas Retirement Options'
            ]
        },
        {
            id: 'risk',
            title: 'Risk & Healthcare',
            icon: <img src={iconShield} alt="Risk & Healthcare" />,
            features: [
                'Term & Health Insurance',
                'Emergency & Contingency Planning',
                'Healthcare Cost Projection',
                'Risk Cover & Buffer Analysis'
            ]
        },
        {
            id: 'investment',
            title: 'Investment Execution',
            icon: <img src={iconPie} alt="Investment Execution" />,
            features: [
                'Asset Allocation (Equity, Debt, Gold)',
                'Research-Backed MF Portfolio',
                'Detailed Mutual Fund Analysis',
                'Growth & Stability Optimization'
            ]
        },
        {
            id: 'portfolio',
            title: 'Portfolio Intelligence',
            icon: <img src={iconSearch} alt="Portfolio Intelligence" />,
            features: [
                'Multi-Asset, Family-Level Tracking',
                'Performance vs Benchmark',
                'Regular Portfolio Health Checks'
            ]
        }
    ];

    return (
        <div className="services-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Our Services</h1>
                    <p className="page-subtitle">A holistic approach to your financial well-being.</p>
                </div>
            </div>

            <div className="container section">
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon-wrapper img-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            {service.desc && <p>{service.desc}</p>}
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container section">
                <DiscoveryCallCTA />
            </div>
        </div>
    );
};

export default Services;
