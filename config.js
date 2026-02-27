// ==================== CONFIGURATION ====================
// Protected | Bhif Sports Security Layer

// Obfuscated subscription registry — decoded at runtime only
// To add a user: see admin instructions at bottom of this file
;(function() {
    var _$c = 'eyJNMlE0TkdFMFpEY3RaRFkzIjogeyJhIjogIllXeHMiLCAiZSI6ICJNakF6TUMweE1pMHpNUT09In19';
    var _$d = function(s) { try { return JSON.parse(atob(s)); } catch(e) { return {}; } };
    Object.defineProperty(window, 'systemConfig', {
        value: _$d(_$c),
        writable: false,
        configurable: false,
        enumerable: false
    });
    _$c = null;
})();

// Sport Rules for Live Timer
const SPORT_RULES = {
    football:   { periods: 2, pLen: 45, break: 15, label: "Half", maxLive: 110 },
    basketball: { periods: 4, pLen: 12, break: 5,  longBreak: 15, longBreakAt: 2, label: "Q", timeMultiplier: 0.4, maxLive: 140 },
    volleyball: { periods: 5, pLen: 25, break: 10, label: "S",    maxLive: 120 },
    tennis:     { periods: 3, pLen: 40, break: 10, label: "S",    maxLive: 180 },
    handball:   { periods: 2, pLen: 30, break: 10, label: "H",    maxLive: 80  },
    icehockey:  { periods: 3, pLen: 20, break: 15, label: "P",    timeMultiplier: 0.9, maxLive: 150 },
    default:    { periods: 2, pLen: 45, break: 15, label: "P",    maxLive: 120 }
};
Object.freeze(SPORT_RULES);

const sportIcons = {
    football:   "fas fa-futbol",
    basketball: "fas fa-basketball",
    tennis:     "fas fa-tennis-ball",
    icehockey:  "fas fa-hockey-puck",
    volleyball: "fas fa-volleyball",
    default:    "fas fa-trophy"
};
Object.freeze(sportIcons);

const PLAN_PRICES = {
    "SILVER PLAN":  "$20/week",
    "GOLD PLAN":    "$35/week",
    "DIAMOND PLAN": "$60/week"
};
Object.freeze(PLAN_PRICES);

// ── HOW TO ADD A NEW SUBSCRIBER (admin only) ─────────────────────────
// 1. Get the user's Device ID from the app
// 2. On your LOCAL machine console, run:
//    btoa(JSON.stringify({"THEIR_DEVICE_ID":{"a":btoa("all"),"e":btoa("2026-12-31")},"EXISTING_ID":{"a":btoa("all"),"e":btoa("2030-12-31")}}))
// 3. Replace _$c value above with the result
// 4. Push to GitHub
// ─────────────────────────────────────────────────────────────────────
