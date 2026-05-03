// Vitest global setup for the client suite.
//
// Why this file exists: vite.config.js declares `test.setupFiles: ["./tests/setup.js"]`,
// which Vitest loads once per worker before any test module runs. The single
// concern of this file is to wire @testing-library/jest-dom matchers (toBeInTheDocument,
// toHaveTextContent, etc.) into Vitest's `expect`, so component tests can read
// like the user-facing assertions they make.
//
// Anything more elaborate (MSW handlers, global mocks, custom render helpers)
// belongs in dedicated files imported per-test, not here — this file should
// stay small and obviously correct because every test pays its cost.

import "@testing-library/jest-dom/vitest";
