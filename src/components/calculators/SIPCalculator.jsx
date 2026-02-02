import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SIPCalculator = ({ onUpdate }) => {
    const [investment, setInvestment] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState({ invested: 0, gain: 0, total: 0 });

    const handleCalculate = () => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;
        const totalInvested = investment * months;

        // SIP Formula: P * [ (1+i)^n - 1 ] * (1+i) / i
        const futureValue = investment * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate) / monthlyRate;

        const res = {
            invested: Math.round(totalInvested),
            gain: Math.round(futureValue - totalInvested),
            total: Math.round(futureValue)
        };

        setResult(res);

        if (onUpdate) {
            onUpdate({
                type: 'SIP Calculator',
                inputs: {
                    'Monthly Investment': `₹${investment}`,
                    'Rate': `${rate}%`,
                    'Years': years
                },
                result: {
                    'Total Value': `₹${res.total.toLocaleString()}`,
                    'Invested': `₹${res.invested.toLocaleString()}`,
                    'Returns': `₹${res.gain.toLocaleString()}`
                }
            });
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []); // Run once on mount

    const data = [
        { name: 'Invested Amount', value: result.invested },
        { name: 'Est. Returns', value: result.gain },
    ];
    const COLORS = ['#9ca3af', '#00588f'];

    return (
        <div className="calculator-container">
            <h2>SIP Calculator</h2>
            <div className="calc-controls">
                <div className="input-group">
                    <label>Monthly Investment (₹)</label>
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="500" max="100000" step="500"
                        value={investment || 0}
                        onChange={(e) => setInvestment(Number(e.target.value))}
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
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary w-full mt-4" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>

            <div className="calc-result">
                <div className="result-cards">
                    <div className="res-card">
                        <span>Invested Amount</span>
                        <h3>₹{result.invested.toLocaleString()}</h3>
                    </div>
                    <div className="res-card">
                        <span>Est. Returns</span>
                        <h3 className="text-green">₹{result.gain.toLocaleString()}</h3>
                    </div>
                    <div className="res-card total">
                        <span>Total Value</span>
                        <h3>₹{result.total.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SIPCalculator;
