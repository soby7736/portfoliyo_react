import { useEffect, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Experience.css";

/* ─── Data ─── */
const MILESTONES = [
  {
    id: 0,
    type: "education",
    icon: "bi-mortarboard-fill",
    label: "Class XII",
    title: "Class XII",
    org: "Kerala State Board",
    period: "06/2021 – 04/2022",
    location: "Thrissur, India",
    points: [
      "Completed higher secondary education under Kerala State Board.",
      "Focused on core science and mathematics subjects.",
      "Built a strong academic foundation for computer science.",
    ],
  },
  {
    id: 1,
    type: "education",
    icon: "bi-book-fill",
    label: "BSc CS",
    title: "BSc Computer Science",
    org: "University of Calicut",
    period: "09/2022 – 04/2025",
    location: "Thrissur, India",
    points: [
      "Graduated with a Bachelor of Science in Computer Science.",
      "Studied data structures, algorithms, databases & software engineering.",
      "Developed foundational programming skills in Python, C, and Java.",
    ],
  },
  {
    id: 2,
    type: "work",
    icon: "bi-code-slash",
    label: "Intern",
    title: "Python Full Stack Developer Intern",
    org: "Luminar Technolab",
    period: "2026 – Present",
    location: "Thrissur, India",
    points: [
      "Developing web applications using Python and Django.",
      "Building REST APIs for backend services.",
      "Creating responsive UIs with HTML, CSS, JavaScript & Bootstrap.",
      "Working with Git for version control and collaboration.",
    ],
  },
];

/* ─── SVG road constants ─── */
const VW = 1000;
const VH = 320;
const PATH_D =
  `M 60,${VH / 2} ` +
  `C 200,${VH * 0.08} 360,${VH * 0.92} 500,${VH / 2} ` +
  `S 800,${VH * 0.08} ${VW - 60},${VH / 2}`;
const MILESTONE_T = [0.13, 0.5, 0.87];
const CARD_ABOVE   = [true, false, true];

/* ─── Path helpers ─── */
function evalPath(t) {
  const el = document.getElementById("__exp-road__");
  if (!el) return { x: 0, y: 0 };
  const len = el.getTotalLength();
  const pt  = el.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
  return { x: pt.x, y: pt.y };
}
function closestT(mx, my, steps = 300) {
  const el = document.getElementById("__exp-road__");
  if (!el) return 0;
  const len = el.getTotalLength();
  let bestT = 0, bestDist = Infinity;
  for (let i = 0; i <= steps; i++) {
    const t  = i / steps;
    const pt = el.getPointAtLength(t * len);
    const d  = Math.hypot(pt.x - mx, pt.y - my);
    if (d < bestDist) { bestDist = d; bestT = t; }
  }
  return bestT;
}

/* ─── Shared card component ─── */
function MilestoneCard({ m, revealed, mode }) {
  const isEdu = m.type === "education";
  return (
    <div className={`exp-card ${isEdu ? "exp-card--edu" : "exp-card--work"} ${revealed ? "card-revealed" : ""} ${mode === "mobile" ? "card-mobile" : "card-desktop"}`}>
      <div className="exp-card-stripe" />
      <div className="exp-card-inner">
        <div className="exp-card-header-row">
          <div className={`exp-icon-wrap ${isEdu ? "icon-edu" : "icon-work"}`}>
            <i className={`bi ${m.icon}`} />
          </div>
          <span className={`exp-tag ${isEdu ? "tag-edu" : "tag-work"}`}>
            {isEdu ? "Education" : "Work"}
          </span>
        </div>
        <h5 className="exp-card-title">{m.title}</h5>
        <p className="exp-card-org"><i className="bi bi-building me-1" />{m.org}</p>
        <p className="exp-card-meta">
          <i className="bi bi-calendar3 me-1" />{m.period}
          <span className="meta-sep">·</span>
          <i className="bi bi-geo-alt me-1" />{m.location}
        </p>
        <ul className="exp-card-list">
          {m.points.map((pt, j) => <li key={j}>{pt}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DESKTOP  – road + floating cards
════════════════════════════════════════ */
function DesktopRoad() {
  const svgRef      = useRef(null);
  const sceneRef    = useRef(null);
  const carT        = useRef(0);
  const targetT     = useRef(0);
  const rafRef      = useRef(null);
  const revealedRef = useRef([false, false, false]);

  const [carPos,       setCarPos]       = useState({ x: 60, y: VH / 2, angle: 0 });
  const [milestonePos, setMilestonePos] = useState([]);
  const [revealed,     setRevealed]     = useState([false, false, false]);

  useEffect(() => {
    const id = setTimeout(() => setMilestonePos(MILESTONE_T.map(evalPath)), 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onMove = (e) => {
      const r  = svg.getBoundingClientRect();
      targetT.current = closestT(
        (e.clientX - r.left) * (VW / r.width),
        (e.clientY - r.top)  * (VH / r.height)
      );
    };
    svg.addEventListener("mousemove", onMove);

    const loop = () => {
      carT.current += (targetT.current - carT.current) * 0.07;
      const p  = evalPath(carT.current);
      const pA = evalPath(Math.max(0, carT.current - 0.004));
      const pB = evalPath(Math.min(1, carT.current + 0.004));
      setCarPos({ x: p.x, y: p.y, angle: Math.atan2(pB.y - pA.y, pB.x - pA.x) * (180 / Math.PI) });

      let changed = false;
      const next = [...revealedRef.current];
      MILESTONE_T.forEach((mt, i) => {
        if (!next[i] && Math.abs(carT.current - mt) < 0.065) { next[i] = true; changed = true; }
      });
      if (changed) { revealedRef.current = next; setRevealed([...next]); }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { svg.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  /* SVG viewBox height maps to scene height via CSS aspect ratio */
  // const sceneAspect = VH / VW; // ≈ 0.32

  return (
    <div className="exp-scene-desktop" ref={sceneRef}>

      {/* Floating cards — positioned over the SVG */}
      {milestonePos.map((pos, i) => {
        const above = CARD_ABOVE[i];
        const xPct  = (pos.x / VW) * 100;
        const yPct  = (pos.y / VH) * 100;

        return (
          <div
            key={i}
            className={`exp-float-wrap ${above ? "float-above" : "float-below"} ${revealed[i] ? "is-revealed" : ""}`}
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
          >
            {/* connector */}
            <div className={`exp-connector ${above ? "conn-above" : "conn-below"}`} />
            <MilestoneCard m={MILESTONES[i]} revealed={revealed[i]} mode="desktop" />
          </div>
        );
      })}

      {/* Road SVG */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="exp-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-car" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-dot" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Road */}
        <path d={PATH_D} fill="none" stroke="#9bbcd8" strokeWidth="48" strokeLinecap="round" opacity="0.3" />
        <path id="__exp-road__" d={PATH_D} fill="none" stroke="#c2d9ee" strokeWidth="40" strokeLinecap="round" />
        <path d={PATH_D} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="22 16" strokeOpacity="0.72" />

        {/* Milestone dots */}
        {milestonePos.map((pos, i) => (
          <g key={i}>
            {revealed[i] && (
              <circle cx={pos.x} cy={pos.y} r="18" fill="none"
                stroke="#1a7abf" strokeWidth="2" opacity="0.25" className="dot-pulse" />
            )}
            <circle cx={pos.x} cy={pos.y}
              r={revealed[i] ? 13 : 9}
              fill={revealed[i] ? "#1a7abf" : "#8fb8d4"}
              filter="url(#glow-dot)"
              style={{ transition: "r 0.4s ease, fill 0.5s ease" }}
            />
            <circle cx={pos.x} cy={pos.y} r={4.5} fill="#fff" />
            <text x={pos.x} y={revealed[i] ? -999 : (CARD_ABOVE[i] ? pos.y - 18 : pos.y + 26)}
              textAnchor="middle" fontSize="11" fontFamily="Montserrat,sans-serif"
              fontWeight="600" fill="#4a7fa0" style={{ transition: "y 0.3s" }}>
              {MILESTONES[i].label}
            </text>
          </g>
        ))}

        {/* Car */}
        <g transform={`translate(${carPos.x},${carPos.y}) rotate(${carPos.angle})`} filter="url(#glow-car)">
          <ellipse cx="0" cy="11" rx="16" ry="3.5" fill="rgba(0,0,0,0.12)" />
          <rect x="-19" y="-9" width="38" height="19" rx="6" fill="#1a7abf" />
          <rect x="-11" y="-18" width="22" height="12" rx="4" fill="#155e96" />
          <rect x="-8" y="-17" width="16" height="9" rx="2.5" fill="#c8eaf8" opacity="0.92" />
          <line x1="2" y1="-9" x2="2" y2="10" stroke="#155e96" strokeWidth="1" opacity="0.45" />
          {[[-12,-10],[12,-10],[-12,10],[12,10]].map(([wx,wy],wi) => (
            <g key={wi}>
              <circle cx={wx} cy={wy} r="5.5" fill="#0d2236" />
              <circle cx={wx} cy={wy} r="2.5" fill="#4a90c8" />
            </g>
          ))}
          <circle cx="20" cy="-4" r="3.5" fill="#fff9c4" opacity="0.95" />
          <circle cx="20" cy="4"  r="3.5" fill="#fff9c4" opacity="0.95" />
          <ellipse cx="27" cy="0" rx="7" ry="4" fill="#fffde0" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   MOBILE / TABLET  – vertical timeline
════════════════════════════════════════ */
function MobileTimeline() {
  const itemRefs = useRef([]);
  const [revealed, setRevealed] = useState([false, false, false]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setRevealed((prev) => {
              if (prev[idx]) return prev;
              const n = [...prev]; n[idx] = true; return n;
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="exp-timeline">
      {/* vertical line */}
      <div className="timeline-line" />

      {MILESTONES.map((m, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          data-idx={i}
          className={`timeline-item ${i % 2 === 0 ? "item-left" : "item-right"} ${revealed[i] ? "item-revealed" : ""}`}
        >
          {/* dot on the line */}
          <div className={`timeline-dot ${m.type === "work" ? "dot-work" : "dot-edu"}`}>
            <i className={`bi ${m.icon}`} />
          </div>

          {/* card */}
          <MilestoneCard m={m} revealed={revealed[i]} mode="mobile" />
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════ */
export default function Experience() {
  const [isMobile, setIsMobile] = useState(() =>
  window.matchMedia("(max-width: 860px)").matches
);

useEffect(() => {
  const mq = window.matchMedia("(max-width: 860px)");

  const handler = (e) => setIsMobile(e.matches);
  mq.addEventListener("change", handler);

  return () => mq.removeEventListener("change", handler);
}, []);

  return (
    <section id="experience" className="exp-section">

      {/* Header */}
      <div className="exp-header text-center">
        <p className="exp-subtitle">My Professional</p>
        <h2 className="exp-title">Journey</h2>
        <div className="exp-divider" />
        <p className="exp-hint">
          {isMobile
            ? <><i className="bi bi-arrow-down me-2" />Scroll down to reveal my story</>
            : <><i className="bi bi-mouse2 me-2" />Hover over the road — drive through my story</>
          }
        </p>
      </div>

      {/* Responsive layout switch */}
      {isMobile ? <MobileTimeline /> : <DesktopRoad />}

    </section>
  );
}
