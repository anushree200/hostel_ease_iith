import React from "react";

const Footer = () => (
  <footer className="w-full bg-primary text-background py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-2 md:mb-0 text-sm md:text-base">
        <span className="font-semibold text-lg text-secondary">
          Hostel Ease
        </span>{" "}
        &copy; {new Date().getFullYear()}
      </div>
      <div className="flex space-x-4 text-sm">
        <a
          href="mailto:support@hostelease.com"
          className="hover:text-accent transition"
        >
          Contact Support
        </a>
        <a href="/privacy" className="hover:text-accent transition">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-accent transition">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
