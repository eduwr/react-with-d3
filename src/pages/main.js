import React from 'react';
import BarChart from '../charts/chart';


export default function Main() {
    return (
        <div className="wrapper">
            <h1>Brazil GDP</h1>
            <div className="chart" style={{height: '80vh'}}>
                <BarChart />
            </div>
        </div>
    )
}