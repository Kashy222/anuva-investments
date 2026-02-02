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
            title: 'Goal Planning',
            icon: <img src={iconTarget} alt="Goal Planning" />,
            desc: '', // Description removed in reference image or just different layout? Reference has bullet points.
            features: [
                'Defining Financial Goals',
                'Financial Freedom Planning',
                'Kids’ Education Planning',
                'Buying a Dream House/Car',
                'Vacation Planning',
                'Kids’ Dream Wedding',
                'Any Other Goals'
            ]
        },
        {
            id: 'cashflow',
            title: 'Cash Flow Analysis',
            icon: <img src={iconCoin} alt="Cash Flow Analysis" />,
            desc: '',
            features: [
                'Income & Expenses Analysis',
                'Financial Ratios',
                'Net Worth Analysis'
            ]
        },
        {
            id: 'loans',
            title: 'Loan Management',
            icon: <img src={iconCoin} alt="Loan Management" />, // Using iconCoin (rupee) or iconShield? Reference for Loan is Blue Box? We don't have it. User provided 5 icons. Let's use iconCoin (Rupee) or maybe iconSearch?
            // Actually, in the reference, Loan Management has a blue box with a rupee.
            // I only have 5 icons uploaded.
            // 1. Target (Goal)
            // 2. Coin/Rupee (Cash Flow)
            // 3. Shield/Rupee (Risk/Insurance)
            // 4. Magnifying Glass (Portfolio Tracking)
            // 5. Pie Chart (Investment Planning)
            // Wait, I used iconCoin for 'Loan' before and iconSearch for 'Budget'.
            // Now:
            // Goal -> Target
            // Cash Flow -> Coin (Matches visual)
            // Risk -> Shield (Matches visual)
            // Loan -> ??? (I don't have the blue box icon). I'll use iconCoin (Rupee) again? Or iconSearch?
            // Reference 'Portfolio Tracking' has Magnifying Glass. So iconSearch -> Portfolio Tracking.
            // That leaves me with no icon for Loan Management matching the reference (Blue box).
            // But I have iconPie -> Investment Planning.
            // So I have 4 matching icons for 5 services?
            // Wait, the user uploaded 5 icons.
            // 1. `goal-planning.png` (Target)
            // 2. `mutual-funds.png` (Assumed Pie but filename says mutual-funds). Reference "Investment Planning" uses Pie.
            // 3. `insurance.png` (Shield). Reference "Risk Management".
            // 4. `research.png` (Search). Reference "Portfolio Tracking".
            // 5. `portfolio.png` (Pie chart? Or Coin?).
            // Let's re-verify the files I moved.
            // `goal-planning.png` -> `icon-target.png`
            // `mutual-funds.png` -> `icon-coin.png` (Wait, I renamed mutual-funds to icon-coin? That seems wrong mapping).
            // `insurance.png` -> `icon-shield.png`
            // `research.png` -> `icon-search.png`
            // `portfolio.png` -> `icon-pie.png`
            // Let's check the images I moved.
            // I saw the file list but not content.
            // Browsing subagent saw the icons.
            // Goal -> Red Target.
            // Budget & Tax -> Green Magnifying Glass. (So `icon-search` is Green Magnifying Glass).
            // Loans & Debt -> Gold Coin. (So `icon-coin` is Gold Coin).
            // Insurance -> Teal Shield. (So `icon-shield` is Teal Shield).
            // Investment -> Colorful Pie. (So `icon-pie` is Colorful Pie).
            //
            // Reference Image Mapping:
            // Goal Planning -> Red Target. (Have)
            // Cash Flow Analysis -> Gold Coin. (Have `icon-coin`).
            // Risk Management -> Teal Shield? Reference has Green Shield. `icon-shield` is Teal. Close enough.
            // Loan Management -> Blue Box with Rupee. (I do NOT have this icon. I have `icon-coin` used for Cash Flow).
            // Investment Planning -> Pie Chart. (Have `icon-pie`).
            // Portfolio Tracking -> Magnifying Glass. (Have `icon-search`).
            //
            // So for Loan Management, I am missing an icon? Or maybe I have duplicate use?
            // I will reuse `icon-coin` or `icon-pie` or just keep one of the others.
            // Or maybe I missed one?
            // User uploaded 5 images: 0, 1, 2, 3, 4.
            // I moved 5 images.
            // Reference has 6 cards.
            // Goal, Cash Flow, Risk, Loan, Investment, Portfolio.
            // I will use `icon-coin` for Loan Management as well for now, or maybe the user intended one of the others.
            // Actually, maybe `icon-coin` (Gold Coin) = Cash Flow.
            // And maybe `mutual-funds.png` was the Pie?
            // `portfolio.png` was the Coin?
            // I renamed them: `mutual-funds->coin`, `portfolio->pie`.
            // Browser check: "Loans & Debt" -> Gold Coin. "Investment" -> Pie.
            //
            // Okay, I will align the content to the reference:
            // 1. Goal Planning: Target
            // 2. Cash Flow Analysis: Coin
            // 3. Risk Management: Shield
            // 4. Loan Management: Coin (reuse) or ...?
            // 5. Investment Planning: Pie
            // 6. Portfolio Tracking: Search
            desc: '',
            features: [
                'Debt Analysis',
                'Debt Balancing',
                'Debt-/EMI-Free Strategies'
            ]
        },
        {
            id: 'risk',
            title: 'Risk Management',
            icon: <img src={iconShield} alt="Risk Management" />,
            desc: '',
            features: [
                'Term Insurance',
                'Health Insurance',
                'Emergency Funds'
            ]
        },
        {
            id: 'investment',
            title: 'Investment Planning',
            icon: <img src={iconPie} alt="Investment Planning" />,
            desc: '',
            features: [
                'Current Asset Allocation',
                'Portfolio vs Benchmark',
                'Detailed MF Analysis',
                'Research-Backed MF Portfolio'
            ]
        },
        {
            id: 'portfolio',
            title: 'Portfolio Tracking',
            icon: <img src={iconSearch} alt="Portfolio Tracking" />,
            desc: '',
            features: [
                'Multi-Asset, Family-Level Tracking'
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
