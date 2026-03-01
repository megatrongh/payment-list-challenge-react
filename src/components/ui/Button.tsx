import {
  StyledDangerButton,
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledTertiaryButton,
} from 'components/styled/Buttons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger'
}
export function Button(props: ButtonProps) {
  const { variant, ...rest } = props
  switch (variant) {
    case 'primary':
      return <StyledPrimaryButton {...rest} />
    case 'secondary':
      return <StyledSecondaryButton {...rest} />
    case 'tertiary':
      return <StyledTertiaryButton {...rest} />
    case 'danger':
      return <StyledDangerButton {...rest} />
    default:
      return <StyledPrimaryButton {...rest} />
  }
}
