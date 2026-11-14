import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { onIntroReady, isIntroReady, markIntroReady, prefersReducedMotion } from './bus.js';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out';

/* ------------------------------------------------------------------ */
/* Scene builders                                                      */
/* ------------------------------------------------------------------ */

function revealOnce(targets, vars, { start = 'top 88%', stagger = 0.1 } = {}) {
  if (!targets.length) return;
  targets.forEach((el) => { el.dataset.revealed = ''; });
  ScrollTrigger.batch(targets, {
    start,
    once: false,
    onEnter: (batch) => play(batch),
    onEnterBack: (batch) => play(batch),
  });
  function play(batch) {
    const fresh = batch.filter((el) => el.dataset.revealed !== '1');
    if (!fresh.length) return;
    fresh.forEach((el) => { el.dataset.revealed = '1'; });
    gsap.to(fresh, { ...vars, stagger, overwrite: true });
  }
}

function buildHeadings(scope) {
  gsap.utils.toArray('main section h2', scope).forEach((h2) => {
    const siblings = Array.from(h2.parentElement.children).filter((n) => n !== h2);

    gsap.set(h2, {
      clipPath: 'inset(100% 0% -15% 0%)',
      y: 60,
      transition: 'none',
    });
    gsap.set(siblings, { y: 34, opacity: 0, filter: 'blur(8px)', transition: 'none' });

    ScrollTrigger.create({
      trigger: h2,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(h2, {
          clipPath: 'inset(0% 0% -15% 0%)',
          y: 0,
          duration: 1.4,
          ease: EASE,
          clearProps: 'clipPath,transform,transition',
        });
        gsap.to(siblings, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: EASE,
          stagger: 0.09,
          delay: 0.08,
          clearProps: 'transform,opacity,filter,transition',
        });
      },
    });
  });

  // Supporting copy (intro paragraphs, asides) drifts up softly
  gsap.utils.toArray('[data-fade]', scope).forEach((el) => {
    gsap.set(el, { y: 30, opacity: 0, transition: 'none' });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          delay: 0.25,
          ease: EASE,
          clearProps: 'transform,opacity,transition',
        }),
    });
  });
}

function buildFooterMark(scope) {
  const mark = document.querySelector('[data-footer-mark]');
  if (!mark) return;
  gsap.fromTo(
    mark,
    { yPercent: 45, letterSpacing: '0.2em' },
    {
      yPercent: 0,
      letterSpacing: '0.06em',
      ease: 'none',
      scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 1 },
    }
  );
}

function buildCards(scope, skipScenes) {
  const cards = gsap.utils
    .toArray('[data-card]', scope)
    .filter((el) => !(skipScenes && el.closest('[data-scene]')));
  if (!cards.length) return;

  gsap.set(cards, {
    opacity: 0,
    y: 80,
    rotationX: 16,
    transformPerspective: 1000,
    transformOrigin: '50% 100%',
    transition: 'none',
  });

  revealOnce(cards, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 1.25,
    ease: EASE,
    clearProps: 'transform,opacity,transition,transformOrigin',
  });
}

function buildImageReveals(scope) {
  gsap.utils.toArray('[data-reveal-img]', scope).forEach((box) => {
    const img = box.querySelector('img');
    // "up" = architectural curtain rising from the floor; default = framed iris
    const from = box.dataset.revealImg === 'up'
      ? 'inset(100% 0% 0% 0%)'
      : 'inset(14% 10% 14% 10% round 28px)';
    gsap.set(box, { clipPath: from });
    if (img) gsap.set(img, { scale: 1.35, transition: 'none' });

    ScrollTrigger.create({
      trigger: box,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(box, {
          clipPath: box.dataset.revealImg === 'up' ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 0% round 0px)',
          duration: 1.6,
          ease: EASE,
          clearProps: 'clipPath',
        });
        if (img) {
          gsap.to(img, { scale: 1, duration: 2, ease: EASE, clearProps: 'transform,transition' });
        }
      },
    });
  });
}

function buildParallax(scope, cleanups) {
  gsap.utils.toArray('[data-parallax]', scope).forEach((img) => {
    const amount = parseFloat(img.dataset.parallax) || 14;
    // Use the individual `translate` / `scale` CSS properties so existing
    // Tailwind hover transforms (group-hover:scale-105) keep working.
    img.style.scale = '1.16';
    img.style.willChange = 'translate';
    const st = ScrollTrigger.create({
      trigger: img.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        img.style.translate = `0 ${((self.progress - 0.5) * amount).toFixed(2)}%`;
      },
    });
    cleanups.push(() => {
      st.kill();
      img.style.scale = '';
      img.style.translate = '';
      img.style.willChange = '';
    });
  });
}

function buildCounters(scope, cleanups) {
  gsap.utils.toArray('[data-count]', scope).forEach((el) => {
    const original = el.textContent;
    const match = original.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseInt(num, 10);
    const state = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = `${prefix}${Math.round(state.v)}${suffix}`; },
          onComplete: () => { el.textContent = original; },
        });
      },
    });
    cleanups.push(() => { st.kill(); el.textContent = original; });
  });
}

function buildHero(scope, { fine, desktop }, cleanups) {
  const hero = scope.querySelector('[data-hero]');
  if (!hero) return;

  const lines = hero.querySelectorAll('[data-hero-line]');
  const intro = hero.querySelectorAll('[data-hero-intro]');
  const visual = hero.querySelector('[data-hero-visual]');
  const inner = hero.querySelector('[data-hero-visual-inner]');
  const floats = hero.querySelectorAll('[data-hero-float]');
  const text = hero.querySelector('[data-hero-text]');
  const bg = hero.querySelector('[data-hero-bg]');
  const cue = hero.querySelector('[data-hero-cue]');
  const media = hero.querySelector('[data-hero-media]');

  const rest = desktop ? { rx: 4, ry: -10 } : { rx: 0, ry: 0 };

  // Initial (pre-curtain) state
  gsap.set(lines, { yPercent: 115, rotate: 3 });
  gsap.set(intro, { y: 40, opacity: 0, filter: 'blur(10px)' });
  gsap.set(inner, {
    rotationX: 22,
    rotationY: -42,
    z: -520,
    opacity: 0,
  });
  gsap.set(floats, { opacity: 0, z: 0 });
  if (cue) gsap.set(cue, { opacity: 0 });
  if (media) gsap.set(media, { scale: 1.28, clipPath: 'inset(8% 8% 8% 8%)', transformOrigin: '60% 50%' });

  const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
  if (media) tl.to(media, { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 2.6, ease: 'expo.inOut', clearProps: 'clipPath' }, 0);
  tl.to(lines, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.14 }, 0.5)
    .to(intro, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, clearProps: 'filter' }, 0.8)
    .to(inner, { rotationX: rest.rx, rotationY: rest.ry, z: 0, opacity: 1, duration: 2.1 }, 0.9)
    .to(floats, { opacity: 1, z: 60, duration: 1.4, stagger: 0.12 }, 1.6);
  if (cue) tl.to(cue, { opacity: 1, duration: 1 }, 2);

  let introDone = false;
  tl.eventCallback('onComplete', () => { introDone = true; });
  const off = onIntroReady(() => tl.play());
  cleanups.push(off);

  // Mouse-driven 3D tilt of the showcase card + depth parallax of orbs
  if (fine && inner) {
    const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.9, ease: 'power3.out' });
    const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    const depthEls = hero.querySelectorAll('[data-depth]');
    const onMove = (e) => {
      if (!introDone) return;
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      rx(rest.rx - ny * 14);
      ry(rest.ry + nx * 18);
      depthEls.forEach((el) => {
        const d = parseFloat(el.dataset.depth) || 20;
        el.style.translate = `${(nx * d).toFixed(1)}px ${(ny * d).toFixed(1)}px`;
      });
    };
    const onLeave = () => {
      if (!introDone) return;
      rx(rest.rx);
      ry(rest.ry);
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      depthEls.forEach((el) => { el.style.translate = ''; });
    });
  }

  // Cinematic scroll-out: text lifts away, showcase sinks back in depth
  const out = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.9 },
    defaults: { ease: 'none' },
  });
  if (text) out.to(text, { y: -140, opacity: 0.05 }, 0);
  if (visual) out.to(visual, { y: desktop ? -60 : -20, opacity: 0.2 }, 0);
  if (bg) out.to(bg, { yPercent: 22 }, 0);
  if (media) out.to(media, { scale: 1.12, filter: 'brightness(0.55)' }, 0);
  if (cue) out.to(cue, { opacity: 0, duration: 0.2 }, 0);
}

function buildPhilosophyScene(scope) {
  const scene = scope.querySelector('[data-scene="philosophy"]');
  if (!scene) return;
  const cards = scene.querySelectorAll('[data-card]');
  const rail = scene.querySelector('[data-scene-rail]');
  const tilts = [32, 0, -32];

  gsap.set(cards, { transformPerspective: 1600 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: scene, start: 'top 35%', end: 'bottom bottom', scrub: 1 },
    defaults: { ease: 'power2.out' },
  });

  cards.forEach((card, i) => {
    tl.fromTo(
      card,
      { opacity: 0, z: -700, y: 220, rotationY: tilts[i] ?? 0, rotationX: 24 },
      { opacity: 1, z: 0, y: 0, rotationY: 0, rotationX: 0, duration: 1 },
      i * 0.55
    );
  });
  if (rail) tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: 2.1, ease: 'none' }, 0);
  tl.to({}, { duration: 0.6 }); // hold the composed frame before releasing
}

/* ------------------------------------------------------------------ */
/* Global pointer FX: 3D tilt + glare on [data-tilt]                   */
/* ------------------------------------------------------------------ */
function installTilt() {
  let current = null;
  let frame = 0;
  let last = null;

  const reset = (el) => {
    el.classList.remove('is-tilting');
    el.style.transform = '';
  };

  const apply = () => {
    frame = 0;
    if (!last) return;
    const target = last.target instanceof Element ? last.target.closest('[data-tilt]') : null;
    if (current && current !== target) reset(current);
    current = target;
    if (!target || gsap.isTweening(target)) return;
    const r = target.getBoundingClientRect();
    const nx = (last.clientX - r.left) / r.width - 0.5;
    const ny = (last.clientY - r.top) / r.height - 0.5;
    const max = parseFloat(target.dataset.tilt) || 7;
    target.classList.add('is-tilting');
    target.style.transform =
      `perspective(1100px) rotateX(${(-ny * max).toFixed(2)}deg) rotateY(${(nx * max).toFixed(2)}deg) translate3d(0,-6px,0)`;
    target.style.setProperty('--mx', `${((nx + 0.5) * 100).toFixed(1)}%`);
    target.style.setProperty('--my', `${((ny + 0.5) * 100).toFixed(1)}%`);
  };

  const onMove = (e) => {
    last = e;
    if (!frame) frame = requestAnimationFrame(apply);
  };
  const onOut = (e) => {
    if (!e.relatedTarget && current) { reset(current); current = null; }
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerout', onOut);
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerout', onOut);
    if (frame) cancelAnimationFrame(frame);
    if (current) reset(current);
  };
}

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */
export function useCinematic(enabled, refreshKey) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      // Nothing to animate: let any waiting hero intro proceed.
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('cinematic');
    root.classList.remove('scroll-smooth');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: { offset: -70 },
      prevent: (node) => !!(node && node.closest && node.closest('.fixed')),
    });
    window.__lenis = lenis;
    if (!isIntroReady()) lenis.stop();
    const offReady = onIntroReady(() => lenis.start());
    // Safety net: never leave the hero hidden if the preloader is skipped or stalls.
    const safety = setTimeout(markIntroReady, 4500);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const main = document.querySelector('main') || document.body;
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 1024px)',
        fine: '(hover: hover) and (pointer: fine)',
        scene: '(min-width: 1024px) and (min-height: 820px)',
      },
      (ctx) => {
        const c = ctx.conditions;
        const cleanups = [];
        buildHero(main, c, cleanups);
        buildHeadings(main);
        buildCards(main, c.scene);
        buildImageReveals(main);
        buildParallax(main, cleanups);
        buildCounters(main, cleanups);
        if (c.scene) buildPhilosophyScene(main);
        buildFooterMark(main);
        return () => cleanups.forEach((fn) => fn());
      }
    );

    const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const removeTilt = fineMq.matches ? installTilt() : () => {};

    // Keep trigger positions honest while images & API data settle.
    let t = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(main);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      clearTimeout(safety);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('load', onLoad);
      removeTilt();
      mm.revert();
      offReady();
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
      root.classList.remove('cinematic');
      root.classList.add('scroll-smooth');
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [enabled, refreshKey]);
}
