import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronRight, Check } from 'lucide-react';
import { submitToGoogleSheets } from '../../utils/googleSheets';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 I'm Anuva's smart assistant.", sender: 'bot' },
        { id: 2, text: "I can help you plan your investments or insurance. May I know your name?", sender: 'bot' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [step, setStep] = useState('NAME'); // NAME, SERVICE, DETAILS, AMOUNT, CONTACT, END
    const [leadData, setLeadData] = useState({
        name: '',
        service: '',
        details: '',
        phone: ''
    });
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const newUserMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setUserInput('');
        setIsTyping(true);

        // Simulate processing delay
        setTimeout(() => {
            processBotResponse(text);
        }, 800);
    };

    const processBotResponse = async (text) => {
        let nextStep = step;
        let botResponses = [];

        switch (step) {
            case 'NAME':
                setLeadData(prev => ({ ...prev, name: text }));
                botResponses.push({ text: `Nice to meet you, ${text}! 😊`, sender: 'bot' });
                botResponses.push({
                    text: "What are you looking for today?",
                    sender: 'bot',
                    type: 'options',
                    options: ['SIP / Investment', 'Lumpsum', 'Insurance', 'Tax Planning', 'Other']
                });
                nextStep = 'SERVICE';
                break;

            case 'SERVICE':
                setLeadData(prev => ({ ...prev, service: text }));
                botResponses.push({ text: `Great choice! ${text} is a smart move. 🚀`, sender: 'bot' });
                botResponses.push({ text: "Could you tell me a bit more? Like your planned amount or specific goal?", sender: 'bot' });
                nextStep = 'DETAILS';
                break;

            case 'DETAILS':
                setLeadData(prev => ({ ...prev, details: text }));
                botResponses.push({ text: "Got it. Thanks for sharing.", sender: 'bot' });
                botResponses.push({ text: "Please share your 10-digit mobile number so our expert can send you the best plans.", sender: 'bot' });
                nextStep = 'CONTACT';
                break;

            case 'CONTACT':
                if (/^\d{10}$/.test(text)) {
                    const finalData = { ...leadData, phone: text };
                    setLeadData(finalData);
                    botResponses.push({ text: "Perfect! 🌟", sender: 'bot' });
                    botResponses.push({ text: "I'm sending your request to our team now...", sender: 'bot' });

                    // Submit to Google Sheets
                    submitToGoogleSheets({
                        date: new Date().toISOString(),
                        name: finalData.name,
                        service: finalData.service,
                        phone: finalData.phone,
                        email: 'Not provided (Chat)',
                        context: `Chatbot Goal: ${finalData.details}`
                    });

                    botResponses.push({ text: "Done! Our financial expert will call you shortly. Have a wonderful day!", sender: 'bot' });
                    nextStep = 'END';
                } else {
                    botResponses.push({ text: "Hmm, that doesn't look like a valid 10-digit number. Please try again.", sender: 'bot' });
                    nextStep = 'CONTACT'; // Stay on same step
                }
                break;

            case 'END':
                botResponses.push({ text: "Is there anything else I can help you with?", sender: 'bot' });
                break;

            default:
                break;
        }

        setStep(nextStep);
        setIsTyping(false);
        setMessages(prev => [...prev, ...botResponses.map((msg, i) => ({ ...msg, id: Date.now() + i }))]);
    };

    const handleOptionClick = (option) => {
        handleSendMessage(option);
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
            {/* Toggle Button */}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="avatar">AI</div>
                        <div className="header-info">
                            <h3>Anuva Assistant</h3>
                            <span>Online</span>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.sender === 'bot' && <div className="bot-icon">AI</div>}
                                <div className="bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {/* Render Options if last message has them */}
                        {messages.length > 0 && messages[messages.length - 1].type === 'options' && (
                            <div className="options-container">
                                {messages[messages.length - 1].options.map(opt => (
                                    <button key={opt} className="option-btn" onClick={() => handleOptionClick(opt)}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                        {isTyping && (
                            <div className="message bot">
                                <div className="bot-icon">AI</div>
                                <div className="bubble typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder={step === 'CONTACT' ? "Enter mobile number..." : "Type a message..."}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
                            disabled={step === 'END' || (messages.length > 0 && messages[messages.length - 1].type === 'options')}
                        />
                        <button onClick={() => handleSendMessage(userInput)} disabled={!userInput.trim()}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
