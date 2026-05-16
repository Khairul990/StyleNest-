// ============================================================
// StyleNest — Multi-language & Currency Config
// Supported: Bangladesh (BN), India (IN), USA (US)
// ============================================================

export const LOCALES = {
  BD: {
    country: "Bangladesh",
    flag: "🇧🇩",
    language: "Bengali",
    langCode: "bn",
    currency: "৳",
    currencyCode: "BDT",
    currencyName: "Bangladeshi Taka",
    phone: "+880",
  },
  IN: {
    country: "India",
    flag: "🇮🇳",
    language: "English",
    langCode: "en",
    currency: "₹",
    currencyCode: "INR",
    currencyName: "Indian Rupee",
    phone: "+91",
  },
  US: {
    country: "United States",
    flag: "🇺🇸",
    language: "English",
    langCode: "en",
    currency: "$",
    currencyCode: "USD",
    currencyName: "US Dollar",
    phone: "+1",
  },
};

// ── Translations ─────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    // Navbar
    home: "Home",
    shop: "Shop",
    categories: "Categories",
    trackOrder: "Track Order",
    about: "About",
    contact: "Contact",
    shopNow: "Shop Now",
    wishlist: "Wishlist",
    cart: "Cart",

    // Product
    buyNow: "Buy Now",
    addToCart: "Add to Cart",
    size: "Size",
    color: "Color",
    quantity: "Quantity",
    save: "Save",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    freeDelivery: "Free Delivery",
    dayReturn: "7-Day Return",
    securePayment: "Secure Payment",
    shareProduct: "Share",

    // Checkout
    checkout: "Checkout",
    fullName: "Full Name",
    phone: "Phone Number",
    whatsappNumber: "WhatsApp Number",
    address: "Delivery Address",
    city: "City",
    note: "Order Note (optional)",
    paymentMethod: "Payment Method",
    placeOrder: "Place Order via WhatsApp",
    orderSummary: "Order Summary",

    // Wishlist
    myWishlist: "My Wishlist",
    savedItems: "saved items",
    wishlistEmpty: "Your wishlist is empty",
    browseProd: "Browse Products",

    // Cart
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    continueShopping: "Continue Shopping",
    total: "Total",
    proceedCheckout: "Proceed to Checkout →",
    clearCart: "Clear Cart",

    // Home
    heroBtn: "Explore Collection",
    featuredProducts: "Featured Products",
    newArrivals: "New Arrivals",
    shopByCategory: "Shop by Category",
    viewAll: "View All",

    // Track order
    trackYourOrder: "Track Your Order",
    enterOrderId: "Enter your Order ID",
    track: "Track",

    // Announcement
    announcementText: "🚚 Free Delivery on orders above ₹999 | Use code STYLE10 for 10% off!",

    // Sort
    sortDefault: "Sort: Default",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    mostDiscounted: "Most Discounted",

    // General
    search: "Search products...",
    productsFound: "products found",
    noProducts: "No products found. Try a different search.",
    back: "← Back",
    loading: "Loading...",
    saveSettings: "Save Settings",
    cancel: "Cancel",
  },

  bn: {
    // Navbar
    home: "হোম",
    shop: "শপ",
    categories: "ক্যাটাগরি",
    trackOrder: "অর্ডার ট্র্যাক",
    about: "আমাদের সম্পর্কে",
    contact: "যোগাযোগ",
    shopNow: "কিনুন",
    wishlist: "পছন্দের তালিকা",
    cart: "কার্ট",

    // Product
    buyNow: "এখনই কিনুন",
    addToCart: "কার্টে যোগ করুন",
    size: "সাইজ",
    color: "রং",
    quantity: "পরিমাণ",
    save: "সাশ্রয়",
    inStock: "স্টকে আছে",
    outOfStock: "স্টকে নেই",
    freeDelivery: "বিনামূল্যে ডেলিভারি",
    dayReturn: "৭ দিনের রিটার্ন",
    securePayment: "নিরাপদ পেমেন্ট",
    shareProduct: "শেয়ার করুন",

    // Checkout
    checkout: "চেকআউট",
    fullName: "পূর্ণ নাম",
    phone: "ফোন নম্বর",
    whatsappNumber: "হোয়াটসঅ্যাপ নম্বর",
    address: "ডেলিভারি ঠিকানা",
    city: "শহর",
    note: "অর্ডার নোট (ঐচ্ছিক)",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    placeOrder: "হোয়াটসঅ্যাপে অর্ডার করুন",
    orderSummary: "অর্ডার সারসংক্ষেপ",

    // Wishlist
    myWishlist: "❤️ আমার পছন্দের তালিকা",
    savedItems: "টি সংরক্ষিত পণ্য",
    wishlistEmpty: "আপনার পছন্দের তালিকা খালি",
    browseProd: "পণ্য দেখুন",

    // Cart
    yourCart: "🛒 আপনার কার্ট",
    cartEmpty: "আপনার কার্ট খালি",
    continueShopping: "কেনাকাটা চালিয়ে যান",
    total: "মোট",
    proceedCheckout: "চেকআউটে যান →",
    clearCart: "কার্ট খালি করুন",

    // Home
    heroBtn: "কালেকশন দেখুন",
    featuredProducts: "বিশেষ পণ্যসমূহ",
    newArrivals: "নতুন আগমন",
    shopByCategory: "ক্যাটাগরি অনুযায়ী কিনুন",
    viewAll: "সব দেখুন",

    // Track order
    trackYourOrder: "অর্ডার ট্র্যাক করুন",
    enterOrderId: "অর্ডার আইডি লিখুন",
    track: "ট্র্যাক করুন",

    // Announcement
    announcementText: "🚚 ৯৯৯৳ এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি | কোড STYLE10 দিলে ১০% ছাড়!",

    // Sort
    sortDefault: "সাজানো: ডিফল্ট",
    priceLowHigh: "দাম: কম থেকে বেশি",
    priceHighLow: "দাম: বেশি থেকে কম",
    mostDiscounted: "সবচেয়ে বেশি ছাড়",

    // General
    search: "পণ্য খুঁজুন...",
    productsFound: "টি পণ্য পাওয়া গেছে",
    noProducts: "কোনো পণ্য পাওয়া যায়নি।",
    back: "← ফিরে যান",
    loading: "লোড হচ্ছে...",
    saveSettings: "সেটিংস সেভ করুন",
    cancel: "বাতিল",
  },
};

// Hook-like function to get translations
export const getT = (langCode) => TRANSLATIONS[langCode] || TRANSLATIONS.en;
