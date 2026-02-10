import React, { useEffect, useState } from 'react';
import './About.css';
import { Target, Shield, TrendingUp, Users, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Accordion State
    const [activeAccordion, setActiveAccordion] = useState(0);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? -1 : index);
    };

    const journeySteps = [
        {
            title: "Discovery & Analysis",
            content: "We begin by understanding your complete financial picture—assets, liabilities, goals, and risk tolerance. This isn't just data collection; it's a deep dive into what money means to you.",
            icon: <Target />
        },
        {
            title: "Strategic Blueprint",
            content: "Our experts craft a personalized financial roadmap. Whether it's tax optimization, retirement planning, or wealth transfer, every strategy is back-tested and aligned with your objectives.",
            icon: <Shield />
        },
        {
            title: "Execution & Monitoring",
            content: "We implement the plan using scientific portfolio construction. But we don't stop there. Continuous monitoring and rebalancing ensure you stay on track regardless of market volatility.",
            icon: <TrendingUp />
        },
        {
            title: "Legacy Creation",
            content: "Beyond wealth accumulation, we help you plan for wealth distribution, ensuring your success benefits generations to come through trust and estate planning.",
            icon: <Users />
        }
    ];

    return (
        <div className="about-page-premium">

            {/* SECTION 1: MISSION HERO (LIGHT) */}
            <section className="about-section light-section hero-minimal">
                <div className="container text-center">
                    <span className="mission-label">OUR MISSION</span>
                    <h1 className="mission-headline">
                        We help our clients nurture their relationship with wealth and map their journey to <span className="text-gold">financial freedom.</span>
                    </h1>
                </div>
            </section>

            {/* SECTION 2: PHILOSOPHY (DARK) */}
            <section className="about-section dark-section philosophy-section">
                <div className="container">
                    <div className="philosophy-content">
                        <h2 className="section-title-large text-white">One with your interests.</h2>
                        <p className="philosophy-text text-white-opacity">
                            In a world of product-pushing, Anuva stands apart. We are fiduciaries first.
                            Our only incentive is your financial well-being. No hidden commissions, no biased advice—just
                            pure, data-driven strategies designed to protect and grow your wealth.
                        </p>
                    </div>
                </div>
                <div className="philosophy-overlay"></div>
            </section>

            {/* SECTION 3: LEGACY (LIGHT) */}
            <section className="about-section light-section legacy-section">
                <div className="container text-center">
                    <h2 className="section-title text-navy">Building on a legacy of excellence</h2>
                    <p className="section-subtitle text-gray">
                        Combining decades of market expertise with modern financial technology.
                    </p>

                    <div className="legacy-video-placeholder">
                        <div className="play-button-wrapper">
                            <div className="play-button"></div>
                        </div>
                        <img src="/office-meeting.jpg" alt="Anuva Legacy" className="legacy-image" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'} />
                    </div>
                </div>
            </section>

            {/* SECTION 4: ECOSYSTEM/STATS (DARK) */}
            <section className="about-section dark-section stats-bar">
                <div className="container">
                    <div className="stats-row">
                        <div className="stat-item-minimal">
                            <h3>15+</h3>
                            <p>Years of Experience</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item-minimal">
                            <h3>₹100Cr+</h3>
                            <p>Assets Advised</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item-minimal">
                            <h3>500+</h3>
                            <p>Families Served</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item-minimal">
                            <h3>100%</h3>
                            <p>Unbiased Advice</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: JOURNEY ACCORDION (LIGHT) */}
            <section className="about-section light-section journey-section">
                <div className="container">
                    <div className="journey-layout">
                        <div className="journey-header">
                            <h2 className="section-title text-navy">Your Journey to Financial Well-being</h2>
                            <p className="section-subtitle text-gray-left">
                                A systematic approach to wealth creation, stripped of complexity and conflicts of interest.
                            </p>
                            <Link to="/schedule-call" className="btn btn-primary mt-4">Start Your Journey <ArrowRight size={18} className="ml-2" /></Link>
                        </div>

                        <div className="journey-accordion">
                            {journeySteps.map((step, index) => (
                                <div key={index} className={`accordion-item ${activeAccordion === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                                    <div className="accordion-header">
                                        <div className="accordion-title">
                                            <span className="step-number">0{index + 1}</span>
                                            <h3>{step.title}</h3>
                                        </div>
                                        <div className="accordion-icon">
                                            {activeAccordion === index ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>
                                    <div className="accordion-content">
                                        <p>{step.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
