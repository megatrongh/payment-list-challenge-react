import { StyledDivPaginationRow } from 'components/styled/Containers'
import { Button } from 'components/ui/Button'
import { I18N } from 'constants/i18n'
import { usePaymentParams } from 'hooks/usePaymentParams'

interface PaginationProps {
  total: number
}
export function Pagination(props: PaginationProps) {
  const [params, setParams] = usePaymentParams()

  const handlePrevious = () => {
    if (params.page > 1) {
      setParams({ ...params, page: params.page - 1 })
    }
  }

  const handleNext = () => {
    if (params.page < props.total) {
      setParams({ ...params, page: params.page + 1 })
    }
  }
  const lastPage = Math.ceil(props.total / params.pageSize)

  return (
    <StyledDivPaginationRow>
      <Button variant="tertiary" onClick={handlePrevious} disabled={params.page === 1}>
        {I18N.PREVIOUS_BUTTON}
      </Button>
      <span>Page {params.page}</span>
      <Button variant="tertiary" onClick={handleNext} disabled={params.page >= lastPage || !props.total}>
        {I18N.NEXT_BUTTON}
      </Button>
    </StyledDivPaginationRow>
  )
}
