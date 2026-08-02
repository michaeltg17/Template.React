#!/bin/bash
set -euo pipefail

echo ""
echo "========================================="
echo "  CI - template-react"
echo "========================================="

echo ""
echo "Installing dependencies..."
npm ci
echo "Dependencies installed"

echo ""
echo "Running ESLint..."
npm run lint
echo "Lint passed"

echo ""
echo "Running TypeScript type checking..."
npm run check-types
echo "Type checking passed"

echo ""
echo "Running unit tests..."
npm run test -- --run --reporter=verbose --passWithNoTests
echo "Unit tests passed"

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

echo ""
echo "Building for production..."
npm run build
echo "Build passed"

echo ""
echo "========================================="
echo "  All CI checks passed!"
echo "========================================="