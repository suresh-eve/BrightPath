// BrightPath student pool — 7 real, anonymised applicant cases drawn from actual
// BrightPath interviews. Students are identified only by a neutral code (matching
// HalaTuju's own S-XXXXX convention) — never a real or fictional name, no age, no
// photos. Avatar blocks use a generic icon + colour only, never AI-generated or real
// imagery. Sponsors never receive the student's real identity, regardless of how
// long they've been giving — only BrightPath-approved, separately screened mentors do.

var MONTHLY_RATE = 200; // BrightPath's standard per-student monthly giving rate

const GRADIENTS = [
  ['#F4DCC5', '#1F5C4E'],
  ['#E7D3EF', '#153F35'],
  ['#F0DCC0', '#E2704A'],
  ['#FBEACD', '#8B5FA8'],
  ['#DCEAE3', '#B8532F']
];

// Each student's goal is a variable total — not a fixed amount for everyone —
// expressed to donors as a consistent RM200/month rate for however many months
// (`months`) that student's verified gap actually spans. goal = months * 200,
// matching how HalaTuju itself prices real students (RM1,000 over 5 months,
// RM2,000 over 10, etc. — always RM200/month). `covers` lists what the gift
// actually pays for — no invented dollar breakdown per category.
const STUDENTS = [
  { id:1, code:'S-4980DA', state:'Selangor', school:'Kolej Tingkatan Enam Sultan Abdul Aziz', level:'STPM (Form 6)', course:'Social Science', academic:"6 A's in SPM, CGPA 3.75 in Form 6", family:"Mother is a cleaner, father a security guard recently back at work after a year off following brain tumour surgery — both earn around RM1,700/month.", ambition:'A business-related degree at a public university (IPTA).', story:"I've watched my parents work through so much just to keep us going. I want to finish my studies and build them a more stable future.", months:5, goal:1000, raised:1000, covers:['living','transport','books','device','tuition','other'] },
  { id:2, code:'S-5DD7A4', state:'Negeri Sembilan', school:'Kolej Tingkatan Enam Tuanku Muhriz', level:'STPM (Form 6)', course:'Social Science', academic:"5 A's in SPM, strong first-semester Form 6 results", family:'Father is the sole provider — a private-company job plus part-time food delivery — supporting a family of five on around RM3,000/month.', ambition:'A teaching degree at UPSI, to become a government school teacher.', story:"I'll be the first in my family to go to university. I want to become the teacher my younger siblings can look up to.", months:5, goal:1000, raised:0, covers:['living','books','tuition'] },
  { id:3, code:'S-A028AE', state:'Johor', school:'Kolej Matrikulasi Johor', level:'Matriculation', course:'Science', academic:"SPM merit 89.0 — 10 A's including two A+, Bronze medalist, 2025 Maths Olympiad", family:'Helps care for an elderly grandmother and a mother with mobility difficulties; parents earn around RM3,300/month as a carpenter and nursery worker.', ambition:'To become a teacher or lecturer.', story:"Between caring for my grandmother and my studies, I learned discipline early. I want to become the kind of teacher who never gives up on a struggling student.", months:10, goal:2000, raised:0, covers:['living','transport','books','device'] },
  { id:4, code:'S-518D29', state:'Kedah', school:'Kolej Matrikulasi Kejuruteraan Kedah', level:'Matriculation', course:'Engineering', academic:"SPM merit 85.5 — 8 A's across sciences, mathematics, languages and humanities", family:"Youngest of four sons; family relies on his father's army pension of around RM2,146/month, with two brothers also in tertiary studies.", ambition:'A degree in mechanical engineering.', story:"I already skip meals to save for the bus home. I just want to focus on becoming an engineer without that constant worry.", months:10, goal:2000, raised:0, covers:['living'] },
  { id:5, code:'S-E47F17', state:'Perak', school:'Politeknik Tuanku Sultanah Bahiyah', level:'Diploma', course:'Accountancy', academic:'5 A\'s in SPM, successfully appealed a grade to secure a 6th A', family:'Father is the sole provider as a lorry driver earning around RM2,600/month; a car loan puts heavy strain on the household budget.', ambition:'To become an accountant, then a lecturer in her field.', story:"I'm the first in my family to continue studying after school. I want to build a career that lets me support them back.", months:10, goal:2000, raised:0, covers:['living','transport','accommodation','books','device','other'] },
  { id:6, code:'S-BEB4E0', state:'Selangor', school:'Kolej Tingkatan Enam Sri Istana', level:'STPM (Form 6)', course:'Social Science', academic:"7 A's in SPM", family:"Father's base salary of RM3,500 confirms the family's B40 status; a car loan and a younger sibling's schooling costs stretch the household budget.", ambition:'To become a criminologist or forensic psychologist.', story:"My results dipped when things got hard at home, but my goal hasn't changed — I want to work in criminal psychology and help keep people safe.", months:5, goal:1000, raised:1000, covers:['living'] },
  { id:7, code:'S-673D4B', state:'Negeri Sembilan', school:'Kolej Tingkatan Enam Tuanku Muhriz', level:'STPM (Form 6)', course:'Arts', academic:"5 A's in SPM, 2nd place nationally in a language & culture competition", family:"Father is a self-employed repair technician after a 2018 accident, earning around RM2,000–2,100/month; monthly rent of RM1,200 strains the household.", ambition:'A degree in Finance or Economics, to become a financial analyst.', story:"I don't own a laptop yet, but I've already placed second nationally in a language competition. Give me the chance to study finance, and I'll make it count.", months:5, goal:1000, raised:1000, covers:['living','transport','books','device'] },
  { id:8, code:'S-66F0D2', state:'Selangor', school:'Kolej Matrikulasi Perlis', level:'Matriculation', course:'Accounting', academic:"SPM merit 83.9 — 9 A's, named best Science student in her year", family:"Mother is the main provider, earning around RM1,480/month as a general worker; her father, unemployed, contributes roughly RM1,000/month driving local schoolchildren to school — utility bills are already in arrears.", ambition:'To become an accountant.', story:"Nine A's didn't come easy with everything going on at home, but I stayed focused. I want to become an accountant and ease things for my family.", months:10, goal:2000, raised:0, covers:['living','books','transport'] },
  { id:9, code:'S-824BF9', state:'Selangor', school:'Kolej Matrikulasi Selangor', level:'Matriculation', course:'Science', academic:"SPM merit 80.2 — 7 A's, achieved without paid tuition", family:"Mother has been the sole provider since her father's passing over a decade ago, earning around RM1,500/month from babysitting work, supporting a six-person household that includes an unemployed uncle and a working aunt.", ambition:'A degree in aeronautical or marine engineering.', story:"I stay at the hostel most weekends so my family doesn't have to spend on the trip home. I want to study engineering and build a career that lets me support them.", months:10, goal:2000, raised:0, covers:['living','books','tuition'] },
  { id:10, code:'S-C1BFB9', state:'Negeri Sembilan', school:'Institut Pendidikan Guru Kampus Tuanku Bainun', level:"Bachelor's Degree (Education)", course:'Tamil Language Education (SJKT)', academic:"SPM merit 65.7 — 7 A's, including mathematics and humanities", family:"First in his family to pursue higher education; his mother runs a small eatery stall to support a four-person household that includes an elder brother recovering from a major accident and a paralyzed uncle needing full-time care, on a reported income of around RM1,500/month.", ambition:'To become a primary school teacher.', story:"Between caring for my brother and my studies, I've learned what it means to show up for people. I want to become the kind of teacher who inspires the next generation.", months:10, goal:2000, raised:0, covers:['transport','books','device','living'] },
  { id:11, code:'S-097DD1', state:'Perak', school:'Kolej Matrikulasi Kedah', level:'Matriculation', course:'Science', academic:"SPM merit 85.5 — 7 A's", family:"Father is the sole provider, a mechanic running a bicycle shop, earning around RM3,500/month; ongoing medical costs for his diabetes and her grandmother's care strain the household, and she manages on a daily budget of RM5–RM7.", ambition:'A medical degree at UKM, to become an anaesthesiologist.', story:"I get by on RM5 to RM7 a day and often skip breakfast, but I know exactly where I'm headed — medical school, then a career caring for patients as an anaesthesiologist.", months:10, goal:2000, raised:0, covers:['living','transport','books','device'] }
];

// Alias — concepts.html (internal design-concept comparison tool) reads this
// name; kept as a plain alias so STUDENTS stays the single source of truth.
const REAL_STUDENTS = STUDENTS;
function pctFundedReal(s){ return pctFunded(s); }

function fmtRM(n){ return 'RM' + Math.round(n).toLocaleString('en-MY'); }
// Generic person silhouette — stands in for a photo/initial on anonymized
// profiles, so nothing about a student's identity is implied by their avatar.
function avatarIconHtml(size){
  size = size || 22;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
}
function pctFunded(s){ return Math.min(100, Math.round((s.raised / s.goal) * 100)); }
function gradientFor(id){ return GRADIENTS[(id - 1) % GRADIENTS.length]; }
function getStudentById(id){ return STUDENTS.find(function(s){ return s.id === Number(id); }); }

// Mock coordinator-moderated updates — stands in for the "termly update" the
// student verification checklist already promises sponsors (see student-profile.html).
// Written without the student's name, since sponsors never receive that identity.
function getUpdatesForStudent(id){
  var s = getStudentById(id);
  if(!s) return [];
  return [
    {
      date: '2026-06-18T00:00:00Z',
      title: 'Coordinator note — semester progress',
      body: 'Your student completed this semester of ' + s.course + ' and passed every core module. Coordinator note: "Settling in well and active in class discussions."'
    },
    {
      date: '2026-03-02T00:00:00Z',
      title: 'A note from your student',
      body: '"Thank you for believing in me. ' + s.story + '"'
    }
  ];
}

var GENERAL_FUND_UPDATES = [
  {
    date: '2026-06-01T00:00:00Z',
    title: 'June fund update',
    body: '2 students in the pool crossed the finish line this month. Gifts like yours, sent to wherever it was needed most, closed the remaining gap for a student who had been waiting the longest.'
  },
  {
    date: '2026-05-01T00:00:00Z',
    title: 'May fund update',
    body: 'A gift sent to wherever it was needed most fully closed the bursary gap for a Negeri Sembilan-based STPM student this month — she\'s continuing straight into her teaching-degree pathway.'
  }
];
