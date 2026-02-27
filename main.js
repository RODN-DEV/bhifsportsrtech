// ==================== MAIN APPLICATION ====================

// Global variables
let viewStack = ['page-menu'];
let currentPremiumCategory = null;
let timeInterval = null;
let countdownInterval = null;
let touchStartX = 0;
let currentTranslateX = 0;
let isDragging = false;

// Helper function
const getEl = (id) => document.getElementById(id);

// Time ago formatter
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

// Initialize on page load
window.onload = () => {
    history.replaceState({ view: 'page-menu' }, null, '');

    setTimeout(() => {
        const loader = getEl('loading-screen');
        loader.style.opacity = '0';
        loader.classList.remove('active');
        setTimeout(() => {
            loader.classList.add('hidden');
            getEl('app-view').classList.remove('hidden');
            setTimeout(checkNotifications, 2500);
        }, 600);
    }, 2000);

    // Banner swipe handling
    const banner = getEl('notif-banner');
    banner.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        banner.style.transition = 'none';
    });

    banner.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touchCurrentX = e.touches[0].clientX;
        currentTranslateX = touchCurrentX - touchStartX;
        banner.style.transform = `translateX(${currentTranslateX}px)`;
        const opacity = 1 - (Math.abs(currentTranslateX) / 300);
        banner.style.opacity = opacity;
    });

    banner.addEventListener('touchend', () => {
        isDragging = false;
        const swipeThreshold = 100;
        if (currentTranslateX > swipeThreshold) {
            banner.classList.add('banner-slide-out-right');
            setTimeout(dismissBanner, 300);
        } else if (currentTranslateX < -swipeThreshold) {
            banner.classList.add('banner-slide-out-left');
            setTimeout(dismissBanner, 300);
        } else {
            banner.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            banner.style.transform = `translateX(0px)`;
            banner.style.opacity = '1';
        }
        currentTranslateX = 0;
    });

    // Online/Offline handling
    window.addEventListener('online', () => getEl('offline-message').style.display = 'none');
    window.addEventListener('offline', () => getEl('offline-message').style.display = 'flex');
};

// Page navigation
function switchPage(pageId) {
    ['page-menu', 'page-list', 'page-subscribe'].forEach(p => getEl(p).classList.add('hidden'));
    getEl(pageId).classList.remove('hidden');

    if (pageId === 'page-menu') {
        getEl('back-nav').classList.add('hidden');
        getEl('share-btn').classList.remove('hidden');
        stopCountdown();
    } else if (pageId === 'page-subscribe') {
        updatePlanMarkers();
        getEl('back-nav').classList.remove('hidden');
        getEl('share-btn').classList.add('hidden');
    } else {
        getEl('back-nav').classList.remove('hidden');
        getEl('share-btn').classList.add('hidden');
    }
    window.scrollTo(0, 0);
}

window.onpopstate = function(event) {
    if (viewStack.length > 1) {
        viewStack.pop();
        const prevPage = viewStack[viewStack.length - 1];
        switchPage(prevPage);
        if (prevPage === 'page-menu') {
            getEl('category-title').textContent = '';
            getEl('match-container').innerHTML = '';
            if (timeInterval) clearInterval(timeInterval);
        }
    }
};

function handleNavigation(category) {
    history.pushState({ view: 'page-list', category: category }, null, '');
    viewStack.push('page-list');
    switchPage('page-list');
    loadCategory(category);
}

function goBack() {
    window.history.back();
}

function handlePremiumClick(category) {
    currentPremiumCategory = category;
    if (checkAccess(category)) handleNavigation(category);
    else openModal('choice');
}

function handlePlanCardClick(planName) {
    currentPremiumCategory = planName;
    openSubscribeModal(planName);
}

function goToSubscribePage() {
    closeAllModals();
    history.pushState({ view: 'page-subscribe' }, null, '');
    viewStack.push('page-subscribe');
    switchPage('page-subscribe');
}

// Load category data
function loadCategory(catName) {
    getEl('category-title').textContent = catName;
    const container = getEl('match-container');
    container.innerHTML = '';
    let dateGroups = {};

    if (catName === 'PREMIUM HISTORY') {
        ["SILVER PLAN", "GOLD PLAN", "DIAMOND PLAN"].forEach(pCat => {
            const categoryData = predictionDB[pCat];
            for (const dateKey in categoryData) {
                const finishedMatches = categoryData[dateKey].filter(m => m.status === 'won' || m.status === 'lost');
                if (finishedMatches.length > 0) {
                    if (!dateGroups[dateKey]) dateGroups[dateKey] = [];
                    finishedMatches.forEach(m => dateGroups[dateKey].push({ ...m, _origin: pCat, status: m.status }));
                }
            }
        });
    } else {
        dateGroups = predictionDB[catName] || {};
        if (catName.includes('PLAN') && !catName.includes('LOW') && !catName.includes('HIGH')) startCountdown();
    }

    const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));

    if (sortedDates.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:50px; color:#666;">No data available.</div>';
        return;
    }

    sortedDates.forEach(dateKey => {
        const matches = dateGroups[dateKey];
        const isPremium = catName.includes('PLAN') && !catName.includes('LOW') && !catName.includes('HIGH');
        let totalOdds = 1;
        matches.forEach(m => totalOdds *= m.odds);

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-container';
        let cardsHtml = '';

        matches.forEach(m => {
            const sportIcon = sportIcons[m.sport] || sportIcons.default;
            const iconClass = m.status === 'won' ? 'fa-check' : (m.status === 'lost' ? 'fa-times' : 'fa-clock');
            let originHtml = "";

            if (catName === 'PREMIUM HISTORY' && m._origin) {
                let color = "#ffffff";
                if (m._origin.includes("SILVER")) color = "#C0C0C0";
                if (m._origin.includes("GOLD")) color = "#FFD700";
                if (m._origin.includes("DIAMOND")) color = "#0099cc";
                originHtml = `<div style="font-size: 9px; margin-top: 4px; color: #5cb;">
                               From: <span style="color: ${color}; font-weight: bold;">${m._origin}</span>
                              </div>`;
            }

            cardsHtml += `
                <div class="prediction-card">
                    <div class="sport-icon"><i class="${sportIcon}"></i></div>
                    <div class="match-info">
                        <div class="match-meta-row">
                            <div class="match-meta">${m.country} • ${m.league}</div>
                            <div class="match-time" data-time="${m.kickoff}" data-sport="${m.sport}" data-score="${m.score || ''}" data-status="${m.status}">${m.status === 'pending' ? '--:--' : (m.score || 'FT')}</div>
                        </div>
                        <div class="match-teams">${m.teams}</div>
                        <div class="match-tip"><span class="tip-value">${m.tip}</span><span class="tip-odds">${m.odds.toFixed(2)}</span></div>
                        ${originHtml}
                    </div>
                    <div class="status-badge st-${m.status}"><i class="fas ${iconClass}"></i></div>
                </div>
            `;
        });

        dayDiv.innerHTML = `
            <div class="card-stamp"><div class="stamp-top">©BHIF</div><div class="stamp-bottom">SPORTS</div></div>
            <div class="section-header ${isPremium ? 'premium-header' : ''}">
                ${new Date(dateKey).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                ${catName !== 'PREMIUM HISTORY' ? `<div class="total-odds-badge">Odds: <span class="odds-val">${totalOdds.toFixed(2)}</span></div>` : ""}
            </div>${cardsHtml}
        `;
        container.appendChild(dayDiv);
    });

    startLiveTimer();
}

// Live timer functions
function getMatchStatus(sport, kickoffStr, score = "", status = "pending") {
    const now = new Date();
    const kickoff = new Date(kickoffStr);
    const diffMs = now - kickoff;
    const diffMinsReal = diffMs / 60000;
    const rules = SPORT_RULES[sport] || SPORT_RULES.default;

    if (status === 'won' || status === 'lost' || score.includes("FT")) {
        return { text: score || "FT", color: "#888" };
    }

    if (diffMinsReal < 0) {
        return {
            text: kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            color: 'var(--text-grey)'
        };
    }

    const multiplier = rules.timeMultiplier || 1.0;
    const realPeriodLen = rules.pLen / multiplier;
    let totalRealTimeElapsed = 0;
    let currentDisplay = "";

    for (let i = 1; i <= rules.periods; i++) {
        const periodStart = totalRealTimeElapsed;
        const periodEnd = totalRealTimeElapsed + realPeriodLen;

        if (diffMinsReal >= periodStart && diffMinsReal <= periodEnd) {
            const gameMins = Math.floor((diffMinsReal - periodStart) * multiplier);
            if (sport === 'football') {
                const clock = (i === 1) ? gameMins : 45 + gameMins;
                currentDisplay = `${clock}'`;
            } else if (sport === 'volleyball' || sport === 'tennis') {
                currentDisplay = `S${i}`;
            } else {
                currentDisplay = `${rules.label}${i} ${gameMins}'`;
            }
            break;
        }
        totalRealTimeElapsed = periodEnd;

        if (i < rules.periods) {
            const isLongBreak = (rules.longBreakAt && i === rules.longBreakAt);
            const breakDuration = isLongBreak ? rules.longBreak : rules.break;
            const breakEnd = totalRealTimeElapsed + breakDuration;

            if (diffMinsReal > totalRealTimeElapsed && diffMinsReal < breakEnd) {
                currentDisplay = (i === 1 && rules.periods === 2) ? "HT" : "INT";
                break;
            }
            totalRealTimeElapsed = breakEnd;
        }
    }

    if (!currentDisplay && diffMinsReal < rules.maxLive) {
        currentDisplay = "LIVE";
    }

    if (!currentDisplay) {
        return { text: score || "FT", color: "#888" };
    }

    return {
        text: `<span class="live-indicator"><span class="live-dot"></span> ${currentDisplay}</span>`,
        color: 'var(--error-red)'
    };
}

function startLiveTimer() {
    if (timeInterval) clearInterval(timeInterval);

    const update = () => {
        document.querySelectorAll('.match-time').forEach(el => {
            const status = getMatchStatus(
                el.dataset.sport,
                el.dataset.time,
                el.dataset.score,
                el.dataset.status
            );
            el.innerHTML = status.text;
            el.style.color = status.color;
        });
    };

    update();
    timeInterval = setInterval(update, 30000);
}

// Modal functions
function openModal(type) {
    closeAllModals();
    if (type === 'choice') getEl('modal-choice').classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// Notification functions
function toggleNotifications() {
    getEl('share-panel').classList.remove('open');

    if (getEl('notification-panel').classList.toggle('open')) {
        const list = getEl('notif-list');
        list.innerHTML = '';
        notifications.forEach(n => {
            const item = document.createElement('div');
            item.className = 'notif-item';
            item.innerHTML = `<div>${n.text}</div><time>${timeAgo(n.timestamp)}</time>`;
            list.appendChild(item);
        });
        localStorage.setItem('bhif_last_read_notif', notifications[0].id);
        getEl('notif-dot').classList.add('hidden');
    }
}

function dismissBanner() {
    const banner = getEl('notif-banner');
    banner.classList.add('hidden');
    setTimeout(() => {
        banner.classList.remove('banner-slide-out-left', 'banner-slide-out-right');
        banner.style.transform = '';
        banner.style.opacity = '';
        banner.style.transition = '';
    }, 500);
    localStorage.setItem('bhif_last_read_notif', notifications[0].id);
    getEl('notif-dot').classList.add('hidden');
}

function toggleShare() {
    getEl('notification-panel').classList.remove('open');
    getEl('share-panel').classList.toggle('open');
}

function checkNotifications() {
    const lastRead = localStorage.getItem('bhif_last_read_notif');
    if (!lastRead || parseInt(lastRead) < notifications[0].id) {
        getEl('notif-dot').classList.remove('hidden');
        getEl('banner-text').textContent = notifications[0].text;
        getEl('notif-banner').classList.remove('hidden');
    }
}

// Copy functions
function copyLink() {
    navigator.clipboard.writeText(getEl('share-link-input').value).then(() => {
        getEl('copy-btn').innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => getEl('copy-btn').innerHTML = '<i class="fas fa-copy"></i>', 2000);
    });
}

// Legal functions
function showLegalMenu() {
    closeAllModals();
    getEl('modal-legal-menu').classList.add('active');
}

function showLegalText(type) {
    closeAllModals();
    getEl('modal-legal-text').classList.add('active');
    const titleEl = getEl('legal-title');
    const bodyEl = getEl('legal-body');

    if (type === 'privacy') {
        titleEl.textContent = "Privacy Policy";
        bodyEl.innerHTML = `
            <p><strong>1. Introduction</strong><br>Welcome to Bhif Sports. We respect your privacy and are committed to protecting your personal data.</p>
            <p><strong>2. Data We Collect</strong><br>We do not collect personal identifiers like names or emails. We use a unique Device ID generated locally to manage your subscription.</p>
            <p><strong>3. How We Use Your Data</strong><br>Your Device ID is used solely to verify your premium access status. No data is shared with third parties.</p>
            <p><strong>4. Local Storage</strong><br>This app uses your device's local storage to save your settings and ID. Clearing your cache may reset your ID.</p>
        `;
    } else {
        titleEl.textContent = "Terms of Service";
        bodyEl.innerHTML = `
            <p><strong>1. Acceptance</strong><br>By using Bhif Sports, you agree to these terms.</p>
            <p><strong>2. Predictions</strong><br>All sports predictions are for informational purposes only. We do not guarantee outcomes. Betting involves risk.</p>
            <p><strong>3. User Responsibility</strong><br>You are responsible for complying with local laws regarding sports betting. Bhif Sports is not a gambling operator.</p>
            <p><strong>4. Access</strong><br>Premium access is granted for a specific period. We reserve the right to modify services at any time.</p>
        `;
    }
}
