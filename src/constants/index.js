export const ROLES = {
  DEFAULT: 'DEFAULT',
  FREELANCER: 'FREELANCER',
  EMPLOYER: 'EMPLOYER'
};

export const DEFAULT_ROUTES = {
  [ROLES.DEFAULT]: '/',
  [ROLES.FREELANCER]: '/find-work',
  [ROLES.EMPLOYER]: '/my-jobs',
};

export const NAV_LINKS = [
  {
    url: 'find-work',
    title: 'Find Work',
    role: ROLES.FREELANCER
  },
  {
    url: 'my-jobs',
    title: 'My Jobs',
    role: ROLES.EMPLOYER,
  },
  {
    url: 'post-job',
    title: 'Post new Job',
    role: ROLES.EMPLOYER,
  },
];

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const THEME_CONFIG = {
  [THEME.DARK]: {
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    borderColor: '#ffffff',
    btnPrimaryColor: '#001e00',
    btnPrimaryBg: '#ffffff',
    btnSecondaryColor: '#001e00',
    btnSecondaryBg: '#d4d4d4',
  },
  [THEME.LIGHT]: {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    borderColor: '#d4d4d4',
    btnPrimaryColor: '#001e00',
    btnPrimaryBg: 'transparent',
    btnSecondaryColor: '#ffffff',
    btnSecondaryBg: '#001e00',
  }
};

export const PAGE_SIZE = 10;

export const REGEX_PATTERNS = {
  // eslint-disable-next-line no-useless-escape
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // https://www.w3resource.com/javascript/form/email-validation.php
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
}
