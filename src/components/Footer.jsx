import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#FF6F00] text-center py-4"> {/* Updated background to orange */}
            <p className="text-white"> {/* Text color updated to white */}
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
