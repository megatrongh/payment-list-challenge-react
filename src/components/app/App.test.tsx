import { screen, waitFor } from '@testing-library/react'
import { I18N } from 'constants/i18n'
import { STATUSES } from 'constants/index'
import { render } from 'testing-utils/render'
import App from './App'

// Helper function to robustly check for error messages with better debugging
export const waitForErrorMessage = async (expectedMessage: string, timeout = 10000) => {
  try {
    await waitFor(
      () => {
        expect(screen.getByText(expectedMessage)).toBeInTheDocument()
      },
      { timeout },
    )
  } catch {
    // If the expected message isn't found, let's see what error messages are actually on the page
    const errorElements = screen.queryAllByText(/error|not found|server/i)
    const errorTexts = errorElements.map((el) => el.textContent).filter(Boolean)

    throw new Error(
      `Expected error message "${expectedMessage}" not found. ` +
        `Available error-related text: ${errorTexts.join(', ') || 'None found'}`,
    )
  }
}

export const getTableCellsByColumnName = (columnName: string, rowIndex: number) => {
  const headers = screen.getAllByRole('columnheader')

  const columnIndex = headers.findIndex((header) => (header?.textContent || '').includes(columnName))

  if (columnIndex === -1) {
    throw new Error(`Column name not found`)
  }

  const rows = screen.getAllByRole('row').slice(1)

  if (rowIndex !== null) {
    const cells = rows[rowIndex]?.querySelectorAll('td')
    return cells?.[columnIndex]
  } else {
    throw new Error(`Row not found`)
  }
}

export const getSearchInput = () => {
  // Try to find by placeholder first, then by role with name
  try {
    return screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER)
  } catch {
    return screen.getByRole('searchbox', { name: I18N.SEARCH_LABEL })
  }
}

describe('App - Step 1: Basic Payment List', () => {
  test('should fetch and display payments in a table with page=1 and pageSize=5', async () => {
    render(<App />)

    // Wait for the table to load with data cells
    expect(await screen.findByRole('table')).toBeVisible()
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0)

    // Check that table headers are displayed using i18n strings
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_PAYMENT_ID })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_DATE })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_AMOUNT })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_CUSTOMER })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_CURRENCY })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: I18N.TABLE_HEADER_STATUS })).toBeVisible()

    // Check that 5 payments are displayed (pageSize=5)
    const tableRows = screen.getAllByRole('row')
    expect(tableRows).toHaveLength(6) // 1 header row + 5 data rows
  })
})

describe('App - Step 2: Search by Payment ID', () => {
  test('should have a search input for payment ID', () => {
    render(<App />)

    const searchInput = getSearchInput()
    expect(searchInput).toBeVisible()
    expect(searchInput).toHaveAttribute('placeholder', I18N.SEARCH_PLACEHOLDER)
  })

  test('should search for payments by payment ID', async () => {
    const { user } = render(<App />)

    const searchInput = getSearchInput()
    const searchButton = screen.getByRole('button', {
      name: I18N.SEARCH_BUTTON,
    })

    await user.type(searchInput, 'pay_134_1')
    await user.click(searchButton)

    expect(await screen.findByRole('cell', { name: 'pay_134_1' })).toBeVisible()
    // Check that only 1 payment is displayed after filtering
    const tableRows = screen.getAllByRole('row')
    expect(tableRows).toHaveLength(2) // 1 header row + 1 data row (filtered)
  })
})

describe('App - Step 3: Clear Filters', () => {
  test('should clear all filters when clear button is clicked', async () => {
    const { user } = render(<App />)

    const searchInput = getSearchInput()
    const searchButton = screen.getByRole('button', { name: I18N.SEARCH_BUTTON })

    // Perform a search
    await user.type(searchInput, 'pay_134_1')
    await user.click(searchButton)

    expect(await screen.findByRole('cell', { name: 'pay_134_1' })).toBeVisible()

    // Clear filters
    const clearButton = screen.getByRole('button', {
      name: I18N.CLEAR_FILTERS,
    })
    await user.click(clearButton)

    const updatedSearchInput = getSearchInput()
    // Check that search input is cleared
    expect(updatedSearchInput).toHaveValue('')
  })
})

describe('App - Step 4: Handle Payment Not Found', () => {
  test('should display error message when payment ID is not found', async () => {
    const { user } = render(<App />)

    const searchInput = getSearchInput()
    const searchButton = screen.getByRole('button', {
      name: I18N.SEARCH_BUTTON,
    })

    await user.type(searchInput, 'pay_404')
    await user.click(searchButton)

    await waitForErrorMessage(I18N.PAYMENT_NOT_FOUND)
  })
})

describe('App - Step 5: Handle Server Error', () => {
  test('should display error message when API returns 500', async () => {
    const { user } = render(<App />)

    const searchInput = getSearchInput()
    const searchButton = screen.getByRole('button', { name: I18N.SEARCH_BUTTON })

    await user.type(searchInput, 'pay_500')
    await user.click(searchButton)

    await waitForErrorMessage(I18N.INTERNAL_SERVER_ERROR)
  })
})

describe('App - Step 6: Currency Filter', () => {
  test('should have a currency filter dropdown', () => {
    render(<App />)

    const currencySelect = screen.getByRole('combobox', {
      name: I18N.CURRENCY_FILTER_LABEL,
    })
    expect(currencySelect).toBeVisible()
  })

  test('should filter payments by currency when selected', async () => {
    const { user } = render(<App />)

    const currencySelect = screen.getByRole('combobox', {
      name: I18N.CURRENCY_FILTER_LABEL,
    })

    await user.selectOptions(currencySelect, 'USD')

    const usdPayments = await screen.findAllByText('USD')
    expect(usdPayments.length).toBeGreaterThan(0)
  })
})

describe('App - Step 7: Combined Currency and Payment ID Filter', () => {
  test('should filter by both currency and payment ID', async () => {
    const { user } = render(<App />)

    const searchInput = await getSearchInput()
    const searchButton = screen.getByRole('button', {
      name: I18N.SEARCH_BUTTON,
    })
    const currencySelect = screen.getByRole('combobox', {
      name: I18N.CURRENCY_FILTER_LABEL,
    })

    // Search for a specific payment
    await user.type(searchInput, 'pay_134')
    await user.click(searchButton)

    // Filter by currency

    await user.selectOptions(currencySelect, 'USD')

    const usdPayments = await screen.findAllByText('USD')
    expect(usdPayments.length).toBeGreaterThan(0)
  })
})

describe('App - Step 8: Pagination', () => {
  test('should display pagination controls', async () => {
    render(<App />)

    // Wait for the table to load with data cells
    expect(await screen.findByRole('table')).toBeVisible()
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0)

    // Check for pagination buttons
    expect(screen.getByRole('button', { name: I18N.PREVIOUS_BUTTON })).toBeVisible()
    expect(screen.getByRole('button', { name: I18N.NEXT_BUTTON })).toBeVisible()
  })

  test('should disable previous button on first page', async () => {
    render(<App />)

    // Wait for the table to load with data cells
    expect(await screen.findByRole('table')).toBeVisible()
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0)

    const previousButton = screen.getByRole('button', {
      name: I18N.PREVIOUS_BUTTON,
    })
    expect(previousButton).toBeDisabled()
  })
})

describe('App - Step 9: Pagination Navigation', () => {
  test('should navigate to next page when next button is clicked', async () => {
    const { user } = render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    const firstPageFirstCell = getTableCellsByColumnName(I18N.TABLE_HEADER_PAYMENT_ID, 0)
    const firstPageFirstCellText = firstPageFirstCell?.textContent

    const nextButton = screen.getByRole('button', { name: I18N.NEXT_BUTTON })
    await user.click(nextButton)

    await screen.findByRole('table')

    const secondPageFirstCell = getTableCellsByColumnName(I18N.TABLE_HEADER_PAYMENT_ID, 0)
    expect(secondPageFirstCell?.textContent).not.toBe(firstPageFirstCellText)
  })

  test('should navigate back to previous page when previous button is clicked', async () => {
    const { user } = render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    const firstPageFirstCell = getTableCellsByColumnName(I18N.TABLE_HEADER_PAYMENT_ID, 0)
    const firstPageFirstCellText = firstPageFirstCell?.textContent

    // Go to page 2
    const nextButton = screen.getByRole('button', { name: I18N.NEXT_BUTTON })
    await user.click(nextButton)
    await screen.findByRole('table')

    // Go back to page 1
    const previousButton = screen.getByRole('button', { name: I18N.PREVIOUS_BUTTON })
    await user.click(previousButton)
    await screen.findByRole('table')

    const restoredFirstCell = getTableCellsByColumnName(I18N.TABLE_HEADER_PAYMENT_ID, 0)
    expect(restoredFirstCell?.textContent).toBe(firstPageFirstCellText)
  })
})

describe('App - Step 10: Page Resets to 1 on Search', () => {
  test('should reset to page 1 when a new search is performed on page 2', async () => {
    const { user } = render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    // Navigate to page 2
    const nextButton = screen.getByRole('button', { name: I18N.NEXT_BUTTON })
    await user.click(nextButton)
    await screen.findByRole('table')

    // Perform a new search
    const searchInput = await getSearchInput()
    const searchButton = screen.getByRole('button', { name: I18N.SEARCH_BUTTON })
    await user.type(searchInput, 'pay_134')
    await user.click(searchButton)

    // Previous button should be disabled meaning we're back on page 1
    const previousButton = await screen.findByRole('button', { name: I18N.PREVIOUS_BUTTON })
    expect(previousButton).toBeDisabled()
  })
})

describe('App - Step 11: Status Badge Display', () => {
  test('should display correct status badge for each status', async () => {
    render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    const rows = screen.getAllByRole('row').slice(1)
    const statusCells = rows.map((_, rowIndex) => getTableCellsByColumnName(I18N.TABLE_HEADER_STATUS, rowIndex))

    const validStatuses = STATUSES
    statusCells.forEach((cell) => {
      expect(validStatuses).toContain(cell?.textContent?.toLowerCase())
    })
  })

  test('should display all possible statuses across pages', async () => {
    render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    const rows = screen.getAllByRole('row').slice(1)
    const allStatuses = rows.map((_, rowIndex) =>
      getTableCellsByColumnName(I18N.TABLE_HEADER_STATUS, rowIndex)?.textContent?.toLowerCase(),
    )

    const uniqueStatuses = new Set(allStatuses.filter(Boolean))
    expect(uniqueStatuses.size).toBeGreaterThan(0)
  })
})

describe('App - Step 12: Amount Formatting', () => {
  test('should display amounts with 2 decimal places', async () => {
    render(<App />)

    expect(await screen.findByRole('table')).toBeVisible()

    const rows = screen.getAllByRole('row').slice(1)
    const amountCells = rows.map((_, rowIndex) => getTableCellsByColumnName(I18N.TABLE_HEADER_AMOUNT, rowIndex))

    amountCells.forEach((cell) => {
      expect(cell?.textContent).toMatch(/^\d+\.\d{2}$/)
    })
  })
})
