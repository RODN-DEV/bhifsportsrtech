// ==================== SUBSCRIPTION FUNCTIONS ====================

// Get or generate Device ID
function getDeviceId() {
    let savedId = localStorage.getItem('bhif_unique_device_id');
    if (!savedId) {
        const arr = new Uint32Array(4);
        window.crypto.getRandomValues(arr);
        savedId = Array.from(arr, dec => dec.toString(16).padStart(8, '0')).join('-');
        localStorage.setItem('bhif_unique_device_id', savedId);
    }
    return btoa(savedId).substring(0, 16);
}

// Check if user has access to a category
function checkAccess(cat) {
    const deviceId = getDeviceId();
    const user = window.systemConfig[deviceId];
    if (!user) return false;
    if (new Date() > new Date(atob(user.e))) return false;

    const allowed = atob(user.a).toLowerCase();
    const requested = cat.toLowerCase();
    return (allowed === 'all' || requested.includes(allowed));
}

// Update plan markers on subscribe page
function updatePlanMarkers() {
    const devId = getDeviceId();
    const user = window.systemConfig[devId];
    const pkgs = ['SILVER PLAN', 'GOLD PLAN', 'DIAMOND PLAN'];

    pkgs.forEach(p => {
        const idSuffix = p.replace(' ', '-');
        const card = getEl(`pkg-${idSuffix}`);
        const price = getEl(`price-${idSuffix}`);
        if (!card || !price) return;

        card.classList.remove('active-sub');
        price.innerHTML = PLAN_PRICES[p];

        if (user) {
            const expiryDate = new Date(atob(user.e));
            const isNotExpired = new Date() < expiryDate;
            const allowedAccess = atob(user.a).toLowerCase();
            const currentPlanName = p.toLowerCase();

            if (isNotExpired && (allowedAccess === 'all' || currentPlanName.includes(allowedAccess))) {
                card.classList.add('active-sub');
                price.innerHTML = `SUBSCRIBED`;
            }
        }
    });
}

// Start countdown timer for subscription
function startCountdown() {
    const devId = getDeviceId();
    const user = window.systemConfig[devId];
    if (!user) return;

    const expiry = new Date(atob(user.e));
    const timerEl = getEl('subscription-timer');
    timerEl.style.display = 'block';

    function update() {
        const now = new Date();
        const diff = expiry - now;
        if (diff <= 0) {
            timerEl.textContent = "Subscription Expired";
            stopCountdown();
            return;
        }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        timerEl.innerHTML = `<i class="fas fa-clock"></i><span style="color:#ffffff;"> Expires In: </span> ${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    countdownInterval = setInterval(update, 1000);
}

function stopCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    getEl('subscription-timer').style.display = 'none';
}

// Open subscription modal
function openSubscribeModal(clickedPlan) {
    closeAllModals();
    getEl('modal-sub-method').classList.add('active');
    getEl('device-id-display').value = getDeviceId();
    getEl('extend-btn').classList.remove('hidden');

    const devId = getDeviceId();
    const user = window.systemConfig[devId];
    getEl('smart-sub-notice').style.display = 'none';

    let isSubscribedToThis = false;
    let isAnySubActive = false;
    let hasRecordInSystem = (user !== undefined);

    if (hasRecordInSystem) {
        const expiryDate = new Date(atob(user.e));
        isAnySubActive = (expiryDate > new Date());

        if (isAnySubActive) {
            const allowed = atob(user.a).toLowerCase();
            const target = clickedPlan.toLowerCase();
            if (allowed === 'all' || target.includes(allowed)) {
                isSubscribedToThis = true;
            }
        }
    }

    if (isSubscribedToThis) {
        const diff = Math.ceil((new Date(atob(user.e)) - new Date()) / (1000 * 60 * 60 * 24));
        getEl('sub-status-display').innerHTML = `<span style="color: lime;"> <strong>ACTIVE</span> – <span style="color: #888;"> ${diff} Day(s) Left</span>`;
        getEl('sub-status-header').innerHTML = `<span class="sub-badge active">SUBSCRIBED</span>`;

        getEl('contact-buttons-container').classList.add('hidden');
        getEl('access-buttons-container').classList.remove('hidden');
        getEl('sub-method-desc').textContent = "You have access to this plan. Do you want to Extend Subscription or Check In?";
    } else {
        getEl('sub-status-header').innerHTML = `<span class="sub-badge inactive">NOT SUBSCRIBED</span>`;
        getEl('contact-buttons-container').classList.remove('hidden');
        getEl('access-buttons-container').classList.add('hidden');
        getEl('sub-method-desc').textContent = "Copy your Unique Device's ID below and send to the Admin:";

        if (hasRecordInSystem) {
            if (isAnySubActive) {
                const currentPlan = atob(user.a).toUpperCase();
                getEl('sub-status-display').innerHTML = `<span style="color: #888;">Your Active Plan:</span><span style="color: #09c;"> ${currentPlan}</span>`;
                getEl('smart-sub-notice').style.display = 'block';
                getEl('smart-sub-notice').innerHTML = `You are currently on the <strong>${currentPlan} Plan</strong>. To Upgrade to <strong>${clickedPlan}</strong>, please submit your request to Admin.`;
            } else {
                getEl('sub-status-display').innerHTML = `<span style="color: var(--error-red);"> Not Active </span>`;
            }
        } else {
            getEl('sub-status-display').innerHTML = `<span style="color: #888;">Not Subscribed</span>`;
        }
    }
}

function toggleSubMethodsFromExtend() {
    getEl('contact-buttons-container').classList.remove('hidden');
    getEl('extend-btn').classList.add('hidden');
}

function copyDeviceId() {
    navigator.clipboard.writeText(getEl('device-id-display').value).then(() => {
        getEl('copy-id-btn').innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => getEl('copy-id-btn').innerHTML = '<i class="fas fa-copy"></i>', 2000);
    });
}
