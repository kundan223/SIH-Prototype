import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-yellow-400 text-center py-4">
            <p className="text-gray-800">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
