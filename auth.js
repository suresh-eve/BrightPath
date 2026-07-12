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

function getActiveGift(){
  try{ return JSON.parse(localStorage.getItem('bp_active_gift') || 'null'); }catch(e){ return null; }
}
function setActiveGift(gift){
  try{ localStorage.setItem('bp_active_gift', JSON.stringify(gift)); }catch(e){}
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
    if(startLink) startLink.textContent = 'Give again';
    if(menu){
      menu.style.display = 'inline-block';
      var trigger = document.getElementById('account-trigger');
      if(trigger) trigger.textContent = 'Hi, ' + session.name.split(' ')[0] + ' ▾';
    }
    var eyebrow = document.querySelector('.hero .eyebrow');
    if(eyebrow) eyebrow.textContent = 'Welcome back, ' + session.name.split(' ')[0];
  } else {
    if(menu) menu.style.display = 'none';
    if(loginLink) loginLink.style.display = '';
  }
}
