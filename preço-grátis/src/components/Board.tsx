import React from 'react';
import { Player, BoardSpace } from '../types';
import { PLAYER_COLOR_CONFIGS } from '../data/spaces';
import {
  UserPlus,
  Camera,
  Sparkles,
  FileText,
  Wifi,
  HelpCircle,
  MapPin,
  Tag,
  Lock,
  Image as ImageIcon,
  Gift,
  LogIn,
  Mic,
  KeyRound,
  MessageSquare,
  DollarSign,
  ShieldAlert,
  Flame,
  IdCard,
  AlertTriangle,
  Eye,
  FileWarning,
  Cookie,
  HeartPulse,
  Video,
  Cake,
  Share2,
  Brush,
  Scale,
  Flag,
} from 'lucide-react';

interface BoardProps {
  spaces: BoardSpace[];
  players: Player[];
  activeSpaceId?: number;
}

// Icon mapper helper
const renderSpaceIcon = (iconName: string, className: string = 'w-3.5 h-3.5') => {
  switch (iconName) {
    case 'UserPlus': return <UserPlus className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Tag': return <Tag className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Image': return <ImageIcon className={className} />;
    case 'Gift': return <Gift className={className} />;
    case 'LogIn': return <LogIn className={className} />;
    case 'Mic': return <Mic className={className} />;
    case 'KeyRound': return <KeyRound className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'IdCard': return <IdCard className={className} />;
    case 'AlertTriangle': return <AlertTriangle className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'FileWarning': return <FileWarning className={className} />;
    case 'Cookie': return <Cookie className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Video': return <Video className={className} />;
    case 'Cake': return <Cake className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Broom': return <Brush className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Flag': return <Flag className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Vibrant Category Color Styles with explicit fills and border colors
const getCategoryStyles = (category: BoardSpace['category']) => {
  switch (category) {
    case 'perfil':
      return {
        fill: '#e0e7ff', // Indigo 100
        stroke: '#6366f1', // Indigo 500
        text: 'text-indigo-950',
        badgeBg: 'bg-indigo-600',
        badgeText: 'text-white',
        borderClass: 'border-indigo-500',
        bgClass: 'bg-indigo-100',
        label: 'Perfil',
      };
    case 'mídia':
      return {
        fill: '#fce7f3', // Pink 100
        stroke: '#ec4899', // Pink 500
        text: 'text-pink-950',
        badgeBg: 'bg-pink-600',
        badgeText: 'text-white',
        borderClass: 'border-pink-500',
        bgClass: 'bg-pink-100',
        label: 'Mídia',
      };
    case 'privacidade':
      return {
        fill: '#f3e8ff', // Purple 100
        stroke: '#a855f7', // Purple 500
        text: 'text-purple-950',
        badgeBg: 'bg-purple-600',
        badgeText: 'text-white',
        borderClass: 'border-purple-500',
        bgClass: 'bg-purple-100',
        label: 'Privacidade',
      };
    case 'alerta':
      return {
        fill: '#fef3c7', // Amber 100
        stroke: '#f59e0b', // Amber 500
        text: 'text-amber-950',
        badgeBg: 'bg-amber-600',
        badgeText: 'text-white',
        borderClass: 'border-amber-500',
        bgClass: 'bg-amber-100',
        label: 'Alerta',
      };
    case 'lgpd':
      return {
        fill: '#d1fae5', // Emerald 100
        stroke: '#10b981', // Emerald 500
        text: 'text-emerald-950',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-white',
        borderClass: 'border-emerald-500',
        bgClass: 'bg-emerald-100',
        label: 'LGPD',
      };
    case 'especial':
      return {
        fill: '#fef08a', // Yellow 200
        stroke: '#d97706', // Amber 600
        text: 'text-amber-950',
        badgeBg: 'bg-amber-700',
        badgeText: 'text-white',
        borderClass: 'border-amber-600',
        bgClass: 'bg-amber-200',
        label: 'Especial',
      };
    default:
      return {
        fill: '#f1f5f9',
        stroke: '#64748b',
        text: 'text-slate-900',
        badgeBg: 'bg-slate-600',
        badgeText: 'text-white',
        borderClass: 'border-slate-400',
        bgClass: 'bg-slate-100',
        label: 'Outro',
      };
  }
};

// 30 organic path node coordinates in a 1000x640 viewBox canvas
const SPACE_COORDINATES: Record<number, { x: number; y: number }> = {
  // Row 1 (Top curve winding right: 1 to 8)
  1: { x: 110, y: 85 },
  2: { x: 220, y: 75 },
  3: { x: 330, y: 70 },
  4: { x: 440, y: 75 },
  5: { x: 550, y: 70 },
  6: { x: 660, y: 75 },
  7: { x: 770, y: 80 },
  8: { x: 880, y: 100 },

  // Turn 1 (Right curve down: 9)
  9: { x: 895, y: 185 },

  // Row 2 (Winding left across upper-middle: 10 to 16)
  10: { x: 790, y: 230 },
  11: { x: 680, y: 235 },
  12: { x: 570, y: 230 },
  13: { x: 460, y: 225 },
  14: { x: 350, y: 230 },
  15: { x: 240, y: 235 },
  16: { x: 130, y: 255 },

  // Turn 2 (Left curve down: 17)
  17: { x: 105, y: 340 },

  // Row 3 (Winding right across lower-middle: 18 to 24)
  18: { x: 210, y: 385 },
  19: { x: 320, y: 390 },
  20: { x: 430, y: 385 },
  21: { x: 540, y: 380 },
  22: { x: 650, y: 385 },
  23: { x: 760, y: 390 },
  24: { x: 870, y: 415 },

  // Turn 3 (Right curve down: 25)
  25: { x: 885, y: 495 },

  // Row 4 (Winding left across bottom to FIM: 26 to 30)
  26: { x: 770, y: 545 },
  27: { x: 640, y: 550 },
  28: { x: 510, y: 545 },
  29: { x: 380, y: 540 },
  30: { x: 250, y: 535 },
};

// Smooth Catmull-Rom / Bezier spline generator for continuous organic road
function getBezierPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export const Board: React.FC<BoardProps> = ({ spaces, players, activeSpaceId }) => {
  // Group players by position
  const playersByPosition: Record<number, Player[]> = {};
  players.forEach((p) => {
    if (!playersByPosition[p.position]) {
      playersByPosition[p.position] = [];
    }
    playersByPosition[p.position].push(p);
  });

  // Points 1 to 30 for drawing the continuous road path
  const points = Object.keys(SPACE_COORDINATES)
    .map((id) => Number(id))
    .sort((a, b) => a - b)
    .map((id) => SPACE_COORDINATES[id]);

  const pathD = getBezierPath(points);

  // Helper for pawn coordinates with offsets so multiple pawns don't overlap
  const getPawnPosition = (spaceId: number, index: number, total: number) => {
    let base = SPACE_COORDINATES[spaceId];
    if (spaceId === 0) {
      // Positioned to the left of Casa 1 (outside the card)
      base = { x: 35, y: 85 };
    }
    if (!base) base = { x: 35, y: 85 };

    if (total <= 1) {
      return { x: base.x, y: base.y - 4 };
    } else if (total === 2) {
      const offsets = [
        { x: -14, y: -10 },
        { x: 14, y: 6 },
      ];
      return { x: base.x + offsets[index].x, y: base.y + offsets[index].y };
    } else if (total === 3) {
      const offsets = [
        { x: -16, y: -10 },
        { x: 16, y: -10 },
        { x: 0, y: 12 },
      ];
      return { x: base.x + offsets[index].x, y: base.y + offsets[index].y };
    } else {
      const offsets = [
        { x: -16, y: -12 },
        { x: 16, y: -12 },
        { x: -16, y: 12 },
        { x: 16, y: 12 },
      ];
      return { x: base.x + offsets[index].x, y: base.y + offsets[index].y };
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f0fdf4] via-[#e6f7eb] to-[#dcf2e3] p-3 sm:p-5 rounded-3xl border-4 border-emerald-300 shadow-2xl relative overflow-hidden">
      
      {/* Board Header Bar & Category Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 pb-3 border-b border-emerald-200/80 text-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm sm:text-base font-black tracking-wide text-emerald-950 uppercase">
            Trilha Pegada Digital
          </h3>
        </div>

        {/* Categories Color Key */}
        <div className="flex items-center gap-2 text-[11px] font-bold flex-wrap justify-center">
          <span className="flex items-center gap-1 bg-indigo-100 text-indigo-900 border border-indigo-300 px-2 py-0.5 rounded-full shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Perfil
          </span>
          <span className="flex items-center gap-1 bg-pink-100 text-pink-900 border border-pink-300 px-2 py-0.5 rounded-full shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-600 inline-block" /> Mídia
          </span>
          <span className="flex items-center gap-1 bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded-full shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> Privacidade
          </span>
          <span className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Alerta
          </span>
        </div>
      </div>

      {/* Main Board Canvas */}
      <div className="relative w-full aspect-[1000/640] min-h-[480px] select-none">
        <svg viewBox="0 0 1000 640" className="w-full h-full overflow-visible">
          <defs>
            {/* Road Drop Shadow */}
            <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#15803d" floodOpacity="0.2" />
            </filter>
            {/* Space Card Drop Shadow */}
            <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Decorative Background Trees & Grass */}
          <g className="opacity-30">
            <circle cx="50" cy="210" r="26" fill="#86efac" />
            <circle cx="50" cy="210" r="18" fill="#4ade80" />
            
            <circle cx="950" cy="300" r="32" fill="#86efac" />
            <circle cx="950" cy="300" r="22" fill="#4ade80" />

            <circle cx="490" cy="300" r="34" fill="#bbf7d0" />
            <circle cx="490" cy="300" r="24" fill="#86efac" />

            <circle cx="170" cy="470" r="28" fill="#86efac" />
            <circle cx="170" cy="470" r="18" fill="#4ade80" />

            <circle cx="910" cy="70" r="22" fill="#bbf7d0" />
          </g>

          {/* 1. Outer Road Edge (Green Shadow Margin) */}
          <path
            d={pathD}
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="80"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#roadShadow)"
          />

          {/* 2. Main Road Asphalt (Crisp White/Cream) */}
          <path
            d={pathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Road Center Lane Line (Dashed Green) */}
          <path
            d={pathD}
            fill="none"
            stroke="#86efac"
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 30 SPACES NODES (COLORFUL CARDS WITH QUESTION PHRASES) */}
          {spaces.map((space) => {
            const coord = SPACE_COORDINATES[space.id];
            if (!coord) return null;

            const styles = getCategoryStyles(space.category);
            const isActive = activeSpaceId === space.id;
            const isStart = space.id === 1;
            const isFinish = space.id === 30;

            // Size of each card node
            const cardWidth = 98;
            const cardHeight = 62;

            return (
              <g
                key={space.id}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer group"
              >
                {/* Active Space Glow Halo */}
                {isActive && (
                  <rect
                    x={-cardWidth / 2 - 4}
                    y={-cardHeight / 2 - 4}
                    width={cardWidth + 8}
                    height={cardHeight + 8}
                    rx="20"
                    className="fill-indigo-400/40 animate-ping"
                  />
                )}

                {/* SVG Card Container via foreignObject */}
                <foreignObject
                  x={-cardWidth / 2}
                  y={-cardHeight / 2}
                  width={cardWidth}
                  height={cardHeight}
                  className="overflow-visible"
                >
                  <div
                    className={`w-full h-full rounded-2xl border-2 flex flex-col justify-between p-1.5 shadow-md transition-transform duration-200 group-hover:scale-110 ${
                      isFinish
                        ? 'bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 border-amber-600'
                        : `${styles.bgClass} ${styles.borderClass}`
                    } ${
                      isActive ? 'ring-4 ring-indigo-500 ring-offset-2 scale-105' : ''
                    }`}
                    style={{
                      backgroundColor: isFinish ? undefined : styles.fill,
                      borderColor: isFinish ? undefined : styles.stroke,
                    }}
                  >
                    {/* Top Row: Space Number Badge + Category Icon */}
                    <div className="flex items-center justify-between pointer-events-none">
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-2xs ${
                          isFinish
                            ? 'bg-amber-800 text-white'
                            : `${styles.badgeBg} ${styles.badgeText}`
                        }`}
                      >
                        #{space.id}
                      </span>
                      <div className="text-slate-800">
                        {renderSpaceIcon(space.iconName, 'w-3.5 h-3.5')}
                      </div>
                    </div>

                    {/* Question Title / Phrase */}
                    <p
                      className={`text-[9px] font-black leading-tight line-clamp-2 text-center ${
                        isFinish ? 'text-amber-950 font-extrabold' : styles.text
                      }`}
                    >
                      {space.title}
                    </p>
                  </div>
                </foreignObject>

                {/* INÍCIO Banner above Space 1 */}
                {isStart && (
                  <g transform="translate(0, -42)">
                    <rect
                      x="-30"
                      y="-12"
                      width="60"
                      height="22"
                      rx="11"
                      fill="#16a34a"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-md"
                    />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-white font-sans font-black text-[10px] uppercase tracking-widest"
                    >
                      INÍCIO
                    </text>
                  </g>
                )}

                {/* FIM Banner above Space 30 */}
                {isFinish && (
                  <g transform="translate(0, -42)">
                    <rect
                      x="-28"
                      y="-12"
                      width="56"
                      height="22"
                      rx="11"
                      fill="#d97706"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-md"
                    />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-white font-sans font-black text-[10px] uppercase tracking-widest"
                    >
                      FIM ★
                    </text>
                  </g>
                )}

                {/* Tooltip on Hover */}
                <title>{`Casa ${space.id}: ${space.title}`}</title>
              </g>
            );
          })}

          {/* PLAYER PAWNS WITH HOPPING ANIMATION */}
          {players.map((p) => {
            const occupants = playersByPosition[p.position] || [];
            const index = occupants.findIndex((item) => item.id === p.id);
            const pos = getPawnPosition(p.position, Math.max(0, index), occupants.length);
            const config = PLAYER_COLOR_CONFIGS[p.colorKey];

            return (
              <g
                key={p.id}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="pointer-events-none"
              >
                {/* Pawn Shadow */}
                <ellipse
                  cx="0"
                  cy="12"
                  rx="12"
                  ry="5"
                  fill="#000000"
                  opacity="0.3"
                />

                {/* Colorful Circular Pawn Token */}
                <circle
                  cx="0"
                  cy="0"
                  r="14"
                  fill={config.hex}
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="shadow-xl"
                />

                {/* Player Initial */}
                <text
                  x="0"
                  y="1"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white font-sans font-extrabold text-xs"
                >
                  {p.name.charAt(0).toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
