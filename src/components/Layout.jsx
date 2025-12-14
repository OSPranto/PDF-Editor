// src/pages/Layout.jsx

import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
    Files, 
    Scissors, 
    RotateCw, 
    ImagePlus, 
    Minimize2, 
    PenTool, 
    Home,
    Menu,
    X,
    PhoneCall 
} from 'lucide-react'; 
import clsx from 'clsx';
import './Layout.css'; 

// ধরে নেওয়া হচ্ছে contactData.js থেকে এই import গুলো আসছে
// FOOTER_INFO-তে শুধুমাত্র কপিরাইট ডেটা ব্যবহার করা হচ্ছে
import { FOOTER_INFO } from '../constants/contactData'; 

// --- Single, Merged SIDEBAR_ITEMS Array ---
const SIDEBAR_ITEMS = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Files, label: 'Merge PDF', path: '/merge' },
    { icon: Scissors, label: 'Split PDF', path: '/split' },
    { icon: RotateCw, label: 'Rotate', path: '/rotate' },
    { icon: ImagePlus, label: 'Add Media', path: '/add-media' },
    { icon: Minimize2, label: 'Compress', path: '/compress' },
    { icon: PenTool, label: 'Edit PDF', path: '/edit' },
    // Contact Us remains in the nav 
    { icon: PhoneCall, label: 'Contact Us', path: '/contact' },
];


export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Get current page title (PC header রিমুভ হওয়ায় এখন এটি প্রয়োজন নেই, তবে কোডে থাকল)
    const currentItem = SIDEBAR_ITEMS.find(item => item.path === location.pathname);
    const pageTitle = currentItem ? currentItem.label : 'OSPranto Tech';

    return (
        <div className="app-container">
            
            {/* মোবাইল হেডার (লোগো এবং মেনু বাটন) */}
            <header className="mobile-header">
                <div className="logo-mobile">
                    <span className="logo-text-mobile">OSPranto Tech</span>
                </div>
                <button className="menu-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            
            <aside className={clsx("sidebar glass-panel", { "open": isSidebarOpen })}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <h1 className="logo-text">OSPranto Tech</h1>
                        <p className="tagline">Technology with a Sense of Ease</p> 
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {SIDEBAR_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) => clsx("nav-item", { active: isActive, 'bottom-nav-item': item.path === '/contact' })}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* --- কন্টাক্ট সেকশন সম্পূর্ণরূপে রিমুভ করা হয়েছে --- */}
                <div className="sidebar-footer">
                    <div className="copyright-info">
                        <p>{FOOTER_INFO.copyright}</p>
                        <p className="version">{FOOTER_INFO.version}</p>
                    </div>
                </div>
                {/* --- কন্টাক্ট সেকশন রিমুভ করা হয়েছে --- */}
            </aside>

            
            <main className="main-content">
                {/* PC/Desktop পেজ হেডিং সম্পূর্ণরূপে রিমুভ করা হয়েছে 
                    (কারণ এটি ডুপ্লিকেট হচ্ছিল এবং আপনি তা সরাতে চেয়েছেন) 
                */}

                <div className="content-scrollable">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && <div className="overlay" onClick={closeSidebar} />}
        </div>
    );
}
