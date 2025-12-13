// src/constants/contactData.js

// Ensure all icons used are imported here
import { Facebook, Mail, Github, Send } from 'lucide-react'; 

export const CONTACT_INFO = [
    { icon: Facebook, text: 'Adnan Hasan Pranto', link: 'https://www.facebook.com/AdnanHasanPranto' },
    { icon: Mail, text: 'OSPranto.Official@gmail.com', link: 'mailto:OSPranto.Official@gmail.com' },
    { icon: Github, text: 'OSPranto Tech', link: 'https://github.com/OSPranto' }, 
    { icon: Send, text: '@MrMysteryMoon (Telegram)', link: 'https://t.me/MrMysteryMoon' }, 
];

// Footer text can also be stored here
export const FOOTER_INFO = {
    copyright: '©OSPranto Tech 2025',
    version: 'v1.0.0'
};
