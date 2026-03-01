import { StyledInput, StyledSelect } from 'components/styled/Forms'
import { Button } from 'components/ui/Button'
import { I18N } from 'constants/i18n'
import { CURRENCIES } from 'constants/index'
import { usePaymentParams } from 'hooks/usePaymentParams'
import { Currency } from 'types'
import { sanitizeCurrency, sanitizeString } from 'utils'

// interface FormValues {
//   search: string
//   currency: string
// }

export function Filters() {
  const [params, setParams] = usePaymentParams()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = sanitizeString(formData.get('search') as string)
    const currency = sanitizeCurrency(formData.get('currency') as string)
    await setParams({ search, currency, page: 1 })
  }

  // In jsdom environment, action from useActionState doesn't intercept form submissions as expected,
  // so we handle form submission manually with onSubmit handler.
  // https://github.com/vercel/next.js/discussions/56234
  // I tried workarounds but they were unreliable, so I opted for the onSubmit handler approach to ensure tests work correctly.
  // const [, action] = useActionState(
  //   async (_prev: FormValues, formData: FormData) => {
  //     const search = sanitizeString(formData.get('search') as string)
  //     const currency = sanitizeCurrency(formData.get('currency') as string)
  //     await setParams({ search, currency, page: 1 })
  //     return { search, currency }
  //   },
  //   { search: params.search, currency: params.currency },
  // )

  const handleClear = () => {
    setParams({ search: '', currency: '', page: 1 })
  }

  return (
    <form
      key={`${params.search}-${params.currency}`}
      // action={action}
      onSubmit={handleSubmit}
      onReset={handleClear}
      className="flex flex-col gap-4 mb-4 md:flex-row md:items-center"
    >
      <StyledInput
        type="search"
        name="search"
        defaultValue={params.search}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        aria-label={I18N.SEARCH_LABEL}
      />
      <StyledSelect name="currency" aria-label={I18N.CURRENCY_FILTER_LABEL} defaultValue={params.currency}>
        <option value="">{I18N.CURRENCIES_OPTION}</option>
        {CURRENCIES.map((currency: Currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </StyledSelect>
      <Button variant="primary" type="submit">
        {I18N.SEARCH_BUTTON}
      </Button>
      <Button variant="secondary" type="reset">
        {I18N.CLEAR_FILTERS}
      </Button>
    </form>
  )
}
