[![ci](https://github.com/michaeltg17/Template.React/actions/workflows/ci.yml/badge.svg)](https://github.com/michaeltg17/Template.React/actions/workflows/ci.yml)

# Template.React

React app for the [Template.Api](https://github.com/michaeltg17/Template.Api). Based on [Bulletproof React](https://github.com/alan2207/bulletproof-react) with my own taste.

Built with the help of local AI using https://github.com/michaeltg17/best-model-dual-3090 and [OpenCode](https://github.com/anomalyco/opencode).

## Docker image

On every push to `main`, CI builds and pushes three per-environment images to GHCR (`ghcr.io/michaeltg17/template-react`). `NEXT_PUBLIC_API_URL` is baked into the JS bundle at build time, so each environment gets its own tag, built with the API URL from the matching repo variable (`NEXT_PUBLIC_API_URL_DEV` / `NEXT_PUBLIC_API_URL_QA` / `NEXT_PUBLIC_API_URL_PROD`):

- `dev-<sha7>` — dev environment
- `qa-<sha7>` — qa environment
- `prod-<sha7>` — production environment

Deployment infra (k8s) only references the per-environment tag (e.g. `image.tag: dev-<sha7>` in `k8s/environments/dev/values.yaml`); it never builds the image itself.
