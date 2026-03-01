import { StyledStatusBadge } from 'components/styled/Badges'
import { StyledDivErrorBox } from 'components/styled/Containers'
import {
  StyledDivTableWrapper,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
} from 'components/styled/Tables'
import { I18N } from 'constants/i18n'
import { usePaymentParams } from 'hooks/usePaymentParams'
import { usePayments } from 'hooks/usePayments'
import { formattedDate } from 'utils'
import { Pagination } from './Pagination'

export function PaymentsTable() {
  const [params] = usePaymentParams()
  const { data } = usePayments(params)
  const { payments, total } = data

  if (!payments.length) {
    return <StyledDivErrorBox>{I18N.PAYMENT_NOT_FOUND}</StyledDivErrorBox>
  }

  return (
    <StyledDivTableWrapper>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</StyledTableHeader>
            <StyledTableHeader>{I18N.TABLE_HEADER_DATE}</StyledTableHeader>
            <StyledTableHeader>{I18N.TABLE_HEADER_AMOUNT}</StyledTableHeader>
            <StyledTableHeader>{I18N.TABLE_HEADER_CUSTOMER}</StyledTableHeader>
            <StyledTableHeader>{I18N.TABLE_HEADER_CURRENCY}</StyledTableHeader>
            <StyledTableHeader>{I18N.TABLE_HEADER_STATUS}</StyledTableHeader>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {payments.map((payment) => (
            <StyledTableRow key={payment.id}>
              <StyledTableCell>{payment.id}</StyledTableCell>
              <StyledTableCell>{formattedDate(payment.date)}</StyledTableCell>
              <StyledTableCell>{payment.amount.toFixed(2)}</StyledTableCell>
              <StyledTableCell>{payment.customerName ?? I18N.EMPTY_CUSTOMER}</StyledTableCell>
              <StyledTableCell>{payment.currency ?? I18N.EMPTY_CURRENCY}</StyledTableCell>
              <StyledTableCell>
                <StyledStatusBadge $status={payment.status}>{payment.status}</StyledStatusBadge>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
      <Pagination total={total} />
    </StyledDivTableWrapper>
  )
}
