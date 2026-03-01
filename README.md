# Payment List Challenge

## Overview

This project is a take-home challenge that implements a payment list feature using React. It includes functionality for searching, filtering, pagination, and error handling.

---

## Design Decisions

### State Management

I used **server state management with React Query** and **URL state with nuqs**.

- **React Query** is responsible for fetching, caching, and synchronizing payment data from the API.

- This avoids manually managing loading, error, and caching logic.

- It also ensures previously fetched pages and searches are cached, improving performance and user experience.

### URL-Based Filters

Filtering and search parameters are stored in the URL using **nuqs**.

This provides several benefits:

- Filters are **shareable via URL**

- Page refreshes preserve the current state

- Navigation (back/forward) works correctly

- Clear separation between **UI state** and **server state**

### Why I chose this approach

For this type of problem:

- React Query handles **server state extremely well**

- URL state makes the app behave more like a real production dashboard

- It avoids introducing heavier global state solutions like Redux unnecessarily

### Component Structure

The UI is split into small reusable components:

- PaymentsPage
- Filters
- Pagination
- PaymentsTable

This keeps responsibilities clear and improves maintainability.

## Trade-offs Considered

- I prioritized clarity and simplicity over adding additional libraries.
- I avoided over-engineering the solution given the expected time investment (2–3 hours).

## Assumptions

- The API returns payments in a consistent format.
- Payment IDs are unique.
- Currency values are predefined and stable.

## Getting Started

### Prerequisites

- Node.js (v24)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/payment-list-challenge-react.git
cd payment-list-challenge-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## Features

- **Payment List**: Displays a paginated list of payments.
- **Search**: Allows users to search for payments by ID.
- **Filters**: Includes a currency filter and the ability to clear all filters.
- **Pagination**: Supports navigating between pages of payments.
- **Error Handling**: Displays appropriate error messages for "not found" or server errors.
- **Responsive Design**: Works across desktop and mobile devices.

---

## Instructions for Use

1. **Search Payments**: Enter a payment ID in the search bar and click "Search."
2. **Filter by Currency**: Select a currency from the dropdown and click "Search."
3. **Clear Filters**: Click the "Clear Filters" button to reset all filters.
4. **Pagination**: Use the "Next" and "Previous" buttons to navigate between pages.
5. **Keyboard accessibility**: All functionalities can be performed through keyboard

---

## Things I Could Improve with More Time

1. **Testing**
   - Increase unit and integration test coverage for edge cases and error states.
   - Refactor tests into smaller, focused test suites.
   - Add browser-based UI tests using Vitest browser mode.

2. **Additional Features**
   - Sorting (amount, date, status).
   - Page size selection.
   - Advanced filters (date range, status).
   - Light / dark theming.
   - Respect reduced motion preferences.

---

## Production Considerations

- Filtering, searching, and pagination would be on an actual backend for scalability.
- Introduce observability (e.g., error tracking and performance monitoring using tool like Sentry).
- Introduce end-to-end tests.
- Introduce feature flags for progressive rollout.
- Add loading skeleton UI.
- Introduce request cancellation to prevent race conditions during search.
- Use CI/CD pipelines for automated build, testing and deployment.
- Deploy the app to a platform like Vercel, Netlify, or AWS.
- Add analytics to understand how users interact with search and filters.
- Prefetch next pages of results using React Query.
- Optimize rendering and memoization where appropriate.
- Conduct accessibility audits.
- Improve screen reader support and focus management.


## Challenges Encountered

### Form Handling with useActionState

Initially, I attempted to use `useActionState` to handle the search and currency filter form submissions.

However, during testing in the jsdom environment, form submissions were not being intercepted correctly and the form attempted to submit to the browser. This caused issues when running tests with Vitest and React Testing Library.

Because of this, I switched to a more predictable approach for handling form submission that works reliably both in the browser and in the test environment.

If this were a production system, I would revisit this once the testing environment fully supports this pattern or introduce additional testing utilities to better simulate the behavior.

## Notes on Provided Dependencies

I noticed `fast-xml-parser` was included in the repository.  
I explored whether it was required for the challenge but did not find any XML data being returned by the API or used in the application flow.

Since the payments data in this implementation is JSON-based, there was no need to introduce XML parsing into the solution. I chose to avoid adding unused complexity and kept the implementation focused on the core requirements of the challenge.

If the system needed to integrate with XML-based payment providers or legacy APIs, this library could be useful for transforming XML responses into a format suitable for the frontend.

I assumed it may have been included for extensibility or to simulate real-world dependency sets in an existing codebase.

## Testing Notes

The repository included an existing `App.test.tsx` file.  
I extended the tests to improve coverage and validate additional behaviors, but intentionally kept the overall structure of the test file similar to the original version.

My reasoning was that the existing tests may be part of the evaluation setup for the challenge, so I focused on improving test quality without significantly altering the original testing approach.

Additional improvements included:

- Expanding test scenarios
- Covering more UI states and interactions
- Refactoring parts of the tests for clarity while keeping the original flow

### Error Handling Strategy

By default, Axios throws errors for all 4XX and 5XX responses.

For this project, I modified the behavior so that Axios only throws for **5XX server errors**.

Reasoning:

- In cases where filtering or searching returns no results, the API may return a 4XX response.
- In this scenario, the UI should display a **"Product not found"** or empty state rather than triggering the application error boundary.
- True server failures (5XX) are still treated as application errors and will trigger the error boundary.

This allows the UI to distinguish between:

- Expected "no results" states
- Actual system failures

In a production system, the exact behavior would depend on the API contract and whether empty results are represented as a 4XX response or an empty dataset.

## CI/CD and Deployment

I added a GitHub Actions workflow at:

.github/workflows/deploy.yml

This workflow demonstrates how the project could be automatically deployed to GitHub Pages on push to the main branch.

The goal was to show how I would typically:

- Set up CI/CD for a frontend project
- Build the application
- Deploy it automatically

However, GitHub Pages is currently disabled for this repository, so the deployment workflow will not run successfully in this environment.
