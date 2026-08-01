export const paths = {
  home: { getHref: () => '/' },
  auth: {
    login: { getHref: (redirectTo?: string | null | undefined) => `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}` },
  },
  app: {
    root: { getHref: () => '/' },
  },
};
