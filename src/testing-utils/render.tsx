import { QueryClient } from '@tanstack/react-query'
import { RenderOptions, render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomWrapper } from './CustomWrapper'

interface Options extends Omit<RenderOptions, 'queries'> {
  userEventOptions?: Parameters<typeof userEvent.setup>[0]
  queryClient?: QueryClient
}

export function render(ui: React.ReactElement, options: Options = {}) {
  const { userEventOptions, wrapper, queryClient, ...renderOptions } = options
  const user = userEvent.setup(userEventOptions)
  const renderResult = rtlRender(ui, {
    wrapper: (props) => <CustomWrapper wrapper={wrapper} queryClient={queryClient} {...props} />,
    ...renderOptions,
  })
  return { ...renderResult, queryClient, user }
}
