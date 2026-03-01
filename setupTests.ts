import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './src/mocks/node'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
