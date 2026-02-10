import React, { useState, useEffect } from 'react';
import ResultChart from './ResultChart';

const TargetSIPCalculator = ({ onUpdate }) => {
    const [targetAmount, setTargetAmount] = useState(10000000); // 1 Crore default
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [monthlySIP, setMonthlySIP] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);

    const handleCalculate = () => {
        // PV = 0
        // FV = P * [ (1+i)^n - 1 ] * (1+i) / i
        // So, P = FV / ( [ (1+i)^n - 1 ] * (1+i) / i )

        const i = rate / 12 / 100;
        const n = years * 12;

        const factor = ((Math.pow(1 + i, n) - 1) * (1 + i)) / i;
        const sip = targetAmount / factor;
        const invested = sip * n;

        setMonthlySIP(Math.round(sip));
        setTotalInvested(Math.round(invested));

        if (onUpdate) {
            onUpdate({
                type: 'Target SIP Calculator',
                inputs: {
                    'Target Amount': `₹${targetAmount}`,
                    'Rate': `${rate}%`,
                    'Years': years
                },
                result: {
                    'Required SIP': `₹${Math.round(sip).toLocaleString()}`,
                    'Total Invested': `₹${Math.round(invested).toLocaleString()}`
                }
            });
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []);

    const estReturns = Math.max(0, targetAmount - totalInvested);

    return (
        <div className="calculator-container">
            <h2>Target SIP Calculator</h2>
            <div className="calc-controls">
                <div className="input-group">
                    <label>Target Amount (₹)</label>
                    <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Expected Return Result (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="1" max="30" step="0.5"
                        value={rate || 0}
                        onChange={(e) => setRate(Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Time Period (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="1" max="40" step="1"
                        value={years || 0}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary w-full mt-4" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>

            <div className="calc-result">
                <div className="result-cards">
                    <div className="res-card active-result">
                        <span>Required Monthly SIP</span>
                        <h3>₹{monthlySIP.toLocaleString()}</h3>
                    </div>
                    <div className="res-card">
                        <span>Total Goal Amount</span>
                        <h3>₹{Number(targetAmount).toLocaleString()}</h3>
                    </div>
                </div>

                <div className="chart-wrapper">
                    <ResultChart invested={totalInvested} returns={estReturns} total={targetAmount} />
                </div>
                <div className="calculator-summary">
                    <div className="summary-row">
                        <span>Target Goal Amount</span>
                        <strong>₹{Number(targetAmount).toLocaleString()}</strong>
                    </div>
                    <div className="summary-hint">
                        You need to invest <strong>₹{monthlySIP.toLocaleString()}/mo</strong> for <strong>{years} years</strong> (at {rate}%)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetSIPCalculator;
