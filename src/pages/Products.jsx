import React from 'react';
import { Layers, TrendingUp, ShieldCheck, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    return (
        <div className="products-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Investment Products</h1>
                    <p className="page-subtitle">Curated financial instruments to build a robust portfolio.</p>
                </div>
            </div>

            <div className="container section">
                <div className="product-category">
                    <h2 className="category-title">Core Investments</h2>
                    <div className="products-grid">
                        <div className="product-card">
                            <div className="product-icon"><Layers size={32} /></div>
                            <h3>Mutual Funds</h3>
                            <p>Expertly selected funds across equity, debt, and hybrid categories to match your risk profile.</p>
                        </div>
                        <div className="product-card">
                            <div className="product-icon"><TrendingUp size={32} /></div>
                            <h3>Stocks (PMS)</h3>
                            <p>Direct equity exposure through professional Portfolio Management Services for higher growth potential.</p>
                        </div>
                    </div>
                </div>

                <div className="product-category">
                    <h2 className="category-title">Protection & Stability</h2>
                    <div className="products-grid">
                        <div className="product-card">
                            <div className="product-icon"><ShieldCheck size={32} /></div>
                            <h3>Insurance</h3>
                            <p>Comprehensive Term Life and Health Insurance plans from top providers to secure your family.</p>
                        </div>
                        <div className="product-card">
                            <div className="product-icon"><GraduationCap size={32} /></div>
                            <h3>Fixed Income</h3>
                            <p>Corporate deposits and bonds for stable, predictable returns with managed risk.</p>
                        </div>
                    </div>
                </div>

                <div className="advisory-note">
                    <h3>Need help choosing the right product?</h3>
                    <p>We don't just sell products; we recommend solutions that fit your financial plan.</p>
                    <Link to="/schedule-call" className="btn btn-primary sm">Talk to an Advisor</Link>
                </div>
            </div>
        </div>
    );
};

export default Products;
