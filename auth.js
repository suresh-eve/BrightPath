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
    ['Receipt No.', r.receiptNo || '—'],
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
    '<!DOCTYPE html><html><head><title>Receipt ' + (r.receiptNo || '') + ' — BrightPath</title>' +
    '<style>body{font-family:-apple-system,\'Segoe UI\',Arial,sans-serif;padding:32px;color:#1F2A24;}' +
    'h1{font-size:18px;margin-bottom:4px;}.sub{color:#4B5750;font-size:13px;margin-bottom:24px;}' +
    'table{width:100%;border-collapse:collapse;}td{padding:8px 0;border-top:1px solid #E4DAC7;font-size:14px;}' +
    'tr:first-child td{border-top:none;}.foot{margin-top:28px;font-size:11.5px;color:#4B5750;}</style>' +
    '</head><body>' +
    '<h1>BrightPath</h1><div class="sub">Official donation receipt — a HalaTuju initiative</div>' +
    '<table>' + rowsHtml + '</table>' +
    '<p class="foot">This receipt confirms your contribution to BrightPath. Keep it for your records. Questions? Contact your BrightPath coordinator.</p>' +
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
  var session = getSession();
  var loginLink = document.getElementById('nav-login');
  var startLink = document.getElementById('nav-start');
  var menu = document.getElementById('account-menu');
  if(session && session.name){
    if(loginLink) loginLink.style.display = 'none';
    if(startLink) startLink.textContent = getPrimaryActiveGift() ? 'Give again' : 'Start giving';
    if(menu){
      menu.style.display = 'inline-block';
      var trigger = document.getElementById('account-trigger');
      if(trigger) trigger.innerHTML = '<span class="hi-prefix">Hi, </span>' + session.name.split(' ')[0] + ' ▾';
    }
    var eyebrow = document.querySelector('.hero .eyebrow');
    if(eyebrow) eyebrow.textContent = 'Welcome back, ' + session.name.split(' ')[0];
  } else {
    if(menu) menu.style.display = 'none';
    if(loginLink) loginLink.style.display = '';
  }
}
