import { Spinner, StyledDivErrorBox } from 'components/styled/Containers'
import { Filters } from './Filters'
import { PaymentsTable } from './PaymentsTable'

import { I18N } from 'constants/i18n'
import { usePaymentParams } from 'hooks/usePaymentParams'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const PaymentsPage = () => {
  const [params] = usePaymentParams()
  return (
    <div className="w-full max-w-app mx-auto px-4 py-10">
      <h2 className="text-xl-semibold text-text-title mb-6">All payments</h2>
      <Filters />
      <ErrorBoundary
        resetKeys={[params.search, params.currency, params.page]}
        fallback={<StyledDivErrorBox>{I18N.INTERNAL_SERVER_ERROR}</StyledDivErrorBox>}
      >
        <Suspense fallback={<Spinner />}>
          <PaymentsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
