// src/i18n/routing.js
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // ✅ UPDATE THIS: Change 'ar' to 'fr'
  locales: ['en', 'fr'], 

  // Default is correct
  defaultLocale: 'en' 
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);