import React, { useState, useCallback } from 'react';
import './Tools.css';
import '../components/calculators/Calculators.css';
import SIPCalculator from '../components/calculators/SIPCalculator';
import LumpsumCalculator from '../components/calculators/LumpsumCalculator';
import GoalCalculator from '../components/calculators/GoalCalculator';
import StepUpSIPCalculator from '../components/calculators/StepUpSIPCalculator';
import TargetSIPCalculator from '../components/calculators/TargetSIPCalculator';
import LimitedSIPCalculator from '../components/calculators/LimitedSIPCalculator';
import HLVCalculator from '../components/calculators/HLVCalculator';
import DiscoveryCallCTA from '../components/DiscoveryCallCTA';

const Tools = () => {
    const [activeTab, setActiveTab] = useState('sip');
    const [calculationData, setCalculationData] = useState(null);

    const onCalcUpdate = useCallback((data) => {
        setCalculationData(data);
    }, []);

    const tabs = [
        // SIP Variants
        { id: 'sip', label: 'SIP Calculator' },
        { id: 'stepup', label: 'Step-Up SIP' },
        { id: 'target', label: 'Target SIP' },
        { id: 'limited', label: 'Limited Period SIP' },
        // Lumpsum
        { id: 'lumpsum', label: 'Lumpsum Calculator' },
        // Goal Planners
        { id: 'education', label: 'Child Education' },
        { id: 'marriage', label: 'Child Marriage' },
        { id: 'house', label: 'Dream House' },
        { id: 'vacation', label: 'Dream Vacation' },
        { id: 'retirement', label: 'Retirement Plan' }, // Using Goal Calc logic for now
        // Tax & Insurance
        { id: 'insurance', label: 'Life Insurance' },
    ];

    return (
        <div className="tools-page">
            <div className="container section">
                <div className="tools-layout">
                    <div className="sidebar-wrapper">
                        <h3 className="sidebar-title">Financial Calculators</h3>

                        {/* Mobile Dropdown */}
                        {/* Mobile Dropdown (Custom Implementation) */}
                        <div className="mobile-tools-dropdown-container">
                            <div
                                className={`mobile-tools-dropdown ${activeTab ? 'selected' : ''}`}
                                onClick={() => document.getElementById('tools-dropdown-options').classList.toggle('show')}
                            >
                                {tabs.find(t => t.id === activeTab)?.label || 'Select Calculator'}
                            </div>
                            <div id="tools-dropdown-options" className="mobile-tools-options">
                                {tabs.map(tab => (
                                    <div
                                        key={tab.id}
                                        className={`mobile-tool-option ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            document.getElementById('tools-dropdown-options').classList.remove('show');
                                        }}
                                    >
                                        {tab.id === activeTab && <span className="check-icon">✓</span>}
                                        {tab.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop List */}
                        <div className="tools-sidebar desktop-sidebar">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`tool-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="tools-content">
                        {/* Title passed to components or handled internally */}
                        {activeTab === 'sip' && <SIPCalculator onUpdate={onCalcUpdate} />}
                        {activeTab === 'stepup' && <StepUpSIPCalculator onUpdate={onCalcUpdate} />}
                        {activeTab === 'target' && <TargetSIPCalculator onUpdate={onCalcUpdate} />}
                        {activeTab === 'limited' && <LimitedSIPCalculator onUpdate={onCalcUpdate} />}

                        {activeTab === 'lumpsum' && <LumpsumCalculator onUpdate={onCalcUpdate} />}

                        {/* Goal Wrappers */}
                        {activeTab === 'education' && <GoalCalculator title="Child Education Planning" defaultCost={2500000} defaultYears={15} defaultInflation={8} onUpdate={onCalcUpdate} />}
                        {activeTab === 'marriage' && <GoalCalculator title="Child Marriage Planning" defaultCost={5000000} defaultYears={20} defaultInflation={6} onUpdate={onCalcUpdate} />}
                        {activeTab === 'house' && <GoalCalculator title="Dream House Planning" defaultCost={10000000} defaultYears={10} defaultInflation={5} onUpdate={onCalcUpdate} />}
                        {activeTab === 'vacation' && <GoalCalculator title="Vacation Planning" defaultCost={500000} defaultYears={3} defaultInflation={5} onUpdate={onCalcUpdate} />}
                        {activeTab === 'retirement' && <GoalCalculator title="Retirement Planning" defaultCost={20000000} defaultYears={25} defaultInflation={6} onUpdate={onCalcUpdate} />}

                        {activeTab === 'insurance' && <HLVCalculator onUpdate={onCalcUpdate} />}

                        <div className="mt-12">
                            <DiscoveryCallCTA
                                title="Turn this calculation into your reality"
                                description="Let's get started"
                                buttonText="Invest Now"
                                activeTab={activeTab}
                                calculationData={calculationData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tools;
