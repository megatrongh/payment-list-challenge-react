import styled from 'styled-components'
import { Status } from '../../types'

export const StyledStatusBadge = styled.span<{ $status: Status }>`
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);

  ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return `
          background-color: var(--color-status-success-bg);
          color: var(--color-status-success-text);
        `
      case 'pending':
        return `
          background-color: var(--color-status-warning-bg);
          color: var(--color-status-warning-text);
        `
      case 'failed':
        return `
          background-color: var(--color-status-error-bg);
          color: var(--color-status-error-text);
        `
      case 'refunded':
        return `
          background-color: var(--color-status-refunded-bg);
          color: var(--color-status-refunded-text);
        `
    }
  }}
`
