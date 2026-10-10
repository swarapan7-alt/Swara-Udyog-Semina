# Swara Udyog Samuh - E-Seva Business Growth Training (स्वरा उद्योग समूह)

A high-converting, mobile-first landing page and participant management portal for **Swara Udyog Samuh's E-Seva Business Growth Training** (Brand: Swara Communication).

---

## 1. Event & Organization Overview

- **Organizer:** Swara Udyog Samuh (स्वरा उद्योग समूह)
- **Brand:** Swara Communication
- **Event:** E-Seva Business Growth Training 2026
- **Dates:** 17 and 18 October 2026 (१७ आणि १८ ऑक्टोबर २०२६)
- **Days:** Saturday and Sunday (शनिवार आणि रविवार)
- **Time:** 10:00 AM to 5:00 PM on both days
- **Venue:** Hotel Season Four, Vishrambag, Sangli, Maharashtra, India
- **Office Address:** Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli, Maharashtra, India.
- **Seat Booking Fee:** ₹499 (Payable upfront to secure seat)
- **Total Training Fee:** ₹3,499
- **Remaining Balance:** ₹3,000 (Payable at venue on 17 October or per organizer instructions)
- **Official Payment Link:** `https://rzp.io/rzp/qd8t2V5`
- **Included:** Tea & breakfast, buffet lunch at Hotel Season Four, practical hands-on training, training completion certificate, digital notes, and private community support.

---

## 2. Design System & New Color Palette

The interface features a vibrant, distinctive premium palette configured via CSS variables (`src/index.css`):
- **Primary:** Rich Teal (`#0F766E`, `#115E59`) and Emerald Green (`#059669`, `#10B981`)
- **Secondary:** Coral and Warm Orange (`#EA580C`, `#F97316`)
- **Accent:** Electric Turquoise (`#06B6D4`) and Soft Champagne (`#FEF3C7`)
- **Background:** Warm Ivory (`#FAF9F6`) and Light Mint (`#F0FDF4`)
- **Text:** Deep Forest Green (`#064E3B`) and Charcoal (`#1E293B`)
- **Typography:** Mukta / Noto Sans Devanagari for Marathi headings and body text; Poppins for numbers, labels, and buttons.

---

## 3. Key Components & Features

### 📢 Continuous Event Announcement Strip
- Located directly below the header.
- Loops smoothly from right to left with event date, training time, Sangli venue, ₹499 booking offer, and CTA.
- Pauses on hover where supported.
- Respects `prefers-reduced-motion` with an accessible static layout.

### 🌟 Hero Section with 3D-Style Elements
- Expressive Marathi headline and prominent date & time badges.
- Clearly displays ₹499 booking fee, ₹3,499 total fee, and ₹3,000 remaining balance.
- Replaceable hero image controlled through the admin panel.
- Tasteful floating 3D-style glass badges representing digital services, live practice, and income growth.

### 💳 Direct Razorpay Payment
- All booking buttons trigger the exact external URL: `https://rzp.io/rzp/qd8t2V5` with `target="_blank"` and `rel="noopener noreferrer"`.
- URL is fully editable in the admin settings to allow instant updates without code modifications.

### 🏢 Venue & Office Address Display
- Shows both the **Hotel Season Four** training venue and the **Swara Communication, BJP Office Basement** registered office address.
- Interactive Google Maps button.
- Editable contact phone and WhatsApp number in the admin panel.

### 🔐 Secure Admin Panel (`/admin`)
- **Authentication:** Username `admin` (or `swarapan7@gmail.com`).
- **Zero Plaintext Password in Code:** Uses Web Crypto API (`SHA-256` with random salt).
- **First-Login Password Change Enforcement:** Requires setting a strong personalized password upon initial access. Never stores or logs plaintext passwords.
- **Dashboard Modules:**
  1. Overview: Live stats (registrations, verified collections, pending venue balance, seats remaining).
  2. Registrations: Search, filter by status, toggle verification, internal notes, delete, and CSV export.
  3. Payments: Track ₹499 bookings, ₹3,000 venue balances, and UTR / transaction IDs.
  4. Event Details: Edit dates, times, venue, office address, and fees.
  5. Image Manager: Upload, preview, replace, or reset hero image, logo, and trainer photo.
  6. Content Editor: Edit Marathi headlines, descriptions, topics, and FAQs.
  7. Settings: Update Razorpay URL, registration open/closed toggle, change admin password.

---

## 4. Verification & Testing Checklist

- [x] **New Palette:** Replaced purple-heavy styling with rich teal, emerald green, warm coral, and soft champagne.
- [x] **Continuous Announcement Strip:** Smooth right-to-left marquee below header, pauses on hover, respects reduced motion.
- [x] **Hero 3D Floating Elements:** Floating glass badges for income growth and hands-on practice.
- [x] **Office Address:** Initialized with `Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli`.
- [x] **Contact Phone:** Editable in admin panel without invented digits.
- [x] **Razorpay Link:** Every booking button links directly to `https://rzp.io/rzp/qd8t2V5`.
- [x] **Admin Route Security:** No plaintext passwords in frontend bundle or source code; password change enforced on first login.
- [x] **Data Persistence:** Settings, participants, and image uploads persist across reloads.
