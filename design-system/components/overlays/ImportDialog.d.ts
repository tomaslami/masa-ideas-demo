import * as React from 'react';
export interface ImportDialogProps {
  open: boolean;
  onClose?: () => void;
  /** What is being imported; drives copy and the column mapping preview. */
  entity?: 'carteles' | 'oportunidades' | 'clientes';
  /** Number of rows the mock file "contains". */
  rows?: number;
  /** Called with the row count when the user finishes the import. */
  onImported?: (rows: number) => void;
}
/**
 * Excel/CSV import flow (mock): dropzone → detected file + column map → progress → done.
 * @startingPoint section="Overlays" subtitle="Importar desde Excel" viewport="560x520"
 * @example
 * <ImportDialog open={open} onClose={close} entity="carteles" rows={16} onImported={fn} />
 */
export function ImportDialog(props: ImportDialogProps): JSX.Element | null;
