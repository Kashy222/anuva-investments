import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './ScheduleCall.css';

const ScheduleCall = () => {
    const location = useLocation();
    const [calcContext, setCalcContext] = useState('');
    const [selectedService, setSelectedService] = useState('Financial Planning');

    useEffect(() => {
        if (location.state) {
            const { calculationData, activeTab } = location.state;

            // Set Service Context
            if (activeTab === 'insurance') setSelectedService('Insurance');
            else if (['sip', 'stepup', 'target', 'limited', 'lumpsum'].includes(activeTab)) setSelectedService('Investment Advisory');
            else if (['education', 'marriage', 'house', 'vacation', 'retirement'].includes(activeTab)) setSelectedService('Financial Planning');

            // Set Message Context
            if (calculationData) {
                let details = `\n\n*Calculation Details (${calculationData.type}):*`;
                for (const [key, value] of Object.entries(calculationData.inputs)) {
                    details += `\n- ${key}: ${value}`;
                }
                details += `\n\n*Result:*`;
                for (const [key, value] of Object.entries(calculationData.result)) {
                    details += `\n- ${key}: ${value}`;
                }
                setCalcContext(details);
            }
        }
    }, [location.state]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');

        let message = `*New Appointment Request*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A%0APlease confirm my booking.`;

        if (calcContext) {
            message += encodeURIComponent(calcContext);
        }

        const whatsappUrl = `https://wa.me/919892804546?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="schedule-page">
            <div className="split-layout">
                <div className="split-content bg-blue">
                    <div className="content-wrapper">
                        <h1>Let's Construct Your Financial Plan</h1>
                        <p>Schedule a complimentary 30-min discovery call to understand how we can help you achieve your financial goals.</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="icon-box"><Phone size={20} /></div>
                                <div>
                                    <span>Call Us <span className="contact-micro">(Tap to dial this phone number)</span></span>
                                    <p><a href="tel:+919892804546" className="contact-link">+91 9892804546</a></p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon-box"><MessageCircle size={20} /></div>
                                <div>
                                    <span>WhatsApp Us <span className="contact-micro">(Tap to send whatsapp message instantly)</span></span>
                                    <p><a href="https://wa.me/919892804546" target="_blank" rel="noopener noreferrer" className="contact-link">+91 9892804546</a></p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon-box"><Mail size={20} /></div>
                                <div>
                                    <span>Email Us <span className="contact-micro">(Tap to write a mail)</span></span>
                                    <p><a href="mailto:aabasalunkhe@gmail.com" className="contact-link">aabasalunkhe@gmail.com</a></p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon-box"><Calendar size={20} /></div>
                                <div>
                                    <span>Availability</span>
                                    <p>Mon - Sat, 10am - 7pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="split-content bg-white">
                    <div className="form-wrapper">
                        <h2>Book Appointment</h2>
                        <form className="booking-form" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input id="name" name="name" type="text" placeholder="John Doe" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input id="email" name="email" type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input id="phone" name="phone" type="tel" placeholder="+91 99999 99999" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="service">Service Interested In</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    <option>Financial Planning</option>
                                    <option>Investment Advisory</option>
                                    <option>Tax Planning</option>
                                    <option>Insurance</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary block">Confirm Booking</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCall;
