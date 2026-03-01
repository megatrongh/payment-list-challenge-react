import styled, { css } from 'styled-components'

const baseButtonStyles = css`
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--btn-focus-ring, var(--btn-bg));
    outline-offset: var(--space-1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const BaseButton = styled.button`
  ${baseButtonStyles}
  background-color: var(--btn-bg);

  &:hover:not(:disabled) {
    background-color: var(--btn-bg-hover);
  }
`

export const StyledPrimaryButton = styled(BaseButton)`
  --btn-bg: var(--color-primary);
  --btn-bg-hover: var(--color-primary-hover);
`

export const StyledSecondaryButton = styled(BaseButton)`
  --btn-bg: var(--color-secondary);
  --btn-bg-hover: var(--color-secondary-hover);
`

export const StyledTertiaryButton = styled(BaseButton)`
  --btn-bg: var(--color-tertiary);
  --btn-bg-hover: var(--color-tertiary-hover);
  --btn-focus-ring: var(--color-tertiary-focus-ring);
  color: var(--color-tertiary-text);
  border: 1px solid var(--color-tertiary-border);
`

export const StyledDangerButton = styled(BaseButton)`
  --btn-bg: var(--color-danger);
  --btn-bg-hover: var(--color-danger-hover);
`
