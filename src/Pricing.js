import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './css/Pricing.css'

function Pricing() {
    return (
        <div className="container">
            <div className="plan">OUR PLANS</div>
            <div className="pricing-plan-container">
                <section className="pricing-plan ">
                    
                    <div className="pricing-plan-header">
                        <h1 className="pricing-plan-title">Free Plan</h1>
                        <h2 className="pricing-plan-summary">To get Started</h2>
                    </div>
                    <div className="pricing-plan-description">
                        <ul className="pricing-plan-list">
                            <li className="pricing-plan-feature"> 1 session/month</li>
                            <li className="pricing-plan-feature"> Free study Material</li>
                        </ul>
                    </div>
                    <div className="pricing-plan-actions">
                        <p className="pricing-plan-cost">Free</p>
                    
                        <Link className="pricing-plan-button" to="/studentpage">Start Now</Link> 
                        <p className="pricing-plan-text">Start your Journey with free plan</p>
                    </div>
                </section>
                <section className="pricing-plan pricing-plan-highlighted">
                    <div className="pricing-plan-special-text">Recommended</div>
                    <div className="pricing-plan-header">
                        <h1 className="pricing-plan-title">Starter Plan</h1>
                        <h2 className="pricing-plan-summary">Right Choice to get start</h2>
                    </div>
                    <div className="pricing-plan-description">
                        <ul className="pricing-plan-list">
                            <li className="pricing-plan-feature"> 10 personal guidance section per month</li>
                            <li className="pricing-plan-feature">Animation based Training</li>
                            <li className="pricing-plan-feature">Study planner on regular basis</li>
                            <li className="pricing-plan-feature">Test Analysis</li>
                        </ul>
                    </div>
                    <div className="pricing-plan-actions">
                        <p className="pricing-plan-cost">₹249</p>
                        <p className="pricing-plan-text">per month</p>
                        <Link className="pricing-plan-button" to="/studentpage">Start Now</Link> 
                        <p className="pricing-plan-text">Start your Journey with monthly Plan</p>
                    </div>
                </section>
                <section className="pricing-plan ">
                
                    <div className="pricing-plan-header">
                        <h1 className="pricing-plan-title">Starter Plan</h1>
                        <h2 className="pricing-plan-summary">For those getting started</h2>
                    </div>
                    <div className="pricing-plan-description">
                        <ul className="pricing-plan-list">
                        <li className="pricing-plan-feature"> 10 personal guidance section per month</li>
                            <li className="pricing-plan-feature">Animation based Training</li>
                            <li className="pricing-plan-feature">Study planner on regular basis</li>
                            <li className="pricing-plan-feature">Test Analysis</li>
                        </ul>
                    </div>
                    <div className="pricing-plan-actions">
                        <p className="pricing-plan-cost">₹2499</p>
                        <p className="pricing-plan-text">per year</p>
                        <Link className="pricing-plan-button" to="/studentpage">Start Now</Link> 
                        <p className="pricing-plan-text">Start your journey with yearly Plan</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Pricing
