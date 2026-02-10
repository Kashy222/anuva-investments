import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import './Home.css';
import Chatbot from '../components/Chatbot/Chatbot';
import Testimonials from '../components/Testimonials';

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const slides = [
        {
            id: 1,
            title: <>Your Partner in <br /><span className="text-gold">Financial Growth</span></>,
            subtitle: <>Helping you build prosperity safely <br /> & achieve your financial goals</>,
            image: "/hero-coins.png",
            primaryCta: { text: "Book Free Call", link: "/schedule-call" },
            secondaryCta: { text: "Explore Services", link: "/services" }
        },
        {
            id: 2,
            title: <>Smart Wealth <br /><span className="text-gold">Construction</span></>,
            subtitle: <>Scientific portfolio management designed <br /> for long-term compounding.</>,
            image: "/money-plant.png",
            primaryCta: { text: "Start Investing", link: "/tools" },
            secondaryCta: { text: "View Strategy", link: "/services" }
        },
        {
            id: 3,
            title: <>Legacy & <br /><span className="text-gold">Security</span></>,
            subtitle: <>Protecting your family's future with <br /> comprehensive insurance planning.</>,
            image: "/insurance-shield.png",
            primaryCta: { text: "Get Insured", link: "/tools" },
            secondaryCta: { text: "Learn More", link: "/services" }
        }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="home-page">
            {/* Hero Carousel Section */}
            <section className="hero-section carousel-mode">
                <div className="hero-pattern"></div>

                <div className="carousel-container">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
                        >
                            <div className="container hero-container">
                                <div className="hero-content">
                                    <h1 className="hero-title">{slide.title}</h1>
                                    <p className="hero-subtitle">{slide.subtitle}</p>
                                    <div className="hero-actions">
                                        <Link to={slide.primaryCta.link} className="btn btn-primary lg">{slide.primaryCta.text}</Link>
                                        <Link to={slide.secondaryCta.link} className="btn btn-secondary lg text-white border-white hover-gold">{slide.secondaryCta.text}</Link>
                                    </div>
                                </div>

                                <div className="hero-visual">
                                    <img src={slide.image} alt="Financial Growth" className="hero-image-main" />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="carousel-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item vertical">
                            <div className="icon-box-large">
                                <img src="/icon-clients.png" alt="Happy Clients" className="stat-icon-img" />
                            </div>
                            <div className="stat-text-single-line">
                                <strong>200+</strong> Happy Clients
                            </div>
                        </div>

                        <div className="stat-item vertical">
                            <div className="icon-box-large">
                                <img src="/icon-assets.png" alt="Assets Managed" className="stat-icon-img" />
                            </div>
                            <div className="stat-text-single-line">
                                <strong>₹1,070 L</strong> Assets Managed
                            </div>
                        </div>

                        <div className="stat-item vertical">
                            <div className="icon-box-large">
                                <img src="/icon-experience.png" alt="Experience" className="stat-icon-img" />
                            </div>
                            <div className="stat-text-single-line">
                                <strong>17+ Years</strong> Experience
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="section bg-off-white">
                <div className="container">
                    <h2 className="section-title">Why Choose Anuva?</h2>
                    <p className="section-subtitle">We believe in a process-driven approach, not product-pushing. Your financial wellbeing is our top priority.</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><CheckCircle size={32} /></div>
                            <h3>Unbiased Advice</h3>
                            <p>We are fiduciaries, meaning we always act in your best interest, free from conflict.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><TrendingUp size={32} /></div>
                            <h3>Data-Driven</h3>
                            <p>Our strategies are backed by rigorous research and market analysis.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><Shield size={32} /></div>
                            <h3>Secure & Safe</h3>
                            <p>Your data and investments are protected with bank-grade security protocols.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Comprehensive Services</h2>
                    <p className="section-subtitle">From retirement planning to tax optimization, we cover every aspect of your financial life.</p>

                    <div className="services-preview">
                        <div className="service-preview-item">
                            <h3>Financial Planning</h3>
                            <p>Create a roadmap for your life goals—retirement, education, and wealth creation.</p>
                            <Link to="/services" className="learn-more">Learn more <ArrowRight size={16} /></Link>
                        </div>
                        <div className="service-preview-item">
                            <h3>Multi-Asset Investing</h3>
                            <p>Diversified portfolios across mutual funds, stocks, and bonds tailored to your risk profile.</p>
                            <Link to="/services" className="learn-more">Learn more <ArrowRight size={16} /></Link>
                        </div>
                        <div className="service-preview-item">
                            <h3>Tracking & Review</h3>
                            <p>Regular monitoring and rebalancing to keep you on track towards your objectives.</p>
                            <Link to="/tools" className="learn-more">Learn more <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-container">
                    <div className="cta-content">
                        <h2>Ready to get Financially Fit?</h2>
                        <p>Schedule a complimentary 30-minute consultation with our experts to review your current financial health.</p>
                    </div>
                    <Link to="/schedule-call" className="btn btn-primary lg">Book Free Call</Link>
                </div>
            </section>

            <Chatbot />
        </div>
    );
};

export default Home;
