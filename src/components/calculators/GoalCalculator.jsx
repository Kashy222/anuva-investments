import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const GoalCalculator = ({
    title = "Goal Planner",
    defaultCost = 5000000,
    defaultYears = 10,
    defaultInflation = 6,
    defaultReturn = 12,
    onUpdate
}) => {
    const [goalCost, setGoalCost] = useState(defaultCost);
    const [years, setYears] = useState(defaultYears);
    const [inflation, setInflation] = useState(defaultInflation);
    const [returnRate, setReturnRate] = useState(defaultReturn);
    const [result, setResult] = useState({ futureCost: 0, monthlySIP: 0 });

    const handleCalculate = () => {
        // 1. Calculate Future Cost of Goal
        const fv = goalCost * Math.pow((1 + inflation / 100), years);

        // 2. Calculate Monthly SIP required to reach FV
        const i = returnRate / 12 / 100;
        const months = years * 12;

        const sipFactor = ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        const sip = fv / sipFactor;

        const res = {
            futureCost: Math.round(fv),
            monthlySIP: Math.round(sip)
        };

        setResult(res);

        if (onUpdate) {
            onUpdate({
                type: title,
                inputs: {
                    'Current Cost': `₹${goalCost}`,
                    'Years': years,
                    'Inflation': `${inflation}%`,
                    'Return Rate': `${returnRate}%`
                },
                result: {
                    'Future Cost': `₹${res.futureCost.toLocaleString()}`,
                    'Required SIP': `₹${res.monthlySIP.toLocaleString()}`
                }
            });
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []); // Run once on mount

    const data = [
        { name: 'Current Cost', amount: goalCost },
        { name: 'Future Cost', amount: result.futureCost },
    ];

    return (
        <div className="calculator-container">
            <h2>{title}</h2>
            <div className="calc-controls">
                <div className="input-group">
                    <label>Current Cost of Goal (₹)</label>
                    <input
                        type="number"
                        value={goalCost}
                        onChange={(e) => setGoalCost(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Time to Goal (Years)</label>
                    <input
                        type="range"
                        min="1" max="30" step="1"
                        value={years || 0}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                    <div className="range-val">{years} Years</div>
                </div>

                <div className="input-group">
                    <label>Inflation Rate (%)</label>
                    <input
                        type="number"
                        value={inflation}
                        onChange={(e) => setInflation(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Expected Investment Return (%)</label>
                    <input
                        type="number"
                        value={returnRate}
                        onChange={(e) => setReturnRate(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary w-full mt-4" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>

            <div className="calc-result">
                <div className="result-cards">
                    <div className="res-card active-result" style={{ flex: 2 }}>
                        <span>Monthly Investment Required</span>
                        <h3>₹{result.monthlySIP.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="chart-wrapper" style={{ minHeight: '220px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '0.8rem' }} />
                            <ReTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Bar dataKey="amount" fill="#00588f" barSize={30} radius={[0, 5, 5, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 1 ? '#00588f' : '#9ca3af'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <p className="note text-center mt-2">
                    Future Cost of Goal: <strong>₹{result.futureCost.toLocaleString()}</strong>
                </p>
                <p className="hint text-center">
                    Due to {inflation}% inflation vs {returnRate}% returns
                </p>
            </div>
        </div>
    );
};

export default GoalCalculator;
