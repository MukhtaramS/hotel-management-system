<p align="center">
  <img src="logo.png" width="120" alt="Hotel Logo"/>
</p>
<h1 align="center">Hotel Booking Platform</h1>
<p align="center">
  <img src="https://img.shields.io/badge/React-18+-blue?logo=react"/>
  <img src="https://img.shields.io/badge/Supabase-Backend-green?logo=supabase"/>
  <img src="https://img.shields.io/badge/React_Query-Latest-red"/>
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite"/>
</p>
<p align="center">
  A modern, user-friendly hotel booking platform designed to provide guests with 
  <b>seamless room discovery, real-time availability, and secure  reservations</b>.
</p>

---

<p align="center">
  <img src="HotelWebsiteGif.gif" width="700" alt="Booking Platform Preview"/>
</p>


---

## 📖 About

This **Hotel Booking Platform** is the guest-facing interface of a comprehensive hotel management system, developed during my Bachelor studies at the University of Central Asia. The platform addresses the growing need for digital transformation in Kyrgyzstan's hospitality industry by providing travelers with an intuitive, efficient way to discover and book hotel accommodations.

Unlike traditional booking methods that rely on phone calls or third-party platforms, this system provides:
- **Direct booking** with real-time room availability
- **Transparent pricing** with no hidden fees
- **Secure payment processing** for peace of mind
- **Interactive room selection** to choose exactly what you want
- **Multi-language support** (English & Russian) for diverse travelers


## ✨ Key Features

### For Guests
- **🔍 Smart Search & Filtering** - Find rooms by dates, capacity, price range, and amenities
- **🗺️ Interactive Room Selection** - Visual room map for choosing your preferred location
- **⚡ Real-Time Availability** - Instant updates prevent double-bookings and booking conflicts
- **💳 Secure Online Payments** - Multiple payment options with encrypted transactions
- **🌍 Multi-Language Support** - Full interface in English and Russian
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **⭐ Guest Reviews** - Read authentic reviews from previous guests
- **🏨 Detailed Room Information** - Complete descriptions, pricing, photos, and amenities
- **✅ Instant Booking Confirmation** - Receive immediate confirmation and booking details
- **🔐 Secure User Accounts** - Manage bookings and personal information safely

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern component-based UI framework
- **React Router Dom** - Dynamic client-side routing
- **Styled Components** - CSS-in-JS for modular, maintainable styles
- **React Query** - Powerful data fetching and state management
- **React Hook Form** - Efficient form handling with validation
- **React Hot Toast** - Beautiful toast notifications
- **Vite** - Lightning-fast build tool and dev server

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **PostgreSQL** - Robust relational database for data storage
- **Real-time Subscriptions** - Live updates for room availability

### Data Visualization
- **Recharts** - Interactive charts for pricing trends and availability

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Supabase account and project setup

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hotel-booking-client.git
cd hotel-booking-client

# Install dependencies
npm install
# or
yarn install

# Configure environment variables
cp .env.example .env
# Add your Supabase URL and API key to .env

# Start development server
npm run dev
# or
yarn dev

# Open http://localhost:5173 in your browser
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Building for Production

```bash
npm run build
# or
yarn build

# Preview production build
npm run preview
```

## 📱 User Journey

### 1. **Browse Available Rooms**
   - View all available accommodations with photos and details
   - Filter by dates, capacity, price, and amenities
   - Compare different room types side-by-side

### 2. **Select Your Perfect Room**
   - Use the interactive room map to choose your preferred location
   - View real-time availability and pricing
   - Read reviews from previous guests

### 3. **Secure Your Booking**
   - Fill in guest information quickly with our streamlined form
   - Choose your payment method (online or pay at hotel)
   - Review booking summary before confirming

### 4. **Receive Confirmation**
   - Get instant booking confirmation
   - Access booking details anytime from your account
   - Receive reminder notifications before check-in

## 🎯 Project Context

### Background
This project was developed during my studies at the **University of Central Asia** as a comprehensive solution to modernize hotel management and booking systems.

### Research Focus
Development and Implementation of a Web Application for Hotel Management & Booking System

**Problem Statement:** Hotels often rely on manual booking processes, phone reservations, and third-party platforms that charge high commissions (15-20%). This creates inefficiencies, data inconsistencies, overbooking risks, and reduced profit margins for hotel owners.

**Solution:** A comprehensive digital platform that enables hotels to manage their own bookings directly, eliminating middlemen fees, providing real-time updates, and offering a superior guest experience through modern web technology.

### Impact on Tourism Industry
The hospitality industry is experiencing rapid digital transformation. This platform supports that growth by:
- Reducing operational costs for hotels
- Improving booking efficiency and accuracy
- Enhancing guest experience with modern, intuitive interfaces
- Enabling direct customer relationships for hotels

## 📸 Screenshots

<p align="center">
  <img src="screenshots/home-page.png" width="250" alt="Home Page"/>
  <img src="screenshots/room-search.png" width="250" alt="Room Search"/>
  <img src="screenshots/room-details.png" width="250" alt="Room Details"/>
</p>

<p align="center">
  <img src="screenshots/booking-form.png" width="250" alt="Booking Form"/>
  <img src="screenshots/payment.png" width="250" alt="Payment"/>
  <img src="screenshots/confirmation.png" width="250" alt="Confirmation"/>
</p>

## 🏗️ System Architecture

This client application is part of a larger hotel management ecosystem:

```
┌─────────────────────────────────────┐
│   Guest Booking Platform (This)    │
│   - Room browsing & search          │
│   - Booking management              │
│   - Payment processing              │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│         Supabase Backend            │
│   - PostgreSQL Database             │
│   - Real-time subscriptions         │
│   - Authentication & Authorization  │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Hotel Management Dashboard        │
│   - Booking administration          │
│   - Room & inventory management     │
│   - Financial tracking              │
│   - Guest management                │
└─────────────────────────────────────┘
```

## 🧪 Testing

The platform has undergone rigorous testing including:
- **Functional Testing** - All booking flows validated
- **User Acceptance Testing** - Positive feedback from initial users
- **Cross-browser Testing** - Compatible with major browsers
- **Responsive Testing** - Verified across multiple device sizes
- **Performance Testing** - Optimized for fast load times

---

<p align="center">
  <i>"Modernizing the hospitality industry, one booking at a time"</i><br>
  University Project | University of Central Asia | 2024
</p>
