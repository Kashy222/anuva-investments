import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

    const data = [
        { name: 'Invested Amount', value: totalInvested },
        { name: 'Est. Returns', value: Math.max(0, targetAmount - totalInvested) },
    ];
    const COLORS = ['#9ca3af', '#00588f'];

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
                <p className="note text-center mt-4">
                    To reach <strong>₹{Number(targetAmount).toLocaleString()}</strong> in <strong>{years} years</strong> at <strong>{rate}%</strong>.
                </p>
            </div>
        </div>
    );
};

export default TargetSIPCalculator;
