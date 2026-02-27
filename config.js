// ==================== CONFIGURATION ====================

// System Config - SUBSCRIPTIONS MANAGEMENT
// Add/Modify user access here
window.systemConfig = { 
    "M2Q4NGE0ZDctZDY3": { 
        a: "YWxs",           // "all" - gives access to ALL premium plans
        e: "MjAzMC0xMi0zMQ==" // "2030-12-31" - expires in 2030
    },
    // Add more users below:
    // "DEVICE_ID_HERE": { a: btoa("silver"), e: btoa("2026-12-31") }
};

// Sport Rules for Live Timer
const SPORT_RULES = {
    football: { periods: 2, pLen: 45, break: 15, label: "Half", maxLive: 110 },
    basketball: { periods: 4, pLen: 12, break: 5, longBreak: 15, longBreakAt: 2, label: "Q", timeMultiplier: 0.4, maxLive: 140 },
    volleyball: { periods: 5, pLen: 25, break: 10, label: "S", maxLive: 120 },
    tennis: { periods: 3, pLen: 40, break: 10, label: "S", maxLive: 180 },
    handball: { periods: 2, pLen: 30, break: 10, label: "H", maxLive: 80 },
    icehockey: { periods: 3, pLen: 20, break: 15, label: "P", timeMultiplier: 0.9, maxLive: 150 },
    default: { periods: 2, pLen: 45, break: 15, label: "P", maxLive: 120 }
};

// Sport Icons Mapping
const sportIcons = {
    football: "fas fa-futbol",
    basketball: "fas fa-basketball",
    tennis: "fas fa-tennis-ball",
    icehockey: "fas fa-hockey-puck",
    volleyball: "fas fa-volleyball",
    default: "fas fa-trophy"
};

// Price Configuration
const PLAN_PRICES = {
    "SILVER PLAN": "$20/week",
    "GOLD PLAN": "$35/week",
    "DIAMOND PLAN": "$60/week"
};
