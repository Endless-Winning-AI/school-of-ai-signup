(function () {
  const STORAGE_KEY = 'sai_live_access';
  const EXPIRY_DAYS = 30;
  const ENDPOINT = 'https://lrwvooucggciazmzxqlb.supabase.co/functions/v1/school-of-ai-live-access';

  const countryCodes = [
    { code: '+1', label: '🇺🇸 +1', name: 'US' },
    { code: '+1', label: '🇨🇦 +1', name: 'CA' },
    { code: '+44', label: '🇬🇧 +44', name: 'GB' },
    { code: '+61', label: '🇦🇺 +61', name: 'AU' },
    { code: '+49', label: '🇩🇪 +49', name: 'DE' },
    { code: '+33', label: '🇫🇷 +33', name: 'FR' },
    { code: '+91', label: '🇮🇳 +91', name: 'IN' },
    { code: '+81', label: '🇯🇵 +81', name: 'JP' },
    { code: '+86', label: '🇨🇳 +86', name: 'CN' },
    { code: '+82', label: '🇰🇷 +82', name: 'KR' },
    { code: '+55', label: '🇧🇷 +55', name: 'BR' },
    { code: '+52', label: '🇲🇽 +52', name: 'MX' },
    { code: '+234', label: '🇳🇬 +234', name: 'NG' },
    { code: '+27', label: '🇿🇦 +27', name: 'ZA' },
    { code: '+254', label: '🇰🇪 +254', name: 'KE' },
    { code: '+971', label: '🇦🇪 +971', name: 'AE' },
    { code: '+966', label: '🇸🇦 +966', name: 'SA' },
    { code: '+65', label: '🇸🇬 +65', name: 'SG' },
    { code: '+31', label: '🇳🇱 +31', name: 'NL' },
    { code: '+46', label: '🇸🇪 +46', name: 'SE' },
    { code: '+47', label: '🇳🇴 +47', name: 'NO' },
    { code: '+34', label: '🇪🇸 +34', name: 'ES' },
    { code: '+39', label: '🇮🇹 +39', name: 'IT' },
    { code: '+41', label: '🇨🇭 +41', name: 'CH' },
    { code: '+48', label: '🇵🇱 +48', name: 'PL' },
    { code: '+63', label: '🇵🇭 +63', name: 'PH' },
    { code: '+60', label: '🇲🇾 +60', name: 'MY' },
    { code: '+66', label: '🇹🇭 +66', name: 'TH' },
    { code: '+62', label: '🇮🇩 +62', name: 'ID' },
    { code: '+84', label: '🇻🇳 +84', name: 'VN' },
    { code: '+20', label: '🇪🇬 +20', name: 'EG' },
    { code: '+233', label: '🇬🇭 +233', name: 'GH' },
    { code: '+256', label: '🇺🇬 +256', name: 'UG' },
    { code: '+255', label: '🇹🇿 +255', name: 'TZ' },
    { code: '+353', label: '🇮🇪 +353', name: 'IE' },
    { code: '+64', label: '🇳🇿 +64', name: 'NZ' },
    { code: '+972', label: '🇮🇱 +972', name: 'IL' },
    { code: '+90', label: '🇹🇷 +90', name: 'TR' },
    { code: '+7', label: '🇷🇺 +7', name: 'RU' },
    { code: '+380', label: '🇺🇦 +380', name: 'UA' },
    { code: '+57', label: '🇨🇴 +57', name: 'CO' },
    { code: '+56', label: '🇨🇱 +56', name: 'CL' },
    { code: '+54', label: '🇦🇷 +54', name: 'AR' },
    { code: '+51', label: '🇵🇪 +51', name: 'PE' },
    { code: '+880', label: '🇧🇩 +880', name: 'BD' },
    { code: '+92', label: '🇵🇰 +92', name: 'PK' },
    { code: '+94', label: '🇱🇰 +94', name: 'LK' },
    { code: '+977', label: '🇳🇵 +977', name: 'NP' },
  ];

  function captureReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      document.cookie = `school_ai_ref=${encodeURIComponent(refCode)};max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;
      localStorage.setItem('school_ai_ref', refCode);
    }
  }

  function getReferralCode() {
    const fromUrl = new URLSearchParams(window.location.search).get('ref');
    if (fromUrl) return fromUrl;
    const fromCookie = document.cookie.match(/school_ai_ref=([^;]+)/)?.[1];
    if (fromCookie) return decodeURIComponent(fromCookie);
    return localStorage.getItem('school_ai_ref');
  }

  function isGateSatisfied() {
    try {
      const ts = localStorage.getItem(STORAGE_KEY);
      if (!ts) return false;
      const stored = new Date(ts).getTime();
      if (isNaN(stored)) return false;
      const ageMs = Date.now() - stored;
      return ageMs < EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    } catch (_) {
      return false;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  function injectStyles() {
    if (document.getElementById('sai-live-gate-styles')) return;
    const style = document.createElement('style');
    style.id = 'sai-live-gate-styles';
    style.textContent = `
      #sai-live-gate-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.72);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        font-family: 'Gilroy', system-ui, sans-serif;
        opacity: 1;
        transition: opacity 300ms ease;
      }
      #sai-live-gate-overlay.sai-fading { opacity: 0; }
      #sai-live-gate-card {
        position: relative;
        width: 100%;
        max-width: 480px;
        border-radius: 24px;
        overflow: hidden;
        padding: 32px 24px;
        background: rgba(12, 16, 32, 0.85);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid transparent;
        border-top-color: rgba(255, 255, 255, 0.25);
        border-left-color: rgba(255, 255, 255, 0.14);
        border-right-color: rgba(255, 255, 255, 0.05);
        border-bottom-color: rgba(255, 255, 255, 0.02);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
      }
      #sai-live-gate-card .sai-pill {
        display: inline-flex;
        padding: 6px 16px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        background: linear-gradient(135deg, rgba(139, 241, 241, 0.15), rgba(95, 252, 192, 0.15));
        border: 1px solid rgba(139, 241, 241, 0.3);
        color: #8BF1F1;
        margin-bottom: 16px;
      }
      #sai-live-gate-card h2 {
        font-size: 26px;
        font-weight: 600;
        line-height: 1.15;
        margin: 0 0 8px 0;
        background: linear-gradient(4.67deg, #389ABF 4.69%, #8BF1F1 51.21%, #5FFCC0 95.94%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      #sai-live-gate-card p.sai-sub {
        color: rgba(255, 255, 255, 0.75);
        font-size: 15px;
        line-height: 1.5;
        margin: 0 0 24px 0;
      }
      #sai-live-gate-card .sai-row {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
      }
      #sai-live-gate-card .sai-row > * { flex: 1; }
      #sai-live-gate-card .sai-field {
        margin-bottom: 12px;
      }
      #sai-live-gate-card input.sai-input {
        background: transparent;
        border: 1px solid transparent;
        border-top-color: rgba(255, 255, 255, 0.3);
        border-left-color: rgba(255, 255, 255, 0.1);
        border-right-color: rgba(255, 255, 255, 0.04);
        border-bottom-color: rgba(255, 255, 255, 0.02);
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 12px;
        padding: 14px 16px;
        font-size: 16px;
        color: white;
        width: 100%;
        height: 52px;
        outline: none;
        font-family: inherit;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }
      #sai-live-gate-card input.sai-input::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
      #sai-live-gate-card input.sai-input:focus {
        border-color: rgba(139, 241, 241, 0.6);
      }
      #sai-live-gate-card input.sai-input.sai-error {
        border-color: #ff4d4d;
      }
      #sai-live-gate-card .sai-phone {
        display: flex;
        align-items: center;
        background: transparent;
        border: 1px solid transparent;
        border-top-color: rgba(255, 255, 255, 0.3);
        border-left-color: rgba(255, 255, 255, 0.1);
        border-right-color: rgba(255, 255, 255, 0.04);
        border-bottom-color: rgba(255, 255, 255, 0.02);
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 12px;
        height: 52px;
        transition: border-color 0.2s;
      }
      #sai-live-gate-card .sai-phone:focus-within {
        border-color: rgba(139, 241, 241, 0.6);
      }
      #sai-live-gate-card .sai-phone.sai-error {
        border-color: #ff4d4d;
      }
      #sai-live-gate-card .sai-country {
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.85);
        font-size: 16px;
        font-family: inherit;
        cursor: pointer;
        outline: none;
        padding: 0 16px 0 12px;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 9C18 9 13.5811 15 12 15C10.4188 15 6 9 6 9' stroke='rgba(255,255,255,0.8)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 2px center;
      }
      #sai-live-gate-card .sai-country option {
        background: #1a1a2e;
        color: white;
      }
      #sai-live-gate-card .sai-phone-input {
        background: transparent;
        border: none;
        padding: 14px 16px 14px 8px;
        font-size: 16px;
        color: white;
        width: 100%;
        height: 100%;
        outline: none;
        font-family: inherit;
      }
      #sai-live-gate-card .sai-err-msg {
        color: #ff4d4d;
        font-size: 12px;
        margin-top: 4px;
        display: none;
      }
      #sai-live-gate-card .sai-err-msg.sai-visible {
        display: block;
      }
      #sai-live-gate-card .sai-submit-wrap {
        position: relative;
        margin-top: 16px;
      }
      #sai-live-gate-card .sai-submit-glow {
        position: absolute;
        inset: -3px;
        border-radius: 9999px;
        background: conic-gradient(from 180deg,
          #AF52DE 0deg, #FF2D92 52deg, #FF6482 82deg, #FF9500 94deg,
          #FFD60A 124deg, #30D158 180deg, #2EC4B6 236deg, #40CBF0 266deg,
          #007AFF 278deg, #5856D6 308deg, #AF52DE 360deg);
        filter: blur(14px);
        opacity: 0.44;
        pointer-events: none;
        z-index: 0;
      }
      #sai-live-gate-card .sai-submit-wrap:hover .sai-submit-glow {
        opacity: 0.56;
        filter: blur(18px);
      }
      #sai-live-gate-card button.sai-submit {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 56px;
        border-radius: 9999px;
        background: rgba(10, 14, 30, 0.55);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        color: white;
        font-weight: 600;
        font-size: 17px;
        font-family: inherit;
        cursor: pointer;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: transform 0.15s;
      }
      #sai-live-gate-card button.sai-submit:active { transform: scale(0.98); }
      #sai-live-gate-card button.sai-submit:disabled { opacity: 0.7; cursor: wait; }
      #sai-live-gate-card button.sai-submit::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        padding: 1px;
        background: conic-gradient(from 180deg,
          #AF52DE 0deg, #FF2D92 52deg, #FF6482 82deg, #FF9500 94deg,
          #FFD60A 124deg, #30D158 180deg, #2EC4B6 236deg, #40CBF0 266deg,
          #007AFF 278deg, #5856D6 308deg, #AF52DE 360deg);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
      #sai-live-gate-card .sai-failure {
        display: none;
        text-align: center;
      }
      #sai-live-gate-card .sai-failure.sai-visible { display: block; }
      #sai-live-gate-card .sai-failure-msg {
        color: #ff7a7a;
        font-size: 14px;
        margin-bottom: 16px;
      }
      #sai-live-gate-card .sai-retry {
        padding: 12px 28px;
        border-radius: 9999px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 15px;
      }
    `;
    document.head.appendChild(style);
  }

  function setBehindAriaHidden(value) {
    Array.from(document.body.children).forEach((el) => {
      if (el.id === 'sai-live-gate-overlay') return;
      if (value) {
        if (!el.hasAttribute('data-sai-prev-aria')) {
          el.setAttribute('data-sai-prev-aria', el.getAttribute('aria-hidden') || '');
        }
        el.setAttribute('aria-hidden', 'true');
      } else {
        const prev = el.getAttribute('data-sai-prev-aria');
        if (prev === null || prev === '') {
          el.removeAttribute('aria-hidden');
        } else {
          el.setAttribute('aria-hidden', prev);
        }
        el.removeAttribute('data-sai-prev-aria');
      }
    });
  }

  function renderPopup() {
    injectStyles();

    const overlay = document.createElement('div');
    overlay.id = 'sai-live-gate-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'sai-live-gate-title');

    overlay.innerHTML = `
      <div id="sai-live-gate-card">
        <div class="sai-pill">School of AI</div>
        <h2 id="sai-live-gate-title">Welcome to the School of AI</h2>
        <p class="sai-sub">Drop your info to unlock today's resources.</p>
        <form id="sai-live-gate-form" novalidate>
          <div class="sai-row">
            <div class="sai-field">
              <input type="text" name="firstName" class="sai-input" placeholder="First Name" required>
              <div class="sai-err-msg">First name is required</div>
            </div>
            <div class="sai-field">
              <input type="text" name="lastName" class="sai-input" placeholder="Last Name" required>
              <div class="sai-err-msg">Last name is required</div>
            </div>
          </div>
          <div class="sai-field">
            <input type="email" name="email" class="sai-input" placeholder="Email Address" required>
            <div class="sai-err-msg">Please enter a valid email address</div>
          </div>
          <div class="sai-field">
            <div class="sai-phone" id="sai-phone-wrapper">
              <select id="sai-country-code" class="sai-country" aria-label="Country code"></select>
              <input type="tel" name="phone" class="sai-phone-input" placeholder="Phone Number" required>
            </div>
            <div class="sai-err-msg" id="sai-phone-error">Please enter a valid phone number</div>
          </div>
          <div class="sai-submit-wrap">
            <div class="sai-submit-glow"></div>
            <button type="submit" class="sai-submit" id="sai-submit-btn">
              <span>Unlock Resources</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 6C9 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
        <div class="sai-failure" id="sai-failure">
          <div class="sai-failure-msg">Submission didn't go through. Please try again.</div>
          <button type="button" class="sai-retry" id="sai-retry-btn">Try Again</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    setBehindAriaHidden(true);

    const countrySelect = overlay.querySelector('#sai-country-code');
    countryCodes.forEach((c, i) => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = c.label;
      if (i === 0) opt.selected = true;
      countrySelect.appendChild(opt);
    });

    const form = overlay.querySelector('#sai-live-gate-form');
    const submitBtn = overlay.querySelector('#sai-submit-btn');
    const failureBox = overlay.querySelector('#sai-failure');
    const retryBtn = overlay.querySelector('#sai-retry-btn');
    const phoneInput = form.querySelector('input[name="phone"]');
    const phoneWrapper = overlay.querySelector('#sai-phone-wrapper');

    function showError(input, message) {
      input.classList.add('sai-error');
      const field = input.closest('.sai-field');
      const err = field ? field.querySelector('.sai-err-msg') : null;
      if (err) {
        if (message) err.textContent = message;
        err.classList.add('sai-visible');
      }
      if (input.name === 'phone') phoneWrapper.classList.add('sai-error');
    }

    function clearError(input) {
      input.classList.remove('sai-error');
      const field = input.closest('.sai-field');
      const err = field ? field.querySelector('.sai-err-msg') : null;
      if (err) err.classList.remove('sai-visible');
      if (input.name === 'phone') phoneWrapper.classList.remove('sai-error');
    }

    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => clearError(input));
    });

    phoneInput.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '');
      if (countrySelect.value === '+1') {
        if (digits.length > 10) digits = digits.slice(0, 10);
        if (digits.length >= 7) {
          e.target.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length >= 4) {
          e.target.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else if (digits.length > 0) {
          e.target.value = digits;
        }
      } else {
        if (digits.length > 15) digits = digits.slice(0, 15);
        e.target.value = digits;
      }
    });

    retryBtn.addEventListener('click', () => {
      failureBox.classList.remove('sai-visible');
      form.style.display = '';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      const firstName = form.querySelector('input[name="firstName"]');
      const lastName = form.querySelector('input[name="lastName"]');
      const email = form.querySelector('input[name="email"]');
      const phone = form.querySelector('input[name="phone"]');

      if (!firstName.value.trim()) { showError(firstName); isValid = false; }
      if (!lastName.value.trim()) { showError(lastName); isValid = false; }
      if (!email.value.trim() || !isValidEmail(email.value)) { showError(email); isValid = false; }
      if (!phone.value.trim() || !isValidPhone(phone.value)) { showError(phone); isValid = false; }

      if (!isValid) return;

      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Unlocking…</span>';

      const phoneDigits = phone.value.replace(/\D/g, '');
      const refCode = getReferralCode();
      const payload = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        name: `${firstName.value.trim()} ${lastName.value.trim()}`,
        email: email.value.trim(),
        phone: `${countrySelect.value}${phoneDigits}`,
        source: 'School of AI Live',
        tags: ['school of ai - form', 'school of ai - live'],
        ...(refCode ? { referralCode: refCode } : {}),
      };

      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Submission failed');

        try { await response.json(); } catch (_) { /* best-effort */ }

        localStorage.setItem(STORAGE_KEY, new Date().toISOString());

        overlay.classList.add('sai-fading');
        setTimeout(() => {
          setBehindAriaHidden(false);
          overlay.remove();
        }, 320);
      } catch (err) {
        console.error('Live gate submission error:', err);
        form.style.display = 'none';
        failureBox.classList.add('sai-visible');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      }
    });
  }

  function init() {
    captureReferral();
    if (!isGateSatisfied()) {
      renderPopup();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
