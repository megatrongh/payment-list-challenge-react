import styled, { css } from 'styled-components'

const baseInputStyles = css`
  width: 100%;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  border: 1px solid var(--color-border-input);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-family: inherit;
  color: var(--color-text-base);
  background-color: var(--color-background);
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:focus {
    border-color: var(--color-border-input-focus);
    box-shadow: 0 0 0 3px var(--color-focus-ring);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-surface);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-border-input-error);
    box-shadow: 0 0 0 3px var(--color-focus-ring-error);
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`

export const StyledInput = styled.input`
  ${baseInputStyles}
`

export const StyledSelect = styled.select`
  ${baseInputStyles}
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-8);

  @media (min-width: 768px) {
    width: auto;
    min-width: 120px;
  }
`

export const StyledLabel = styled.label`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-base);
  margin-bottom: var(--space-1);
  display: block;
`

export const StyledErrorMessage = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-danger);
  margin-top: var(--space-1);
  display: block;
`
