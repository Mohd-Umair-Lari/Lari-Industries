# LARI INDUSTRIES — E-Commerce Web Application

> **&ldquo;THINK SAFETY BEFORE YOU START&rdquo;**  
> Established in 2005, Kanpur, Uttar Pradesh, India. Premier manufacturer and worldwide exporter of industrial leather safety equipment, personal protective wear, welder gauntlets, and heavy tarpaulins.

---

## 🌟 Overview & Architecture

This application is built as a full-stack **Next.js 14 (App Router) + React + Node.js + TypeScript** e-commerce platform:
- **Global US Dollar ($ USD) Pricing**: Tailored for international export procurement, B2B wholesale buyers, and direct overseas customers.
- **Razorpay Payment Gateway**: Seamless checkout with server-side HMAC-SHA256 signature verification, webhook handler, and sandbox demo fallback.
- **Glassmorphic & Morphic UI**: Modern frosted-glass aesthetic (`backdrop-blur`), subtle specular lighting highlights, responsive micro-animations, and clean typography preserving the brand's iconic crimson red (`#e74c3c`) and editorial heritage.
- **Saddlery Removed**: Products and navigation focused purely on safety and industrial lines (Welding Aprons, Export Gloves, Industrial Safety, Leg Guards, Harness Leather, Hosiery Gloves, Kevlar Gloves, Leather Sheets, Sealing Washers, Bespoke Straps, and Heavy Tarpaulins).
- **Zero Config Vercel Deployment**: No `vercel.json` required. Native Next.js auto-detection.

---

## 💳 Razorpay Payment Integration

### Endpoints Implemented

1. **`POST /api/razorpay/create-order`**
   - Validates cart items and calculates total in USD cents (1 USD = 100 cents).
   - Generates an official order ID using the Razorpay Node SDK.
   - Gracefully runs in sandbox simulation mode when placeholder keys are detected.

2. **`POST /api/razorpay/verify-payment`**
   - Cryptographically validates payment signatures using Node's native `crypto.createHmac('sha256', secret)`.
   - Generates and returns a permanent order receipt/invoice number (e.g., `LARI-INV-2026-XXXXXX`).

3. **`POST /api/razorpay/webhook`**
   - Verifies the `x-razorpay-signature` against `RAZORPAY_WEBHOOK_SECRET`.
   - Listens to webhook events like `payment.captured` and `order.paid`.

---

## 🔑 Environment Variables Setup for Deployment

Configure these in your **Vercel Project Settings → Environment Variables**:

```env
# Public Key used by client-side Razorpay checkout modal
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YourKeyIdHere

# Server-side Secret for order creation & HMAC verification
RAZORPAY_KEY_SECRET=YourRazorpayKeySecretHere

# Secret for validating Razorpay webhook events
RAZORPAY_WEBHOOK_SECRET=YourWebhookSecretHere

# Production Domain
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## 📦 Products & Pricing Catalog (in USD $)

| Category | Products & Pricing |
| :--- | :--- |
| **Aprons** | Leather Welding Apron: **$6.50**<br>Industrial Leather Apron: **$6.00**<br>Heavy Duty Welding Apron: **$7.00**<br>Cotton Safety Apron: **$2.50**<br>Cotton Work Apron – Type B: **$2.50**<br>Industrial Dangri Suit: **$8.50**<br>Cotton Lab Coat: **$3.50**<br>Lab Coat – Premium: **$3.50** |
| **Asbestos Gloves** | Type A: **$3.50**<br>Type B: **$4.00**<br>Type C: **$4.00** |
| **Export Gloves** | Canadian Drill Gloves: **$1.40**<br>Premium Driving Gloves: **$1.75**<br>Cow Leather Driving Gloves: **$1.75**<br>Drill Canvas Gloves: **$1.40**<br>Split Leather Drill Gloves: **$1.25**<br>Lined Driving Gloves: **$2.25** |
| **Industrial Safety** | Leather Welding Gloves: **$2.50**<br>Cut Resistance Gloves (Type A): **$0.50**<br>Cut Resistance Gloves (Type B): **$0.50**<br>PVC Polka Dot Gloves: **$0.40**<br>Drill Work Gloves: **$0.40**<br>Buckle Leather Gloves: **$1.60**<br>Cotton Knitted Hand Gloves: **$0.25**<br>Industrial Safety Gloves: **$0.30**<br>PVC Dotted Safety Gloves: **$0.25**<br>Leather Cotton Combo Gloves: **$0.65**<br>Welder Gauntlet Gloves: **$2.40**<br>Ropeman Grain Leather Gloves: **$1.50** |
| **Leg Guards & Spats** | Leather Leg Guard: **$2.50**<br>Leather Safety Spats: **$2.90** |
| **Harness Leather** | 6mm Thick Harness Leather Sheet (Grade A): **$25.00 / kg**<br>6mm Thick Leather (Grade B): **$25.00 / kg**<br>6mm Thick Leather (Grade C): **$25.00 / kg** |
| **Hosiery Gloves** | White Hosiery Hand Gloves: **$0.40**<br>Hosiery Work Gloves – Type B: **$0.25**<br>Hosiery Safety Gloves – Type C: **$0.25**<br>Polka Dot Hosiery Gloves: **$0.85**<br>Heavy Polka Dot Gloves: **$0.95** |
| **Kevlar Gloves** | Kevlar Para-Aramid (Type A): **$18.50**<br>Kevlar Para-Aramid (Type B): **$15.50**<br>Kevlar Heat Resistant Gloves: **$20.50**<br>Kevlar Cut Proof Gloves: **$12.50** |
| **Leather Sheets** | Brown Leather Sheet: **$18.00 / kg**<br>Black Leather Sheet – Premium: **$18.00 / kg**<br>Black Leather Hide: **$18.00 / kg**<br>Brown Tanned Leather: **$18.00 / kg** |
| **Leather Washers** | Leather Washer – Standard: **$0.20**<br>Leather Washer – Heavy Duty: **$1.50**<br>Foot Valve Leather Washer: **$2.50**<br>Spud Washer – Industrial: **$2.90**<br>Foot Valve Washer – Type B: **$2.50** |
| **Leather Straps** | Natural, Brown, Wide & Rectangular: **As per custom choice** (RFQ / Custom Quote) |
| **Tarpaulin** | Waterproof Tarpaulin (Blue): **$55.00**<br>Heavy Duty Tarpaulin: **$45.00**<br>Industrial Tarpaulin Sheet: **$40.00** |

---

## 🚀 Deployment (Vercel)

1. Push your repository to GitHub.
2. In the **Vercel Dashboard**, open **Project Settings → General**:
   - Under **Build & Development Settings**:
     - **Framework Preset**: Set to **Next.js**
     - **Build Command**: Toggle Override **OFF** (defaults to `next build`)
     - **Output Directory**: Toggle Override **OFF** (defaults to `.next`)
     - **Install Command**: Toggle Override **OFF** (defaults to `npm install`)
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL`
4. Click **Redeploy** on your latest deployment.
