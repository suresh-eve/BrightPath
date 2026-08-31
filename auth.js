// BrightPath mock auth/session helpers — shared across all pages.
// Everything here is client-side localStorage only (no real backend);
// it exists so the prototype can demonstrate signed-in state, a persisted
// recurring gift, and a receipt history across page loads.

function getSession(){
  try{ return JSON.parse(localStorage.getItem('bp_session') || 'null'); }catch(e){ return null; }
}
function setSession(session){
  try{ localStorage.setItem('bp_session', JSON.stringify(session)); }catch(e){}
}
function signOut(){
  try{ localStorage.removeItem('bp_session'); }catch(e){}
  window.location.href = 'index.html';
}

// A donor can have more than one gift running at once (e.g. a monthly student
// sponsorship plus a separate one-off top-up) — these all live in one array so
// "Give again" adds a new gift instead of silently overwriting an existing one.
function getActiveGifts(){
  try{
    var raw = localStorage.getItem('bp_active_gifts');
    if(raw) return JSON.parse(raw) || [];
    var legacy = JSON.parse(localStorage.getItem('bp_active_gift') || 'null');
    if(legacy){
      legacy.id = legacy.id || ('g_' + Date.now());
      localStorage.setItem('bp_active_gifts', JSON.stringify([legacy]));
      localStorage.removeItem('bp_active_gift');
      return [legacy];
    }
    return [];
  }catch(e){ return []; }
}
function setActiveGifts(list){
  try{ localStorage.setItem('bp_active_gifts', JSON.stringify(list)); }catch(e){}
}
function addActiveGift(gift){
  var list = getActiveGifts();
  gift.id = gift.id || ('g_' + Date.now() + '_' + Math.floor(Math.random() * 1000));
  list.push(gift);
  setActiveGifts(list);
  return gift;
}
function updateActiveGift(id, patch){
  var list = getActiveGifts();
  var gift = list.find(function(g){ return g.id === id; });
  if(!gift) return null;
  Object.keys(patch).forEach(function(k){ gift[k] = patch[k]; });
  setActiveGifts(list);
  return gift;
}
function getGiftById(id){
  return getActiveGifts().find(function(g){ return g.id === id; }) || null;
}

// Dev/QA utility only — this is a localStorage-only prototype with no way to
// tell a tester's repeated pledges apart from a real donor's, so this is how
// you get back to a clean slate instead of every stat page accumulating every
// pledge you've ever made while testing.
function resetMyGivingHistory(){
  try{
    localStorage.removeItem('bp_active_gifts');
    localStorage.removeItem('bp_active_gift');
    localStorage.removeItem('bp_transactions');
  }catch(e){}
}
// The gift nav CTAs and empty-states care about when they just need to know
// "does this donor have any giving going at all" — the first non-cancelled one.
function getPrimaryActiveGift(){
  return getActiveGifts().filter(function(g){ return g.status !== 'cancelled'; })[0] || null;
}

// A gift is "pending match" when the donor has already paid and committed to
// giving to a student or mentee, but hasn't picked who that is yet — this is
// the state that needs a lightweight "assign", never a second checkout.
function isPendingMatch(gift){
  return !!(gift && gift.status !== 'cancelled' && !gift.studentId && (gift.giveType === 'student' || gift.giveType === 'mentor'));
}

// Whether the current donor already has a non-cancelled gift pointed at this
// specific student — checked before showing a fresh "pledge" CTA anywhere
// (listing card, profile page) so the same student can't be double-pledged
// and every page agrees on whether you've already committed to them.
function hasPledgedStudent(studentId){
  return getActiveGifts().some(function(g){
    return g.status !== 'cancelled' && g.studentId === studentId;
  });
}

// Shared login gate — used by every page that records a gift (the student
// listing, a student's profile, the general fund) so "am I logged in" and
// "how do I ask" only exist in one place.
function isLoggedIn(){ var sess = getSession(); return !!(sess && sess.name); }
function requireLogin(cb){
  if(isLoggedIn()){ cb(); return; }
  window.onLoginSuccess = function(){ renderAccountNav(); cb(); };
  openLoginModal();
}
function receiptNo(){ return 'BP-' + Math.floor(100000 + Math.random()*900000); }

function getCorporateLeads(){
  try{ return JSON.parse(localStorage.getItem('bp_corporate_leads') || '[]'); }catch(e){ return []; }
}
function addCorporateLead(lead){
  var list = getCorporateLeads();
  list.push(lead);
  try{ localStorage.setItem('bp_corporate_leads', JSON.stringify(list)); }catch(e){}
  return list;
}

function getMessages(){
  try{ return JSON.parse(localStorage.getItem('bp_messages') || '[]'); }catch(e){ return []; }
}
function addMessage(msg){
  var list = getMessages();
  list.push(msg);
  try{ localStorage.setItem('bp_messages', JSON.stringify(list)); }catch(e){}
  return list;
}

function getTransactions(){
  try{ return JSON.parse(localStorage.getItem('bp_transactions') || '[]'); }catch(e){ return []; }
}
function addTransaction(tx){
  var list = getTransactions();
  list.unshift(tx);
  try{ localStorage.setItem('bp_transactions', JSON.stringify(list)); }catch(e){}
  return list;
}

function printReceipt(r){
  var win = window.open('', '_blank', 'width=480,height=640');
  if(!win) return;
  var rows = [
    ['Confirmation No.', r.receiptNo || '—'],
    ['Date', r.dateLabel || '—'],
    ['Donor', r.donorName || 'Guest'],
    ['Giving to', r.target || '—'],
    ['Amount', r.amountLabel || '—']
  ];
  if(r.feeLabel){ rows.push(['Fee covered', r.feeLabel]); rows.push(['Total charged', r.totalLabel]); }
  rows.push(['Frequency', r.freqLabel || '—']);
  var rowsHtml = rows.map(function(row){
    return '<tr><td>' + row[0] + '</td><td style="text-align:right;font-weight:600;">' + row[1] + '</td></tr>';
  }).join('');
  win.document.write(
    '<!DOCTYPE html><html><head><title>Pledge confirmation ' + (r.receiptNo || '') + ' — BrightPath</title>' +
    '<style>body{font-family:-apple-system,\'Segoe UI\',Arial,sans-serif;padding:32px;color:#1F2A24;}' +
    'h1{font-size:18px;margin-bottom:4px;}.sub{color:#4B5750;font-size:13px;margin-bottom:24px;}' +
    'table{width:100%;border-collapse:collapse;}td{padding:8px 0;border-top:1px solid #E4DAC7;font-size:14px;}' +
    'tr:first-child td{border-top:none;}.foot{margin-top:28px;font-size:11.5px;color:#4B5750;}</style>' +
    '</head><body>' +
    '<h1>BrightPath</h1><div class="sub">Pledge confirmation — a HalaTuju initiative</div>' +
    '<table>' + rowsHtml + '</table>' +
    '<p class="foot">This confirms your pledge of support to BrightPath. Keep it for your records. Questions? Contact your BrightPath coordinator.</p>' +
    '</body></html>'
  );
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 300);
}

function toggleAccountDropdown(){
  var dd = document.getElementById('account-dropdown');
  if(dd) dd.style.display = (dd.style.display === 'block') ? 'none' : 'block';
}
document.addEventListener('click', function(e){
  var menu = document.getElementById('account-menu');
  var dd = document.getElementById('account-dropdown');
  if(menu && dd && dd.style.display === 'block' && !menu.contains(e.target)){
    dd.style.display = 'none';
  }
});

function renderAccountNav(){
  injectLoginModal();
  var session = getSession();
  var loginLink = document.getElementById('nav-login');
  var menu = document.getElementById('account-menu');
  if(session && session.name){
    if(loginLink) loginLink.style.display = 'none';
    if(menu){
      menu.style.display = 'inline-block';
      var trigger = document.getElementById('account-trigger');
      if(trigger) trigger.innerHTML = '<span class="hi-prefix">Hi, </span>' + session.name.split(' ')[0] + ' ▾';
    }
  } else {
    if(menu) menu.style.display = 'none';
    if(loginLink){
      loginLink.style.display = '';
      loginLink.onclick = function(e){ e.preventDefault(); openLoginModal(); };
    }
  }
}

// Shared login modal — used everywhere via the nav "Log in" button, plus any
// page that wants an inline sign-in prompt. Deliberately separate from the
// giving wizard: signing in should never
// force a donor through "how do you want to give" first, and starting a gift
// should never force an account first (guest checkout stays the default).
function injectLoginModal(){
  if(document.getElementById('login-modal-backdrop')) return;
  var wrap = document.createElement('div');
  wrap.innerHTML =
    '<div class="login-modal-backdrop" id="login-modal-backdrop">' +
      '<div class="login-modal" role="dialog" aria-modal="true" aria-label="Log in to BrightPath">' +
        '<button class="login-modal-close" onclick="closeLoginModal()" aria-label="Close">&times;</button>' +
        '<div id="login-panel-providers">' +
          '<h2>Continue to BrightPath</h2>' +
          '<p class="sub">One tap, no password to remember.</p>' +
          '<button class="sso-btn" onclick="mockLoginSSO(\'google\', this)"><svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.6 7.8 23 12 23z"/><path fill="#FBBC05" d="M6 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.9H2.3C1.5 8.5 1 10.2 1 12s.5 3.5 1.3 5.1L6 14.3z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2C17.4 2.1 15 1 12 1 7.8 1 4.1 3.4 2.3 6.9L6 9.7c.9-2.5 3.2-4.3 6-4.3z"/></svg>Continue with Google</button>' +
          '<button class="sso-btn" onclick="mockLoginSSO(\'facebook\', this)"><svg width="17" height="17" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.07C24 5.4 18.6 0 12 0S0 5.4 0 12.07C0 18.1 4.4 23.1 10.1 24v-8.44H7.1v-3.49h3v-2.66c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.23 2.6.23v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8v2.33h3.3l-.5 3.49h-2.8V24C19.6 23.1 24 18.1 24 12.07z"/></svg>Continue with Facebook</button>' +
          '<button class="sso-btn" onclick="mockLoginSSO(\'apple\', this)"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M16.5 1c.1 1.3-.4 2.6-1.2 3.6-.8 1-2.1 1.7-3.4 1.6-.2-1.3.4-2.6 1.2-3.5.8-1 2.2-1.7 3.4-1.7zM20.9 17.3c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.6 0-2.8-1.5-3.7-2.9C2.3 17.4 1.6 12.5 3.5 9.2c1-1.7 2.7-2.7 4.3-2.7 1.5 0 2.5 1 3.7 1s2-1.2 3.9-1c.8 0 3 .3 4.4 2.4-.1.1-2.6 1.5-2.6 4.5 0 3.5 3.1 4.7 3.1 4.7z"/></svg>Continue with Apple</button>' +
          '<div class="sso-divider">or continue with email</div>' +
          '<input type="email" id="login-email" placeholder="you@email.com">' +
          '<button class="btn btn-ghost btn-block" onclick="mockLoginEmail()">Continue with email &rarr;</button>' +
        '</div>' +
        '<div id="login-panel-name" style="display:none;">' +
          '<h2>What should we call you?</h2>' +
          '<p class="sub">We&rsquo;ll use this on your dashboard and pledge confirmations.</p>' +
          '<input type="text" id="login-name" placeholder="e.g. Ahmad Rahman">' +
          '<button class="btn btn-primary btn-block" onclick="confirmLoginName()">Continue &rarr;</button>' +
        '</div>' +
        '<div id="login-panel-success" style="display:none;text-align:center;">' +
          '<div class="login-success-check"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12L10 16L18 8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          '<h2>You&rsquo;re in, <span id="login-success-name"></span>!</h2>' +
          '<p class="sub">Track your giving, pledge confirmations and updates anytime from your dashboard.</p>' +
          '<a href="index.html#student-listing" class="btn btn-primary btn-block" style="margin-bottom:10px;">Continue to giving options &rarr;</a>' +
          '<button class="btn btn-ghost btn-block" onclick="finishLoginModal()">Continue browsing</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrap.firstElementChild);

  document.getElementById('login-modal-backdrop').addEventListener('click', function(e){
    if(e.target.id === 'login-modal-backdrop') closeLoginModal();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLoginModal();
  });
}

function openLoginModal(){
  injectLoginModal();
  document.getElementById('login-panel-providers').style.display = 'block';
  document.getElementById('login-panel-name').style.display = 'none';
  document.getElementById('login-panel-success').style.display = 'none';
  document.getElementById('login-email').value = '';
  document.querySelectorAll('#login-modal-backdrop .sso-btn').forEach(function(b){
    b.classList.remove('connecting');
  });
  document.getElementById('login-modal-backdrop').classList.add('open');
}
function closeLoginModal(){
  var el = document.getElementById('login-modal-backdrop');
  if(el) el.classList.remove('open');
}
// Called after the donor closes the "you're in" success panel. A page mid-
// pledge overrides window.onLoginSuccess to update itself in place (so a
// mid-checkout sign-in doesn't lose the gift they were setting up) — every
// other page just reloads, which is the simplest way to make every
// session-dependent bit of that page (dashboard's signed-in view, a pending
// student match, etc.) correct without hand-wiring each one.
function finishLoginModal(){
  closeLoginModal();
  if(typeof window.onLoginSuccess === 'function'){
    window.onLoginSuccess();
  } else {
    window.location.reload();
  }
}

var _pendingLogin = null;
function mockLoginSSO(provider, btn){
  btn.classList.add('connecting');
  btn.innerHTML = 'Connecting…';
  setTimeout(function(){
    _pendingLogin = {method: provider, email: null};
    showNamePanel();
  }, 450);
}
function mockLoginEmail(){
  var input = document.getElementById('login-email');
  var email = (input.value || '').trim();
  if(!email || !input.checkValidity()){
    input.reportValidity();
    return;
  }
  _pendingLogin = {method: 'email', email: email};
  showNamePanel(email);
}
function showNamePanel(email){
  document.getElementById('login-panel-providers').style.display = 'none';
  document.getElementById('login-panel-name').style.display = 'block';
  var nameInput = document.getElementById('login-name');
  var suggested = '';
  if(email){
    var prefix = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim();
    if(prefix){
      suggested = prefix.split(/\s+/).filter(Boolean).map(function(w){
        return w.charAt(0).toUpperCase() + w.slice(1);
      }).join(' ');
    }
  }
  nameInput.value = suggested;
  nameInput.focus();
}
function confirmLoginName(){
  var nameInput = document.getElementById('login-name');
  var name = (nameInput.value || '').trim();
  if(!name){ nameInput.focus(); return; }
  setSession({
    name: name,
    method: (_pendingLogin && _pendingLogin.method) || 'email',
    email: (_pendingLogin && _pendingLogin.email) || null
  });
  document.getElementById('login-panel-name').style.display = 'none';
  document.getElementById('login-panel-success').style.display = 'block';
  document.getElementById('login-success-name').textContent = name.split(' ')[0];
  renderAccountNav();
}
