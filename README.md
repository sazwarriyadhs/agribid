
# AgriBid - The Digital Marketplace for Agriculture

![AgriBid Hero](https://placehold.co/1200x600.png)

**AgriBid** is a modern, full-stack web application built with Next.js, designed to revolutionize the agricultural trade in Indonesia. It serves as a dynamic, real-time auction platform connecting producers (farmers, fishermen, etc.) directly with a diverse range of buyers, including businesses, partners, and exporters.

The platform aims to create a transparent, efficient, and accessible marketplace, empowering local producers to reach a wider market while providing buyers with access to high-quality, verified agricultural goods.

---

## ✨ Core Features

AgriBid is built around a role-based system to cater to the specific needs of each user in the agricultural ecosystem.

### For All Users
- **Real-time Auctions:** Participate in live auctions for a wide variety of agricultural commodities.
- **Multi-language & Multi-currency:** Switch between Bahasa Indonesia (ID) and English (EN), with prices displayed in IDR or USD.
- **Secure Authentication:** Secure login system, including an innovative QR code login via a digital membership card.
- **Global Market Insights:** View real-time data on global demand for Indonesian commodities.

### 🧑‍🌾 Producer/Seller Dashboard
- **CRUD for Products:** Full control to Create, Read, Update, and Delete auction listings.
- **AI-Powered Price Suggestions:** Get intelligent starting price recommendations for new products based on description, category, and images.
- **Auction & Sales Management:** Monitor the status of active, pending, and completed auctions, and track revenue.

### 👨‍⚖️ Buyer/Bidder Dashboard
- **Seamless Bidding:** Place bids easily on the auction detail page.
- **Bid & Order Management:** Track all active bids, auctions won, and view order history with shipment status.
- **Secure Payments:** All transactions are processed through a centralized, secure joint account managed by the admin.

### ✈️ Exporter Features
- **Clear Progression Path:** Bidders and Producers can become Exporters by completing 5 successful transactions and verifying their legal documents.
- **AI Eligibility Check:** An AI assistant helps potential exporters check their eligibility and identify any missing requirements.
- **Producer Mentorship:** Exporters can manage and educate up to 10 producers, helping them meet quality standards for the global market.
- **Shipment Tracking:** A dedicated dashboard to manage and track export shipments.

### 🚚 Vendor/Partner Dashboard
- **Shipping Order Management:** View and accept shipping jobs for completed auctions.
- **Delivery Status Updates:** Update the status of shipments from "Pending" to "In Transit" and "Delivered."
- **Printable Delivery Orders:** Generate and view official delivery order documents.

### 🛡️ Admin Dashboard
- **Platform Oversight:** A comprehensive overview of all platform activity, including total users, active auctions, and revenue.
- **User & Membership Management:** View, manage, suspend, or delete users, and verify membership payments.
- **Product Verification:** Approve or reject new product listings submitted by producers to maintain quality standards.
- **Payment & Payout Management:** Oversee the central joint account and approve payouts to sellers.

---

## 🤖 AI Integration with Genkit

AgriBid leverages Google's Genkit to provide intelligent features that enhance the user experience:

1.  **Suggest Price Flow (`suggest-price-flow.ts`):** Analyzes product details and images to recommend a competitive starting auction price, helping producers maximize their returns.
2.  **Exporter Eligibility Check Flow (`check-exporter-eligibility-flow.ts`):** An AI consultant that assesses a user's transaction history and uploaded documents to determine if they meet the criteria to become an exporter, providing clear feedback and next steps.
3.  **Calculate Shipping Cost Flow (`calculate-shipping-cost-flow.ts`):** An AI logistics expert that estimates shipping costs between two points based on product details, helping buyers budget for their purchases.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI Toolkit:** [Genkit for Firebase](https://firebase.google.com/docs/genkit)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

To run the AgriBid application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd agribid-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    The application uses two development servers running concurrently: one for the Next.js app and one for Genkit flows.

    - **Terminal 1: Run the Next.js App**
      ```bash
      npm run dev
      ```
      The application will be available at `http://localhost:9002`.

    - **Terminal 2: Run the Genkit AI Flows**
      ```bash
      npm run genkit:dev
      ```
      This starts the Genkit development server, allowing the frontend to communicate with the AI flows.

4.  **Explore the App:**
    Open your browser to `http://localhost:9002` to start using AgriBid. You can explore different user roles by logging in with an email corresponding to a specific role (e.g., `petani@agribid.com`, `buyer@agribid.com`, `admin@agribid.com`). The password for all demo accounts is `password`.

---

## 📂 Project Structure

The project follows a standard Next.js App Router structure with some key directories:

```
src
├── ai/                 # Genkit AI flows and configuration
│   ├── flows/          # Individual AI-powered features
│   └── genkit.ts       # Genkit initialization
├── app/                # Next.js App Router pages and layouts
│   ├── (main)/         # Main application routes (e.g., home, login, auctions)
│   ├── dashboard/      # Role-based dashboard pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
│   ├── ui/             # Core UI components from ShadCN
│   └── *.tsx           # Custom application components (Header, Footer, etc.)
├── context/            # React context providers (e.g., i18n)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── locales/            # Translation files for i18n (en.json, id.json)
```
