import React, { useEffect } from 'react';
import './About.css';
import { Shield, Target, TrendingUp, Users } from 'lucide-react';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>Empowering Your Financial Future</h1>
                        <p>At Anuva Investments, we believe in a disciplined, data-driven approach to wealth creation. We are your partners in navigating the complex world of finance.</p>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="section bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="section-title">Who We Are</h2>
                            <p className="lead-text">
                                Anuva Investments is a premier financial advisory firm dedicated to helping individuals and families achieve financial independence.
                            </p>
                            <p>
                                Founded with a vision to democratize access to sophisticated investment strategies, we combine years of market expertise with personalized financial planning. Our team of certified financial planners and market analysts work tirelessly to ensure your portfolio is robust, resilient, and aligned with your long-term goals.
                            </p>
                            <p>
                                We don't just recommend products; we build comprehensive financial roadmaps that adapt to your life's changing needs, from building your first emergency fund to planning a comfortable retirement.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Financial Team Meeting"
                                className="about-img rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values / Stats */}
            <section className="section bg-light">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>15+</h3>
                            <p>Years of Experience</p>
                        </div>
                        <div className="stat-card">
                            <h3>500+</h3>
                            <p>Families Served</p>
                        </div>
                        <div className="stat-card">
                            <h3>₹100Cr+</h3>
                            <p>Assets Under Advice</p>
                        </div>
                        <div className="stat-card">
                            <h3>100%</h3>
                            <p>Unbiased Advice</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">Why Choose Anuva?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Target size={32} />
                            </div>
                            <h3>Goal-Based Planning</h3>
                            <p>We start with your goals, not the market. Your aspirations define our investment strategy.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Shield size={32} />
                            </div>
                            <h3>Risk Management</h3>
                            <p>Preserving your capital is our priority. We employ strict risk protocols to protect your wealth.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp size={32} />
                            </div>
                            <h3>Data-Driven Insights</h3>
                            <p>No guesswork. Our recommendations are backed by rigorous research and market analysis.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users size={32} />
                            </div>
                            <h3>Fiduciary Standard</h3>
                            <p>We always act in your best interest. Transparency and integrity are the cornerstones of our practice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section text-center">
                <div className="container">
                    <h2>Ready to start your journey?</h2>
                    <p className="mb-4">Schedule a free consultation with our experts today.</p>
                    <a href="/schedule-call" className="btn btn-primary btn-lg">Book Discovery Call</a>
                </div>
            </section>
        </div>
    );
};

export default About;
