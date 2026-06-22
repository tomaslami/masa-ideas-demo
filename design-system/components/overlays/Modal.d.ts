import * as React from 'react';
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Lucide icon shown in a tinted chip beside the title. */
  icon?: string;
  iconTone?: 'accent' | 'neutral' | 'success';
  children?: React.ReactNode;
  /** Footer node, typically right-aligned action buttons. */
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}
/**
 * Centered dialog shell with scrim, Esc/scrim close, icon chip, header & footer.
 * @example
 * <Modal open={open} onClose={close} icon="trash-2" iconTone="neutral"
 *   title="¿Eliminar cartel?" footer={<><Button variant="secondary">Cancelar</Button><Button variant="danger">Eliminar</Button></>}>
 *   Esta acción no se puede deshacer.
 * </Modal>
 */
export function Modal(props: ModalProps): JSX.Element | null;
