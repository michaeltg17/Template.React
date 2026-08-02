#!/bin/bash
set -euo pipefail

export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:8090/api}"
export NEXT_PUBLIC_ENABLE_API_MOCKING="${NEXT_PUBLIC_ENABLE_API_MOCKING:-true}"
export NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL:-http://localhost:3000}"
export NEXT_PUBLIC_MOCK_API_PORT="${NEXT_PUBLIC_MOCK_API_PORT:-8090}"

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
echo "Checking code formatting..."
npm run format:check
echo "Formatting passed"

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

echo "Waiting for servers to be ready..."
MAX_RETRIES=60
RETRY=0
while ! curl -sf http://localhost:3000/ >/dev/null 2>&1; do
  RETRY=$((RETRY + 1))
  if [ $RETRY -ge $MAX_RETRIES ]; then
    echo "ERROR: Next.js dev server did not start within 60s"
    kill "$MOCK_PID" "$NEXT_PID" 2>/dev/null || true
    exit 1
  fi
  sleep 1
done
echo "Development server is ready."

echo "Installing Playwright browsers..."
npx playwright install --with-deps chromium

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