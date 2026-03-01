// ==================== BHIF SPORTS ONBOARDING TUTORIAL ====================
// Shows only on first launch. Stored in localStorage after completion.

(function () {

    const STORAGE_KEY = 'bhif_onboarding_done_v1';

    // ── Already seen? Skip ─────────────────────────────────────────
    if (localStorage.getItem(STORAGE_KEY)) return;

    // ── Slide Data ─────────────────────────────────────────────────
    const slides = [
        {
            icon: '🏆',
            title: 'Welcome to Bhif Sports!',
            desc: 'Your #1 source for expert sports predictions. Win more with our professionally researched tips across Football, Basketball, Ice Hockey & more.',
            color: '#00e64d',
            bg: 'linear-gradient(135deg, #0d1f0f 0%, #0d0d1a 100%)'
        },
        {
            icon: '🎯',
            title: 'Free & Premium Tips',
            desc: 'Access FREE daily predictions with <b>Low Risk</b> and <b>High Risk</b> plans — no subscription needed. Upgrade to Premium for maximum winning power.',
            color: '#ffdd00',
            bg: 'linear-gradient(135deg, #1a1500 0%, #0d0d1a 100%)'
        },
        {
            icon: '💎',
            title: 'Premium Plans',
            desc: 'Choose from <b>Silver</b>, <b>Gold</b>, or <b>Diamond</b> plans. Each offers exclusive high-odds tips with proven track records. Contact admin to subscribe.',
            color: '#00ccff',
            bg: 'linear-gradient(135deg, #001a20 0%, #0d0d1a 100%)'
        },
        {
            icon: '🔔',
            title: 'Stay Notified',
            desc: 'Tap the <b>🔔 bell icon</b> in the top right to see all updates, new predictions and results. Never miss a winning tip again!',
            color: '#ff9900',
            bg: 'linear-gradient(135deg, #1a0d00 0%, #0d0d1a 100%)'
        },
        {
            icon: '📲',
            title: 'Install as an App',
            desc: 'On Android: tap <b>⋮ menu → Add to Home Screen</b>.<br>On iPhone: tap <b>Share → Add to Home Screen</b>.<br>Works like a real app — no app store needed!',
            color: '#cc44ff',
            bg: 'linear-gradient(135deg, #110020 0%, #0d0d1a 100%)'
        },
        {
            icon: '🛡️',
            title: 'Your Device ID',
            desc: 'When you subscribe, tap any Premium plan and send your <b>Unique Device ID</b> to admin via WhatsApp or Telegram. Access is activated within minutes.',
            color: '#00e64d',
            bg: 'linear-gradient(135deg, #0d1f0f 0%, #0d0d1a 100%)'
        }
    ];

    let current = 0;

    // ── Inject CSS ─────────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        #ob-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Ubuntu', sans-serif;
            transition: background 0.6s ease;
            padding: 20px;
            overflow: hidden;
        }

        /* Animated background particles */
        #ob-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image:
                radial-gradient(circle at 20% 20%, rgba(0,230,77,0.06) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0,204,255,0.06) 0%, transparent 50%);
            pointer-events: none;
        }

        #ob-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 28px;
            padding: 40px 28px 32px;
            max-width: 380px;
            width: 100%;
            text-align: center;
            backdrop-filter: blur(20px);
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
            position: relative;
            animation: ob-slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes ob-slideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes ob-slideIn {
            from { opacity: 0; transform: translateX(60px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes ob-slideInLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        #ob-card.going-next { animation: ob-slideIn 0.35s ease forwards; }
        #ob-card.going-prev { animation: ob-slideInLeft 0.35s ease forwards; }

        #ob-icon {
            font-size: 72px;
            display: block;
            margin-bottom: 20px;
            animation: ob-bounce 2s ease-in-out infinite;
            filter: drop-shadow(0 0 20px currentColor);
            line-height: 1;
        }

        @keyframes ob-bounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-8px); }
        }

        #ob-title {
            font-size: 22px;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 14px;
            line-height: 1.2;
            letter-spacing: -0.3px;
        }

        #ob-desc {
            font-size: 15px;
            color: rgba(255,255,255,0.75);
            line-height: 1.7;
            margin-bottom: 32px;
        }

        #ob-desc b {
            color: #ffffff;
            font-weight: 700;
        }

        /* Progress dots */
        #ob-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 28px;
        }

        .ob-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .ob-dot.active {
            width: 24px;
            border-radius: 4px;
            background: var(--ob-color, #00e64d);
            box-shadow: 0 0 10px var(--ob-color, #00e64d);
        }

        /* Buttons */
        #ob-btns {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #ob-skip {
            flex: 1;
            padding: 14px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 14px;
            color: rgba(255,255,255,0.5);
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }

        #ob-skip:active { background: rgba(255,255,255,0.12); }

        #ob-next {
            flex: 2;
            padding: 14px;
            background: var(--ob-color, #00e64d);
            border: none;
            border-radius: 14px;
            color: #000000;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            letter-spacing: 0.3px;
        }

        #ob-next:active { transform: scale(0.97); }

        /* Step counter */
        #ob-counter {
            position: absolute;
            top: 18px;
            right: 22px;
            font-size: 12px;
            color: rgba(255,255,255,0.3);
            font-weight: 600;
        }

        /* Top accent line */
        #ob-accent {
            position: absolute;
            top: 0;
            left: 28px;
            right: 28px;
            height: 3px;
            border-radius: 0 0 4px 4px;
            transition: background 0.4s ease, width 0.4s ease;
        }

        /* Swipe hint on first slide */
        #ob-swipe-hint {
            position: absolute;
            bottom: -36px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: rgba(255,255,255,0.25);
            white-space: nowrap;
            animation: ob-fade 2s ease-in-out infinite;
        }

        @keyframes ob-fade {
            0%, 100% { opacity: 0.3; }
            50%       { opacity: 0.8; }
        }

        /* Confetti on last slide */
        .ob-confetti {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            animation: ob-fall linear forwards;
            pointer-events: none;
        }

        @keyframes ob-fall {
            0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ── Build HTML ─────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'ob-overlay';

    overlay.innerHTML = `
        <div id="ob-card">
            <div id="ob-accent"></div>
            <span id="ob-counter">1 / ${slides.length}</span>
            <span id="ob-icon"></span>
            <div id="ob-title"></div>
            <div id="ob-desc"></div>
            <div id="ob-dots">
                ${slides.map((_, i) => `<div class="ob-dot ${i === 0 ? 'active' : ''}" onclick="obGoTo(${i})"></div>`).join('')}
            </div>
            <div id="ob-btns">
                <button id="ob-skip" onclick="obSkip()">Skip</button>
                <button id="ob-next" onclick="obNext()">
                    <span id="ob-next-text">Next</span>
                    <span id="ob-next-icon">→</span>
                </button>
            </div>
            <div id="ob-swipe-hint">👆 Tap Next to continue</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // ── Render Slide ───────────────────────────────────────────────
    function render(idx, direction) {
        const s = slides[idx];
        const card = document.getElementById('ob-card');

        // Animate
        card.classList.remove('going-next', 'going-prev');
        void card.offsetWidth; // force reflow
        if (direction === 'next') card.classList.add('going-next');
        if (direction === 'prev') card.classList.add('going-prev');

        // Background
        overlay.style.background = s.bg;

        // Accent line
        const accent = document.getElementById('ob-accent');
        accent.style.background = s.color;
        accent.style.setProperty('width', `${((idx + 1) / slides.length) * 100}%`);

        // Color variable for dots/button
        document.getElementById('ob-card').style.setProperty('--ob-color', s.color);
        document.getElementById('ob-next').style.background = s.color;
        document.querySelectorAll('.ob-dot.active').forEach(d => d.style.setProperty('--ob-color', s.color));

        // Content
        document.getElementById('ob-icon').textContent = s.icon;
        document.getElementById('ob-title').textContent = s.title;
        document.getElementById('ob-desc').innerHTML = s.desc;
        document.getElementById('ob-counter').textContent = `${idx + 1} / ${slides.length}`;

        // Dots
        document.querySelectorAll('.ob-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
            d.style.setProperty('--ob-color', s.color);
        });

        // Last slide button
        const isLast = idx === slides.length - 1;
        document.getElementById('ob-next-text').textContent = isLast ? "Let's Go!" : 'Next';
        document.getElementById('ob-next-icon').textContent = isLast ? '🚀' : '→';
        document.getElementById('ob-skip').style.display = isLast ? 'none' : 'flex';

        // Swipe hint only on first slide
        document.getElementById('ob-swipe-hint').style.display = idx === 0 ? 'block' : 'none';

        // Confetti on last slide
        if (isLast) launchConfetti(s.color);
    }

    // ── Confetti ───────────────────────────────────────────────────
    function launchConfetti(color) {
        const colors = [color, '#ffffff', '#ffdd00', '#ff6644'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'ob-confetti';
                el.style.cssText = `
                    left: ${Math.random() * 100}%;
                    top: 0;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    animation-duration: ${1.5 + Math.random() * 2}s;
                    animation-delay: ${Math.random() * 0.5}s;
                    width: ${4 + Math.random() * 8}px;
                    height: ${4 + Math.random() * 8}px;
                `;
                overlay.appendChild(el);
                setTimeout(() => el.remove(), 4000);
            }, i * 40);
        }
    }

    // ── Touch/Swipe Support ────────────────────────────────────────
    let touchStartX = 0;
    overlay.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 60) {
            if (diff > 0) obNext();
            else if (current > 0) { current--; render(current, 'prev'); }
        }
    });

    // ── Navigation ─────────────────────────────────────────────────
    window.obNext = function () {
        if (current < slides.length - 1) {
            current++;
            render(current, 'next');
        } else {
            obFinish();
        }
    };

    window.obGoTo = function (idx) {
        const dir = idx > current ? 'next' : 'prev';
        current = idx;
        render(current, dir);
    };

    window.obSkip = function () {
        obFinish();
    };

    function obFinish() {
        // Fade out
        overlay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            overlay.remove();
            // Clean up global functions
            delete window.obNext;
            delete window.obGoTo;
            delete window.obSkip;
        }, 500);

        // Mark as seen — never shows again
        localStorage.setItem(STORAGE_KEY, '1');
    }

    // ── Initial Render ─────────────────────────────────────────────
    render(0, 'next');

})();
