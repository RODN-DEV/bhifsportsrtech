// ==================== MAIN APPLICATION ====================

// Global variables
let viewStack = ['page-menu'];
let currentPremiumCategory = null;
let timeInterval = null;
let countdownInterval = null;
let touchStartX = 0;
let currentTranslateX = 0;
let isDragging = false;

// ── LANGUAGE STRINGS ──────────────────────────────────────────────────
const LANG = {
    en: {
        freePackages: "FREE PACKAGES", premiumPackages: "PREMIUM PACKAGES",
        lowRisk: "LOW RISK", highRisk: "HIGH RISK",
        silverPlan: "SILVER PLAN", goldPlan: "GOLD PLAN", diamondPlan: "DIAMOND PLAN",
        premiumHistory: "PREMIUM HISTORY", choosePlan: "Choose a Plan",
        silverDesc: "Standard quality predictions with high success rate.",
        goldDesc: "Premium goal and match result predictions.",
        diamondDesc: "Maximum returns with exclusive accumulator tips.",
        noData: "No data available.", followUs: "Follow Us On:",
        notifications: "Notifications", shareApp: "SHARE APP?",
        shareDesc: "Copy the link below and forward to family and friends on:",
        legalInfo: "Legal Information", privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service", premiumContent: "Premium Content",
        subRequired: "This section requires subscription.",
        subscribeNow: "Subscribe Now", contactSupport: "Contact Support",
        deviceId: "Your Unique Device ID:", noConnection: "No Connection",
        checkInternet: "Please check your internet settings.", retry: "Retry",
        odds: "Odds", expiresIn: "Expires In", subscribed: "SUBSCRIBED",
        active: "ACTIVE", notSubscribed: "NOT SUBSCRIBED",
        checkIn: "Check In", extend: "Extend", whatsappAdmin: "WhatsApp Admin",
        telegramAdmin: "Telegram Admin", close: "Close"
    },
    fr: {
        freePackages: "PACKS GRATUITS", premiumPackages: "PACKS PREMIUM",
        lowRisk: "FAIBLE RISQUE", highRisk: "RISQUE ÉLEVÉ",
        silverPlan: "PLAN ARGENT", goldPlan: "PLAN OR", diamondPlan: "PLAN DIAMANT",
        premiumHistory: "HISTORIQUE PREMIUM", choosePlan: "Choisir un Plan",
        silverDesc: "Prédictions de qualité standard avec un taux de réussite élevé.",
        goldDesc: "Prédictions premium sur les buts et résultats.",
        diamondDesc: "Rendements maximaux avec des tips exclusifs.",
        noData: "Aucune donnée disponible.", followUs: "Suivez-nous sur :",
        notifications: "Notifications", shareApp: "PARTAGER L'APP ?",
        shareDesc: "Copiez le lien et envoyez à vos amis sur :",
        legalInfo: "Informations légales", privacyPolicy: "Politique de confidentialité",
        termsOfService: "Conditions d'utilisation", premiumContent: "Contenu Premium",
        subRequired: "Cette section nécessite un abonnement.",
        subscribeNow: "S'abonner", contactSupport: "Contacter le Support",
        deviceId: "Votre ID Appareil Unique :", noConnection: "Pas de Connexion",
        checkInternet: "Vérifiez vos paramètres internet.", retry: "Réessayer",
        odds: "Cotes", expiresIn: "Expire dans", subscribed: "ABONNÉ",
        active: "ACTIF", notSubscribed: "NON ABONNÉ",
        checkIn: "Accéder", extend: "Prolonger", whatsappAdmin: "WhatsApp Admin",
        telegramAdmin: "Telegram Admin", close: "Fermer"
    },
    es: {
        freePackages: "PAQUETES GRATIS", premiumPackages: "PAQUETES PREMIUM",
        lowRisk: "BAJO RIESGO", highRisk: "ALTO RIESGO",
        silverPlan: "PLAN PLATA", goldPlan: "PLAN ORO", diamondPlan: "PLAN DIAMANTE",
        premiumHistory: "HISTORIAL PREMIUM", choosePlan: "Elige un Plan",
        silverDesc: "Predicciones de calidad estándar con alta tasa de éxito.",
        goldDesc: "Predicciones premium de goles y resultados.",
        diamondDesc: "Máximos rendimientos con tips exclusivos.",
        noData: "No hay datos disponibles.", followUs: "Síguenos en:",
        notifications: "Notificaciones", shareApp: "¿COMPARTIR APP?",
        shareDesc: "Copia el enlace y compártelo con amigos en:",
        legalInfo: "Información Legal", privacyPolicy: "Política de Privacidad",
        termsOfService: "Términos de Servicio", premiumContent: "Contenido Premium",
        subRequired: "Esta sección requiere suscripción.",
        subscribeNow: "Suscribirse", contactSupport: "Contactar Soporte",
        deviceId: "Tu ID de Dispositivo Único:", noConnection: "Sin Conexión",
        checkInternet: "Comprueba tu conexión a internet.", retry: "Reintentar",
        odds: "Cuotas", expiresIn: "Expira en", subscribed: "SUSCRITO",
        active: "ACTIVO", notSubscribed: "NO SUSCRITO",
        checkIn: "Entrar", extend: "Extender", whatsappAdmin: "WhatsApp Admin",
        telegramAdmin: "Telegram Admin", close: "Cerrar"
    },
    pt: {
        freePackages: "PACOTES GRÁTIS", premiumPackages: "PACOTES PREMIUM",
        lowRisk: "BAIXO RISCO", highRisk: "ALTO RISCO",
        silverPlan: "PLANO PRATA", goldPlan: "PLANO OURO", diamondPlan: "PLANO DIAMANTE",
        premiumHistory: "HISTÓRICO PREMIUM", choosePlan: "Escolha um Plano",
        silverDesc: "Previsões de qualidade padrão com alta taxa de sucesso.",
        goldDesc: "Previsões premium de golos e resultados.",
        diamondDesc: "Retornos máximos com dicas exclusivas.",
        noData: "Nenhum dado disponível.", followUs: "Siga-nos em:",
        notifications: "Notificações", shareApp: "PARTILHAR APP?",
        shareDesc: "Copie o link e envie aos seus amigos em:",
        legalInfo: "Informações Legais", privacyPolicy: "Política de Privacidade",
        termsOfService: "Termos de Serviço", premiumContent: "Conteúdo Premium",
        subRequired: "Esta secção requer subscrição.",
        subscribeNow: "Subscrever", contactSupport: "Contactar Suporte",
        deviceId: "O seu ID de Dispositivo Único:", noConnection: "Sem Conexão",
        checkInternet: "Verifique as suas definições de internet.", retry: "Tentar novamente",
        odds: "Odds", expiresIn: "Expira em", subscribed: "SUBSCRITO",
        active: "ATIVO", notSubscribed: "NÃO SUBSCRITO",
        checkIn: "Entrar", extend: "Prolongar", whatsappAdmin: "WhatsApp Admin",
        telegramAdmin: "Telegram Admin", close: "Fechar"
    },
    sw: {
        freePackages: "MIFUKO YA BURE", premiumPackages: "MIFUKO YA PREMIUM",
        lowRisk: "HATARI NDOGO", highRisk: "HATARI KUBWA",
        silverPlan: "MPANGO WA FEDHA", goldPlan: "MPANGO WA DHAHABU", diamondPlan: "MPANGO WA ALMASI",
        premiumHistory: "HISTORIA YA PREMIUM", choosePlan: "Chagua Mpango",
        silverDesc: "Utabiri wa ubora wa kawaida na kiwango cha juu cha mafanikio.",
        goldDesc: "Utabiri wa malango na matokeo ya mechi wa hali ya juu.",
        diamondDesc: "Faida za juu zaidi na vidokezo vya kipekee.",
        noData: "Hakuna data inayopatikana.", followUs: "Tufuate:",
        notifications: "Arifa", shareApp: "SHIRIKI PROGRAMU?",
        shareDesc: "Nakili kiungo na utume kwa marafiki wako:",
        legalInfo: "Taarifa za Kisheria", privacyPolicy: "Sera ya Faragha",
        termsOfService: "Masharti ya Huduma", premiumContent: "Maudhui ya Premium",
        subRequired: "Sehemu hii inahitaji usajili.",
        subscribeNow: "Jiandikishe", contactSupport: "Wasiliana na Msaada",
        deviceId: "Kitambulisho chako cha Kipekee:", noConnection: "Hakuna Mtandao",
        checkInternet: "Tafadhali angalia mipangilio ya mtandao.", retry: "Jaribu tena",
        odds: "Uwezekano", expiresIn: "Inaisha", subscribed: "UMEJISAJILI",
        active: "INAFANYA KAZI", notSubscribed: "HAUJAJISAJILI",
        checkIn: "Ingia", extend: "Ongeza", whatsappAdmin: "WhatsApp Admin",
        telegramAdmin: "Telegram Admin", close: "Funga"
    }
};

let currentLang = localStorage.getItem('bhif_lang') || 'en';

const t = (key) => (LANG[currentLang] && LANG[currentLang][key]) ? LANG[currentLang][key] : (LANG['en'][key] || key);

function applyLanguage() {
    // Menu labels
    const menuMap = {
        'LOW RISK PLAN': t('lowRisk'), 'HIGH RISK PLAN': t('highRisk'),
        'SILVER PLAN': t('silverPlan'), 'GOLD PLAN': t('goldPlan'),
        'DIAMOND PLAN': t('diamondPlan'), 'PREMIUM HISTORY': t('premiumHistory')
    };
    document.querySelectorAll('.menu-label').forEach(el => {
        const orig = el.getAttribute('data-key') || el.textContent.trim();
        el.setAttribute('data-key', orig);
        if (menuMap[orig]) el.textContent = menuMap[orig];
    });

    // Section headers (non-dynamic ones)
    document.querySelectorAll('.section-header[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.childNodes[0].textContent = t(key);
    });

    // Subscribe page
    const chooseEl = document.querySelector('#page-subscribe h2');
    if (chooseEl) chooseEl.textContent = t('choosePlan');

    const descs = {
        'SILVER-PLAN': t('silverDesc'),
        'GOLD-PLAN': t('goldDesc'),
        'DIAMOND-PLAN': t('diamondDesc')
    };
    Object.entries(descs).forEach(([id, desc]) => {
        const el = document.querySelector(`#pkg-${id} p`);
        if (el) el.textContent = desc;
    });

    // Panels
    const notifTitle = document.querySelector('#notification-panel .panel-header h3');
    if (notifTitle) notifTitle.textContent = t('notifications');
    const shareTitle = document.querySelector('#share-panel .panel-header h3');
    if (shareTitle) shareTitle.textContent = t('shareApp');
    const shareDesc = document.querySelector('.share-content > p');
    if (shareDesc) shareDesc.textContent = t('shareDesc');

    // Follow us
    const followEl = document.querySelector('footer h4');
    if (followEl) followEl.textContent = t('followUs');

    // Offline
    const offlineH = document.querySelector('#offline-message h2');
    if (offlineH) offlineH.textContent = t('noConnection');
    const offlineP = document.querySelector('#offline-message p');
    if (offlineP) offlineP.textContent = t('checkInternet');
    const offlineBtn = document.querySelector('#offline-message button');
    if (offlineBtn) offlineBtn.textContent = t('retry');
}

// ── THEME TOGGLE ──────────────────────────────────────────────────────
function initTheme() {
    const saved = localStorage.getItem('bhif_theme') || 'dark';
    if (saved === 'light') {
        document.body.classList.add('light-theme');
        getEl('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.remove('light-theme');
        getEl('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('bhif_theme', isLight ? 'light' : 'dark');
    getEl('theme-toggle').innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
}

// ── HELPER ────────────────────────────────────────────────────────────
const getEl = (id) => document.getElementById(id);

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

// ── INIT ──────────────────────────────────────────────────────────────
window.onload = () => {
    history.replaceState({ view: 'page-menu' }, null, '');
    initTheme();

    // Language selector
    const langSel = getEl('lang-select');
    if (langSel) {
        langSel.value = currentLang;
        langSel.addEventListener('change', function () {
            currentLang = this.value;
            localStorage.setItem('bhif_lang', currentLang);
            applyLanguage();
        });
    }

    setTimeout(() => {
        const loader = getEl('loading-screen');
        loader.style.opacity = '0';
        loader.classList.remove('active');
        setTimeout(() => {
            loader.classList.add('hidden');
            getEl('app-view').classList.remove('hidden');
            applyLanguage();
            setTimeout(checkNotifications, 2500);
        }, 600);
    }, 2000);

    // Banner swipe
    const banner = getEl('notif-banner');
    banner.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; isDragging = true; banner.style.transition = 'none'; });
    banner.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentTranslateX = e.touches[0].clientX - touchStartX;
        banner.style.transform = `translateX(${currentTranslateX}px)`;
        banner.style.opacity = 1 - (Math.abs(currentTranslateX) / 300);
    });
    banner.addEventListener('touchend', () => {
        isDragging = false;
        if (currentTranslateX > 100) { banner.classList.add('banner-slide-out-right'); setTimeout(dismissBanner, 300); }
        else if (currentTranslateX < -100) { banner.classList.add('banner-slide-out-left'); setTimeout(dismissBanner, 300); }
        else { banner.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; banner.style.transform = 'translateX(0px)'; banner.style.opacity = '1'; }
        currentTranslateX = 0;
    });

    window.addEventListener('online', () => getEl('offline-message').style.display = 'none');
    window.addEventListener('offline', () => getEl('offline-message').style.display = 'flex');
};

// ── NAVIGATION ────────────────────────────────────────────────────────
function switchPage(pageId) {
    ['page-menu', 'page-list', 'page-subscribe'].forEach(p => getEl(p).classList.add('hidden'));
    getEl(pageId).classList.remove('hidden');
    if (pageId === 'page-menu') {
        getEl('back-nav').classList.add('hidden');
        getEl('share-btn').classList.remove('hidden');
        stopCountdown();
        applyLanguage();
    } else if (pageId === 'page-subscribe') {
        updatePlanMarkers();
        getEl('back-nav').classList.remove('hidden');
        getEl('share-btn').classList.add('hidden');
        applyLanguage();
    } else {
        getEl('back-nav').classList.remove('hidden');
        getEl('share-btn').classList.add('hidden');
    }
    window.scrollTo(0, 0);
}

window.onpopstate = function (event) {
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
    history.pushState({ view: 'page-list', category }, null, '');
    viewStack.push('page-list');
    switchPage('page-list');
    loadCategory(category);
}
function goBack() { window.history.back(); }
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

// ── LOAD CATEGORY ─────────────────────────────────────────────────────
function loadCategory(catName) {
    getEl('category-title').textContent = catName;
    const container = getEl('match-container');
    container.innerHTML = '';
    let dateGroups = {};

    if (catName === 'PREMIUM HISTORY') {
        ["SILVER PLAN", "GOLD PLAN", "DIAMOND PLAN"].forEach(pCat => {
            const categoryData = predictionDB[pCat];
            for (const dateKey in categoryData) {
                const finished = categoryData[dateKey].filter(m => m.status === 'won' || m.status === 'lost');
                if (finished.length > 0) {
                    if (!dateGroups[dateKey]) dateGroups[dateKey] = [];
                    finished.forEach(m => dateGroups[dateKey].push({ ...m, _origin: pCat }));
                }
            }
        });
    } else {
        dateGroups = predictionDB[catName] || {};
        if (catName.includes('PLAN') && !catName.includes('LOW') && !catName.includes('HIGH')) startCountdown();
    }

    const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));

    if (sortedDates.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:50px;color:var(--text-grey);">${t('noData')}</div>`;
        return;
    }

    const isPremium = catName.includes('PLAN') && !catName.includes('LOW') && !catName.includes('HIGH');

    sortedDates.forEach(dateKey => {
        const matches = dateGroups[dateKey];
        let totalOdds = 1;
        matches.forEach(m => totalOdds *= m.odds);

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-container';
        let cardsHtml = '';

        matches.forEach(m => {
            const sportIcon = sportIcons[m.sport] || sportIcons.default;
            const iconClass = m.status === 'won' ? 'fa-check' : (m.status === 'lost' ? 'fa-times' : 'fa-clock');
            let originHtml = '';
            if (catName === 'PREMIUM HISTORY' && m._origin) {
                let color = '#ffffff';
                if (m._origin.includes('SILVER')) color = '#C0C0C0';
                if (m._origin.includes('GOLD')) color = '#FFD700';
                if (m._origin.includes('DIAMOND')) color = '#0099cc';
                originHtml = `<div style="font-size:9px;margin-top:4px;color:#5cb;">From: <span style="color:${color};font-weight:bold;">${m._origin}</span></div>`;
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
                </div>`;
        });

        dayDiv.innerHTML = `
            <div class="card-stamp"><div class="stamp-top">©BHIF</div><div class="stamp-bottom">SPORTS</div></div>
            <div class="section-header ${isPremium ? 'premium-header' : ''}">
                ${new Date(dateKey).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                ${catName !== 'PREMIUM HISTORY' ? `<div class="total-odds-badge">${t('odds')}: <span class="odds-val">${totalOdds.toFixed(2)}</span></div>` : ''}
            </div>${cardsHtml}`;
        container.appendChild(dayDiv);
    });

    startLiveTimer();
}

// ── LIVE TIMER ────────────────────────────────────────────────────────
function getMatchStatus(sport, kickoffStr, score = '', status = 'pending') {
    const now = new Date();
    const kickoff = new Date(kickoffStr);
    const diffMinsReal = (now - kickoff) / 60000;
    const rules = SPORT_RULES[sport] || SPORT_RULES.default;

    if (status === 'won' || status === 'lost' || score.includes('FT')) return { text: score || 'FT', color: 'var(--text-grey)' };
    if (diffMinsReal < 0) return { text: kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), color: 'var(--text-grey)' };

    const multiplier = rules.timeMultiplier || 1.0;
    const realPeriodLen = rules.pLen / multiplier;
    let totalRealTimeElapsed = 0;
    let currentDisplay = '';

    for (let i = 1; i <= rules.periods; i++) {
        const periodStart = totalRealTimeElapsed;
        const periodEnd = totalRealTimeElapsed + realPeriodLen;
        if (diffMinsReal >= periodStart && diffMinsReal <= periodEnd) {
            const gameMins = Math.floor((diffMinsReal - periodStart) * multiplier);
            if (sport === 'football') currentDisplay = `${i === 1 ? gameMins : 45 + gameMins}'`;
            else if (sport === 'volleyball' || sport === 'tennis') currentDisplay = `S${i}`;
            else currentDisplay = `${rules.label}${i} ${gameMins}'`;
            break;
        }
        totalRealTimeElapsed = periodEnd;
        if (i < rules.periods) {
            const isLongBreak = rules.longBreakAt && i === rules.longBreakAt;
            const breakDuration = isLongBreak ? rules.longBreak : rules.break;
            const breakEnd = totalRealTimeElapsed + breakDuration;
            if (diffMinsReal > totalRealTimeElapsed && diffMinsReal < breakEnd) { currentDisplay = (i === 1 && rules.periods === 2) ? 'HT' : 'INT'; break; }
            totalRealTimeElapsed = breakEnd;
        }
    }

    if (!currentDisplay && diffMinsReal < rules.maxLive) currentDisplay = 'LIVE';
    if (!currentDisplay) return { text: score || 'FT', color: 'var(--text-grey)' };
    return { text: `<span class="live-indicator"><span class="live-dot"></span> ${currentDisplay}</span>`, color: 'var(--error-red)' };
}

function startLiveTimer() {
    if (timeInterval) clearInterval(timeInterval);
    const update = () => {
        document.querySelectorAll('.match-time').forEach(el => {
            const s = getMatchStatus(el.dataset.sport, el.dataset.time, el.dataset.score, el.dataset.status);
            el.innerHTML = s.text;
            el.style.color = s.color;
        });
    };
    update();
    timeInterval = setInterval(update, 30000);
}

// ── MODALS ────────────────────────────────────────────────────────────
function openModal(type) {
    closeAllModals();
    if (type === 'choice') getEl('modal-choice').classList.add('active');
}
function closeAllModals() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

// ── NOTIFICATIONS ─────────────────────────────────────────────────────
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
    setTimeout(() => { banner.classList.remove('banner-slide-out-left', 'banner-slide-out-right'); banner.style.transform = ''; banner.style.opacity = ''; banner.style.transition = ''; }, 500);
    localStorage.setItem('bhif_last_read_notif', notifications[0].id);
    getEl('notif-dot').classList.add('hidden');
}
function toggleShare() { getEl('notification-panel').classList.remove('open'); getEl('share-panel').classList.toggle('open'); }
function checkNotifications() {
    const lastRead = localStorage.getItem('bhif_last_read_notif');
    if (!lastRead || parseInt(lastRead) < notifications[0].id) {
        getEl('notif-dot').classList.remove('hidden');
        getEl('banner-text').textContent = notifications[0].text;
        getEl('notif-banner').classList.remove('hidden');
    }
}

// ── COPY ──────────────────────────────────────────────────────────────
function copyLink() {
    navigator.clipboard.writeText(getEl('share-link-input').value).then(() => {
        getEl('copy-btn').innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => getEl('copy-btn').innerHTML = '<i class="fas fa-copy"></i>', 2000);
    });
}

// ── LEGAL ─────────────────────────────────────────────────────────────
function showLegalMenu() { closeAllModals(); getEl('modal-legal-menu').classList.add('active'); }
function showLegalText(type) {
    closeAllModals();
    getEl('modal-legal-text').classList.add('active');
    getEl('legal-title').textContent = type === 'privacy' ? t('privacyPolicy') : t('termsOfService');
    getEl('legal-body').innerHTML = type === 'privacy'
        ? `<p><strong>1. Introduction</strong><br>Welcome to Bhif Sports. We respect your privacy and are committed to protecting your personal data.</p>
           <p><strong>2. Data We Collect</strong><br>We do not collect personal identifiers like names or emails. We use a unique Device ID generated locally to manage your subscription.</p>
           <p><strong>3. How We Use Your Data</strong><br>Your Device ID is used solely to verify your premium access status. No data is shared with third parties.</p>
           <p><strong>4. Local Storage</strong><br>This app uses your device's local storage to save your settings and ID. Clearing your cache may reset your ID.</p>`
        : `<p><strong>1. Acceptance</strong><br>By using Bhif Sports, you agree to these terms.</p>
           <p><strong>2. Predictions</strong><br>All sports predictions are for informational purposes only. We do not guarantee outcomes. Betting involves risk.</p>
           <p><strong>3. User Responsibility</strong><br>You are responsible for complying with local laws regarding sports betting.</p>
           <p><strong>4. Access</strong><br>Premium access is granted for a specific period. We reserve the right to modify services at any time.</p>`;
}
