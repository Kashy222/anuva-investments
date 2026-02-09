import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, MessageCircle, CheckCircle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './ScheduleCall.css';

const ScheduleCall = () => {
    const location = useLocation();
    const [calcContext, setCalcContext] = useState('');
    const [selectedService, setSelectedService] = useState('Financial Planning');

    // Form States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);

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

    // Handle Countdown and Auto-Close
    useEffect(() => {
        let timer;
        if (isSuccess && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (isSuccess && countdown === 0) {
            // Auto close after countdown
            handleClosePopup();
        }
        return () => clearInterval(timer);
    }, [isSuccess, countdown]);

    const handleClosePopup = () => {
        setIsSuccess(false);
        setCountdown(5);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting || isSuccess) return;

        setIsSubmitting(true);
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');

        // Prepare data for Google Sheets
        const leadData = {
            date: new Date().toISOString(),
            name,
            email,
            phone,
            service,
            context: calcContext || ''
        };

        // Send data to Google Sheets
        try {
            await fetch('https://script.google.com/macros/s/AKfycbxSygxZE1KP_QPlqI5wSF5rozmEz3tO_38ijZlsYNwgQcUMycKydsYkw3_7ozj1iopjJA/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leadData)
            });

            // Show success overlay
            setIsSuccess(true);
            setCountdown(5);

        } catch (error) {
            console.error('Error saving lead:', error);
        } finally {
            setIsSubmitting(false);
        }

        // WhatsApp redirection removed as per request
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
                                <input id="name" name="name" type="text" placeholder="John Doe" required disabled={isSubmitting || isSuccess} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isSubmitting || isSuccess} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input id="phone" name="phone" type="tel" placeholder="+91 99999 99999" required disabled={isSubmitting || isSuccess} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="service">Service Interested In</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    disabled={isSubmitting || isSuccess}
                                >
                                    <option>Financial Planning</option>
                                    <option>Investment Advisory</option>
                                    <option>Tax Planning</option>
                                    <option>Insurance</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary block`}
                                disabled={isSubmitting || isSuccess}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>

                        {/* Success Overlay */}
                        {isSuccess && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '3rem',
                                textAlign: 'center',
                                zIndex: 10,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                gap: '1.5rem'
                            }}>
                                <button
                                    onClick={handleClosePopup}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#6B7280',
                                        padding: '5px'
                                    }}
                                >
                                    <X size={28} />
                                </button>

                                <div style={{ color: '#10B981', marginBottom: '0.5rem' }}>
                                    <CheckCircle size={80} strokeWidth={1.5} />
                                </div>

                                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                                    Booking Confirmed!
                                </h3>

                                <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '320px', margin: 0 }}>
                                    Your details are successfully shared.<br />You will be soon contacted from the team.
                                </p>

                                <div style={{
                                    marginTop: '2rem',
                                    fontSize: '0.9rem',
                                    color: '#9CA3AF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    closing this popup in <span style={{ fontWeight: '600', color: '#6B7280' }}>{countdown} sec</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCall;
