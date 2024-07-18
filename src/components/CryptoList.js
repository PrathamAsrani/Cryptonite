"use client";

import React, { useEffect, useState } from 'react';
import './CryptoList.css';

const CryptoList = ({ searchTerm }) => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_COIN_GECKO_API);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError('Received non-JSON response');
                }
                const data = await response.json();
                setCryptos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCryptoData();
    }, []);

    const filteredCryptos = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crypto-list">
            <h1>Trending Market</h1>
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Symbol</th>
                        <th>Last Price</th>
                        <th>24H Change</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCryptos.map(crypto => (
                        <tr key={crypto.id} className="crypto-item">
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol.toUpperCase()}</td>
                            <td>${crypto.current_price.toLocaleString()}</td>
                            <td className={crypto.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}>
                                {crypto.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td>${crypto.market_cap.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;
