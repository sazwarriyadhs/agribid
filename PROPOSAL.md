
# **Project Proposal: AgriBid - Digital Agricultural Marketplace**

---

## **1. Executive Summary**

**AgriBid** is a comprehensive, role-based digital marketplace designed to modernize Indonesia's agricultural sector. By providing a real-time auction platform, AgriBid directly connects agricultural producers (farmers, ranchers, fishermen) with a wide network of businesses, partners, and verified exporters. The platform integrates advanced AI-powered tools to assist with pricing and export-readiness, while facilitating secure transactions through a centralized admin-verified payment system. AgriBid aims to enhance market transparency, increase producer income, and open up Indonesian agricultural products to a global audience, all within a secure and user-friendly ecosystem.

---

## **2. Problem Statement**

The traditional agricultural supply chain in Indonesia often suffers from several inefficiencies:
- **Limited Market Access:** Small-scale producers struggle to connect with a broad base of buyers, often relying on a limited number of middlemen, which can suppress prices.
- **Price Opacity:** Lack of transparent pricing mechanisms makes it difficult for producers to ascertain the fair market value of their goods.
- **Barriers to Export:** Complex regulations, lack of knowledge, and difficulty in meeting international standards create significant barriers for producers wishing to enter the global market.
- **Transaction Insecurity:** The absence of a secure, standardized payment system introduces risks for both buyers and sellers.

---

## **3. Proposed Solution**

AgriBid addresses these challenges by offering a centralized, technology-driven platform that provides:
- **A Transparent Auction Marketplace:** Real-time bidding ensures that prices are determined by supply and demand, allowing producers to achieve the best possible value for their products.
- **Direct Market Linkages:** The platform removes barriers by directly connecting producers to a diverse range of domestic and international buyers.
- **Guided Export Pathway:** A clear, step-by-step process allows successful producers and bidders to become verified exporters, with AI assistance to guide them through legal and transactional requirements.
- **Secure and Standardized Transactions:** All payments are processed through a single, admin-managed joint account (Rekening Bersama), with a clear 10% administration fee, ensuring security and trust for all parties.

---

## **4. Core Features**

### **General Platform Features**
- **User Authentication:** Secure login for all user roles.
- **QR Code Login:** Innovative login method using a digital membership card.
- **Real-time Auction UI:** Displays current auctions, bid history, and countdown timers.
- **Internationalization (i18n):** Full support for Bahasa Indonesia and English, including currency formatting for IDR and USD.
- **Global Demand Dashboard:** Provides insights into which Indonesian commodities are in high demand globally and in which countries.

### **Role-Based Functionality**

#### **🧑‍🌾 Producer/Seller (Penjual)**
- **Role Examples:** Petani (Farmer), Nelayan (Fisherman), Peternak (Rancher), etc.
- **Product Management (CRUD):** Full capability to create, view, update, and delete product listings for auction.
- **AI-Powered Price Suggestion:** An intelligent tool suggests an optimal starting bid price based on product data and images.
- **Sales & Revenue Tracking:** A dedicated dashboard to monitor active auctions, products sold, and gross revenue.

#### **👨‍⚖️ Buyer/Bidder (Pembeli)**
- **Role Examples:** Pelaku Usaha (Business Actor), Klien (Client), etc.
- **Live Bidding:** Ability to place bids on any active auction.
- **Bid Management:** A dedicated dashboard to track active bids, won auctions, and total spending.
- **Order & Shipment Tracking:** Manage won auctions and track their shipment status.
- **Pathway to Exporter:** Can become an exporter after meeting transaction and verification requirements.

#### **✈️ Exporter (Eksportir)**
- **Eligibility:** Status granted to Producers or Bidders after 5 successful transactions and verification of legal documents (Badan Hukum, NPWP, SIUP).
- **AI Eligibility Assistant:** An AI tool to help users check their eligibility status and identify missing requirements.
- **Producer Mentorship:** Authority to manage and educate up to 10 registered producers to help them meet export standards.
- **Shipment Management:** A dashboard to manage and track ongoing export shipments.

#### **🚚 Vendor/Partner (Mitra)**
- **Shipping Order Management:** A dashboard to view and accept shipping jobs from completed auctions.
- **Status Updates:** Ability to update the shipment status from "Pending" to "In Transit" and "Delivered".
- **Delivery Order Generation:** Access printable delivery order documents for each shipment.

#### **🛡️ Admin (Administrator)**
- **Full Oversight:** A central dashboard to monitor platform metrics like user count, revenue, and active auctions.
- **User Management & Verification:** Ability to manage, verify, suspend, or delete user accounts, including membership payment status.
- **Product Verification:** Power to approve or reject new products submitted by Producers, ensuring quality control.
- **Transaction Mediation:** Manages the central joint account and approves payouts to sellers.

---

## **5. Monetization Strategy**

AgriBid will implement a clear revenue model based on membership and transaction fees:
- **Membership Fee:** A tiered annual membership fee is required for registration, varying by role:
    - **Producer/Bidder:** IDR 25,000 / year
    - **Partner/Exporter:** IDR 50,000 / year
- **Transaction Fee:** A **10% administration fee** will be applied to the final winning bid amount of every successful transaction. This fee covers platform maintenance, support, and admin verification services.

---

## **6. Style Guidelines**

- **Primary Color:** Earthy Green (`#70A96A`) - Evokes nature, growth, and agriculture.
- **Background Color:** Light Beige (`#F5F5DC`) - A neutral, clean, and warm background.
- **Accent Color:** Sunset Orange (`#E07A5F`) - Used for calls-to-action and highlighting important elements.
- **Typography:** 'Inter' sans-serif for all body and headline text to ensure clear readability and a modern feel.
- **Iconography:** Farm-related icons from the Lucide icon library are used to provide quick visual cues.

---

## **7. Technology Stack**

- **Frontend Framework:** Next.js 14+ (App Router)
- **UI Library:** React
- **Component Library:** ShadCN UI
- **Styling:** Tailwind CSS
- **AI Integration:** Genkit for Firebase
- **Language:** TypeScript
- **Form Handling:** React Hook Form with Zod for validation
