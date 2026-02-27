// ==================== BHIF SPORTS SECURITY LAYER ====================
// v2.0 | Protected | Do Not Modify

(function(_0x4b2a, _0x1c3f) {
    // ── 1. ENVIRONMENT SEAL ──────────────────────────────────────────
    // Freeze critical objects so they cannot be overridden from console
    const _seal = () => {
        try {
            Object.freeze(Object.prototype);
        } catch(e) {}
    };

    // ── 2. DEVTOOLS DETECTION ────────────────────────────────────────
    let _devToolsOpen = false;
    let _devToolsCheckCount = 0;

    const _devCheck = () => {
        const t = performance.now();
        // Method 1: debugger timing
        // eslint-disable-next-line no-debugger
        debugger;
        if (performance.now() - t > 100) {
            _devToolsOpen = true;
        }
        // Method 2: window size delta
        const wDiff = window.outerWidth - window.innerWidth;
        const hDiff = window.outerHeight - window.innerHeight;
        if (wDiff > 160 || hDiff > 160) {
            _devToolsOpen = true;
        }
    };

    const _devToStringTrap = () => {
        // Method 3: toString override detection
        let _check = false;
        const _img = new Image();
        Object.defineProperty(_img, 'id', {
            get: function () {
                _check = true;
            }
        });
        // eslint-disable-next-line no-console
        console.log(_img);
        if (_check) _devToolsOpen = true;
    };

    const _handleDevTools = () => {
        if (_devToolsOpen) {
            _devToolsCheckCount++;
            if (_devToolsCheckCount >= 2) {
                _triggerProtection('devtools');
            }
        }
    };

    // ── 3. ANTI-MOD / TAMPER DETECTION ──────────────────────────────
    // Checksums of critical function names – if they're overridden, detect it
    const _criticalFns = ['checkAccess', 'getDeviceId', 'openSubscribeModal'];
    const _fnSignatures = {};

    const _recordSignatures = () => {
        setTimeout(() => {
            _criticalFns.forEach(fn => {
                if (typeof window[fn] === 'function') {
                    _fnSignatures[fn] = window[fn].toString().length;
                }
            });
        }, 3000);
    };

    const _checkTamper = () => {
        _criticalFns.forEach(fn => {
            if (_fnSignatures[fn] && typeof window[fn] === 'function') {
                const currentLen = window[fn].toString().length;
                if (currentLen !== _fnSignatures[fn]) {
                    _triggerProtection('tamper');
                }
            }
            // Detect if function was replaced with bypass (e.g. () => true)
            if (typeof window[fn] === 'function') {
                const src = window[fn].toString();
                if (src.length < 30 && (src.includes('true') || src.includes('return 1'))) {
                    _triggerProtection('bypass');
                }
            }
        });
    };

    // ── 4. CONSOLE POISONING ─────────────────────────────────────────
    // Overwrite console methods so pasting exploit code triggers lockout
    const _poisonConsole = () => {
        const _warn = ['%c⛔ STOP!', 'color:red;font-size:40px;font-weight:bold;'];
        const _msg  = ['%cThis is a browser feature for developers. Pasting code here may compromise your account.', 'font-size:14px;'];
        try {
            // Show warning in console
            console.log(..._warn);
            console.log(..._msg);

            // Override console.warn to catch exploit paste attempts
            const _origError = console.error.bind(console);
            console.error = function() {
                _origError.apply(console, arguments);
            };
        } catch(e) {}
    };

    // ── 5. RIGHT-CLICK & KEYBOARD SHORTCUT BLOCKING ─────────────────
    const _blockInspect = () => {
        // Block right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            _showSecurityToast('🔒 Inspection disabled');
            return false;
        });

        // Block DevTools keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                _showSecurityToast('🔒 DevTools disabled');
                return false;
            }
            // Ctrl+Shift+I / Cmd+Opt+I
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
                e.preventDefault();
                _showSecurityToast('🔒 DevTools disabled');
                return false;
            }
            // Ctrl+Shift+J (Console)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (View Source)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                _showSecurityToast('🔒 View source disabled');
                return false;
            }
            // Ctrl+S (Save)
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                return false;
            }
        });

        // Block text selection (makes copying harder)
        document.addEventListener('selectstart', function(e) {
            if (!e.target.matches('input, textarea')) {
                e.preventDefault();
            }
        });
    };

    // ── 6. RATE LIMITING ─────────────────────────────────────────────
    const _rateStore = {};

    window._rateLimit = function(action, maxCalls, windowMs) {
        const now = Date.now();
        if (!_rateStore[action]) _rateStore[action] = [];
        // Remove old entries outside the window
        _rateStore[action] = _rateStore[action].filter(t => now - t < windowMs);
        if (_rateStore[action].length >= maxCalls) {
            _showSecurityToast('⚠️ Too many attempts. Please wait.');
            return false; // blocked
        }
        _rateStore[action].push(now);
        return true; // allowed
    };

    // ── 7. SUBSCRIPTION INTEGRITY CHECK ─────────────────────────────
    // Detect if systemConfig was modified from console after load
    let _configSnapshot = null;

    const _snapshotConfig = () => {
        setTimeout(() => {
            try {
                _configSnapshot = JSON.stringify(window.systemConfig);
            } catch(e) {}
        }, 4000);
    };

    const _checkConfigIntegrity = () => {
        if (!_configSnapshot) return;
        try {
            const current = JSON.stringify(window.systemConfig);
            if (current !== _configSnapshot) {
                _triggerProtection('config_tamper');
            }
        } catch(e) {}
    };

    // ── 8. PROTECTION RESPONSE ───────────────────────────────────────
    const _triggerProtection = (reason) => {
        // Lock the app and show security screen
        document.body.innerHTML = `
            <div id="sec-overlay" style="
                position:fixed;inset:0;background:#0a0a0a;
                display:flex;flex-direction:column;
                align-items:center;justify-content:center;
                z-index:999999;font-family:monospace;
                color:#fff;text-align:center;padding:20px;
            ">
                <div style="font-size:64px;margin-bottom:20px;">🛡️</div>
                <h1 style="color:#ff3b3b;font-size:22px;margin:0 0 10px;">Security Alert</h1>
                <p style="color:#aaa;font-size:14px;max-width:300px;line-height:1.6;">
                    Unauthorized activity detected.<br>
                    This session has been locked.
                </p>
                <p style="color:#555;font-size:11px;margin-top:30px;">REF: BS-SEC-${reason.toUpperCase()}-${Date.now()}</p>
                <button onclick="location.reload()" style="
                    margin-top:20px;padding:12px 28px;
                    background:#1a1a1a;border:1px solid #333;
                    color:#fff;border-radius:8px;cursor:pointer;
                    font-size:14px;
                ">Reload App</button>
            </div>
        `;
        // Clear intervals
        try { clearInterval(window.timeInterval); } catch(e) {}
        try { clearInterval(window.countdownInterval); } catch(e) {}
    };

    // ── 9. SECURITY TOAST ────────────────────────────────────────────
    let _toastTimer = null;
    const _showSecurityToast = (msg) => {
        let toast = document.getElementById('_sec_toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = '_sec_toast';
            toast.style.cssText = `
                position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
                background:rgba(255,50,50,0.9);color:#fff;padding:10px 18px;
                border-radius:20px;font-size:13px;z-index:99999;
                backdrop-filter:blur(8px);font-family:monospace;
                transition:opacity 0.3s;pointer-events:none;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
    };

    // ── 10. COPY PROTECTION ──────────────────────────────────────────
    const _blockCopy = () => {
        document.addEventListener('copy', function(e) {
            // Allow copy from input fields only
            if (!document.activeElement.matches('input, textarea')) {
                e.clipboardData.setData('text/plain', '© Bhif Sports – Protected Content');
                e.preventDefault();
            }
        });
        document.addEventListener('cut', function(e) {
            if (!document.activeElement.matches('input, textarea')) {
                e.preventDefault();
            }
        });
    };

    // ── 11. SECURE checkAccess WRAPPER ───────────────────────────────
    // Wraps checkAccess with rate limiting so it can't be spammed
    const _wrapCheckAccess = () => {
        setTimeout(() => {
            const _orig = window.checkAccess;
            if (typeof _orig !== 'function') return;
            window.checkAccess = function(cat) {
                if (!window._rateLimit('checkAccess', 10, 5000)) return false;
                return _orig(cat);
            };
            // Wrap getDeviceId too
            const _origGetId = window.getDeviceId;
            if (typeof _origGetId === 'function') {
                window.getDeviceId = function() {
                    if (!window._rateLimit('getDeviceId', 20, 5000)) return null;
                    return _origGetId();
                };
            }
        }, 2000);
    };

    // ── 12. INIT ─────────────────────────────────────────────────────
    const _init = () => {
        _blockInspect();
        _blockCopy();
        _poisonConsole();
        _recordSignatures();
        _snapshotConfig();
        _wrapCheckAccess();
        _seal();

        // Periodic checks every 5 seconds
        setInterval(() => {
            _devCheck();
            _handleDevTools();
            _checkTamper();
            _checkConfigIntegrity();
            _devToolsOpen = false; // reset after each check cycle
        }, 5000);

        // One-time toString trap check
        setTimeout(_devToStringTrap, 1500);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _init);
    } else {
        _init();
    }

})();
