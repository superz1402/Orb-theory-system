import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * SmokeCard — a deliberately small but REAL motion-graphics scene, of the
 * kind Episode 001 long-form is built from (AGENTS.md rule 15): an animated
 * title (spring-in, letter-spaced serif), an SVG timeline that DRAWS itself
 * across the frame with year nodes popping in sequence, and a "filed" stamp
 * that slams on at the end. No stills, no Ken Burns, no CDN assets.
 *
 * Brand palette (docs/channel-bible.md): deep emerald ground, paper text,
 * gold accents.
 */

const PAPER = "#f2ead8";
const GOLD = "#c9a227";
const EMERALD = "#0d2b23";
const TIMELINE_Y = 700;

const YEARS: Array<{ year: string; label: string; x: number }> = [
  { year: "1775", label: "Scheele invents the green", x: 260 },
  { year: "1861", label: "Matilda", x: 760 },
  { year: "1874", label: "Kedzie's book of samples", x: 1260 },
  { year: "1890s", label: "Britain never banned it", x: 1660 },
];

const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The line draws itself from frame ~18 to ~62 (easeInOut cubic).
  const draw = interpolate(frame, [18, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const x2 = 180 + (1740 - 180) * draw;

  return (
    <svg
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0 }}
      viewBox="0 0 1920 1080"
    >
      <line
        x1={180}
        y1={TIMELINE_Y}
        x2={x2}
        y2={TIMELINE_Y}
        stroke={GOLD}
        strokeWidth={4}
        strokeLinecap="round"
      />
      {YEARS.map((n, i) => {
        const appearAt = 18 + ((n.x - 180) / (1740 - 180)) * 44;
        const pop = spring({
          frame: frame - appearAt,
          fps,
          config: { damping: 13, stiffness: 180, mass: 0.6 },
        });
        if (frame < appearAt) return null;
        return (
          <g key={n.year} opacity={pop}>
            <circle
              cx={n.x}
              cy={TIMELINE_Y}
              r={11 * pop}
              fill={EMERALD}
              stroke={GOLD}
              strokeWidth={4}
            />
            <text
              x={n.x}
              y={TIMELINE_Y - 44}
              textAnchor="middle"
              fill={GOLD}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={44}
              fontWeight={700}
            >
              {n.year}
            </text>
            <text
              x={n.x}
              y={TIMELINE_Y + 62}
              textAnchor="middle"
              fill={PAPER}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={27}
              opacity={0.85}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Stamp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slam = spring({
    frame: frame - 70,
    fps,
    config: { damping: 11, stiffness: 260, mass: 0.8 },
  });
  if (frame < 70) return null;
  const scale = interpolate(slam, [0, 1], [2.1, 1]);
  return (
    <div
      style={{
        position: "absolute",
        right: 150,
        top: 150,
        transform: `rotate(-8deg) scale(${scale})`,
        opacity: slam,
        border: `5px solid ${GOLD}`,
        color: GOLD,
        padding: "14px 30px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: "uppercase",
      }}
    >
      Smoke test · Passed
    </div>
  );
};

export const SmokeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.9 },
  });
  const titleY = interpolate(titleIn, [0, 1], [46, 0]);
  const ruleW = interpolate(frame, [10, 30], [0, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: EMERALD,
        backgroundImage:
          "radial-gradient(ellipse at 50% 38%, rgba(201,162,39,0.13), transparent 62%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 235,
          width: "100%",
          textAlign: "center",
          opacity: titleIn,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: PAPER,
            fontSize: 118,
            fontWeight: 700,
            letterSpacing: 10,
          }}
        >
          ORB THEORY
        </div>
        <div
          style={{
            margin: "26px auto 0",
            width: ruleW,
            height: 3,
            backgroundColor: GOLD,
          }}
        />
        <div
          style={{
            marginTop: 26,
            color: PAPER,
            opacity: 0.75,
            fontSize: 34,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          Motion-graphics render check · 1920 × 1080
        </div>
      </div>
      <Timeline />
      <Stamp />
    </AbsoluteFill>
  );
};
