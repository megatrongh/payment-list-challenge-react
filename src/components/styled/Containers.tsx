import styled from 'styled-components'

export const StyledDivErrorBox = styled.div`
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  color: var(--color-error-text);
  background-color: var(--color-error-bg);
  border-radius: var(--radius-md);
`

export const StyledDivPaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-base);
`

export const Spinner = styled.div`
  width: var(--space-6);
  height: var(--space-6);
  border: 4px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
