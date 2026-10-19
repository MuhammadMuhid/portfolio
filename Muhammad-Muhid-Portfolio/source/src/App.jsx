import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile, migrationMetrics, projects, experience, skillGroups, academicProjects } from './content.js';
import { mountMotion, navigateTo } from './motion.js';

function Arrow({ down = false, className = '' }) {
  return <svg className={'arrow ' + className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={down ? { transform: 'rotate(45deg)' } : undefined}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function Cross({ className = '' }) {
  return <svg className={'cross ' + className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 2v56M2 30h56M10 10l40 40M10 50 50 10" stroke="currentColor" strokeWidth="7" /></svg>;
}
function Button({ href, children, light = false, download = false, className = '', onClick, external = false }) {
  const props = { className: 'pill ' + (light ? 'pill-light ' : '') + className, 'data-magnetic': true, onClick };
  const content = <><span>{children}</span><span className="pill-icon"><Arrow /></span></>;
  return href ? <a {...props} href={href} download={download || undefined} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a> : <button {...props} type="button">{content}</button>;
}
function SectionLabel({ number, children, light = false }) {
  return <div className={'section-label ' + (light ? 'section-label-light' : '')}><span className="section-index">({number})</span><span>{children}</span><span className="label-line" /><span className="label-cross">+</span></div>;
}
function MaskedWord({ children, className = '' }) {
  return <span className={'word-mask ' + className}><span className="hero-word">{children}</span></span>;
}
function Seal() {
  return <div className="hero-seal" aria-hidden="true"><svg className="seal-type" viewBox="0 0 140 140"><defs><path id="seal-circle" d="M70 70m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0" /></defs><text><textPath href="#seal-circle" textLength="309" lengthAdjust="spacing">SOFTWARE / SYSTEMS / AUTOMATION / </textPath></text></svg><Cross /></div>;
}
function Brand() {
  return <a href="#top" className="brand" aria-label="Muhammad Muhid, back to top"><span className="brand-symbol">m<span>.</span></span><span className="brand-type">MUHAMMAD<br />MUHID<span className="brand-small-dot">.</span></span></a>;
}
function Header({ motion, toggleMotion, menuOpen, setMenuOpen, menuRef }) {
  return <>
    <header className="site-header"><div className="nav-shell"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Selected work</a><a href="#about">About me</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav><div className="nav-actions"><button className="motion-control" type="button" onClick={toggleMotion} aria-pressed={motion} aria-label={motion ? 'Turn animations off' : 'Turn animations on'}><span className="motion-light" />Motion {motion ? 'on' : 'off'}</button><a href="#contact" className="nav-contact">Let's talk <span><Arrow /></span></a><button className="menu-toggle" aria-controls="mobile-menu" aria-expanded={menuOpen} aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /></button></div></div></header>
    <dialog className="mobile-menu" id="mobile-menu" ref={menuRef} onClose={() => setMenuOpen(false)}><div className="mobile-menu-top"><Brand /><button className="close-button" onClick={() => menuRef.current?.close()} aria-label="Close menu"><span /> <span /></button></div><p className="eyebrow">A LITTLE EXPLORATION</p><nav aria-label="Mobile navigation">{[['work', 'Selected work'], ['about', 'About me'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label], i) => <a href={'#' + id} key={id} onClick={() => menuRef.current?.close()}><span className="eyebrow">0{i + 1}</span>{label}<Arrow /></a>)}</nav><div className="mobile-menu-bottom"><a href={'mailto:' + profile.email}>{profile.email}</a><a href={profile.resume} download>Download resume <Arrow /></a></div></dialog>
  </>;
}
function Hero() {
  return <section className="hero-section" id="top" aria-labelledby="hero-title"><div className="hero-stage">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-photo"><img src={profile.photo} alt="Muhammad Muhid at his university convocation" width="720" height="1280" fetchPriority="high" /><div className="photo-shade" /><div className="photo-corners" aria-hidden="true"><span /><span /><span /><span /></div><div className="photo-caption"><span className="eyebrow">BEYOND THE CODE</span><span>Curiosity. Craft.<br />Continuous learning.</span></div></div>
    <div className="hero-content"><div className="eyebrow hero-eyebrow" data-hero-fade><span className="little-dot" />SOFTWARE ENGINEER / WEB &amp; AUTOMATION</div><h1 id="hero-title" className="hero-title" aria-label="Muhammad Muhid"><MaskedWord>MUHAMMAD</MaskedWord><MaskedWord className="accent">MUHID<span className="title-period">.</span></MaskedWord></h1><div className="hero-intro" data-hero-fade><p>Less repetitive work.<br />More <em>meaningful systems.</em></p><p className="hero-description">I build and maintain websites, business dashboards,<br className="desktop-break" /> and the automations that connect them.</p></div><div className="hero-buttons" data-hero-fade><Button href="#work">Explore my work</Button><a className="text-link" href={profile.resume} download>Download resume <Arrow /></a></div></div>
    <Seal />
    <div className="hero-bottom"><a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><Arrow down /></a><span className="hero-bottom-note">GOOD INTERFACES. RELIABLE SYSTEMS.<br />A LITTLE LESS FRICTION.</span><span className="hero-edition">PORTFOLIO / 2026</span></div>
    <div className="hero-expanded-copy" aria-hidden="true"><span className="eyebrow">THE INTERFACE IS ONLY THE BEGINNING.</span><p>Built to work.<br /><em>Made to matter.</em></p><span className="expanded-line" /></div>
  </div></section>;
}
function Marquee() {
  const set = <><span>WEB DEVELOPMENT</span><Cross /><span>BUSINESS SYSTEMS</span><Cross /><span>WORKFLOW AUTOMATION</span><Cross /></>;
  return <div className="marquee" aria-label="Web development, business systems, workflow automation"><div className="marquee-track" aria-hidden="true"><div className="marquee-set">{set}</div><div className="marquee-set">{set}</div></div></div>;
}
function About() {
  const words = 'I connect the dots between good interfaces and reliable business systems.'.split(' ');
  return <section className="about section-shell" id="about" aria-labelledby="about-title"><SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel><div className="about-grid"><div className="about-side"><span className="eyebrow">FRONT END TO<br />WHAT'S BEHIND IT.</span><Cross className="about-star" /></div><div className="about-main"><h2 id="about-title" className="paint-heading" aria-label={words.join(' ')}>{words.map((word, i) => <span aria-hidden="true" className={'paint-word ' + (i > 8 ? 'paint-accent' : '')} key={i}>{word}{' '}</span>)}</h2><div className="about-description" data-reveal><p>{profile.introduction}</p><p>I work with AI-assisted development tools, while keeping implementation, testing, and verification part of the process. A good-looking interface should have dependable work behind it.</p></div><div className="currently" data-reveal><span className="little-dot" /><span>Software Engineer at <strong>Thecwaly</strong></span><a href="#experience" aria-label="Read my experience"><Arrow /></a></div></div></div>
    <div className="metric-heading"><span className="eyebrow">ONE LIVE BI PLATFORM MIGRATION.</span><span className="eyebrow muted">THE SCOPE, IN NUMBERS.</span></div><div className="metric-grid">{migrationMetrics.map((m, i) => <div className="metric" key={m.label}><span className="metric-index">0{i + 1} /</span><div className="metric-value" data-counter={m.value} data-digits={m.digits}>{String(m.value).padStart(m.digits, '0')}<span className="metric-dot">.</span></div><h3>{m.label}</h3><p>{m.detail}</p></div>)}</div>
  </section>;
}
function MigrationArt() {
  return <div className="migration-art"><div className="art-meta"><span>SYSTEM / RE-ARCHITECTED</span><span>01 - 03</span></div><div className="migration-flow"><div className="old-system"><span className="eyebrow">LEGACY</span><b>PHP<br /><span>MySQL</span></b><div className="database-lines"><i /><i /><i /></div></div><div className="migration-connector"><span /><Arrow /><span /></div><div className="new-system"><div className="system-top"><i /> BUSINESS INTELLIGENCE <span>+</span></div><strong>Next.js <span>+</span><br />Supabase</strong><div className="system-grid"><div><span>47</span>TABLES</div><div><span>28</span>WEBHOOKS</div><div><span>07</span>JOBS</div></div><div className="system-status"><span />VERIFIED BEFORE CUTOVER</div></div></div><div className="migration-bottom"><span>LEGACY DATA</span><span className="flow-dash" /><span>A NEW FOUNDATION</span></div><span className="art-disclaimer">Architecture illustration / not a production screenshot</span></div>;
}
function TravelArt() {
  return <div className="travel-art"><div className="art-meta"><span>CARR WORLD TRAVEL</span><span>WEB / 02</span></div><div className="travel-orbit" aria-hidden="true"><span /><span /><span /><span /><div className="orbit-plane"><Arrow /></div></div><div className="travel-type">A WORLD<br />OF <em>possibilities.</em></div><div className="travel-ticket"><span className="eyebrow">THE BUILD</span><span>Divi + ACF</span><Arrow /></div><span className="art-disclaimer">Presentation artwork / not a website screenshot</span></div>;
}
function LesscodeArt() {
  return <div className="lesscode-art"><div className="art-meta"><span>LESSCODE.IO</span><span>WEB / 03</span></div><div className="code-sculpture" aria-hidden="true"><div className="code-panel code-panel-back">&#123; &#125;</div><div className="code-panel code-panel-front"><span>&lt;</span><Cross /><span>/&gt;</span></div></div><div className="lesscode-type">Designed to connect.<br /><span>Built to respond.</span></div><span className="art-disclaimer">Presentation artwork / not a website screenshot</span></div>;
}
function Work({ openProject }) {
  return <section className="work-section" id="work" aria-labelledby="work-title"><div className="work-pin"><div className="work-heading section-shell"><SectionLabel number="02">SELECTED WORK</SectionLabel><div className="work-title-row"><h2 id="work-title">BUILT WITH <em>purpose.</em></h2><div className="work-position"><span className="work-current">01</span><span className="work-meter"><span /></span><span>03</span></div></div></div><div className="work-window"><div className="project-track">{projects.map(project => <article className={'project-card project-' + project.kind} key={project.id}><div className="project-visual">{project.kind === 'migration' ? <MigrationArt /> : project.kind === 'travel' ? <TravelArt /> : <LesscodeArt />}</div><div className="project-copy"><div className="project-top"><span className="eyebrow">{project.type}</span><span className="project-number">/{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="project-bottom"><button className="project-open" onClick={() => openProject(project)}>View project details <span><Arrow /></span></button>{project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-url" aria-label={'Visit ' + project.title + ' website'}><Arrow /></a> : <span className="private-label">INTERNAL</span>}</div></div></article>)}</div></div><div className="work-foot section-shell"><span className="eyebrow work-instruction">SCROLL TO EXPLORE THE WORK <Arrow /></span><span className="eyebrow muted">INTERFACES. INTEGRATIONS. IMPLEMENTATION.</span></div></div></section>;
}
function StackIllustration() {
  const plates = [
    { top: 'M100 160 300 60 500 160 300 260Z', front: 'M100 160v22l200 100v-22Z', right: 'M300 260v22l200-100v-22Z', label: '01 / INTERFACES', y: 168 },
    { top: 'M100 240 300 140 500 240 300 340Z', front: 'M100 240v22l200 100v-22Z', right: 'M300 340v22l200-100v-22Z', label: '02 / DATA', y: 248 },
    { top: 'M100 320 300 220 500 320 300 420Z', front: 'M100 320v22l200 100v-22Z', right: 'M300 420v22l200-100v-22Z', label: '03 / AUTOMATION', y: 328 },
  ];
  return <div className="stack-illustration"><svg viewBox="0 0 600 510" role="img" aria-label="Three connected layers: interfaces, data, and automation"><ellipse className="stack-shadow" cx="300" cy="446" rx="170" ry="30" /><g className="stack-guides"><path d="M300 28v423M75 150l445 228M520 150 75 378" /></g>{plates.map((plate, i) => <g key={i} className={'system-layer layer-' + i} style={{ '--layer': i }}><path className="plate-front" d={plate.front} /><path className="plate-right" d={plate.right} /><path className="plate-top" d={plate.top} /><path className="plate-grid" d={`M170 ${plate.y - 16}l200-100M235 ${plate.y + 17}l200-100M170 ${plate.y - 44}l200 100M235 ${plate.y - 77}l200 100`} /><circle className="plate-node" cx="300" cy={plate.y - 8} r="13" /><circle className="plate-node-inner" cx="300" cy={plate.y - 8} r="4" /><text x="128" y={plate.y + 44} transform={`rotate(26.56,128,${plate.y + 44})`}>{plate.label}</text></g>).reverse()}<g className="stack-coordinates"><text x="35" y="474">FIG. 01</text><text x="433" y="474">CONNECTED BY DESIGN</text></g></svg></div>;
}
function Toolkit() {
  return <section className="toolkit" id="toolkit" aria-labelledby="toolkit-title"><div className="section-shell"><SectionLabel number="03" light>MY TOOLKIT</SectionLabel><div className="toolkit-grid"><div className="toolkit-intro"><h2 id="toolkit-title">THE INTERFACE.<br />THE DATA.<br /><em>The connection.</em></h2><p>Different tools. One connected system.<br />From what you see to what makes it work.</p><StackIllustration /></div><div className="skill-groups">{skillGroups.map((group, i) => <div className="skill-group" data-reveal key={group.name}><div className="skill-group-heading"><span className="eyebrow">0{i + 1} / {group.label}</span><Arrow /></div><h3>{group.name}</h3><p>{group.description}</p><div className="tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</div></div></div></section>;
}
function Experience() {
  return <section className="experience-section" id="experience" aria-labelledby="experience-title"><div className="section-shell"><SectionLabel number="04">THE PATH SO FAR</SectionLabel><div className="experience-grid"><div className="experience-heading"><h2 id="experience-title">ALWAYS<br /><em>building.</em><br />ALWAYS<br /><em>learning.</em></h2><p>From WordPress websites to business systems and automation.</p><a className="text-link" href={profile.resume} download>Read the full resume <Arrow /></a></div><div className="experience-list"><div className="experience-line" aria-hidden="true"><span /></div>{experience.map((job, i) => <details className="experience-item" key={job.company} open={i === 0}><summary><span className="timeline-dot" /><span className="experience-meta"><span className="eyebrow">{job.dates}</span><span className="experience-company">{job.company}</span><h3>{job.role}</h3></span><span className="details-icon">+</span></summary><div className="experience-detail"><p>{job.summary}</p><ul>{job.items.map(item => <li key={item}>{item}</li>)}</ul></div></details>)}</div></div></div></section>;
}
function Education() {
  return <section className="education-section" aria-labelledby="education-title"><div className="section-shell"><SectionLabel number="05">THE FOUNDATION</SectionLabel><div className="education-grid"><div className="education-photo"><img src={profile.photo} width="720" height="1280" loading="lazy" alt="Muhammad Muhid in his graduation gown, holding his convocation folder" /><div className="graduation-caption"><span>CLASS OF 2025</span><Arrow /></div><div className="medal-seal"><span>DEGREE PROGRAM</span><strong>2<sup>nd</sup></strong><span>SILVER MEDALIST</span></div></div><div className="education-copy"><span className="eyebrow">ENGINEERING &amp; CONTINUOUS LEARNING</span><h2 id="education-title">A strong<br /><em>foundation.</em><br />An open mind.</h2><h3>Bachelor of Science<br />in Information Technology</h3><p>Sir Syed University of Engineering &amp; Technology<br /><span className="muted">2021 - 2025</span></p><div className="education-metrics"><div><strong>3.54</strong><span>CGPA</span></div><div><strong>2&times;</strong><span>ACADEMIC SCHOLARSHIPS</span></div></div><div className="earlier-education"><span className="eyebrow">EARLIER EDUCATION / 2019 - 2021</span><p>Intermediate &middot; Govt. Jinnah College</p></div></div></div><div className="certification-row"><span className="eyebrow">CERTIFICATIONS</span><div><span>Computer Networks <small>CNA</small></span><span>Python <small>CNA</small></span><span>JavaScript <small>CNA</small></span><span>Front-End Web Development <small>UDEMY</small></span></div></div><div className="academic-projects"><div className="academic-heading"><h3>Built while learning.</h3><span className="eyebrow">ACADEMIC PROJECTS</span></div>{academicProjects.map((item, i) => <details key={item.name}><summary><span className="academic-number">0{i + 1}</span><h4>{item.name}</h4><span className="eyebrow academic-tools">{item.tools}</span><span className="details-icon">+</span></summary><p>{item.text}</p></details>)}</div></div></section>;
}
function Contact({ motion, toggleMotion }) {
  const [copyStatus, setCopyStatus] = useState('');
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  async function copyEmail() {
    window.clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus('Email copied.');
    } catch {
      if (inputRef.current) { inputRef.current.focus(); inputRef.current.select(); }
      setCopyStatus('Email selected. Press Ctrl+C or copy it manually.');
    }
    timerRef.current = window.setTimeout(() => setCopyStatus(''), 6000);
  }
  return <footer className="contact" id="contact"><div className="section-shell"><SectionLabel number="06">YOUR NEXT IDEA STARTS HERE</SectionLabel><div className="contact-heading-row"><h2><span className="contact-line">LET'S BUILD</span><span className="contact-line">SOMETHING</span><span className="contact-line accent"><em>that works.</em></span></h2><a className="contact-round" href={'mailto:' + profile.email} aria-label="Email Muhammad Muhid"><Arrow /></a></div><div className="contact-info"><p>Have a project or a role in mind?<br /><span className="muted">Let's start a conversation.</span></p><div className="email-block"><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}<Arrow /></a><div className="contact-secondary"><a href={profile.phoneHref}>{profile.phone}</a><button type="button" onClick={copyEmail}>Copy email <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" /><path d="M12 4V2H2v10h2" stroke="currentColor" /></svg></button></div><div className="copy-status" role="status">{copyStatus}</div><label className={'copy-fallback ' + (copyStatus.startsWith('Email selected') ? 'show' : '')}>Email address<input ref={inputRef} readOnly value={profile.email} /></label></div></div><div className="footer-links"><Brand /><div><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a><a href={profile.resume} download>Resume <Arrow /></a><a href="#top">Back to top <Arrow /></a></div></div><div className="footer-bottom"><span>&copy; 2026 Muhammad Muhid</span><span>DESIGNED WITH INTENT. BUILT WITH REACT &amp; GSAP.</span><button type="button" className="motion-control" onClick={toggleMotion} aria-pressed={motion}><span className="motion-light" />Motion {motion ? 'on' : 'off'}</button></div></div></footer>;
}
function ProjectDialog({ project, dialogRef, onClose }) {
  return <dialog className="project-dialog" ref={dialogRef} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}><div className="project-dialog-inner">{project && <><div className="dialog-top"><span className="eyebrow">PROJECT / {project.number}</span><button className="close-button" aria-label="Close project details" onClick={() => dialogRef.current?.close()}><span /><span /></button></div><span className="eyebrow accent">{project.type}</span><h2>{project.title}</h2><p className="dialog-context">{project.context}</p><h3>My contribution</h3><ul>{project.contributions.map(text => <li key={text}>{text}</li>)}</ul><div className="tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="dialog-footer">{project.url ? <Button href={project.url} external>Visit website</Button> : <p>Private internal platform.<br /><span className="muted">No production screens or client data are published here.</span></p>}<a href={profile.resume} download className="text-link">View resume <Arrow /></a></div></>}</div></dialog>;
}
function initialMotion() {
  try { const saved = localStorage.getItem('muhid-motion'); if (saved) return saved === 'on'; } catch { /* Local previews and private browsing can restrict storage. */ }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export default function App() {
  const root = useRef(null), menuRef = useRef(null), projectRef = useRef(null), openerRef = useRef(null);
  const [motion, setMotion] = useState(initialMotion);
  const [menuOpen, setMenuOpen] = useState(false), [project, setProject] = useState(null);
  useLayoutEffect(() => mountMotion(root.current, motion), [motion]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = event => { try { if (localStorage.getItem('muhid-motion')) return; } catch {} setMotion(!event.matches); };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (menuOpen && menuRef.current && !menuRef.current.open) { openerRef.current = document.activeElement; menuRef.current.showModal(); }
    if (!menuOpen && menuRef.current?.open) menuRef.current.close();
  }, [menuOpen]);
  useEffect(() => {
    if (project && projectRef.current && !projectRef.current.open) projectRef.current.showModal();
    if (!project && projectRef.current?.open) projectRef.current.close();
  }, [project]);
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (menuOpen || project) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen, project]);
  useEffect(() => {
    const listener = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      requestAnimationFrame(() => navigateTo(target, motion));
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [motion]);
  const toggleMotion = () => setMotion(value => { try { localStorage.setItem('muhid-motion', value ? 'off' : 'on'); } catch {} return !value; });
  const openProject = value => { openerRef.current = document.activeElement; setProject(value); };
  const closeProject = () => { setProject(null); requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true })); };
  return <div className="app" ref={root} data-motion={motion ? 'on' : 'off'}><a className="skip-link" href="#main">Skip to content</a><div className="reading-progress" aria-hidden="true"><span /></div><Header motion={motion} toggleMotion={toggleMotion} menuOpen={menuOpen} setMenuOpen={setMenuOpen} menuRef={menuRef} /><main id="main" tabIndex="-1"><Hero /><Marquee /><About /><Work openProject={openProject} /><Toolkit /><Experience /><Education /></main><Contact motion={motion} toggleMotion={toggleMotion} /><ProjectDialog project={project} dialogRef={projectRef} onClose={closeProject} /></div>;
}
