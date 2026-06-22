import * as React from 'react';
export interface CardProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'flat' | 'sm' | 'md';
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}
/**
 * White surface container with optional header/footer.
 * @startingPoint section="Layout" subtitle="Cards, avatars, stats" viewport="700x260"
 * @example
 * <Card header={<strong>Cartel MI-0428</strong>}>…</Card>
 */
export function Card(props: CardProps): JSX.Element;
