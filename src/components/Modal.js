"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Modal.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Modal = ({ isOpen, onClose, crypto }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            if (!crypto) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_COIN_GECKO_COINS_API}/${crypto.id}/market_chart?vs_currency=usd&days=7`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
                const prices = data.prices.map(price => price[1]);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Price Over Time',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchChartData();
    }, [crypto]);

    if (!isOpen || !crypto) {
        return null;
    }

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Price: $${tooltipItem.raw.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price ($)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{crypto.name} Details</h2>
                <p><strong>Symbol:</strong> {crypto.symbol.toUpperCase()}</p>
                <p><strong>Last Price:</strong> ${crypto.current_price.toLocaleString()}</p>
                <p><strong>24H Change:</strong> {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                <p><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</p>
                {/* Chart */}
                <div className="chart-container">
                    {loading ? (
                        <p>Loading chart data...</p>
                    ) : error ? (
                        <p>Error loading chart data</p>
                    ) : (
                        <Line data={chartData} options={options} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
