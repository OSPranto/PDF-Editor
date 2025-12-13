// src/pages/ContactUs.jsx

import React from 'react';
import clsx from 'clsx'; // For conditional CSS classes
// Path ঠিক করুন: আপনার contactData.js ফাইলটি যেখানে আছে, সেই অনুযায়ী path দিন।
import { CONTACT_INFO, FOOTER_INFO } from '../constants/contactData'; 
import { Mail, Send, Facebook, Github } from 'lucide-react'; // নিশ্চিত করুন যে এই আইকনগুলো আপনার contactData.js এ ব্যবহৃত হয়েছে

// লোগো আইকনের ক্লাসগুলোর জন্য ফাংশন
const getIconClass = (text) => {
    if (text.includes('Email')) return 'bg-red';
    if (text.includes('Telegram')) return 'bg-blue-sky';
    if (text.includes('Facebook')) return 'bg-blue-dark';
    if (text.includes('GitHub')) return 'bg-green';
    return ''; 
};

export default function ContactUs() {
    
    // মেইল সেন্ড ফাংশন (Mailto ব্যবহার করে, আপনার পূর্বের HTML-এর মতো)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value;

        // মেইল বডি তৈরি
        const emailBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`;
        
        // মেইলটো লিঙ্ক তৈরি করে রিডাইরেক্ট করা
        const mailtoLink = `mailto:OSPranto.Official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoLink;
        e.target.reset(); // ফর্ম রিসেট
    };


    return (
        <div className="contact-us-page">
            
            {/* Contact Page Title (Layout.jsx header এ দেখানো হবে) */}
            
            {/* মূল গ্রিড লেআউট - শুধুমাত্র বডি কন্টেন্ট */}
            <div className="grid-layout">
                
                {/* ১. বার্তা পাঠান ফর্ম */}
                <div className="card">
                    <h2 className="card-heading">বার্তা পাঠান</h2>
                    <form onSubmit={handleFormSubmit} id="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">আপনার নাম</label>
                            <input type="text" id="name" placeholder="আপনার নাম লিখুন" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">ইমেল ঠিকানা</label>
                            <input type="email" id="email" placeholder="আপনার ইমেল লিখুন" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">বিষয়</label>
                            <input type="text" id="subject" placeholder="বিষয় লিখুন" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">বার্তা</label>
                            <textarea id="message" rows="5" placeholder="আপনার বার্তা লিখুন" required></textarea>
                        </div>
                        <button type="submit" className="btn-primary form-submit-btn">
                            বার্তা পাঠান
                        </button>
                    </form>
                </div>

                {/* ২. ডেভেলপার কন্টাক্ট তথ্য কার্ড */}
                <div className="card">
                    <h2 className="card-heading">ডেভেলপার কন্টাক্ট (OSPranto Tech)</h2>

                    {CONTACT_INFO.map((item, index) => {
                        // Dynamically determine the title based on the text/link from contactData.js
                        const title = item.text.includes('Email') ? 'Email (Primary)' :
                                      item.text.includes('Telegram') ? 'Telegram' :
                                      item.text.includes('Facebook') ? 'Facebook' :
                                      item.text.includes('GitHub') ? 'GitHub' : 'Contact Link';

                        return (
                            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="info-link">
                                {/* info-icon এবং bg-কালার ক্লাসগুলো CSS থেকে আসবে */}
                                <div className={clsx("info-icon", getIconClass(title))}>
                                    <item.icon size={24} /> 
                                </div>
                                <div className="info-content">
                                    <h3>{title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
