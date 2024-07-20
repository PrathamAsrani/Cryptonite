"use client";

import React, { useState } from 'react';
import CryptoList from '../components/CryptoList';
import Navbar from '../components/Navbar';

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            <CryptoList searchTerm={searchTerm} />
        </div>
    );
}

export default Page;
