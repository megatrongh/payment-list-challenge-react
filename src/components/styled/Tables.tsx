import styled from 'styled-components'

export const StyledDivTableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  margin-top: var(--space-6);
`

export const StyledTable = styled.table`
  min-width: 100%;
  font-size: var(--font-size-sm);
  text-align: left;
  border-collapse: collapse;
`

export const StyledTableHead = styled.thead`
  background-color: var(--color-surface);
  border-bottom: 2px solid var(--color-border);
`

export const StyledTableHeader = styled.th`
  padding: var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-base);
`

export const StyledTableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
`

export const StyledTableRow = styled.tr`
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-surface-hover);
  }
`

export const StyledTableCell = styled.td`
  padding: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
`
