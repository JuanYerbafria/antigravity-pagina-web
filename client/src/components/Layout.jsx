import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import FloatingQuoteButton from './FloatingQuoteButton';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {children}
            </main>
            <FloatingQuoteButton />
            <Footer />
        </div>
    );
};

export default Layout;
