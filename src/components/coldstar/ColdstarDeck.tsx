'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Slide = {
  id: string;
  label: string;
  short: string;
  foot: string;
};

const slides: Slide[] = [
  { id: 'cover', label: 'Cover', short: 'Cover', foot: 'Coldstar · Demo Day 2026 · coldstar.dev' },
  { id: 'problem', label: '01, The Damage', short: 'Damage', foot: 'Sources: DeFiLlama, CertiK, Chainalysis · 2026 YTD' },
  { id: 'how', label: '02, How It Works', short: 'How', foot: 'Keys never cross the air-gap. Only signatures do.' },
  { id: 'product', label: '03, What We Built', short: 'Product', foot: 'github.com/devsyrem/coldstar · Apache 2.0' },
  { id: 'insight', label: '04, The Insight', short: 'Insight', foot: "It's not a chip problem. It's a lifetime problem." },
  { id: 'recycling', label: '05, Recycling Old Tech', short: 'Recycling', foot: 'The hardware is the recycle.' },
  { id: 'traction', label: '06, Receipts, Not Promises', short: 'Traction', foot: 'Live data, coldstar.dev/stats · refreshed daily' },
  { id: 'compete', label: '07, How We Compare', short: 'Competition', foot: 'The only open, programmable, sub-millisecond signing layer for Solana' },
  { id: 'business', label: '08, How We Make Money', short: 'Business', foot: 'Open-core: trust below the line, value above it' },
  { id: 'roadmap', label: "09, Where We're Headed", short: 'Roadmap', foot: 'Conservative roadmap. Ship, audit, expand. No token.' },
  { id: 'team', label: "10, Who's Building This", short: 'Team', foot: '2 founders · Chainlabs Technologies · Backed by ecosystem' },
  { id: 'ask', label: '11, The Ask', short: 'Ask', foot: 'Sign cold. Ship fast.' },
];

export default function ColdstarDeck() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = slides.length;

  const go = useCallback((delta: number) => {
    setCurrent((c) => Math.max(0, Math.min(total - 1, c + delta)));
  }, [total]);

  const jump = useCallback((n: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, n)));
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        jump(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jump(total - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, jump, total]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen();
    }
  }, []);

  const slide = slides[current];
  const counterText = useMemo(
    () => `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    [current, total]
  );

  return (
    <div className={`csd-root${isFullscreen ? ' csd-root-fs' : ''}`}>
      <div className="csd-shell">
        <aside className="csd-sidebar">
          <header className="csd-brand">
            <div className="csd-brand-mark">
              <Link href="/coldstar">Coldstar</Link>
            </div>
            <div className="csd-brand-version">v.0.9.4</div>
          </header>

          <ul className="csd-deck-list">
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={i === current ? 'true' : 'false'}
                >
                  <span className="csd-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.short}</span>
                  <span className="csd-dot" />
                </button>
              </li>
            ))}
          </ul>

          <div className="csd-side-meta">
            <div className="csd-side-meta-title">Pitch Deck</div>
            <div className="csd-side-meta-row"><span>Series:</span><span>Seed · $3.5M</span></div>
            <div className="csd-side-meta-row"><span>Vintage:</span><span>2026 Q2</span></div>
            <div className="csd-side-meta-row"><span>Author:</span><span>Sy & Matthew</span></div>
            <div className="csd-side-meta-row"><span>Status:</span><span>Operational</span></div>
          </div>
        </aside>

        <main className="csd-stage">
          <div className="csd-topbar">
            <div className="csd-topbar-left">
              <span>Coldstar</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>{slide.label}</span>
            </div>
            <div className="csd-topbar-right">
              <span className="csd-counter">
                <strong>{String(current + 1).padStart(2, '0')}</strong>
                <span>/</span>
                {String(total).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="csd-nav-btn"
                onClick={() => go(-1)}
                disabled={current === 0}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                className="csd-nav-btn"
                onClick={() => go(1)}
                disabled={current === total - 1}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                className="csd-nav-btn csd-fs-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
                title={isFullscreen ? 'Exit full screen (Esc)' : 'Enter full screen'}
              >
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 4 9 9 4 9 M15 4 15 9 20 9 M4 15 9 15 9 20 M20 15 15 15 15 20" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9 4 4 9 4 M20 9 20 4 15 4 M4 15 4 20 9 20 M20 15 20 20 15 20" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
            </div>
          </div>

          <section className="csd-slide" key={slide.id}>
            {renderSlide(slide.id)}
            <div className="csd-foot">
              <span>{slide.foot}</span>
              <span>{counterText}</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function renderSlide(id: string) {
  switch (id) {
    case 'cover':
      return <Cover />;
    case 'problem':
      return <Problem />;
    case 'insight':
      return <Insight />;
    case 'product':
      return <Product />;
    case 'how':
      return <How />;
    case 'recycling':
      return <Recycling />;
    case 'traction':
      return <Traction />;
    case 'compete':
      return <Compete />;
    case 'business':
      return <Business />;
    case 'roadmap':
      return <Roadmap />;
    case 'team':
      return <Team />;
    case 'ask':
      return <Ask />;
    default:
      return null;
  }
}

/* ── Slide 01, Cover ─────────────────────────────────────────── */

const COVER_TITLE = 'Coldstar';

function Cover() {
  const [chars, setChars] = useState(0);
  const total = COVER_TITLE.length;

  useEffect(() => {
    if (chars >= total) return;
    const t = setTimeout(() => setChars((c) => c + 1), 2000 / total);
    return () => clearTimeout(t);
  }, [chars, total]);

  const typed = COVER_TITLE.slice(0, chars);

  const enterFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement && el.requestFullscreen) {
      void el.requestFullscreen();
    }
  }, []);

  return (
    <div className="csd-cover-solo">
      <h1 className="csd-cover-title csd-cover-title-row" aria-label={COVER_TITLE}>
        <Image
          src="/coldstar/deck/coldstar-icon.png"
          alt=""
          width={512}
          height={512}
          className="csd-cover-icon"
          priority
        />
        <span aria-hidden="true">
          {typed}
          {chars < total && <span className="csd-cursor csd-cover-cursor" />}
        </span>
      </h1>
      <div className="csd-cover-tagline">Solana Online Hackathon · April 6th, May 11th 2026</div>
      <dl className="csd-cover-meta-solo">
        <dt>Stage</dt><dd>Demo Day · Frontier</dd>
        <dt>Domain</dt><dd>coldstar.dev</dd>
        <dt>Status</dt><dd>Operational</dd>
      </dl>
      <button
        type="button"
        className="csd-cover-fs-btn"
        onClick={enterFullscreen}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Present full screen</span>
      </button>
    </div>
  );
}


/* ── Slide 02, The Damage (April hack lineup) ───────────────── */

type HackEntry = {
  num: string;
  name: string;
  amount: string;
  date: string;
  cause: string;
  preventable: boolean;
};

const HACKS: HackEntry[] = [
  { num: '01', name: 'Kelp DAO', amount: '$292M', date: 'Apr 18 · 2026', cause: 'Bridge verifier compromise · single LayerZero DVN', preventable: false },
  { num: '02', name: 'Drift Protocol', amount: '$285M', date: 'Apr 1 · 2026', cause: 'Pre-signed durable nonces · 6-month social engineering', preventable: true },
  { num: '03', name: 'Step Finance', amount: '$27M', date: 'Jan 31 · 2026', cause: 'Stolen executive private key', preventable: true },
];

function Problem() {
  return (
    <>
      <div className="csd-slide-label">// 01, The Damage</div>
      <h2 className="csd-headline">
        $629M in <em className="csd-blink-slow">30 Days</em>
      </h2>
      <p className="csd-subhead">
        April 2026 was the worst month for crypto theft since 2022. Three hacks dominated the year so far, and the same root cause keeps showing up.
      </p>

      <div className="csd-hacks">
        {HACKS.map((h) => (
          <div key={h.num} className={`csd-hack${h.preventable ? ' csd-hack-key' : ''}`}>
            <span className="csd-hack-num">{h.num}</span>
            <div className="csd-hack-meta">
              <h3 className="csd-hack-name">{h.name}</h3>
              <span className="csd-hack-date">{h.date}</span>
            </div>
            <div className="csd-hack-amount">{h.amount}</div>
            <div className="csd-hack-cause">{h.cause}</div>
          </div>
        ))}
      </div>

      <div className="csd-shift">
        <div className="csd-shift-label">The pattern</div>
        <div className="csd-shift-body">
          <strong>$312M of these losses were privileged-key compromises</strong>, Drift and Step Finance. The signing key was the weakest link, not the smart contract.
        </div>
      </div>
    </>
  );
}

/* ── Slide 03, Insight ───────────────────────────────────────── */

function Insight() {
  return (
    <>
      <div className="csd-slide-label">// 04, The Insight</div>
      <div className="csd-insight">
        <div>
          <h2 className="csd-insight-headline">
            You don&apos;t need <s className="csd-strike-grow"><span>a secure chip</span></s>.<br />
            You need a key that doesn&apos;t exist long.
          </h2>
          <p className="csd-insight-body">
            Hardware wallets keep a key alive for years inside a tamper-resistant chip. We keep it alive for <strong>100 microseconds</strong> inside mlock&apos;d RAM, sign once, then zero it out. Same security model. No chip required.
          </p>
        </div>
        <div className="csd-insight-media">
          <div className="csd-insight-img">
            <PhotoFrame
              src="/coldstar/deck/usb-laptop.jpg"
              alt="Coldstar USB key beside an open laptop terminal"
              caption={['Fig. 3', 'Cold key · 100µs lifetime']}
              fit="contain"
            />
          </div>
          <div className="csd-insight-video">
            <div className="csd-img csd-img-contain">
              <video
                src="/coldstar/deck/insight-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="csd-img-caption">
                <span>Fig. 3a</span>
                <span>Coldstar Dapp · live signing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Slide 04, Product ───────────────────────────────────────── */

type TermLine = { kind: 'c' | 'p' | 'ok' | 'blank'; text: string };

const TERM_SCRIPT: TermLine[] = [
  { kind: 'c', text: '# 1. flash a $3 USB into a cold wallet' },
  { kind: 'p', text: '$ coldstar init --device /dev/disk2' },
  { kind: 'ok', text: "generating ed25519 keypair in mlock'd RAM" },
  { kind: 'ok', text: 'AES-256-GCM encryption (argon2id, 256MB)' },
  { kind: 'ok', text: 'wallet 7gKx...4nQp initialized' },
  { kind: 'blank', text: '' },
  { kind: 'c', text: '# 2. sign offline, key plaintext for ~100µs' },
  { kind: 'p', text: '$ coldstar sign --tx ./tx.json' },
  { kind: 'ok', text: 'signature 64 bytes, 0.094 ms' },
  { kind: 'ok', text: 'key zeroized · stack cleared' },
  { kind: 'blank', text: '' },
  { kind: 'c', text: '# 3. broadcast, only the signature touches the wire' },
  { kind: 'p', text: '$ coldstar broadcast --network mainnet' },
  { kind: 'ok', text: 'confirmed in slot 312_447_891' },
];

function AnimatedTerminal() {
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (line >= TERM_SCRIPT.length) return;
    const current = TERM_SCRIPT[line];

    if (current.kind === 'p' && char < current.text.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 32);
      return () => clearTimeout(t);
    }

    let delay = 90;
    if (current.kind === 'p') delay = 480;
    else if (current.kind === 'c') delay = 220;
    else if (current.kind === 'blank') delay = 140;

    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, delay);
    return () => clearTimeout(t);
  }, [line, char]);

  const done = line >= TERM_SCRIPT.length;
  const visibleLines = TERM_SCRIPT.slice(0, Math.min(line + 1, TERM_SCRIPT.length));

  return (
    <div className="csd-terminal csd-terminal-dark">
      <div className="csd-terminal-bar">
        <span className="csd-terminal-dot csd-dot-r" />
        <span className="csd-terminal-dot csd-dot-y" />
        <span className="csd-terminal-dot csd-dot-g" />
        <span className="csd-terminal-title">~/coldstar, air-gapped signer</span>
      </div>
      <div className="csd-terminal-body">
        {visibleLines.map((l, i) => {
          const isCurrent = i === line && !done;
          const isTyping = isCurrent && l.kind === 'p' && char < l.text.length;
          const text = isTyping ? l.text.slice(0, char) : l.text;
          if (l.kind === 'blank') {
            return <div key={i} className="csd-term-blank">&nbsp;</div>;
          }
          return (
            <div key={i} className={`csd-term-line csd-term-${l.kind}`}>
              <span>{text}</span>
              {isTyping && <span className="csd-cursor" aria-hidden="true" />}
            </div>
          );
        })}
        {done && (
          <div className="csd-term-line csd-term-prompt-end">
            <span>$ </span>
            <span className="csd-cursor" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}

function Product() {
  return (
    <>
      <div className="csd-slide-label">// 03, What we built</div>
      <h2 className="csd-headline">
        A CLI. A USB stick. <em>100µs of signing.</em>
      </h2>

      <div className="csd-product">
        <AnimatedTerminal />

        <div className="csd-product-side">
          <div className="csd-block">
            <div className="csd-block-tag">Threat Model</div>
            <p className="csd-block-body">
              Private key never touches a networked device. Compromised laptop? You only lose what&apos;s hot. The cold key has a 100µs lifetime, nothing for malware to read.
            </p>
          </div>
          <div className="csd-block">
            <div className="csd-block-tag">Hardware</div>
            <p className="csd-block-body">
              Any USB drive, SanDisk, Kingston, the one in your drawer. No proprietary chip. No firmware to backdoor. Wallets are <strong>disposable and rotatable</strong>.
            </p>
          </div>
          <div className="csd-block">
            <div className="csd-block-tag">Surface</div>
            <p className="csd-block-body">
              Open-source Rust + Python CLI. Solana Seeker companion via Seed Vault. Auditable in an afternoon. Programmable from any shell or CI.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Slide 05, How it works ──────────────────────────────────── */

function How() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeWord, setActiveWord] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setActiveWord(activeStep), 1000);
    return () => clearTimeout(t);
  }, [activeStep]);

  const stepClass = (i: number) =>
    `csd-block csd-step-block${activeStep === i ? ' csd-step-lit' : ''}`;
  const wordClass = (i: number) =>
    `csd-step-word${activeWord === i ? ' csd-word-lit' : ''}`;

  return (
    <>
      <div className="csd-slide-label">// 02, Three steps. No proprietary hardware.</div>
      <h2 className="csd-headline">
        <span className={wordClass(0)}>Flash.</span>{' '}
        <span className={wordClass(1)}>Sign.</span>{' '}
        <span className={wordClass(2)}>Ship.</span>
      </h2>

      <div className="csd-three-col">
        <div className={stepClass(0)}>
          <div className="csd-step-num">01</div>
          <h3 className="csd-block-head">Flash a USB</h3>
          <p className="csd-block-body">
            Coldstar generates a Solana keypair and applies industry-standard encryption (<strong>AES-256-GCM</strong>), then writes it to any USB. Flash via the Dapp on any USB.
          </p>
        </div>
        <div className={stepClass(1)}>
          <div className="csd-step-num">02</div>
          <h3 className="csd-block-head">Sign with CLI or Dapp</h3>
          <p className="csd-block-body">
            Plug in your USB drive, build a transaction within the CLI or Dapp. Sign the transaction via the USB drive, then broadcast it to the Solana network.
          </p>
        </div>
        <div className={stepClass(2)}>
          <div className="csd-step-num">03</div>
          <h3 className="csd-block-head">Transport</h3>
          <p className="csd-block-body">
            Carry your wallet like a USB drive, securely and discreetly.
          </p>
        </div>
      </div>

      <div className="csd-pipeline" aria-label="Signing pipeline">
        <span className="csd-pipeline-node">[ online laptop ]</span>
        <span className="csd-pipeline-line">─────</span>
        <span className="csd-pipeline-tag">tx.json</span>
        <span className="csd-pipeline-line csd-pipe-arrow">─────▶</span>
        <span className="csd-pipeline-tag">QR</span>
        <span className="csd-pipeline-line csd-pipe-arrow">─────▶</span>
        <span className="csd-pipeline-node csd-pipe-air">[ AIR-GAP ]</span>
        <span className="csd-pipeline-line csd-pipe-arrow">─────▶</span>
        <span className="csd-pipeline-tag">USB sign 100µs</span>
        <span className="csd-pipeline-line csd-pipe-arrow">─────▶</span>
        <span className="csd-pipeline-tag">QR</span>
        <span className="csd-pipeline-line">─────</span>
        <span className="csd-pipeline-node">[ broadcaster ]</span>
        <span className="csd-pipeline-final">→ mainnet ✓</span>
      </div>
    </>
  );
}

/* ── Slide 05, Recycling old tech ────────────────────────────── */

function Recycling() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="csd-slide-label">// 05, Recycling old tech</div>
      <h2 className="csd-headline">
        Use what&apos;s <em className="csd-flash-em">already in your drawer.</em>
      </h2>

      <div className="csd-recycle">
        <div className="csd-recycle-chart">
          <div className="csd-co2-chart">
            <div className="csd-co2-title">RECYCLING OLD TECH</div>
            <div className="csd-co2-sub">Total lifetime CO<sub>2</sub> footprint</div>
            <div className="csd-co2-plot">
              <div className="csd-co2-yaxis">
                <span>90,000 T</span>
                <span>0</span>
              </div>
              <div className="csd-co2-bars">
                <div className="csd-co2-col">
                  <div className={`csd-co2-bar csd-co2-bar-hw${grown ? ' csd-co2-bar-grown' : ''}`} />
                  <div className="csd-co2-label">Hardware<br/>Companies</div>
                </div>
                <div className="csd-co2-col">
                  <div className="csd-co2-bar csd-co2-bar-cs" />
                  <div className="csd-co2-label">Coldstar</div>
                </div>
              </div>
              <ul className="csd-co2-legend">
                <li><strong>Hardware Companies</strong></li>
                <li>· Manufacturing Plants</li>
                <li>· Shipping Fuels</li>
                <li>· Packaging</li>
                <li className="csd-co2-legend-cs"><strong>Coldstar</strong></li>
                <li>· Any old USB Drive</li>
              </ul>
            </div>
            <div className="csd-co2-foot">
              <span>FIG. 6</span>
              <span>TOTAL LIFETIME CO<sub>2</sub> FOOTPRINT</span>
            </div>
          </div>
        </div>
        <div className="csd-recycle-side">
          <div className="csd-block">
            <div className="csd-block-tag">Hardware companies</div>
            <h3 className="csd-block-head">90,000 T CO₂</h3>
            <p className="csd-block-body">
              Manufacturing plants. Shipping fuels. Packaging. Every Ledger, every Trezor, every Coldcard ships from a factory and ends as e-waste in 3-5 years.
            </p>
          </div>
          <div className="csd-block">
            <div className="csd-block-tag">Coldstar</div>
            <h3 className="csd-block-head">0, Any old USB drive</h3>
            <p className="csd-block-body">
              The SanDisk in your drawer. The freebie from a conference. The drive your laptop came with. Already manufactured. Already shipped. <strong>The hardware is the recycle.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="csd-shift">
        <div className="csd-shift-label">The math</div>
        <div className="csd-shift-body">
          Ledger has shipped 7M+ units since 2014. Each is single-purpose, sealed, eventually obsolete. Coldstar runs on disposable USBs already in circulation, and treats them as rotatable, replaceable, upgradeable. Security as a software pattern, not a hardware factory.
        </div>
      </div>
    </>
  );
}

/* ── Slide 09, Traction ──────────────────────────────────────── */

function Traction() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= 4) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 500);
    return () => clearTimeout(t);
  }, [revealed]);

  const statClass = (i: number) =>
    `csd-stat csd-stat-pop${revealed > i ? ' csd-stat-shown' : ''}`;

  return (
    <>
      <div className="csd-slide-label">// 06, Receipts, not promises</div>
      <h2 className="csd-headline">
        Shipped. Signing. <em>Scaling.</em>
      </h2>

      <div className="csd-stats csd-stats-4">
        <div className={statClass(0)}>
          <div className="csd-stat-num">550<small>+</small></div>
          <div className="csd-stat-label">Mainnet txs signed</div>
        </div>
        <div className={statClass(1)}>
          <div className="csd-stat-num">100<small>+</small></div>
          <div className="csd-stat-label">Whitelisted users</div>
        </div>
        <div className={statClass(2)}>
          <div className="csd-stat-num">4</div>
          <div className="csd-stat-label">Superteam workshops</div>
        </div>
        <div className={statClass(3)}>
          <div className="csd-stat-num" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}>RT · toly</div>
          <div className="csd-stat-label">Reposted by the man</div>
        </div>
      </div>

      <div className="csd-traction-grid">
        <div className="csd-traction-tags">
          <div className="csd-tag-group">
            <div className="csd-tag-group-label">Live partners</div>
            <div className="csd-partner-logos">
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/superteam-ie.png" alt="Superteam Ireland" width={200} height={120} />
              </div>
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/superteam-uk.jpg" alt="Superteam UK" width={200} height={120} />
              </div>
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/seeker.png" alt="Seeker" width={200} height={120} />
              </div>
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/jito.png" alt="Jito" width={200} height={120} />
              </div>
              <div className="csd-partner-logo csd-partner-logo-text">FluxRPC</div>
            </div>
          </div>

          <div className="csd-tag-group csd-tag-group-talks">
            <div className="csd-tag-group-label">In talks</div>
            <div className="csd-partner-logos">
              <div className="csd-partner-logo csd-partner-logo-naked">
                <Image src="/coldstar/partners/jupiter.png" alt="Jupiter" width={200} height={120} />
              </div>
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/pudgy.jpg" alt="Pudgy Penguins" width={200} height={120} />
              </div>
              <div className="csd-partner-logo">
                <Image src="/coldstar/partners/network-school.jpg" alt="Network School" width={200} height={120} />
              </div>
              <div className="csd-partner-logo csd-partner-logo-bordered">UAE Enterprise Client</div>
            </div>
          </div>
        </div>

        <div className="csd-traction-img">
          <PhotoFrame
            src="/coldstar/deck/toly-tweet.jpg"
            alt="Anatoly Yakovenko reposted Coldstar tweet about Solana Mobile and Miami Accelerate"
            caption={['Fig. 4', 'RT · @toly']}
            fit="contain"
          />
        </div>
      </div>
    </>
  );
}

/* ── Slide 08, Compete ───────────────────────────────────────── */

function Compete() {
  return (
    <>
      <div className="csd-slide-label">// 07, How we compare</div>
      <h2 className="csd-headline">
        Coldstar <em>vs. the rest.</em>
      </h2>

      <table className="csd-table">
        <thead>
          <tr>
            <th />
            <th className="csd-th-cs">
              <span className="csd-th-cs-row">
                <Image
                  src="/coldstar/deck/coldstar-icon.png"
                  alt=""
                  width={512}
                  height={512}
                  className="csd-th-cs-icon"
                />
                Coldstar
              </span>
            </th>
            <th>
              <Image
                src="/coldstar/deck/ledger.png"
                alt="Ledger"
                width={240}
                height={80}
                className="csd-cmp-logo csd-cmp-logo-ledger"
              />
            </th>
            <th>
              <Image
                src="/coldstar/deck/phantom.png"
                alt="Phantom"
                width={240}
                height={120}
                className="csd-cmp-logo csd-cmp-logo-phantom"
              />
            </th>
            <th>
              <Image
                src="/coldstar/deck/squads.png"
                alt="Squads"
                width={320}
                height={120}
                className="csd-cmp-logo csd-cmp-logo-squads"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Key lifetime</td>
            <td className="csd-td-cs">~100µs</td>
            <td>Years</td>
            <td>Always online</td>
            <td>Multi-sig (still hot)</td>
          </tr>
          <tr>
            <td>Hardware cost</td>
            <td className="csd-td-cs">$3 USB</td>
            <td>$79–$149</td>
            <td>$0</td>
            <td>$0 + signers</td>
          </tr>
          <tr>
            <td>Open-source signer</td>
            <td className="csd-td-cs">Full</td>
            <td>Partial / closed firmware</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>CLI / programmable</td>
            <td className="csd-td-cs">First-class</td>
            <td>Limited</td>
            <td>No</td>
            <td>SDK</td>
          </tr>
          <tr>
            <td>Disposable / rotatable</td>
            <td className="csd-td-cs">Yes</td>
            <td>No</td>
            <td>-</td>
            <td>Partial</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ── Slide 09, Business ──────────────────────────────────────── */

function Business() {
  return (
    <>
      <div className="csd-slide-label">// 08, How we make money</div>
      <h2 className="csd-headline">
        Open core. <em>Enterprise above.</em>
      </h2>

      <div className="csd-tiers">
        <div className="csd-tier">
          <div className="csd-tier-tag">Layer 01 · Free</div>
          <h3 className="csd-tier-name">Open-source CLI</h3>
          <p className="csd-tier-body">
            Apache 2.0. The full signer, broadcaster, and key management. Free forever. This is the trust layer, the auditable thing.
          </p>
          <div className="csd-tier-foot">Growth engine · not revenue</div>
        </div>

        <div className="csd-tier csd-tier-mid">
          <div className="csd-tier-tag">Layer 02 · Coldstar Cloud</div>
          <h3 className="csd-tier-name">$49–$499/mo</h3>
          <p className="csd-tier-body">
            Hosted broadcaster, watcher, monitoring, multi-sig orchestration. SSO, SOC2, audit logs. The thing custody desks need but won&apos;t build.
          </p>
          <div className="csd-tier-foot">Primary ARR</div>
        </div>

        <div className="csd-tier">
          <div className="csd-tier-tag">Layer 03 · Enterprise</div>
          <h3 className="csd-tier-name">$50K+ Annual Contract Value</h3>
          <p className="csd-tier-body">
            On-prem deploys for funds, exchanges, validators. Custom HSM bridges. Compliance + dedicated support. White-glove, low volume, high margin.
          </p>
          <div className="csd-tier-foot">Margin engine</div>
        </div>
      </div>

      <div className="csd-target">
        <div>
          <div className="csd-target-meta">Y2 Plan</div>
          <div className="csd-target-headline">$1.2M ARR · 320 Cloud · 6 Enterprise</div>
        </div>
        <div className="csd-progress">
          <div className="csd-progress-bar" />
          <span>Tracking 38% · Q1</span>
        </div>
      </div>
    </>
  );
}

/* ── Slide 10, Roadmap ───────────────────────────────────────── */

function Roadmap() {
  return (
    <>
      <div className="csd-slide-label">// 09, Where we&apos;re headed</div>
      <h2 className="csd-headline">
        Further <em>out.</em>
      </h2>

      <div className="csd-roadmap">
        <div className="csd-rm-item">
          <span className="csd-rm-tick" />
          <span className="csd-rm-pill csd-rm-now">Now · Live</span>
          <h3 className="csd-rm-name">Mainnet shipped</h3>
          <p className="csd-rm-body">
            550+ mainnet txs signed. Solana Seeker companion app via Seed Vault. Workshops with Superteam IE + UK live.
          </p>
        </div>
        <div className="csd-rm-item">
          <span className="csd-rm-tick" />
          <span className="csd-rm-pill">Q3 2026</span>
          <h3 className="csd-rm-name">Developer + DAO growth</h3>
          <p className="csd-rm-body">
            Expand Developer and DAO onboarding. Superteam-led workshop distribution. Grow Coldstar-signed transaction volume. Convert whitelist users into active signers.
          </p>
        </div>
        <div className="csd-rm-item">
          <span className="csd-rm-tick" />
          <span className="csd-rm-pill">Q3/Q4 2026</span>
          <h3 className="csd-rm-name">Monetization on</h3>
          <p className="csd-rm-body">
            Launch usage-based signing fees. Activate Treasury / Institutional pricing. Deploy marketing budget.
          </p>
        </div>
        <div className="csd-rm-item">
          <span className="csd-rm-tick" />
          <span className="csd-rm-pill">Q4 2026</span>
          <h3 className="csd-rm-name">Enterprise scale</h3>
          <p className="csd-rm-body">
            Expand Enterprise Custody integrations. Scale high-margin infrastructure revenue. Increase revenue per active signer. Reach a profitable software-defined custody model.
          </p>
        </div>
      </div>

      <div className="csd-targets-grid">
        <div className="csd-targets-cell">
          <div className="csd-targets-tag">Targets</div>
          <h3 className="csd-targets-head">Solana communities</h3>
          <ul className="csd-targets-list">
            <li>Mad Lads</li>
            <li>Monkey DAO</li>
            <li>DeGods</li>
            <li>Retardio Cousins</li>
            <li>Hermans</li>
            <li>Boogles</li>
            <li>Tensorians</li>
            <li>Federation Fox</li>
            <li>Bonk</li>
            <li>Superteams</li>
          </ul>
        </div>

        <div className="csd-targets-cell">
          <div className="csd-targets-tag">Institutional</div>
          <h3 className="csd-targets-head">RWA &amp; tradfi</h3>
          <div className="csd-targets-logos">
            <div className="csd-targets-logo">
              <Image src="/coldstar/deck/wisdomtree.png" alt="WisdomTree" width={400} height={130} />
            </div>
            <div className="csd-targets-logo">
              <Image src="/coldstar/deck/21shares.jpg" alt="21Shares" width={400} height={130} />
            </div>
            <div className="csd-targets-logo csd-targets-logo-square">
              <Image src="/coldstar/deck/r3.jpg" alt="R3" width={130} height={130} />
            </div>
          </div>
        </div>

        <div className="csd-targets-cell">
          <div className="csd-targets-tag">Validator partnerships</div>
          <h3 className="csd-targets-head">Yield + infra</h3>
          <div className="csd-targets-logos">
            <div className="csd-targets-logo">
              <Image src="/coldstar/deck/galaxy.svg" alt="Galaxy" width={400} height={130} unoptimized />
            </div>
            <div className="csd-targets-logo csd-targets-logo-square">
              <Image src="/coldstar/deck/bonk.avif" alt="Bonk" width={130} height={130} />
            </div>
            <div className="csd-targets-logo csd-targets-logo-square">
              <Image src="/coldstar/deck/jito.png" alt="Jito" width={130} height={130} />
            </div>
          </div>
        </div>

        <div className="csd-targets-cell csd-targets-cell-fv">
          <div className="csd-targets-tag">Ultra high net worth &amp; family offices</div>
          <h3 className="csd-targets-head">Advised by Foundation Ventures</h3>
          <p className="csd-targets-body">
            Direct distribution into UHNW principals and multi-family offices already underwriting digital-asset custody.
          </p>
          <div className="csd-fv-stats">
            <div className="csd-fv-stat"><span className="csd-fv-num">31</span><span className="csd-fv-label">Hackathon winners</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">50+</span><span className="csd-fv-label">Investors intro&apos;d</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">50+</span><span className="csd-fv-label">Events</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">75+</span><span className="csd-fv-label">Workshops</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">9</span><span className="csd-fv-label">Demo days</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">11</span><span className="csd-fv-label">Games accelerated</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">10+</span><span className="csd-fv-label">Universities</span></div>
            <div className="csd-fv-stat"><span className="csd-fv-num">100+</span><span className="csd-fv-label">Graphics</span></div>
          </div>
          <div className="csd-fv-superteams">
            <span className="csd-fv-st-label">6 Superteams engaged</span>
            <span className="csd-fv-st-flags">UK · PL · VN · ID · NG · MY</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Slide 11, Team ──────────────────────────────────────────── */

function Team() {
  return (
    <>
      <div className="csd-slide-label">// 10, Who&apos;s building this</div>
      <h2 className="csd-headline">
        Built by people who <em>break things first.</em>
      </h2>

      <div className="csd-team">
        <div className="csd-team-card csd-team-card-dark">
          <div className="csd-team-mono csd-team-mono-img">
            <Image src="/coldstar/deck/syrem.png" alt="Syrem" width={100} height={100} />
          </div>
          <div>
            <h3 className="csd-team-name">Syrem</h3>
            <div className="csd-team-role">Founding Engineer</div>
            <p className="csd-team-bio">
              4× Solana hackathon winner. Exit founder of ChainTickets.io. Aerospace engineering and space-technology background, builds systems where failure isn&apos;t recoverable.
            </p>
          </div>
        </div>
        <div className="csd-team-card">
          <div className="csd-team-mono csd-team-mono-img">
            <Image src="/coldstar/deck/matthew.png" alt="Matthew" width={100} height={100} />
          </div>
          <div>
            <h3 className="csd-team-name">Matthew</h3>
            <div className="csd-team-role">Co-founder · Business &amp; Ops</div>
            <p className="csd-team-bio">
              Former DevRel @ ZetaChain, direct lines into builder communities. CS degree. Distribution-led operator running Superteam workshops, partnerships, and GTM.
            </p>
          </div>
        </div>
      </div>

      <div className="csd-tags" style={{ marginTop: '1rem' }}>
        <span className="csd-tag">2 founders</span>
        <span className="csd-tag">Backed by Superteam + Jito</span>
        <span className="csd-tag">Reposted by Toly</span>
        <span className="csd-tag">100+ on whitelist</span>
      </div>

      <div className="csd-team-photo">
        <PhotoFrame
          src="/coldstar/deck/presenter.jpg"
          alt="Sy presenting Coldstar at Demo Day"
          caption={['Fig. 5', 'Demo Day · Live signing on mainnet']}
        />
      </div>
    </>
  );
}

/* ── Slide 12, Ask ───────────────────────────────────────────── */

function Ask() {
  return (
    <div className="csd-ask">
      <div className="csd-ask-tag">// 11, The Ask</div>
      <div className="csd-ask-num">$100K Pre-Seed.</div>
      <p className="csd-ask-strap">
        Runway to ship audit, Cloud beta, and onboarding. <em>Lean team, sharp focus.</em>
      </p>

      <div className="csd-alloc">
        <div className="csd-alloc-cell">
          <div className="csd-alloc-pct">40%</div>
          <div className="csd-alloc-name">Engineering</div>
          <div className="csd-alloc-body">Rust, cryptography, embedded.</div>
        </div>
        <div className="csd-alloc-cell">
          <div className="csd-alloc-pct">25%</div>
          <div className="csd-alloc-name">Audit + sec</div>
          <div className="csd-alloc-body">OtterSec, Neodyme, formal verification.</div>
        </div>
        <div className="csd-alloc-cell">
          <div className="csd-alloc-pct">20%</div>
          <div className="csd-alloc-name">Cloud infra</div>
          <div className="csd-alloc-body">SOC2, broadcaster fleet, ops.</div>
        </div>
        <div className="csd-alloc-cell">
          <div className="csd-alloc-pct">15%</div>
          <div className="csd-alloc-name">GTM</div>
          <div className="csd-alloc-body">Institutional and retail onboarding activations, digital marketing campaigns.</div>
        </div>
      </div>

      <p className="csd-ask-purpose">
        Providing the Coldstar cold-storage solution for enterprise institutions and, <em>most importantly</em>, retail.
      </p>

      <div className="csd-contact">
        <a href="https://coldstar.dev" target="_blank" rel="noreferrer">coldstar.dev</a>
      </div>
    </div>
  );
}

/* ── Photo helper ─────────────────────────────────────────────── */

function PhotoFrame({
  src,
  alt,
  caption,
  height,
  fit = 'cover',
}: {
  src: string;
  alt: string;
  caption?: [string, string];
  height?: number;
  fit?: 'cover' | 'contain';
}) {
  return (
    <div className={`csd-img${fit === 'contain' ? ' csd-img-contain' : ''}`} style={height ? { height } : undefined}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(max-width: 1100px) 100vw, 50vw"
        style={{ width: '100%', height: '100%', objectFit: fit }}
      />
      {caption && (
        <div className="csd-img-caption">
          <span>{caption[0]}</span>
          <span>{caption[1]}</span>
        </div>
      )}
    </div>
  );
}
