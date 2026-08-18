[![ci](https://github.com/michaeltg17/Template.React/actions/workflows/ci.yml/badge.svg)](https://github.com/michaeltg17/Template.React/actions/workflows/ci.yml)

# Template.React

React app for the [Template.Api](https://github.com/michaeltg17/Template.Api). Based on [Bulletproof React](https://github.com/alan2207/bulletproof-react) with my own taste.

Built with the help of local AI using https://github.com/michaeltg17/best-model-dual-3090 and [OpenCode](https://github.com/anomalyco/opencode).

## Docker image

On every push to `main`, CI builds and pushes a single image to GHCR (`ghcr.io/michaeltg17/template-react`):

- `<sha7>` — the commit's short SHA
- `latest` — alias of the most recent release

The image is environment-independent. `API_URL` is read by the server at request time, so the same image is promoted through every environment and configured per environment:

```yaml
# k8s/environments/<env>/values.yaml
image:
  tag: <sha7>
env:
  API_URL: https://api.<env>.example.com/api
```

Deployment infra (k8s) only references the tag and sets the `API_URL` env var; it never builds the image itself.

The browser never sees the backend URL: all API calls go to the same-origin `/api/*`, which a server-side proxy (`src/app/api/[...slug]/route.ts`) forwards to `API_URL`. This is also why no `NEXT_PUBLIC_*` variable is needed — nothing client-facing is baked into the build.
