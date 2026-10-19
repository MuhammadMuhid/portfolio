import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function navigateTo(target, enabled) {
  const top = target.id === 'top' ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight - 16);
  const focus = () => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    try { history.replaceState(null, '', '#' + target.id); } catch { /* file:// previews */ }
  };
  if (enabled) gsap.to(window, { scrollTo: { y: top, autoKill: true }, duration: .85, ease: 'power3.inOut', overwrite: 'auto', onComplete: focus });
  else { window.scrollTo(0, top); focus(); }
}

/** Genuine GSAP motion. Native scrolling; scoped cleanup for React remounts and reduced motion. */
export function mountMotion(root, enabled) {
  if (!root) return () => {};
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
  const requestProgress = () => { if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress); };
  on(window, 'scroll', requestProgress, { passive: true });
  on(window, 'resize', requestProgress, { passive: true });
  const refresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => { if (alive) { ScrollTrigger.sort(); ScrollTrigger.refresh(); requestProgress(); } }, 130); };
  q('details').forEach(detail => on(detail, 'toggle', refresh));
  q('img').forEach(image => { if (!image.complete) on(image, 'load', refresh, { once: true }); });
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
        }});
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
        }});
      } else {
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
