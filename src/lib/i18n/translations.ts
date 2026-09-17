export const translations = {
  en: {
    heroBadge: "Updated for October 2026 Rules",
    heroTitle1: "Understand UPI Payment",
    heroTitle2: "Costs & Rules",
    heroSubtitle: "Free, source-backed calculator for UPI merchant discount rates. Know the costs before you pay or accept a payment.",
    
    // Calculator
    quickAmounts: "Quick Amounts",
    transactionType: "Transaction Type",
    p2mTitle: "Pay a Business/Shop",
    p2mDesc: "Merchant Payment (P2M)",
    p2pTitle: "Send to a Person",
    p2pDesc: "Peer-to-Peer (P2P)",
    calculateBtn: "Calculate MDR",
    
    // Results
    estMDR: "Estimated MDR",
    estNet: "Estimated Net",
    merchantReceives: "Merchant receives",
    rate: "Rate",
    
    // Nav
    navTools: "Tools",
    navDocs: "Developers",
    navChecker: "Rule Checker",
    navBulk: "Bulk Calculate",
  },
  hi: {
    heroBadge: "अक्टूबर 2026 नियमों के लिए अद्यतित",
    heroTitle1: "UPI भुगतान की",
    heroTitle2: "लागत और नियम समझें",
    heroSubtitle: "UPI मर्चेंट डिस्काउंट रेट्स (MDR) के लिए मुफ्त कैलकुलेटर। भुगतान करने या प्राप्त करने से पहले लागत जानें।",
    
    // Calculator
    quickAmounts: "त्वरित राशि",
    transactionType: "लेनदेन का प्रकार",
    p2mTitle: "दुकान/व्यवसाय को भुगतान",
    p2mDesc: "मर्चेंट भुगतान (P2M)",
    p2pTitle: "किसी व्यक्ति को भेजें",
    p2pDesc: "पीयर-टू-पीयर (P2P)",
    calculateBtn: "MDR की गणना करें",
    
    // Results
    estMDR: "अनुमानित MDR",
    estNet: "अनुमानित नेट",
    merchantReceives: "मर्चेंट को मिलेगा",
    rate: "दर",
    
    // Nav
    navTools: "उपकरण",
    navDocs: "डेवलपर्स",
    navChecker: "नियम चेकर",
    navBulk: "थोक गणना",
  }
};

export type LanguageCode = "en" | "hi";
export type TranslationKey = keyof typeof translations.en;
