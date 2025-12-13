import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // আপনার Layout.jsx এর সঠিক পথ নিশ্চিত করুন
import Home from './pages/Home';
import Merge from './pages/Merge';
import Split from './pages/Split';
import Rotate from './pages/Rotate';
import AddMedia from './pages/AddMedia';
import Edit from './pages/Edit';
import Compress from './pages/Compress';
// --- নতুন আমদানি ---
import ContactUs from './pages/ContactUs'; // নিশ্চিত করুন এই কম্পোনেন্টটি ./pages/ContactUs.jsx এ আছে
// --------------------

// Placeholder components for other routes
const Placeholder = ({ title }) => (
  <div className="glass-panel" style={{ padding: '2rem' }}>
    <h2>{title}</h2>
    <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Feature coming soon...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/split" element={<Split />} />
          <Route path="/rotate" element={<Rotate />} />
          <Route path="/add-media" element={<AddMedia />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/edit" element={<Edit />} />
          {/* --- Contact Us Route যোগ করা হলো --- */}
          <Route path="/contact" element={<ContactUs />} /> 
          {/* ---------------------------------- */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
