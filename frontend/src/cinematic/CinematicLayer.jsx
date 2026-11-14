import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { markIntroReady, prefersReducedMotion } from './bus.js';

gsap.registerPlugin(ScrollTrigger);

const LOGO = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg';
const SEEN_KEY = 'modshine_intro_seen';

function shouldShowPreloader() {
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch (e) {
    return true;
  }
}

/* --------------------------- Preloader ---------------------------- */
function Preloader({ onDone }) {
  const root = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const el = root.current;
    const state = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) {}
          onDone();
        },
      });
      tl.from('[data-pl-logo]', { scale: 0.6, opacity: 0, rotate: -8, duration: 1.1 }, 0)
        .from('[data-pl-letter]', { yPercent: 120, opacity: 0, duration: 1, stagger: 0.05 }, 0.15)
        .from('[data-pl-sub]', { opacity: 0, y: 12, duration: 0.8 }, 0.55)
        .to(state, {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(state.v)).padStart(3, '0');
          },
        }, 0.1)
        .fromTo('[data-pl-bar]', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.1)
        .to('[data-pl-content]', { y: -40, opacity: 0, duration: 0.7, ease: 'power3.in' }, 1.75)
        .add(() => markIntroReady(), 2.05)
        .to('[data-pl-panel="top"]', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.0)
        .to('[data-pl-panel="bottom"]', { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, 2.0);
    }, el);
    return () => ctx.revert();
  }, [onDone]);

  const word = 'MODSHINE'.split('');

  return (
    <div ref={root} className="fixed inset-0 z-[100] pointer-events-auto" aria-hidden="true">
      <div data-pl-panel="top" className="absolute inset-x-0 top-0 h-1/2 bg-brand-darkest" />
      <div data-pl-panel="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-darkest" />

      <div data-pl-content className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(196,159,100,0.16),transparent_55%)]" />
        <img
          data-pl-logo
          src={LOGO}
          alt=""
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-white p-1.5 shadow-gold-glow"
        />
        <div className="relative flex overflow-hidden font-serif text-4xl sm:text-6xl font-bold tracking-[0.18em]">
          {word.map((ch, i) => (
            <span key={i} data-pl-letter className="inline-block gold-gradient-text">{ch}</span>
          ))}
        </div>
        <span data-pl-sub className="relative text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold-champagne/80">
          Interior
        </span>
        <div className="relative w-48 sm:w-64 h-px bg-white/10 overflow-hidden mt-2">
          <div data-pl-bar className="absolute inset-0 origin-left bg-gradient-to-r from-gold-rich via-gold-champagne to-gold-primary" />
        </div>
        <span ref={countRef} className="relative font-sans text-xs tabular-nums tracking-[0.3em] text-white/50">000</span>
      </div>
    </div>
  );
}

/* ------------------------- Scroll progress ------------------------ */
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
    return () => st.kill();
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-gold-rich via-gold-champagne to-emerald-400"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

/* --------------------------- Cursor ring -------------------------- */
function CursorRing() {
  const ring = useRef(null);
  const dot = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !prefersReducedMotion()
  );

  useEffect(() => {
    if (!enabled) return undefined;
    const r = ring.current;
    const d = dot.current;
    gsap.set([r, d], { xPercent: -50, yPercent: -50, opacity: 0 });
    const rx = gsap.quickTo(r, 'x', { duration: 0.55, ease: 'power3.out' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.55, ease: 'power3.out' });
    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3.out' });
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3.out' });
    let visible = false;

    const onMove = (e) => {
      if (!visible) {
        visible = true;
        gsap.to([r, d], { opacity: 1, duration: 0.3 });
      }
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      const interactive = e.target instanceof Element &&
        e.target.closest('a, button, input, select, textarea, label, [data-tilt]');
      r.classList.toggle('is-active', !!interactive);
    };
    const onLeave = () => {
      visible = false;
      gsap.to([r, d], { opacity: 0, duration: 0.3 });
    };
    const onDown = () => r.classList.add('is-pressed');
    const onUp = () => r.classList.remove('is-pressed');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ----------------------------- Layer ------------------------------ */
export default function CinematicLayer() {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);

  useEffect(() => {
    if (!showPreloader) markIntroReady();
  }, [showPreloader]);

  const handleDone = React.useCallback(() => setShowPreloader(false), []);

  return (
    <>
      {showPreloader && <Preloader onDone={handleDone} />}
      <ScrollProgress />
      <CursorRing />
      <div className="film-grain" aria-hidden="true" />
    </>
  );
}
