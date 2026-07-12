// Stylized, hand-drawn-style illustration avatars for the student pool.
//
// BrightPath never shows a real photo of a real student until a sponsor's
// first payment clears and the student (and guardian, for minors) has given
// specific consent — see about.html#safety. These are deliberately flat,
// abstract illustrations (not photorealistic) so they can never be mistaken
// for a real photo of a real person: personality without identity.
//
// Six reusable hairstyle templates (three per gender) are combined with a
// deterministic, id-based rotation through skin/hair/garment tones, so the
// pool reads as varied without needing a hand-drawn asset per student.

var AVATAR_SKIN = ['#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#FFDBAC'];
var AVATAR_HAIR = ['#2B1B12', '#1F1A17', '#3B2A1E'];
var AVATAR_GARMENT = ['#153F35', '#B8532F', '#5A3B70', '#1F5C4E', '#8A5A1E'];
var AVATAR_TUDUNG = ['#B8532F', '#5A3B70', '#1F5C4E', '#8A5A1E', '#153F35'];

function avatarPick(arr, n) {
  var i = ((n % arr.length) + arr.length) % arr.length;
  return arr[i];
}

function studentAvatarSvg(student) {
  var id = student.id || 1;
  var gender = student.gender === 'f' ? 'f' : 'm';
  var skin = avatarPick(AVATAR_SKIN, id);
  var hair = avatarPick(AVATAR_HAIR, id + 1);
  var garment = avatarPick(AVATAR_GARMENT, id + 2);
  var tudung = avatarPick(AVATAR_TUDUNG, id + 3);
  var styleIdx = Math.floor(id / 2) % 3;

  var shoulders = '<path d="M30 232 Q30 150 100 146 Q170 150 170 232 Z" fill="' + garment + '"/>';
  var neck = '<rect x="85" y="126" width="30" height="28" rx="8" fill="' + skin + '"/>';
  var eyes = '<circle cx="85" cy="94" r="3.4" fill="#2B1B12"/><circle cx="115" cy="94" r="3.4" fill="#2B1B12"/>';
  var blush = '<ellipse cx="76" cy="108" rx="7" ry="4.5" fill="' + garment + '" opacity="0.16"/><ellipse cx="124" cy="108" rx="7" ry="4.5" fill="' + garment + '" opacity="0.16"/>';
  var smile = '<path d="M84 114 Q100 124 116 114" stroke="#2B1B12" stroke-width="3" fill="none" stroke-linecap="round"/>';
  var face = '<ellipse cx="100" cy="103" rx="38" ry="44" fill="' + skin + '"/>';

  var head = '';
  if (gender === 'f') {
    if (styleIdx === 0) {
      // short bob
      head = '<ellipse cx="100" cy="85" rx="47" ry="55" fill="' + hair + '"/>' + face;
    } else if (styleIdx === 1) {
      // long hair past the shoulders — same head cap as the bob, plus two
      // strands draping down either side, with a natural center part.
      head = '<ellipse cx="100" cy="85" rx="47" ry="55" fill="' + hair + '"/>' +
        '<ellipse cx="65" cy="168" rx="15" ry="54" fill="' + hair + '"/>' +
        '<ellipse cx="135" cy="168" rx="15" ry="54" fill="' + hair + '"/>' +
        face;
    } else {
      // tudung — one continuous hood (no center part) draping past the
      // shoulders on both sides, deliberately distinct from loose hair.
      head = '<ellipse cx="100" cy="90" rx="58" ry="68" fill="' + tudung + '"/>' +
        '<ellipse cx="58" cy="182" rx="26" ry="58" fill="' + tudung + '"/>' +
        '<ellipse cx="142" cy="182" rx="26" ry="58" fill="' + tudung + '"/>' +
        '<ellipse cx="100" cy="108" rx="35" ry="40" fill="' + skin + '"/>';
    }
  } else {
    if (styleIdx === 0) {
      // short crop
      head = '<ellipse cx="100" cy="80" rx="44" ry="48" fill="' + hair + '"/>' + face;
    } else if (styleIdx === 1) {
      // side part
      head = '<ellipse cx="100" cy="80" rx="45" ry="48" fill="' + hair + '"/>' + face +
        '<path d="M62 68 Q100 56 140 70" stroke="' + hair + '" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.55"/>';
    } else {
      // cap / beanie
      head = face +
        '<path d="M55 84C55 53 74 38 100 38C126 38 145 53 145 84L145 76C145 65 124 58 100 58C76 58 55 65 55 76Z" fill="' + hair + '"/>' +
        '<rect x="54" y="72" width="92" height="10" rx="5" fill="' + hair + '"/>';
    }
  }

  return '<svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" role="img" aria-label="Illustrated avatar">' +
    shoulders + neck + head + eyes + blush + smile +
  '</svg>';
}

// Small circular version for compact badge contexts, in case a page still
// wants a single-color initial fallback (used only if illustration is unavailable).
function studentAvatarBadgeHtml(student, sizePx) {
  var size = sizePx || 44;
  return '<div class="avatar-illustration" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;overflow:hidden;flex-shrink:0;background:var(--cream-2);">' +
    studentAvatarSvg(student) +
  '</div>';
}
