import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { PropsWithChildren } from 'react'
import { getQueryClient } from 'utils'

interface Options extends Omit<RenderOptions, 'queries'> {
  userEventOptions?: Parameters<typeof userEvent.setup>[0]
  queryClient?: QueryClient
}

type WrapperProps = PropsWithChildren<Options>

const testQueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
}

export function CustomWrapper(props: WrapperProps) {
  const { children, queryClient = getQueryClient(testQueryClientConfig) } = props
  const Wrapper = props.wrapper || (({ children }) => <>{children}</>)
  return (
    <Wrapper>
      <QueryClientProvider client={queryClient}>
        <NuqsTestingAdapter>{children}</NuqsTestingAdapter>
      </QueryClientProvider>
    </Wrapper>
  )
}
