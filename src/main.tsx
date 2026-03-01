import { QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { getQueryClient } from 'utils'
import App from './components/app/App'
import './index.css'

const queryClient = getQueryClient()

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  try {
    const { worker } = await import('./mocks/browser')
    await worker.start()
    console.log('Mock Service Worker started')
  } catch (error) {
    console.error('Failed to start Mock Service Worker:', error)
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </QueryClientProvider>
    </React.StrictMode>,
  )
})
