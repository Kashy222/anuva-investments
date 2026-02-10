import React from 'react';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Business Owner",
        content: "Anuva Investments transformed my approach to wealth management. Their personalized SIP strategy helped me build a substantial corpus for my business expansion.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Software Architect",
        content: "I was always intimidated by the stock market. The team at Anuva patiently explained everything and created a risk-adjusted portfolio that gives me peace of mind.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Retired Banker",
        content: "Their retirement planning services are top-notch. They helped me structure my investments to generate a steady monthly income without eating into my capital.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section section bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">What Our Clients Say</h2>
                    <p className="section-subtitle">Trusted by hundreds of families to secure their financial future.</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((item) => (
                        <div key={item.id} className="testimonial-card">
                            <div className="quote-icon">
                                <Quote size={40} />
                            </div>
                            <p className="testimonial-content">"{item.content}"</p>
                            <div className="testimonial-footer">
                                <img src={item.image} alt={item.name} className="client-img" />
                                <div className="client-info">
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                    <div className="rating">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
