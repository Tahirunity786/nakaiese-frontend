import createNextIntlPlugin from 'next-intl/plugin';

// Point this to the request file you just created
const withNextIntl = createNextIntlPlugin(
    './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
