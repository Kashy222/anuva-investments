import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Cell } from 'recharts';

const HLVCalculator = ({ onUpdate }) => {
    const [annualIncome, setAnnualIncome] = useState(1000000);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [savings, setSavings] = useState(500000); // Existing savings/insurance
    const [insuranceNeeded, setInsuranceNeeded] = useState(0);
    const [totalFutureIncome, setTotalFutureIncome] = useState(0);

    const handleCalculate = () => {
        // Income Replacement Method
        const yearsToWork = Math.max(0, retirementAge - currentAge);
        const totalIncome = annualIncome * yearsToWork;
        const required = Math.max(0, totalIncome - savings);

        setTotalFutureIncome(totalIncome);
        setInsuranceNeeded(Math.round(required));

        if (onUpdate) {
            onUpdate({
                type: 'Life Insurance (HLV)',
                inputs: {
                    'Annual Income': `₹${annualIncome}`,
                    'Current Age': currentAge,
                    'Retirement Age': retirementAge,
                    'Existing Cover': `₹${savings}`
                },
                result: {
                    'Future Income': `₹${totalIncome.toLocaleString()}`,
                    'Additional Needed': `₹${Math.round(required).toLocaleString()}`
                }
            });
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []);

    const data = [
        { name: 'Total Future Income', amount: totalFutureIncome },
        { name: 'Existing Cover', amount: savings },
        { name: 'Additional Needed', amount: insuranceNeeded },
    ];

    return (
        <div className="calculator-container">
            <h2>Life Insurance (HLV)</h2>
            <div className="calc-controls">
                <div className="input-group">
                    <label>Annual Income (₹)</label>
                    <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Current Age</label>
                    <input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="18" max="60" step="1"
                        value={currentAge || 0}
                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Retirement Age</label>
                    <input
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Existing Savings / Insurance (₹)</label>
                    <input
                        type="number"
                        value={savings}
                        onChange={(e) => setSavings(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary w-full mt-4" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>

            <div className="calc-result">
                <div className="result-cards">
                    <div className="res-card active-result" style={{ flex: 2 }}>
                        <span>Additional Life Cover Needed</span>
                        <h3>₹{insuranceNeeded.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="chart-wrapper" style={{ minHeight: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '0.8rem' }} />
                            <ReTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Bar dataKey="amount" fill="#00588f" barSize={30} radius={[0, 5, 5, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 2 ? '#dba73d' : '#00588f'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <p className="note text-center mt-2">
                    Based on <strong>{Math.max(0, retirementAge - currentAge)}</strong> working years remaining.
                </p>
            </div>
        </div>
    );
};

export default HLVCalculator;
