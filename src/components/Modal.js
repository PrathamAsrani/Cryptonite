"use client";

import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, crypto }) => {
    if (!isOpen || !crypto) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{crypto.name} Details</h2>
                <p><strong>Symbol:</strong> {crypto.symbol.toUpperCase()}</p>
                <p><strong>Last Price:</strong> ${crypto.current_price.toLocaleString()}</p>
                <p><strong>24H Change:</strong> {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                <p><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};

export default Modal;
