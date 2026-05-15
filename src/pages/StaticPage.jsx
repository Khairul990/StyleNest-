import React from "react";
import { useParams } from "react-router-dom";

const pages = {
  about: {
    title: "About StyleNest",
    content: `StyleNest is a premium fashion e-commerce brand dedicated to providing high-quality clothing and accessories for everyone. We believe fashion should be accessible, stylish, and sustainable.

Our Story
Founded with a passion for fashion and a commitment to quality, StyleNest brings together the best styles from around the world. From casual everyday wear to premium occasion outfits, we have something for everyone.

Our Mission
To make premium fashion accessible to everyone while maintaining the highest standards of quality and customer service.

Why Choose StyleNest?
• Premium quality products at affordable prices
• Fast and reliable delivery across Bangladesh
• Easy 7-day return policy
• 24/7 WhatsApp customer support
• Secure payment options including Cash on Delivery`,
  },
  contact: {
    title: "Contact Us",
    content: `We'd love to hear from you! Reach out to us through any of the channels below.

📱 WhatsApp
+880 1700-000000
(Available: 9 AM – 10 PM, 7 days a week)

✉️ Email
support@stylenest.com

📍 Address
Dhaka, Bangladesh

Business Hours
Sunday – Thursday: 9 AM – 8 PM
Friday – Saturday: 10 AM – 6 PM

For the fastest response, please contact us via WhatsApp. We typically respond within 30 minutes during business hours.`,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: `Last updated: January 2024

At StyleNest, your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.

Information We Collect
We collect information you provide when placing an order, including your name, phone number, WhatsApp number, and delivery address. We do not collect any financial information.

How We Use Your Information
• To process and deliver your orders
• To contact you via WhatsApp about your order status
• To improve our products and services

Data Storage
Your order data is stored locally on your device. We do not store your personal information on external servers.

Contact
If you have any questions about this policy, please contact us via WhatsApp.`,
  },
  terms: {
    title: "Terms & Conditions",
    content: `Last updated: January 2024

By using StyleNest, you agree to the following terms and conditions.

Order Policy
• All orders are subject to product availability
• Prices are subject to change without prior notice
• Orders cannot be modified after they have been confirmed

Delivery Policy
• Delivery is available across Bangladesh
• Delivery time: 3-7 working days (depending on location)
• Free delivery on orders above ৳999

Return Policy
• Items can be returned within 7 days of delivery
• Items must be in original, unused condition with tags attached
• Shipping charges for returns are borne by the customer

Payment
• We accept Cash on Delivery, bKash, Nagad, and Rocket
• Online payments must be made before shipment`,
  },
  disclaimer: {
    title: "Disclaimer",
    content: `StyleNest Disclaimer

Product Colors
Product colors may vary slightly from what you see on your screen due to different display settings and monitor calibrations.

Product Images
Product images are for illustrative purposes only. The actual product may differ slightly in appearance.

Pricing
All prices are in Bangladeshi Taka (৳). Prices are subject to change without notice.

Availability
Product availability is not guaranteed. We will notify you if your ordered product is out of stock.

Liability
StyleNest shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.

Contact Us
If you have any questions or concerns, please contact our support team via WhatsApp.`,
  },
};

export default function StaticPage() {
  const { slug } = useParams();
  const page = pages[slug] || { title: "Page Not Found", content: "The page you are looking for does not exist." };

  return (
    <div className="page-content">
      <div className="container" style={{ maxWidth: 800, padding: "60px 24px 80px" }}>
        <h1 style={{ marginBottom: 8 }}>{page.title}</h1>
        <div style={{ width: 60, height: 3, background: "var(--accent)", borderRadius: 2, marginBottom: 36 }} />
        <div className="glass" style={{ padding: 40 }}>
          {page.content.split("\n").map((line, i) => (
            line.trim() === "" ? (
              <br key={i} />
            ) : line.startsWith("•") ? (
              <p key={i} style={{ color: "var(--text-secondary)", paddingLeft: 16, marginBottom: 6, fontSize: "0.95rem" }}>{line}</p>
            ) : /^[A-Z]/.test(line) && line.length < 50 && !line.startsWith("•") ? (
              <h3 key={i} style={{ color: "var(--text-primary)", marginTop: 24, marginBottom: 10, fontSize: "1.05rem" }}>{line}</h3>
            ) : (
              <p key={i} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 4, fontSize: "0.95rem" }}>{line}</p>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
