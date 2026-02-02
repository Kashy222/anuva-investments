import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const LimitedSIPCalculator = ({ onUpdate }) => {
    const [investment, setInvestment] = useState(10000);
    const [rate, setRate] = useState(12);
    const [investYears, setInvestYears] = useState(5); // Investment Period
    const [totalYears, setTotalYears] = useState(10); // Total Duration
    const [result, setResult] = useState({ invested: 0, gain: 0, total: 0 });

    // Ensure totalYears >= investYears
    useEffect(() => {
        if (totalYears < investYears) {
            setTotalYears(investYears);
        }
    }, [investYears, totalYears]);

    const handleCalculate = () => {
        const monthlyRate = rate / 12 / 100;
        const investMonths = investYears * 12;

        // 1. Calculate FV of SIP at end of investment period
        // SIP Formula: P * [ (1+i)^n - 1 ] * (1+i) / i
        const fvAtStop = investment * (Math.pow(1 + monthlyRate, investMonths) - 1) * (1 + monthlyRate) / monthlyRate;

        // 2. Compounding for the remaining period (Lumpsum)
        const remainingMonths = (totalYears - investYears) * 12;
        const finalValue = fvAtStop * Math.pow(1 + monthlyRate, remainingMonths);

        const totalInvested = investment * investMonths;

        const res = {
            invested: Math.round(totalInvested),
            gain: Math.round(finalValue - totalInvested),
            total: Math.round(finalValue)
        };

        setResult(res);

        if (onUpdate) {
            onUpdate({
                type: 'Limited Period SIP Calculator',
                inputs: {
                    'Monthly Investment': `₹${investment}`,
                    'Invest Period': `${investYears} Years`,
                    'Total Duration': `${totalYears} Years`,
                    'Rate': `${rate}%`
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
    }, []);

    const data = [
        { name: 'Invested Amount', value: result.invested },
        { name: 'Est. Returns', value: result.gain },
    ];
    const COLORS = ['#9ca3af', '#00588f'];

    return (
        <div className="calculator-container">
            <h2>Limited Period SIP</h2>
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
                    <label>Investment Period (Years)</label>
                    <input
                        type="number"
                        value={investYears}
                        onChange={(e) => setInvestYears(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="1" max="30" step="1"
                        value={investYears || 0}
                        onChange={(e) => setInvestYears(Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Total Duration (Years)</label>
                    <input
                        type="number"
                        value={totalYears}
                        onChange={(e) => setTotalYears(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min={investYears || 1} max="40" step="1"
                        value={totalYears || 0}
                        onChange={(e) => setTotalYears(Number(e.target.value))}
                    />
                    <p className="hint">Money stays invested for {Math.max(0, totalYears - investYears)} more years after SIP stops.</p>
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

export default LimitedSIPCalculator;
