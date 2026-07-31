#!/usr/bin/env bash
set -euo pipefail

echo "========================================="
echo "  CI - template-react"
echo "========================================="

# Install dependencies
echo ""
echo "Installing dependencies..."
npm ci
echo "Dependencies installed"

# Run ESLint
echo ""
echo "Running ESLint..."
npm run lint
echo "Lint passed"

# Run TypeScript type checking
echo ""
echo "Running TypeScript type checking..."
npm run check-types
echo "Type checking passed"

# Run unit tests
echo ""
echo "Running unit tests..."
npm run test -- --run --reporter=verbose
echo "Unit tests passed"

# Run E2E tests (mock server + dev server)
echo ""
echo "Starting mock server and development server..."
npx tsx scripts/mock-server.ts &
MOCK_PID=$!
npx next dev &
NEXT_PID=$!

sleep 5
echo "Servers started"

echo "Installing Playwright browsers..."
npx playwright install --with-deps

echo "Running E2E tests..."
npx playwright test

kill "$MOCK_PID" "$NEXT_PID" 2>/dev/null || true
wait 2>/dev/null || true

echo "E2E tests passed"

# Build (validate production build)
echo ""
echo "Building for production..."
npm run build
echo "Build passed"

echo ""
echo "========================================="
echo "  All CI checks passed!"
echo "========================================="
