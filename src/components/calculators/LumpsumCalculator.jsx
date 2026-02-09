import React, { useState, useEffect } from 'react';
import ResultChart from './ResultChart';

const LumpsumCalculator = ({ onUpdate }) => {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState({ invested: 0, gain: 0, total: 0 });

    const handleCalculate = () => {
        // Lumpsum Formula: P * (1+r)^n
        const futureValue = investment * Math.pow((1 + rate / 100), years);

        const res = {
            invested: Math.round(investment),
            gain: Math.round(futureValue - investment),
            total: Math.round(futureValue)
        };

        setResult(res);

        if (onUpdate) {
            onUpdate({
                type: 'Lumpsum Calculator',
                inputs: {
                    'Total Investment': `₹${investment}`,
                    'Rate': `${rate}%`,
                    'Years': years
                },
                result: {
                    'Total Value': `₹${res.total.toLocaleString()}`,
                    'Returns': `₹${res.gain.toLocaleString()}`
                }
            });
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []); // Run once on mount

    return (
        <div className="calculator-container">
            <h2>Lumpsum Calculator</h2>
            <div className="calc-controls">
                <div className="input-group">
                    <label>Total Investment (₹)</label>
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="5000" max="10000000" step="1000"
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
                    <ResultChart invested={result.invested} returns={result.gain} total={result.total} />
                </div>
            </div>
        </div>
    );
};

export default LumpsumCalculator;
