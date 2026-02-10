import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ResultChart = ({ invested, returns, total, label1 = "Invested", label2 = "Returns" }) => {
    const data = [
        { name: label1, value: invested },
        { name: label2, value: returns },
    ];

    const COLORS = ['#60a5fa', '#b08d48']; // Lighter Blue (Invested), Gold (Returns)

    return (
        <div style={{ width: '100%', height: 280, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="75%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `₹${value.toLocaleString()}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span style={{ color: '#374151', fontWeight: 500, paddingLeft: '6px' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResultChart;
