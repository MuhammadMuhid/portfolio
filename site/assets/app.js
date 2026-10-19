/* Muhammad Muhid / React portfolio */
(function(React,ReactDOM){'use strict';
const { useEffect, useLayoutEffect, useRef, useState } = React;
const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, ScrollToPlugin = window.ScrollToPlugin;
const profile = {
    name: 'Muhammad Muhid',
    role: 'Software Engineer',
    email: 'muhammadmuhid42@gmail.com',
    phone: '+92 315 2091610',
    phoneHref: 'tel:+923152091610',
    linkedin: 'https://www.linkedin.com/in/muhammad-muhid-595151262/',
    resume: './Muhammad-Muhid-Resume.pdf',
    photo: './images/muhammad-muhid.jpg',
    summary: 'Software Engineer involved in maintaining internal business dashboards, workflow automation, and business system integrations. Experienced with Zapier, GoHighLevel, webhooks, and AI-assisted software development.',
    introduction: 'I started in WordPress and front-end development. Today, I work on business dashboards, software integrations, and automation solutions - connecting the interface to the systems behind it.',
};
const migrationMetrics = [
    { value: 47, digits: 2, label: 'Database tables', detail: 'Migrated from the legacy platform' },
    { value: 28, digits: 2, label: 'Webhooks', detail: 'Part of the platform migration' },
    { value: 7, digits: 2, label: 'Scheduled jobs', detail: 'Included in the system cutover' },
    { value: 0, digits: 1, label: 'Downtime', detail: 'During the live migration' },
];
const projects = [
    {
        id: 'bi', number: '01', name: 'A new foundation.\nThe same live business.', title: 'Internal BI platform migration',
        type: 'BUSINESS SYSTEMS', year: '2026', kind: 'migration',
        description: 'A live PHP/MySQL business intelligence platform, migrated to Next.js and Supabase without downtime.',
        tools: ['Next.js', 'Supabase', 'Webhooks'],
        note: 'Internal platform / private implementation',
        context: 'Maintaining and modernizing an internal business intelligence platform as Software Engineer at Thecwaly.',
        contributions: [
            'Migrated 47 tables, 28 webhooks, and 7 scheduled jobs from PHP/MySQL to Next.js and Supabase with no downtime.',
            'Reconciled dashboard figures against the legacy system before cutover to confirm parity.',
            'Traced silent webhook failures and blocked a proposed backfill after finding corrupt source data.',
            'Built an admin panel for Facebook API accounts and credentials with server-side token masking.',
            'Used AI-assisted development tools to support implementation, testing, verification, and ongoing maintenance.',
            'Built and maintained Zapier and GoHighLevel automations feeding the data pipelines.'
        ]
    },
    {
        id: 'travel', number: '02', name: 'A digital home\nfor the next journey.', title: 'Carr World Travel',
        type: 'WEB DEVELOPMENT', year: 'WEBSITE PROJECT', kind: 'travel',
        description: 'A WordPress website project built with Divi, Advanced Custom Fields, and custom front-end code.',
        tools: ['WordPress', 'Divi', 'ACF', 'Forminator'],
        url: 'https://carrworldtravel.com', note: 'carrworldtravel.com',
        context: 'A website project listed in my portfolio, combining WordPress tools and front-end implementation.',
        contributions: [
            'Used Divi and Advanced Custom Fields within the WordPress implementation.',
            'Worked with HTML, CSS, and JavaScript for the front end.',
            'Included Forminator in the project toolset.'
        ]
    },
    {
        id: 'lesscode', number: '03', name: 'Thoughtful interfaces.\nFlexible foundations.', title: 'Lesscode',
        type: 'WEB DEVELOPMENT', year: 'WEBSITE PROJECT', kind: 'lesscode',
        description: 'A WordPress website project bringing Elementor, dynamic content, and front-end development together.',
        tools: ['WordPress', 'Elementor', 'ACF', 'JavaScript'],
        url: 'https://lesscode.io', note: 'lesscode.io',
        context: 'A website project listed in my portfolio, using Elementor and Advanced Custom Fields.',
        contributions: [
            'Worked with Elementor for the WordPress website implementation.',
            'Used Advanced Custom Fields in the project.',
            'Worked with HTML, CSS, and JavaScript for front-end development.'
        ]
    },
];
const experience = [
    { role: 'Software Engineer', company: 'Thecwaly', dates: 'JUL 2026 - PRESENT', summary: 'Internal business dashboards, workflow automation, and integrations.', items: [
            'Migrated the live internal BI platform from PHP/MySQL to Next.js and Supabase, covering 47 tables, 28 webhooks, and 7 scheduled jobs.',
            'Verified dashboard parity, investigated webhook failures, and built a credentials admin panel with server-side token masking.',
            'Maintain Zapier and GoHighLevel data pipelines, with AI-assisted implementation, testing, and verification.'
        ] },
    { role: 'CMS Developer', company: 'HZ Tech', dates: 'FEB 2026 - JUN 2026', summary: 'Responsive WordPress, Shopify, and GoHighLevel implementation.', items: [
            'Built responsive websites from Figma and PSD designs using Elementor, Divi, Kadence, WPBakery, HTML, CSS, and JavaScript.',
            'Integrated ACF with PHP for dynamic content and custom post types; developed forms with Forminator.',
            'Built GoHighLevel landing page sections and customized Shopify themes.'
        ] },
    { role: 'WordPress Developer', company: 'KGT Global', dates: 'SEP 2025 - FEB 2026', summary: 'Responsive websites, dynamic content, and WooCommerce.', items: [
            'Designed and customized websites using Elementor and Divi Builder.',
            'Integrated ACF and Dynamic Content for custom post types in the Theme Builder.',
            'Worked with WooCommerce products, categories, product page customization, and WordPress plugins.'
        ] }
];
const skillGroups = [
    { name: 'Interfaces', label: 'WEB & FRONT END', tools: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Next.js'], description: 'Responsive interfaces, dynamic content, and the front end of business systems.' },
    { name: 'Automation', label: 'CONNECTED SYSTEMS', tools: ['Zapier', 'GoHighLevel', 'Webhooks', 'Close CRM'], description: 'Business workflows and integrations that connect the tools behind the interface.' },
    { name: 'Data & delivery', label: 'PLATFORMS & LANGUAGES', tools: ['Supabase', 'SQL', 'Python', 'C#', 'C++', 'Git', 'GitHub', 'Vercel', 'cPanel'], description: 'The data, programming, and delivery tools behind my development work.' }
];
const academicProjects = [
    { name: 'School Management System', tools: 'C# / SQL SERVER', text: 'Developed a school management system using SQL Server and C#, featuring a user-friendly interface and data validation mechanisms.' },
    { name: 'Network University Management System', tools: 'CISCO PACKET TRACER', text: 'Created a network topology using hierarchical network design, correct device cabling, VLANs, port assignments, subnetting, and IP addressing.' }
];
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
function navigateTo(target, enabled) {
    const top = target.id === 'top' ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight - 16);
    const focus = () => {
        if (!target.hasAttribute('tabindex'))
            target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        try {
            history.replaceState(null, '', '#' + target.id);
        }
        catch { /* file:// previews */ }
    };
    if (enabled)
        gsap.to(window, { scrollTo: { y: top, autoKill: true }, duration: .85, ease: 'power3.inOut', overwrite: 'auto', onComplete: focus });
    else {
        window.scrollTo(0, top);
        focus();
    }
}
/** Genuine GSAP motion. Native scrolling; scoped cleanup for React remounts and reduced motion. */
function mountMotion(root, enabled) {
    if (!root)
        return () => { };
    const cleanups = [];
    const q = gsap.utils.selector(root);
    let alive = true, progressFrame = 0, refreshTimer = 0;
    const on = (element, name, callback, options) => {
        element.addEventListener(name, callback, options);
        cleanups.push(() => element.removeEventListener(name, callback, options));
    };
    const progressBar = q('.reading-progress > span')[0];
    const updateProgress = () => {
        progressFrame = 0;
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0) + ')';
    };
    const requestProgress = () => { if (!progressFrame)
        progressFrame = requestAnimationFrame(updateProgress); };
    on(window, 'scroll', requestProgress, { passive: true });
    on(window, 'resize', requestProgress, { passive: true });
    const refresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => { if (alive) {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        requestProgress();
    } }, 130); };
    q('details').forEach(detail => on(detail, 'toggle', refresh));
    q('img').forEach(image => { if (!image.complete)
        on(image, 'load', refresh, { once: true }); });
    requestProgress();
    if (!enabled) {
        root.classList.remove('motion-gsap', 'mobile-layout');
        return () => { alive = false; cleanups.reverse().forEach(fn => fn()); cancelAnimationFrame(progressFrame); clearTimeout(refreshTimer); };
    }
    root.classList.add('motion-gsap');
    const countNodes = q('[data-counter]');
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
        // Readable markup is the baseline: nothing is hidden until GSAP is actually running.
        if (window.scrollY < 30) {
            const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
            intro.from('.hero-word', { yPercent: 115, duration: 1.1, stagger: .13 }, .05)
                .from('[data-hero-fade]', { y: 20, opacity: 0, duration: .8, stagger: .1 }, .36)
                .from('.hero-photo', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3 }, .08)
                .from('.hero-seal', { scale: .3, rotation: -80, opacity: 0, duration: 1 }, .65)
                .from('.hero-bottom', { opacity: 0, y: 9, duration: .7 }, .9);
        }
        const sealSpin = gsap.to('.seal-type', { rotation: 360, transformOrigin: '50% 50%', duration: 38, repeat: -1, ease: 'none' });
        ScrollTrigger.create({ trigger: '.hero-section', start: 'top bottom', end: 'bottom top', onToggle: self => self.isActive ? sealSpin.play() : sealSpin.pause() });
        const marquee = gsap.to('.marquee-track', { xPercent: -50, duration: 36, ease: 'none', repeat: -1 });
        ScrollTrigger.create({ trigger: '.marquee', start: 'top bottom', end: 'bottom top', onToggle: self => self.isActive ? marquee.play() : marquee.pause() });
        gsap.fromTo('.paint-word', { opacity: .22 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { id: 'muhid-reading', trigger: '.paint-heading', start: 'top 84%', end: 'bottom 51%', scrub: .4 } });
        gsap.to('.about-star', { rotation: 120, ease: 'none', scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: .8 } });
        q('[data-reveal]').forEach(element => {
            gsap.from(element, { y: 28, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', toggleActions: 'play none none reverse' } });
        });
        countNodes.forEach(element => {
            const number = { value: 0 };
            const end = Number(element.dataset.counter), digits = Number(element.dataset.digits);
            gsap.to(number, {
                value: end, duration: 1.65, ease: 'power2.out',
                onUpdate: () => { element.firstChild.nodeValue = String(Math.round(number.value)).padStart(digits, '0'); },
                scrollTrigger: { trigger: '.metric-grid', start: 'top 89%', toggleActions: 'play none none reverse' },
            });
        });
        // Pins only run where there is enough room; small screens get real vertical content.
        media.add({ desktop: '(min-width: 901px) and (min-height: 670px)', mobile: '(max-width: 900px), (max-height: 669px)' }, (ctx) => {
            if (ctx.conditions.desktop) {
                root.classList.remove('mobile-layout');
                const hero = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
                        refreshPriority: 100, id: 'muhid-hero', trigger: '.hero-section', pin: '.hero-stage', start: 'top 82px', end: () => '+=' + Math.round(window.innerHeight * .93), scrub: .7, invalidateOnRefresh: true, anticipatePin: 1,
                    } });
                hero.to('.hero-content', { y: -65, opacity: 0, duration: .3 }, 0)
                    .to('.hero-seal', { y: -45, opacity: 0, duration: .26 }, .05)
                    .to('.hero-bottom', { opacity: 0, duration: .18 }, 0)
                    .to('.photo-caption,.photo-corners', { opacity: 0, duration: .18 }, 0)
                    .to('.hero-photo', { left: '0%', right: '0px', top: '0px', bottom: '0px', borderRadius: '0px', duration: .66 }, .06)
                    .to('.hero-photo > img', { objectPosition: '50% 12%', scale: 1.015, duration: .66 }, .06)
                    .fromTo('.hero-expanded-copy', { autoAlpha: 0, y: 55 }, { autoAlpha: 1, y: 0, duration: .38 }, .4)
                    .to({}, { duration: .17 });
                const track = q('.project-track')[0];
                const viewport = q('.work-window')[0];
                const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
                gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: {
                        refreshPriority: 50, id: 'muhid-work', trigger: '.work-section', pin: '.work-pin', start: 'top 82px', end: () => '+=' + Math.round(travel() * 1.08), scrub: .75, invalidateOnRefresh: true, anticipatePin: 1,
                        onUpdate: self => {
                            q('.work-current')[0].textContent = String(Math.min(3, Math.floor(self.progress * 2.7) + 1)).padStart(2, '0');
                            q('.work-meter > span')[0].style.transform = 'scaleX(' + (.33333 + self.progress * .66667) + ')';
                        },
                    } });
            }
            else {
                root.classList.add('mobile-layout');
                q('.project-card').forEach(element => gsap.from(element, { y: 32, opacity: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', toggleActions: 'play none none reverse' } }));
                gsap.fromTo('.hero-photo img', { yPercent: -2, scale: 1.05 }, { yPercent: 2, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.hero-photo', start: 'top bottom', end: 'bottom top', scrub: .6 } });
            }
            return () => { root.classList.remove('mobile-layout'); };
        }, root);
        // A reversible assembly, not a one-shot entrance or a static outline.
        const assembly = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'muhid-stack', trigger: '.stack-illustration', start: 'top 92%', end: 'center 43%', scrub: .85, invalidateOnRefresh: true } });
        assembly.from('.layer-2', { x: 38, y: 72, rotation: -10, transformOrigin: '50% 50%', opacity: .4, duration: 1.0 }, 0)
            .from('.layer-1', { x: -45, y: -25, rotation: 9, transformOrigin: '50% 50%', opacity: .4, duration: 1.1 }, .08)
            .from('.layer-0', { x: 45, y: -100, rotation: -12, transformOrigin: '50% 50%', opacity: .4, duration: 1.15 }, .15)
            .from('.stack-shadow', { scaleX: .7, opacity: 0, transformOrigin: '50% 50%', duration: 1 }, 0);
        gsap.to('.experience-line > span', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.experience-list', start: 'top 68%', end: 'bottom 65%', scrub: .6 } });
        gsap.from('.medal-seal', { rotation: -35, scale: .6, opacity: 0, ease: 'back.out(1.2)', duration: .95, scrollTrigger: { trigger: '.education-photo', start: 'top 80%', toggleActions: 'play none none reverse' } });
        gsap.from('.contact-line', { y: 50, opacity: 0, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.contact-heading-row', start: 'top 88%', toggleActions: 'play none none reverse' } });
        gsap.from('.contact-round', { rotation: -40, scale: .65, ease: 'none', scrollTrigger: { trigger: '.contact-heading-row', start: 'top 90%', end: 'center 50%', scrub: .7 } });
        // Pointer-only magnetic CTAs; touch and keyboard interaction remain normal.
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            q('[data-magnetic]').forEach(element => {
                const moveX = gsap.quickTo(element, 'x', { duration: .35, ease: 'power3.out' });
                const moveY = gsap.quickTo(element, 'y', { duration: .35, ease: 'power3.out' });
                on(element, 'pointermove', e => { const box = element.getBoundingClientRect(); moveX((e.clientX - box.left - box.width / 2) * .12); moveY((e.clientY - box.top - box.height / 2) * .18); });
                on(element, 'pointerleave', () => { moveX(0); moveY(0); });
                on(element, 'blur', () => { moveX(0); moveY(0); });
            });
        }
    }, root);
    refresh();
    return () => {
        alive = false;
        clearTimeout(refreshTimer);
        cancelAnimationFrame(progressFrame);
        cleanups.reverse().forEach(fn => fn());
        media.revert();
        context.revert();
        root.classList.remove('motion-gsap', 'mobile-layout');
        countNodes.forEach(element => { element.firstChild.nodeValue = String(element.dataset.counter).padStart(Number(element.dataset.digits), '0'); });
        q('.work-current')[0].textContent = '01';
        q('.work-meter > span')[0].style.transform = '';
    };
}
function Arrow({ down = false, className = '' }) {
    return React.createElement("svg", { className: 'arrow ' + className, width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", style: down ? { transform: 'rotate(45deg)' } : undefined },
        React.createElement("path", { d: "M5 19 19 5M5 5h14v14", stroke: "currentColor", strokeWidth: "1.5" }));
}
function Cross({ className = '' }) {
    return React.createElement("svg", { className: 'cross ' + className, viewBox: "0 0 60 60", fill: "none", "aria-hidden": "true" },
        React.createElement("path", { d: "M30 2v56M2 30h56M10 10l40 40M10 50 50 10", stroke: "currentColor", strokeWidth: "7" }));
}
function Button({ href, children, light = false, download = false, className = '', onClick, external = false }) {
    const props = { className: 'pill ' + (light ? 'pill-light ' : '') + className, 'data-magnetic': true, onClick };
    const content = React.createElement(React.Fragment, null,
        React.createElement("span", null, children),
        React.createElement("span", { className: "pill-icon" },
            React.createElement(Arrow, null)));
    return href ? React.createElement("a", { ...props, href: href, download: download || undefined, target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined }, content) : React.createElement("button", { ...props, type: "button" }, content);
}
function SectionLabel({ number, children, light = false }) {
    return React.createElement("div", { className: 'section-label ' + (light ? 'section-label-light' : '') },
        React.createElement("span", { className: "section-index" },
            "(",
            number,
            ")"),
        React.createElement("span", null, children),
        React.createElement("span", { className: "label-line" }),
        React.createElement("span", { className: "label-cross" }, "+"));
}
function MaskedWord({ children, className = '' }) {
    return React.createElement("span", { className: 'word-mask ' + className },
        React.createElement("span", { className: "hero-word" }, children));
}
function Seal() {
    return React.createElement("div", { className: "hero-seal", "aria-hidden": "true" },
        React.createElement("svg", { className: "seal-type", viewBox: "0 0 140 140" },
            React.createElement("defs", null,
                React.createElement("path", { id: "seal-circle", d: "M70 70m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0" })),
            React.createElement("text", null,
                React.createElement("textPath", { href: "#seal-circle", textLength: "309", lengthAdjust: "spacing" }, "SOFTWARE / SYSTEMS / AUTOMATION / "))),
        React.createElement(Cross, null));
}
function Brand() {
    return React.createElement("a", { href: "#top", className: "brand", "aria-label": "Muhammad Muhid, back to top" },
        React.createElement("span", { className: "brand-symbol" },
            "m",
            React.createElement("span", null, ".")),
        React.createElement("span", { className: "brand-type" },
            "MUHAMMAD",
            React.createElement("br", null),
            "MUHID",
            React.createElement("span", { className: "brand-small-dot" }, ".")));
}
function Header({ motion, toggleMotion, menuOpen, setMenuOpen, menuRef }) {
    return React.createElement(React.Fragment, null,
        React.createElement("header", { className: "site-header" },
            React.createElement("div", { className: "nav-shell" },
                React.createElement(Brand, null),
                React.createElement("nav", { className: "desktop-nav", "aria-label": "Main navigation" },
                    React.createElement("a", { href: "#work" }, "Selected work"),
                    React.createElement("a", { href: "#about" }, "About me"),
                    React.createElement("a", { href: "#experience" }, "Experience"),
                    React.createElement("a", { href: "#contact" }, "Contact")),
                React.createElement("div", { className: "nav-actions" },
                    React.createElement("button", { className: "motion-control", type: "button", onClick: toggleMotion, "aria-pressed": motion, "aria-label": motion ? 'Turn animations off' : 'Turn animations on' },
                        React.createElement("span", { className: "motion-light" }),
                        "Motion ",
                        motion ? 'on' : 'off'),
                    React.createElement("a", { href: "#contact", className: "nav-contact" },
                        "Let's talk ",
                        React.createElement("span", null,
                            React.createElement(Arrow, null))),
                    React.createElement("button", { className: "menu-toggle", "aria-controls": "mobile-menu", "aria-expanded": menuOpen, "aria-label": "Open menu", onClick: () => setMenuOpen(true) },
                        React.createElement("span", null),
                        React.createElement("span", null))))),
        React.createElement("dialog", { className: "mobile-menu", id: "mobile-menu", ref: menuRef, onClose: () => setMenuOpen(false) },
            React.createElement("div", { className: "mobile-menu-top" },
                React.createElement(Brand, null),
                React.createElement("button", { className: "close-button", onClick: () => menuRef.current?.close(), "aria-label": "Close menu" },
                    React.createElement("span", null),
                    " ",
                    React.createElement("span", null))),
            React.createElement("p", { className: "eyebrow" }, "A LITTLE EXPLORATION"),
            React.createElement("nav", { "aria-label": "Mobile navigation" }, [['work', 'Selected work'], ['about', 'About me'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label], i) => React.createElement("a", { href: '#' + id, key: id, onClick: () => menuRef.current?.close() },
                React.createElement("span", { className: "eyebrow" },
                    "0",
                    i + 1),
                label,
                React.createElement(Arrow, null)))),
            React.createElement("div", { className: "mobile-menu-bottom" },
                React.createElement("a", { href: 'mailto:' + profile.email }, profile.email),
                React.createElement("a", { href: profile.resume, download: true },
                    "Download resume ",
                    React.createElement(Arrow, null)))));
}
function Hero() {
    return React.createElement("section", { className: "hero-section", id: "top", "aria-labelledby": "hero-title" },
        React.createElement("div", { className: "hero-stage" },
            React.createElement("div", { className: "hero-grid", "aria-hidden": "true" }),
            React.createElement("div", { className: "hero-photo" },
                React.createElement("img", { src: profile.photo, alt: "Muhammad Muhid at his university convocation", width: "720", height: "1280", fetchPriority: "high" }),
                React.createElement("div", { className: "photo-shade" }),
                React.createElement("div", { className: "photo-corners", "aria-hidden": "true" },
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null)),
                React.createElement("div", { className: "photo-caption" },
                    React.createElement("span", { className: "eyebrow" }, "BEYOND THE CODE"),
                    React.createElement("span", null,
                        "Curiosity. Craft.",
                        React.createElement("br", null),
                        "Continuous learning."))),
            React.createElement("div", { className: "hero-content" },
                React.createElement("div", { className: "eyebrow hero-eyebrow", "data-hero-fade": true },
                    React.createElement("span", { className: "little-dot" }),
                    "SOFTWARE ENGINEER / WEB & AUTOMATION"),
                React.createElement("h1", { id: "hero-title", className: "hero-title", "aria-label": "Muhammad Muhid" },
                    React.createElement(MaskedWord, null, "MUHAMMAD"),
                    React.createElement(MaskedWord, { className: "accent" },
                        "MUHID",
                        React.createElement("span", { className: "title-period" }, "."))),
                React.createElement("div", { className: "hero-intro", "data-hero-fade": true },
                    React.createElement("p", null,
                        "Less repetitive work.",
                        React.createElement("br", null),
                        "More ",
                        React.createElement("em", null, "meaningful systems.")),
                    React.createElement("p", { className: "hero-description" },
                        "I build and maintain websites, business dashboards,",
                        React.createElement("br", { className: "desktop-break" }),
                        " and the automations that connect them.")),
                React.createElement("div", { className: "hero-buttons", "data-hero-fade": true },
                    React.createElement(Button, { href: "#work" }, "Explore my work"),
                    React.createElement("a", { className: "text-link", href: profile.resume, download: true },
                        "Download resume ",
                        React.createElement(Arrow, null)))),
            React.createElement(Seal, null),
            React.createElement("div", { className: "hero-bottom" },
                React.createElement("a", { href: "#about", className: "scroll-cue" },
                    React.createElement("span", null, "SCROLL TO EXPLORE"),
                    React.createElement(Arrow, { down: true })),
                React.createElement("span", { className: "hero-bottom-note" },
                    "GOOD INTERFACES. RELIABLE SYSTEMS.",
                    React.createElement("br", null),
                    "A LITTLE LESS FRICTION."),
                React.createElement("span", { className: "hero-edition" }, "PORTFOLIO / 2026")),
            React.createElement("div", { className: "hero-expanded-copy", "aria-hidden": "true" },
                React.createElement("span", { className: "eyebrow" }, "THE INTERFACE IS ONLY THE BEGINNING."),
                React.createElement("p", null,
                    "Built to work.",
                    React.createElement("br", null),
                    React.createElement("em", null, "Made to matter.")),
                React.createElement("span", { className: "expanded-line" }))));
}
function Marquee() {
    const set = React.createElement(React.Fragment, null,
        React.createElement("span", null, "WEB DEVELOPMENT"),
        React.createElement(Cross, null),
        React.createElement("span", null, "BUSINESS SYSTEMS"),
        React.createElement(Cross, null),
        React.createElement("span", null, "WORKFLOW AUTOMATION"),
        React.createElement(Cross, null));
    return React.createElement("div", { className: "marquee", "aria-label": "Web development, business systems, workflow automation" },
        React.createElement("div", { className: "marquee-track", "aria-hidden": "true" },
            React.createElement("div", { className: "marquee-set" }, set),
            React.createElement("div", { className: "marquee-set" }, set)));
}
function About() {
    const words = 'I connect the dots between good interfaces and reliable business systems.'.split(' ');
    return React.createElement("section", { className: "about section-shell", id: "about", "aria-labelledby": "about-title" },
        React.createElement(SectionLabel, { number: "01" }, "A LITTLE ABOUT ME"),
        React.createElement("div", { className: "about-grid" },
            React.createElement("div", { className: "about-side" },
                React.createElement("span", { className: "eyebrow" },
                    "FRONT END TO",
                    React.createElement("br", null),
                    "WHAT'S BEHIND IT."),
                React.createElement(Cross, { className: "about-star" })),
            React.createElement("div", { className: "about-main" },
                React.createElement("h2", { id: "about-title", className: "paint-heading", "aria-label": words.join(' ') }, words.map((word, i) => React.createElement("span", { "aria-hidden": "true", className: 'paint-word ' + (i > 8 ? 'paint-accent' : ''), key: i },
                    word,
                    ' '))),
                React.createElement("div", { className: "about-description", "data-reveal": true },
                    React.createElement("p", null, profile.introduction),
                    React.createElement("p", null, "I work with AI-assisted development tools, while keeping implementation, testing, and verification part of the process. A good-looking interface should have dependable work behind it.")),
                React.createElement("div", { className: "currently", "data-reveal": true },
                    React.createElement("span", { className: "little-dot" }),
                    React.createElement("span", null,
                        "Software Engineer at ",
                        React.createElement("strong", null, "Thecwaly")),
                    React.createElement("a", { href: "#experience", "aria-label": "Read my experience" },
                        React.createElement(Arrow, null))))),
        React.createElement("div", { className: "metric-heading" },
            React.createElement("span", { className: "eyebrow" }, "ONE LIVE BI PLATFORM MIGRATION."),
            React.createElement("span", { className: "eyebrow muted" }, "THE SCOPE, IN NUMBERS.")),
        React.createElement("div", { className: "metric-grid" }, migrationMetrics.map((m, i) => React.createElement("div", { className: "metric", key: m.label },
            React.createElement("span", { className: "metric-index" },
                "0",
                i + 1,
                " /"),
            React.createElement("div", { className: "metric-value", "data-counter": m.value, "data-digits": m.digits },
                String(m.value).padStart(m.digits, '0'),
                React.createElement("span", { className: "metric-dot" }, ".")),
            React.createElement("h3", null, m.label),
            React.createElement("p", null, m.detail)))));
}
function MigrationArt() {
    return React.createElement("div", { className: "migration-art" },
        React.createElement("div", { className: "art-meta" },
            React.createElement("span", null, "SYSTEM / RE-ARCHITECTED"),
            React.createElement("span", null, "01 - 03")),
        React.createElement("div", { className: "migration-flow" },
            React.createElement("div", { className: "old-system" },
                React.createElement("span", { className: "eyebrow" }, "LEGACY"),
                React.createElement("b", null,
                    "PHP",
                    React.createElement("br", null),
                    React.createElement("span", null, "MySQL")),
                React.createElement("div", { className: "database-lines" },
                    React.createElement("i", null),
                    React.createElement("i", null),
                    React.createElement("i", null))),
            React.createElement("div", { className: "migration-connector" },
                React.createElement("span", null),
                React.createElement(Arrow, null),
                React.createElement("span", null)),
            React.createElement("div", { className: "new-system" },
                React.createElement("div", { className: "system-top" },
                    React.createElement("i", null),
                    " BUSINESS INTELLIGENCE ",
                    React.createElement("span", null, "+")),
                React.createElement("strong", null,
                    "Next.js ",
                    React.createElement("span", null, "+"),
                    React.createElement("br", null),
                    "Supabase"),
                React.createElement("div", { className: "system-grid" },
                    React.createElement("div", null,
                        React.createElement("span", null, "47"),
                        "TABLES"),
                    React.createElement("div", null,
                        React.createElement("span", null, "28"),
                        "WEBHOOKS"),
                    React.createElement("div", null,
                        React.createElement("span", null, "07"),
                        "JOBS")),
                React.createElement("div", { className: "system-status" },
                    React.createElement("span", null),
                    "VERIFIED BEFORE CUTOVER"))),
        React.createElement("div", { className: "migration-bottom" },
            React.createElement("span", null, "LEGACY DATA"),
            React.createElement("span", { className: "flow-dash" }),
            React.createElement("span", null, "A NEW FOUNDATION")),
        React.createElement("span", { className: "art-disclaimer" }, "Architecture illustration / not a production screenshot"));
}
function TravelArt() {
    return React.createElement("div", { className: "travel-art" },
        React.createElement("div", { className: "art-meta" },
            React.createElement("span", null, "CARR WORLD TRAVEL"),
            React.createElement("span", null, "WEB / 02")),
        React.createElement("div", { className: "travel-orbit", "aria-hidden": "true" },
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("div", { className: "orbit-plane" },
                React.createElement(Arrow, null))),
        React.createElement("div", { className: "travel-type" },
            "A WORLD",
            React.createElement("br", null),
            "OF ",
            React.createElement("em", null, "possibilities.")),
        React.createElement("div", { className: "travel-ticket" },
            React.createElement("span", { className: "eyebrow" }, "THE BUILD"),
            React.createElement("span", null, "Divi + ACF"),
            React.createElement(Arrow, null)),
        React.createElement("span", { className: "art-disclaimer" }, "Presentation artwork / not a website screenshot"));
}
function LesscodeArt() {
    return React.createElement("div", { className: "lesscode-art" },
        React.createElement("div", { className: "art-meta" },
            React.createElement("span", null, "LESSCODE.IO"),
            React.createElement("span", null, "WEB / 03")),
        React.createElement("div", { className: "code-sculpture", "aria-hidden": "true" },
            React.createElement("div", { className: "code-panel code-panel-back" }, "{ }"),
            React.createElement("div", { className: "code-panel code-panel-front" },
                React.createElement("span", null, "<"),
                React.createElement(Cross, null),
                React.createElement("span", null, "/>"))),
        React.createElement("div", { className: "lesscode-type" },
            "Designed to connect.",
            React.createElement("br", null),
            React.createElement("span", null, "Built to respond.")),
        React.createElement("span", { className: "art-disclaimer" }, "Presentation artwork / not a website screenshot"));
}
function Work({ openProject }) {
    return React.createElement("section", { className: "work-section", id: "work", "aria-labelledby": "work-title" },
        React.createElement("div", { className: "work-pin" },
            React.createElement("div", { className: "work-heading section-shell" },
                React.createElement(SectionLabel, { number: "02" }, "SELECTED WORK"),
                React.createElement("div", { className: "work-title-row" },
                    React.createElement("h2", { id: "work-title" },
                        "BUILT WITH ",
                        React.createElement("em", null, "purpose.")),
                    React.createElement("div", { className: "work-position" },
                        React.createElement("span", { className: "work-current" }, "01"),
                        React.createElement("span", { className: "work-meter" },
                            React.createElement("span", null)),
                        React.createElement("span", null, "03")))),
            React.createElement("div", { className: "work-window" },
                React.createElement("div", { className: "project-track" }, projects.map(project => React.createElement("article", { className: 'project-card project-' + project.kind, key: project.id },
                    React.createElement("div", { className: "project-visual" }, project.kind === 'migration' ? React.createElement(MigrationArt, null) : project.kind === 'travel' ? React.createElement(TravelArt, null) : React.createElement(LesscodeArt, null)),
                    React.createElement("div", { className: "project-copy" },
                        React.createElement("div", { className: "project-top" },
                            React.createElement("span", { className: "eyebrow" }, project.type),
                            React.createElement("span", { className: "project-number" },
                                "/",
                                project.number)),
                        React.createElement("h3", null, project.title),
                        React.createElement("p", null, project.description),
                        React.createElement("div", { className: "tags" }, project.tools.map(tool => React.createElement("span", { key: tool }, tool))),
                        React.createElement("div", { className: "project-bottom" },
                            React.createElement("button", { className: "project-open", onClick: () => openProject(project) },
                                "View project details ",
                                React.createElement("span", null,
                                    React.createElement(Arrow, null))),
                            project.url ? React.createElement("a", { href: project.url, target: "_blank", rel: "noopener noreferrer", className: "project-url", "aria-label": 'Visit ' + project.title + ' website' },
                                React.createElement(Arrow, null)) : React.createElement("span", { className: "private-label" }, "INTERNAL"))))))),
            React.createElement("div", { className: "work-foot section-shell" },
                React.createElement("span", { className: "eyebrow work-instruction" },
                    "SCROLL TO EXPLORE THE WORK ",
                    React.createElement(Arrow, null)),
                React.createElement("span", { className: "eyebrow muted" }, "INTERFACES. INTEGRATIONS. IMPLEMENTATION."))));
}
function StackIllustration() {
    const plates = [
        { top: 'M100 160 300 60 500 160 300 260Z', front: 'M100 160v22l200 100v-22Z', right: 'M300 260v22l200-100v-22Z', label: '01 / INTERFACES', y: 168 },
        { top: 'M100 240 300 140 500 240 300 340Z', front: 'M100 240v22l200 100v-22Z', right: 'M300 340v22l200-100v-22Z', label: '02 / DATA', y: 248 },
        { top: 'M100 320 300 220 500 320 300 420Z', front: 'M100 320v22l200 100v-22Z', right: 'M300 420v22l200-100v-22Z', label: '03 / AUTOMATION', y: 328 },
    ];
    return React.createElement("div", { className: "stack-illustration" },
        React.createElement("svg", { viewBox: "0 0 600 510", role: "img", "aria-label": "Three connected layers: interfaces, data, and automation" },
            React.createElement("ellipse", { className: "stack-shadow", cx: "300", cy: "446", rx: "170", ry: "30" }),
            React.createElement("g", { className: "stack-guides" },
                React.createElement("path", { d: "M300 28v423M75 150l445 228M520 150 75 378" })),
            plates.map((plate, i) => React.createElement("g", { key: i, className: 'system-layer layer-' + i, style: { '--layer': i } },
                React.createElement("path", { className: "plate-front", d: plate.front }),
                React.createElement("path", { className: "plate-right", d: plate.right }),
                React.createElement("path", { className: "plate-top", d: plate.top }),
                React.createElement("path", { className: "plate-grid", d: `M170 ${plate.y - 16}l200-100M235 ${plate.y + 17}l200-100M170 ${plate.y - 44}l200 100M235 ${plate.y - 77}l200 100` }),
                React.createElement("circle", { className: "plate-node", cx: "300", cy: plate.y - 8, r: "13" }),
                React.createElement("circle", { className: "plate-node-inner", cx: "300", cy: plate.y - 8, r: "4" }),
                React.createElement("text", { x: "128", y: plate.y + 44, transform: `rotate(26.56,128,${plate.y + 44})` }, plate.label))).reverse(),
            React.createElement("g", { className: "stack-coordinates" },
                React.createElement("text", { x: "35", y: "474" }, "FIG. 01"),
                React.createElement("text", { x: "433", y: "474" }, "CONNECTED BY DESIGN"))));
}
function Toolkit() {
    return React.createElement("section", { className: "toolkit", id: "toolkit", "aria-labelledby": "toolkit-title" },
        React.createElement("div", { className: "section-shell" },
            React.createElement(SectionLabel, { number: "03", light: true }, "MY TOOLKIT"),
            React.createElement("div", { className: "toolkit-grid" },
                React.createElement("div", { className: "toolkit-intro" },
                    React.createElement("h2", { id: "toolkit-title" },
                        "THE INTERFACE.",
                        React.createElement("br", null),
                        "THE DATA.",
                        React.createElement("br", null),
                        React.createElement("em", null, "The connection.")),
                    React.createElement("p", null,
                        "Different tools. One connected system.",
                        React.createElement("br", null),
                        "From what you see to what makes it work."),
                    React.createElement(StackIllustration, null)),
                React.createElement("div", { className: "skill-groups" }, skillGroups.map((group, i) => React.createElement("div", { className: "skill-group", "data-reveal": true, key: group.name },
                    React.createElement("div", { className: "skill-group-heading" },
                        React.createElement("span", { className: "eyebrow" },
                            "0",
                            i + 1,
                            " / ",
                            group.label),
                        React.createElement(Arrow, null)),
                    React.createElement("h3", null, group.name),
                    React.createElement("p", null, group.description),
                    React.createElement("div", { className: "tags" }, group.tools.map(tool => React.createElement("span", { key: tool }, tool)))))))));
}
function Experience() {
    return React.createElement("section", { className: "experience-section", id: "experience", "aria-labelledby": "experience-title" },
        React.createElement("div", { className: "section-shell" },
            React.createElement(SectionLabel, { number: "04" }, "THE PATH SO FAR"),
            React.createElement("div", { className: "experience-grid" },
                React.createElement("div", { className: "experience-heading" },
                    React.createElement("h2", { id: "experience-title" },
                        "ALWAYS",
                        React.createElement("br", null),
                        React.createElement("em", null, "building."),
                        React.createElement("br", null),
                        "ALWAYS",
                        React.createElement("br", null),
                        React.createElement("em", null, "learning.")),
                    React.createElement("p", null, "From WordPress websites to business systems and automation."),
                    React.createElement("a", { className: "text-link", href: profile.resume, download: true },
                        "Read the full resume ",
                        React.createElement(Arrow, null))),
                React.createElement("div", { className: "experience-list" },
                    React.createElement("div", { className: "experience-line", "aria-hidden": "true" },
                        React.createElement("span", null)),
                    experience.map((job, i) => React.createElement("details", { className: "experience-item", key: job.company, open: i === 0 },
                        React.createElement("summary", null,
                            React.createElement("span", { className: "timeline-dot" }),
                            React.createElement("span", { className: "experience-meta" },
                                React.createElement("span", { className: "eyebrow" }, job.dates),
                                React.createElement("span", { className: "experience-company" }, job.company),
                                React.createElement("h3", null, job.role)),
                            React.createElement("span", { className: "details-icon" }, "+")),
                        React.createElement("div", { className: "experience-detail" },
                            React.createElement("p", null, job.summary),
                            React.createElement("ul", null, job.items.map(item => React.createElement("li", { key: item }, item))))))))));
}
function Education() {
    return React.createElement("section", { className: "education-section", "aria-labelledby": "education-title" },
        React.createElement("div", { className: "section-shell" },
            React.createElement(SectionLabel, { number: "05" }, "THE FOUNDATION"),
            React.createElement("div", { className: "education-grid" },
                React.createElement("div", { className: "education-photo" },
                    React.createElement("img", { src: profile.photo, width: "720", height: "1280", loading: "lazy", alt: "Muhammad Muhid in his graduation gown, holding his convocation folder" }),
                    React.createElement("div", { className: "graduation-caption" },
                        React.createElement("span", null, "CLASS OF 2025"),
                        React.createElement(Arrow, null)),
                    React.createElement("div", { className: "medal-seal" },
                        React.createElement("span", null, "DEGREE PROGRAM"),
                        React.createElement("strong", null,
                            "2",
                            React.createElement("sup", null, "nd")),
                        React.createElement("span", null, "SILVER MEDALIST"))),
                React.createElement("div", { className: "education-copy" },
                    React.createElement("span", { className: "eyebrow" }, "ENGINEERING & CONTINUOUS LEARNING"),
                    React.createElement("h2", { id: "education-title" },
                        "A strong",
                        React.createElement("br", null),
                        React.createElement("em", null, "foundation."),
                        React.createElement("br", null),
                        "An open mind."),
                    React.createElement("h3", null,
                        "Bachelor of Science",
                        React.createElement("br", null),
                        "in Information Technology"),
                    React.createElement("p", null,
                        "Sir Syed University of Engineering & Technology",
                        React.createElement("br", null),
                        React.createElement("span", { className: "muted" }, "2021 - 2025")),
                    React.createElement("div", { className: "education-metrics" },
                        React.createElement("div", null,
                            React.createElement("strong", null, "3.54"),
                            React.createElement("span", null, "CGPA")),
                        React.createElement("div", null,
                            React.createElement("strong", null, "2\u00D7"),
                            React.createElement("span", null, "ACADEMIC SCHOLARSHIPS"))),
                    React.createElement("div", { className: "earlier-education" },
                        React.createElement("span", { className: "eyebrow" }, "EARLIER EDUCATION / 2019 - 2021"),
                        React.createElement("p", null, "Intermediate \u00B7 Govt. Jinnah College")))),
            React.createElement("div", { className: "certification-row" },
                React.createElement("span", { className: "eyebrow" }, "CERTIFICATIONS"),
                React.createElement("div", null,
                    React.createElement("span", null,
                        "Computer Networks ",
                        React.createElement("small", null, "CNA")),
                    React.createElement("span", null,
                        "Python ",
                        React.createElement("small", null, "CNA")),
                    React.createElement("span", null,
                        "JavaScript ",
                        React.createElement("small", null, "CNA")),
                    React.createElement("span", null,
                        "Front-End Web Development ",
                        React.createElement("small", null, "UDEMY")))),
            React.createElement("div", { className: "academic-projects" },
                React.createElement("div", { className: "academic-heading" },
                    React.createElement("h3", null, "Built while learning."),
                    React.createElement("span", { className: "eyebrow" }, "ACADEMIC PROJECTS")),
                academicProjects.map((item, i) => React.createElement("details", { key: item.name },
                    React.createElement("summary", null,
                        React.createElement("span", { className: "academic-number" },
                            "0",
                            i + 1),
                        React.createElement("h4", null, item.name),
                        React.createElement("span", { className: "eyebrow academic-tools" }, item.tools),
                        React.createElement("span", { className: "details-icon" }, "+")),
                    React.createElement("p", null, item.text))))));
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
        }
        catch {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select();
            }
            setCopyStatus('Email selected. Press Ctrl+C or copy it manually.');
        }
        timerRef.current = window.setTimeout(() => setCopyStatus(''), 6000);
    }
    return React.createElement("footer", { className: "contact", id: "contact" },
        React.createElement("div", { className: "section-shell" },
            React.createElement(SectionLabel, { number: "06" }, "YOUR NEXT IDEA STARTS HERE"),
            React.createElement("div", { className: "contact-heading-row" },
                React.createElement("h2", null,
                    React.createElement("span", { className: "contact-line" }, "LET'S BUILD"),
                    React.createElement("span", { className: "contact-line" }, "SOMETHING"),
                    React.createElement("span", { className: "contact-line accent" },
                        React.createElement("em", null, "that works."))),
                React.createElement("a", { className: "contact-round", href: 'mailto:' + profile.email, "aria-label": "Email Muhammad Muhid" },
                    React.createElement(Arrow, null))),
            React.createElement("div", { className: "contact-info" },
                React.createElement("p", null,
                    "Have a project or a role in mind?",
                    React.createElement("br", null),
                    React.createElement("span", { className: "muted" }, "Let's start a conversation.")),
                React.createElement("div", { className: "email-block" },
                    React.createElement("a", { className: "contact-email", href: 'mailto:' + profile.email },
                        profile.email,
                        React.createElement(Arrow, null)),
                    React.createElement("div", { className: "contact-secondary" },
                        React.createElement("a", { href: profile.phoneHref }, profile.phone),
                        React.createElement("button", { type: "button", onClick: copyEmail },
                            "Copy email ",
                            React.createElement("svg", { viewBox: "0 0 20 20", width: "13", height: "13", fill: "none", "aria-hidden": "true" },
                                React.createElement("rect", { x: "7", y: "7", width: "10", height: "10", rx: "1", stroke: "currentColor" }),
                                React.createElement("path", { d: "M12 4V2H2v10h2", stroke: "currentColor" })))),
                    React.createElement("div", { className: "copy-status", role: "status" }, copyStatus),
                    React.createElement("label", { className: 'copy-fallback ' + (copyStatus.startsWith('Email selected') ? 'show' : '') },
                        "Email address",
                        React.createElement("input", { ref: inputRef, readOnly: true, value: profile.email })))),
            React.createElement("div", { className: "footer-links" },
                React.createElement(Brand, null),
                React.createElement("div", null,
                    React.createElement("a", { href: profile.linkedin, target: "_blank", rel: "noopener noreferrer" },
                        "LinkedIn ",
                        React.createElement(Arrow, null)),
                    React.createElement("a", { href: profile.resume, download: true },
                        "Resume ",
                        React.createElement(Arrow, null)),
                    React.createElement("a", { href: "#top" },
                        "Back to top ",
                        React.createElement(Arrow, null)))),
            React.createElement("div", { className: "footer-bottom" },
                React.createElement("span", null, "\u00A9 2026 Muhammad Muhid"),
                React.createElement("span", null, "DESIGNED WITH INTENT. BUILT WITH REACT & GSAP."),
                React.createElement("button", { type: "button", className: "motion-control", onClick: toggleMotion, "aria-pressed": motion },
                    React.createElement("span", { className: "motion-light" }),
                    "Motion ",
                    motion ? 'on' : 'off'))));
}
function ProjectDialog({ project, dialogRef, onClose }) {
    return React.createElement("dialog", { className: "project-dialog", ref: dialogRef, onClose: onClose, onClick: e => { if (e.target === e.currentTarget)
            e.currentTarget.close(); } },
        React.createElement("div", { className: "project-dialog-inner" }, project && React.createElement(React.Fragment, null,
            React.createElement("div", { className: "dialog-top" },
                React.createElement("span", { className: "eyebrow" },
                    "PROJECT / ",
                    project.number),
                React.createElement("button", { className: "close-button", "aria-label": "Close project details", onClick: () => dialogRef.current?.close() },
                    React.createElement("span", null),
                    React.createElement("span", null))),
            React.createElement("span", { className: "eyebrow accent" }, project.type),
            React.createElement("h2", null, project.title),
            React.createElement("p", { className: "dialog-context" }, project.context),
            React.createElement("h3", null, "My contribution"),
            React.createElement("ul", null, project.contributions.map(text => React.createElement("li", { key: text }, text))),
            React.createElement("div", { className: "tags" }, project.tools.map(tool => React.createElement("span", { key: tool }, tool))),
            React.createElement("div", { className: "dialog-footer" },
                project.url ? React.createElement(Button, { href: project.url, external: true }, "Visit website") : React.createElement("p", null,
                    "Private internal platform.",
                    React.createElement("br", null),
                    React.createElement("span", { className: "muted" }, "No production screens or client data are published here.")),
                React.createElement("a", { href: profile.resume, download: true, className: "text-link" },
                    "View resume ",
                    React.createElement(Arrow, null))))));
}
function initialMotion() {
    try {
        const saved = localStorage.getItem('muhid-motion');
        if (saved)
            return saved === 'on';
    }
    catch { /* Local previews and private browsing can restrict storage. */ }
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function App() {
    const root = useRef(null), menuRef = useRef(null), projectRef = useRef(null), openerRef = useRef(null);
    const [motion, setMotion] = useState(initialMotion);
    const [menuOpen, setMenuOpen] = useState(false), [project, setProject] = useState(null);
    useLayoutEffect(() => mountMotion(root.current, motion), [motion]);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = event => { try {
            if (localStorage.getItem('muhid-motion'))
                return;
        }
        catch { } setMotion(!event.matches); };
        media.addEventListener('change', change);
        return () => media.removeEventListener('change', change);
    }, []);
    useEffect(() => {
        if (menuOpen && menuRef.current && !menuRef.current.open) {
            openerRef.current = document.activeElement;
            menuRef.current.showModal();
        }
        if (!menuOpen && menuRef.current?.open)
            menuRef.current.close();
    }, [menuOpen]);
    useEffect(() => {
        if (project && projectRef.current && !projectRef.current.open)
            projectRef.current.showModal();
        if (!project && projectRef.current?.open)
            projectRef.current.close();
    }, [project]);
    useEffect(() => {
        const previous = document.body.style.overflow;
        if (menuOpen || project)
            document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [menuOpen, project]);
    useEffect(() => {
        const listener = e => {
            const a = e.target.closest('a[href^="#"]');
            if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                return;
            const target = document.querySelector(a.getAttribute('href'));
            if (!target)
                return;
            e.preventDefault();
            requestAnimationFrame(() => navigateTo(target, motion));
        };
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
    }, [motion]);
    const toggleMotion = () => setMotion(value => { try {
        localStorage.setItem('muhid-motion', value ? 'off' : 'on');
    }
    catch { } return !value; });
    const openProject = value => { openerRef.current = document.activeElement; setProject(value); };
    const closeProject = () => { setProject(null); requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true })); };
    return React.createElement("div", { className: "app", ref: root, "data-motion": motion ? 'on' : 'off' },
        React.createElement("a", { className: "skip-link", href: "#main" }, "Skip to content"),
        React.createElement("div", { className: "reading-progress", "aria-hidden": "true" },
            React.createElement("span", null)),
        React.createElement(Header, { motion: motion, toggleMotion: toggleMotion, menuOpen: menuOpen, setMenuOpen: setMenuOpen, menuRef: menuRef }),
        React.createElement("main", { id: "main", tabIndex: "-1" },
            React.createElement(Hero, null),
            React.createElement(Marquee, null),
            React.createElement(About, null),
            React.createElement(Work, { openProject: openProject }),
            React.createElement(Toolkit, null),
            React.createElement(Experience, null),
            React.createElement(Education, null)),
        React.createElement(Contact, { motion: motion, toggleMotion: toggleMotion }),
        React.createElement(ProjectDialog, { project: project, dialogRef: projectRef, onClose: closeProject }));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null, React.createElement(App)));

})(window.React,window.ReactDOM);