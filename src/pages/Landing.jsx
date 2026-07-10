import {
  Leaf, ArrowRight, Star, ShieldCheck, GraduationCap, Award, Users, Stethoscope,
  HeartPulse, Activity, Pill, Baby, Microscope, Check, User, Calendar, Video,
  ClipboardList,
} from "lucide-react";



const styles = `
  :root {
    --green-900: #1f4d3a;
    --green-800: #266449;
    --green-700: #2f7a58;
    --green-100: #e6efe7;
    --green-50: #eef5ef;
    --cream: #fcfbf8;
    --cream-2: #f7f1e8;
    --gold: #e2b13c;
    --gold-soft: #f0c75a;
    --text: #1f3b2d;
    --muted: #5e7368;
    --white: #ffffff;
    --border: #e6e3db;
    --shadow-card: 0 6px 24px rgba(31, 77, 58, 0.06);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--text);
    background: var(--cream);
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }
  .dn-page { width: 100%; overflow-x: hidden; }
  .dn-serif { font-family: 'DM Serif Display', 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
  .dn-italic { font-style: italic; color: var(--green-700); }
  .dn-gold-italic { font-style: italic; color: var(--gold); }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

  /* Eyebrow tag */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 18px; border-radius: 999px;
    background: var(--green-100); color: var(--green-800);
    font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .eyebrow.dark { background: rgba(255,255,255,0.08); color: #fff; }
  .eyebrow .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-700); }
  .eyebrow.dark .dot { background: var(--gold); }

  /* Nav */
  .nav { padding: 24px 0; background: var(--cream); }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-mark {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--green-800); display: grid; place-items: center; color: #d9eadb; font-size: 22px;
  }
  .logo-text { line-height: 1.1; }
  .logo-text strong { font-family: 'DM Serif Display', Georgia, serif; font-size: 20px; color: var(--green-900); display: block; }
  .logo-text span { font-size: 11px; letter-spacing: 2px; color: var(--muted); }
  .nav-links { display: flex; gap: 36px; }
  .nav-links a { color: var(--text); text-decoration: none; font-size: 15px; font-weight: 500; }
  .nav-links a:hover { color: var(--green-700); }
  .btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 12px 22px; border-radius: 999px; font-weight: 600;
    text-decoration: none; border: none; cursor: pointer; font-size: 15px;
    transition: transform .15s ease, background .15s ease;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn-primary { background: var(--green-800); color: #fff; }
  .btn-primary:hover { background: var(--green-900); }
  .btn-outline { background: transparent; color: var(--text); border: 1.5px solid var(--text); }
  .btn-gold { background: var(--gold); color: #3a2a06; }
  .btn-gold:hover { background: var(--gold-soft); }
  .arrow { display: inline-block; transition: transform .2s; }
  .btn:hover .arrow { transform: translateX(3px); }

/* Hero */
.hero {
  padding: 40px 0 96px;
  position: relative;
}

.hero-grid {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-grid > div {
  width: 100%;
  max-width: 900px;
  text-align: center;
}

.hero h1 {
  font-family: 'DM Serif Display', Georgia, serif;
  font-weight: 400;
  font-size: clamp(40px, 5.4vw, 72px);
  line-height: 1.05;
  color: var(--green-900);
  margin: 24px 0 28px;
}

.hero .lead {
  max-width: 760px;
  margin: 0 auto 32px;
}

.hero-ctas {
  justify-content: center;
}

.hero-stats {
  justify-content: center;
  margin-top: 36px;
  flex-wrap: wrap;
}


.hero p.lead {
  font-size: 17px;
  color: var(--muted);
  max-width: 660px;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  gap: 14px;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  gap: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
  max-width: 520px;
}

.stat .num {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 36px;
  color: var(--green-900);
}

.stat .lbl {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}




  .hero-badge.top { top: 60px; right: -20px; }
  .hero-badge.bottom { bottom: 60px; left: -30px; }
  .badge-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--cream-2); display: grid; place-items: center; color: var(--gold); font-size: 18px; }
  .badge-icon.green { background: var(--green-100); color: var(--green-800); }
  .badge-text { font-size: 13px; }
  .badge-text strong { display: block; font-size: 15px; color: var(--text); }
  .badge-text span { color: var(--muted); font-size: 12px; }

/* About */
.about {
  background: var(--cream-2);
  padding: 100px 0;
}

.about-grid {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.about h2 {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(32px, 3.8vw, 48px);
  line-height: 1.15;
  color: var(--green-900);
  margin: 20px 0 24px;
  text-align: center;
}

.about p.bio {
  color: var(--muted);
  margin: 0 auto 40px;
  font-size: 16px;
  line-height: 1.9;
  max-width: 850px;
  text-align: center;
}

.credentials {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 18px;
  margin-bottom: 40px;
}

.cred {
  background: var(--white);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: 0.25s;
}

.cred:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(31, 77, 58, 0.08);
}

.cred-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--green-100);
  display: grid;
  place-items: center;
  color: var(--green-800);
  flex-shrink: 0;
  font-size: 16px;
}

.cred strong {
  display: block;
  font-size: 14px;
  color: var(--text);
}

.cred span {
  font-size: 12px;
  color: var(--muted);
}

.quick-stats {
  background: var(--white);
  border-radius: 16px;
  padding: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.qs {
  text-align: center;
}

.qs .n {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 32px;
  color: var(--green-700);
}

.qs .l {
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
}



/* Services */
.services{
  background:var(--green-50);
  padding:110px 0;
}

.section-head{
  text-align:center;
  max-width:760px;
  margin:0 auto 70px;
}

.section-head h2{
  font-family:'DM Serif Display', Georgia, serif;
  font-size:clamp(34px,4vw,52px);
  line-height:1.15;
  color:var(--green-900);
  margin:22px 0 20px;
}

.section-head p{
  color:var(--muted);
  font-size:16px;
  line-height:1.8;
  max-width:680px;
  margin:0 auto;
}

.services-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px;
}

.service-card{
  background:var(--white);
  border-radius:18px;
  padding:32px;
  display:flex;
  flex-direction:column;
  gap:18px;
}

.service-icon{
  width:52px;
  height:52px;
  border-radius:12px;
  background:var(--green-100);
  display:grid;
  place-items:center;
  color:var(--green-800);
  font-size:22px;
}

.service-card h3{
  font-family:'DM Serif Display', Georgia, serif;
  font-size:24px;
  color:var(--green-800);
  font-weight:400;
  line-height:1.3;
}

.service-card .desc{
  color:var(--muted);
  font-size:14px;
  line-height:1.8;
}

.service-card ul{
  list-style:none;
  border-top:1px solid var(--border);
  padding-top:18px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.service-card li{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:14px;
  color:var(--text);
  line-height:1.6;
}

.check{
  width:18px;
  height:18px;
  border-radius:50%;
  border:1.5px solid var(--green-700);
  display:grid;
  place-items:center;
  color:var(--green-700);
  font-size:11px;
  flex-shrink:0;
}
  /* How it works */
  .how { background: var(--cream-2); padding: 100px 0; }
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; }
  .step { background: var(--white); border-radius: 18px; padding: 28px; position: relative; }
  .step-icon-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .step-icon { width: 52px; height: 52px; border-radius: 12px; background: var(--green-100); display: grid; place-items: center; color: var(--green-800); font-size: 22px; }
  .step-num { width: 26px; height: 26px; border-radius: 50%; background: var(--gold); color: #3a2a06; font-size: 12px; font-weight: 700; display: grid; place-items: center; }
  .step h4 { font-family: 'DM Serif Display', Georgia, serif; font-size: 20px; color: var(--green-900); margin-bottom: 12px; font-weight: 400; }
  .step p { font-size: 13.5px; color: var(--muted); }

  /* Testimonials */
  .testimonials { background: var(--cream); padding: 100px 0 60px; }
  .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .test-card { background: var(--white); border-radius: 16px; padding: 24px; box-shadow: var(--shadow-card); display: flex; align-items: center; gap: 14px; border: 1px solid var(--border); }
  .avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--green-100); color: var(--green-800); display: grid; place-items: center; font-weight: 600; flex-shrink: 0; }
  .test-card strong { display: block; font-size: 15px; }
  .test-card span { font-size: 13px; color: var(--muted); }

  /* CTA */
  .cta { background: var(--green-800); padding: 100px 0; position: relative; overflow: hidden; text-align: center; color: #fff; }
  .cta::after { content: ""; position: absolute; right: -120px; top: 40px; width: 280px; height: 280px; border-radius: 50%; background: rgba(255,255,255,0.06); }
  .cta h2 { font-family: 'DM Serif Display', Georgia, serif; font-size: clamp(34px, 4.2vw, 52px); line-height: 1.1; margin: 22px auto 24px; max-width: 760px; font-weight: 400; }
  .cta p { color: rgba(255,255,255,0.8); max-width: 540px; margin: 0 auto 36px; }

  /* Footer */
  .footer { background: #1c3d2e; color: #cfd8d3; padding: 80px 0 32px; }
  .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .footer-logo .logo-text strong { color: #fff; }
  .footer-logo p { margin-top: 18px; font-size: 14px; color: #a5b3ad; max-width: 320px; }
  .footer h5 { font-size: 12px; letter-spacing: 2px; color: #fff; margin-bottom: 20px; text-transform: uppercase; }
  .footer ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer a { color: #cfd8d3; text-decoration: none; font-size: 14px; }
  .footer a:hover { color: #fff; }
  .footer-bottom { display: flex; justify-content: space-between; padding-top: 32px; font-size: 13px; color: #a5b3ad; }
  .footer-bottom .heart { color: var(--gold); }

  @media (max-width: 960px) {
    .nav-links { display: none; }
    .hero-grid, .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .services-grid, .steps, .test-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .hero-circle { display: none; }
    .hero-stats { gap: 32px; }
    .credentials { grid-template-columns: 1fr; }
  }
`;

const Landing = () => {
  return (
    <div className="dn-page">
      <style>{styles}</style>

      {/* NAV */}
      <header className="nav">
        <div className="container nav-inner">
          <div className="logo">
            <div className="logo-mark"><Leaf size={22} /></div>
            <div className="logo-text">
              <strong>Dr. Nandita</strong>
              <span>CONSULTANCY</span>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#how">How It Works</a>
            <a href="#why">Why Us</a>
          </nav>
          <a href="/login" className="btn btn-primary">Login <ArrowRight size={16} className="arrow" /></a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" />Trusted Homeopathic  Physician</span>
            <h1>
              Compassionate care, <span className="dn-italic">thoughtful</span> medicine — for every stage of life.
            </h1>
            <p className="lead">
             Meet Dr. Nandita Karmakar — a trusted homeopathic physician with over 12 years of experience in delivering compassionate, patient-centered care. By combining classical homeopathic principles with a deep understanding of each individual's health, she provides safe, natural, and personalized treatments that support lasting recovery and overall well-being.
            </p>
            <div className="hero-ctas">
              <a href="/login" className="btn btn-primary">Get Started <ArrowRight size={16} className="arrow" /></a>
              <a href="#services" className="btn btn-outline">Explore Services</a>
            </div>
            
          </div>
         
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="container about-grid">
          <div>
            <span className="eyebrow"><span className="dot" />About the Doctor</span>
            <h2>Compassionate Homeopathic Care for Every Stage of Life</h2>
            <p className="bio">
              With over 12 years of experience in classical homeopathy, Dr. Nandita has helped individuals and families achieve better health through personalized and holistic treatment. She carefully studies each patient's physical, emotional, and lifestyle factors to identify the underlying cause of illness, creating customized treatment plans that support the body's natural healing process. Her compassionate care and dedication to long-term wellness have made her a trusted choice for homeopathic consultation.
            </p>
            <div className="credentials">
              <div className="cred"><div className="cred-icon"><GraduationCap size={18} /></div><div><strong>BHMS, MD (Homeopathy)</strong><span>Qualified Homeopathic Physician with Advanced Clinical Training</span></div></div>
              <div className="cred"><div className="cred-icon"><Award size={18} /></div><div><strong>12+ Years Clinical Practice</strong><span>General &amp; preventive medicine</span></div></div>
              <div className="cred"><div className="cred-icon"><Users size={18} /></div><div><strong>15,000+ Happy Patients</strong><span>Across India &amp; abroad</span></div></div>
              <div className="cred"><div className="cred-icon"><ShieldCheck size={18} /></div><div><strong>Member, Indian Medical Association</strong><span>Verified &amp; licensed practitioner</span></div></div>
            </div>
            <div className="quick-stats">
              <div className="qs"><div className="n">15K+</div><div className="l">Patients Treated</div></div>
              <div className="qs"><div className="n">12+</div><div className="l">Years Practising</div></div>
              <div className="qs"><div className="n">98%</div><div className="l">Satisfaction</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><span className="dot" />Our Healthcare Services</span>
            <h2>Complete primary care, <span className="dn-italic">tailored</span> to your needs.</h2>
            <p>Whether it's a sudden fever, an ongoing condition or a routine checkup — we bring expert, evidence-based care to every concern. Here's what we treat and how it helps you.</p>
          </div>
          <div className="services-grid">
            {[
              { Icon: Stethoscope, title: "General Consultation", desc: "Comprehensive checkups, accurate diagnosis, and personalised treatment for everyday health concerns.", items: ["Fever, cold & infections","Lifestyle & nutrition guidance","Routine wellness checkups"] },
              { Icon: HeartPulse, title: "Chronic Care Management", desc: "Long-term care plans for diabetes, hypertension and thyroid — designed to keep you stable and active.", items: ["Personalised care plans","Regular vitals monitoring","Medication optimisation"] },
              { Icon: Activity, title: "Preventive Health", desc: "Catch issues before they grow. Annual screenings and risk profiling tailored to your age and history.", items: ["Full-body health screening","Risk profiling & reports","Custom prevention roadmap"] },
              { Icon: Pill, title: "Prescription & Refills", desc: "Quick, safe prescriptions and refills with verified dosage guidance — without long clinic queues.", items: ["E-prescriptions on chat","Dosage & interaction checks","Safe refill reminders"] },
              { Icon: Baby, title: "Women & Family Health", desc: "Sensitive, holistic care for women, children and the elderly — every family member, one trusted doctor.", items: ["Maternal & menstrual care","Pediatric guidance","Elderly wellness support"] },
              { Icon: Microscope, title: "Lab & Report Review", desc: "Don't decode your reports alone. Get clear, doctor-led explanations and clinically sound next steps.", items: ["Lab report interpretation","Second-opinion reviews","Actionable next-step plan"] },
            ].map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon"><s.Icon size={22} /></div>
                <h3>{s.title}</h3>
                <p className="desc">{s.desc}</p>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}><span className="check"><Check size={11} /></span>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><span className="dot" />How Consultation Works</span>
            <h2>Four simple steps to <span className="dn-italic">better health.</span></h2>
            <p>Booking with Dr. Nandita is built to be effortless. Here's exactly what happens from the moment you sign in to the day you receive your personalised care plan.</p>
          </div>
          <div className="steps">
            {[
              { n: 1, Icon: User, t: "Create Your Profile", d: "Sign in and share your basic health details, symptoms, and any past records. This helps the doctor understand you before the consultation even begins." },
              { n: 2,Icon: Calendar, t: "Start Consultation", d: "Begin your consultation by filling out a detailed health assessment form. Share your symptoms, medical history, and concerns so Dr. Nandita can carefully review your case and provide a personalized homeopathic treatment plan."},
              {n: 3, Icon: Video, t: "Consultation Review",d: "Dr. Nandita thoroughly evaluates your consultation details, symptoms, and medical history to understand the root cause of your condition before preparing a personalized homeopathic treatment plan."},  
              { n: 4, Icon: ClipboardList, t: "Get Your Care Plan", d: "Receive a digital prescription, lifestyle plan and follow-up schedule. Everything is saved in your dashboard for easy access anytime." },
            ].map((s) => (
              <div className="step" key={s.n}>
                <div className="step-icon-row">
                  <div className="step-icon"><s.Icon size={22} /></div>
                  <div className="step-num">{s.n}</div>
                </div>
                <h4>{s.n}. {s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="why">
        <div className="container">
          <div className="test-grid">
            {[
              { i: "P", n: "Priya M.", r: "Patient, Mumbai" },
              { i: "R", n: "Rohan K.", r: "Patient, Bengaluru" },
              { i: "A", n: "Anita & Family", r: "Patients, Delhi" },
            ].map((t) => (
              <div className="test-card" key={t.n}>
                <div className="avatar">{t.i}</div>
                <div><strong>{t.n}</strong><span>{t.r}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="login">
        <div className="container">
          <span className="eyebrow dark"><span className="dot" />Start Your Care Today</span>
          <h2>Your next consultation is just <span className="dn-gold-italic">one click</span> away.</h2>
          <p>Sign in to book a slot, view past prescriptions and track your health journey — all from your personal Dr. Nandita dashboard.</p>
          <a href="/login" className="btn btn-gold">Login to Continue <ArrowRight size={16} className="arrow" /></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo">
              <div className="logo">
                <div className="logo-mark"><Leaf size={22} /></div>
                <div className="logo-text"><strong>Dr. Nandita Consultancy</strong></div>
              </div>
              <p>Compassionate general medicine for families across India. Online &amp; in-clinic consultations, lifetime health records, and care plans built around you.</p>
            </div>
            <div>
              <h5>Explore</h5>
              <ul>
                <li><a href="#about">About Dr. Nandita</a></li>
                <li><a href="#services">Healthcare Services</a></li>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#why">Why Choose Us</a></li>
              </ul>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><a href="#services">General Consultation</a></li>
                <li><a href="#services">Chronic Care</a></li>
                <li><a href="#services">Preventive Health</a></li>
                <li><a href="#services">Family Medicine</a></li>
              </ul>
            </div>
            <div>
              <h5>Account</h5>
              <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="#hero">Book Consultation</a></li>
                <li><a href="#hero">Patient Dashboard</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Dr. Nandita Consultancy. Care with <span className="heart">heart</span>.</span>
            <span>Built for healthier families.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
