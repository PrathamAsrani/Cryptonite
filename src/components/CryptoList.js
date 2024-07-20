"use client";

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './CryptoList.css';

const CryptoList = ({ searchTerm }) => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

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

    const handleCryptoClick = (crypto) => {
        setSelectedCrypto(crypto);
    };

    const handleCloseModal = () => {
        setSelectedCrypto(null);
    };

    return (
        <div className="crypto-list">
            <h1>Trending Market</h1>
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th className="desktop-only">Symbol</th>
                        <th>Last Price</th>
                        <th>24H Change</th>
                        <th className="desktop-only">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCryptos.map(crypto => (
                        <tr key={crypto.id} className="crypto-item" onClick={() => handleCryptoClick(crypto)}>
                            <td>{crypto.name}</td>
                            <td className="desktop-only">{crypto.symbol.toUpperCase()}</td>
                            <td>${crypto.current_price.toLocaleString()}</td>
                            <td className={crypto.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}>
                                {crypto.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td className="desktop-only">${crypto.market_cap.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={!!selectedCrypto} onClose={handleCloseModal} crypto={selectedCrypto} />
        </div>
    );
};

export default CryptoList;
