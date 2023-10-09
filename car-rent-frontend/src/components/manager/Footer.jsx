import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white md:py-10 ">
      <div className="container flex flex-col md:flex-row items-center justify-around">
        <p className="m-2">Head Office:123 Main Street, City, Country</p>
        <p className="m-2">Phone: +1 (123) 456-7890</p>
        <p className="m-2">Email: info@example.com</p>
      </div>
    </footer>
  );
};
export default Footer;
