import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const StepUpSIPCalculator = ({ onUpdate }) => {
    const [investment, setInvestment] = useState(10000);
    const [stepUp, setStepUp] = useState(10); // Annual step up percentage
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState({ invested: 0, gain: 0, total: 0 });

    const handleCalculate = () => {
        let currentMonthlyParams = investment;
        let totalInvested = 0;
        let totalValue = 0;
        const monthlyRate = rate / 12 / 100;

        // Iterative calculation for accuracy with step-up
        // For each year
        for (let i = 0; i < years; i++) {
            // For each month in that year
            for (let j = 0; j < 12; j++) {
                // Future value of this specific month's investment for the remaining duration
                const monthsRemaining = (years * 12) - (i * 12 + j);
                const fv = currentMonthlyParams * Math.pow(1 + monthlyRate, monthsRemaining);
                totalValue += fv;
                totalInvested += currentMonthlyParams;
            }
            // Increase monthly investment for next year
            currentMonthlyParams = currentMonthlyParams * (1 + stepUp / 100);
        }

        const res = {
            invested: Math.round(totalInvested),
            gain: Math.round(totalValue - totalInvested),
            total: Math.round(totalValue)
        };

        setResult(res);

        if (onUpdate) {
            onUpdate({
                type: 'Step-Up SIP Calculator',
                inputs: {
                    'Initial Investment': `₹${investment}`,
                    'Step Up': `${stepUp}%`,
                    'Rate': `${rate}%`,
                    'Years': years
                },
                result: {
                    'Total Value': `₹${res.total.toLocaleString()}`,
                    'Total Invested': `₹${res.invested.toLocaleString()}`
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
            <h2>Step-Up SIP Calculator</h2>
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
                    <label>Annual Step-Up (%)</label>
                    <input
                        type="number"
                        value={stepUp}
                        onChange={(e) => setStepUp(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="0" max="50" step="1"
                        value={stepUp || 0}
                        onChange={(e) => setStepUp(Number(e.target.value))}
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

export default StepUpSIPCalculator;
