export type PlayerColorKey = 'red' | 'blue' | 'green' | 'yellow';

export interface Player {
  id: number;
  name: string;
  colorKey: PlayerColorKey;
  hexColor: string;
  badgeBgClass: string;
  badgeTextClass: string;
  position: number; // 0 (Start) to 30
  vantagem: number;
  rastro: number;
  isFinished: boolean;
}

export interface Choice {
  id: string;
  text: string;
  vantagem: number;
  rastro: number;
}

export interface AutoResult {
  vantagem: number;
  rastro: number;
  message: string;
  triggered: boolean;
}

export interface BoardSpace {
  id: number;
  title: string;
  description: string;
  iconName: string;
  type: 'choice' | 'automatic';
  choices?: Choice[];
  getAutoResult?: (rastro: number) => AutoResult;
  category: 'perfil' | 'mídia' | 'privacidade' | 'alerta' | 'especial';
}

export type GamePhase = 'SETUP' | 'PLAYING' | 'END_SEQUENCE';

export interface FloatingPoint {
  id: string;
  text: string;
  type: 'vantagem' | 'rastro';
  isGain: boolean;
  x: number;
  y: number;
  targetPlayerId: number;
}

export type EndSequenceStep = 'DOSSIERS' | 'RANKING_VANTAGEM' | 'RANKING_RASTRO' | 'RANKING_WINNER';
