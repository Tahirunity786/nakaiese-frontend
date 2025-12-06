'use client'

import { useState } from 'react'
import Link from 'next/link' // Ensure you import Link from '@/i18n/routing' if you want locale persistence
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '@/validations/authSchemas'
import { useAppForm } from '@/hooks/useAppForm'
import { useTranslations } from 'next-intl';

// --- Reusable Component ---
const InputField = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B75A5] transition-colors ${
        error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
      }`}
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);
// -------------------------------------------------------------------------------

export default function LoginPage() {
  const { login } = useAuth()
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false);
  
  // Initialize Translations
  const t = useTranslations('SignIn');

  const form = useAppForm(
    { email: '', password: '', remember: false },
    loginSchema,
    async (values) => {
      setGlobalError('')
      setLoading(true)
      try {
        await login(values)
      } catch (error) {
        // Use server error if available, otherwise use translated generic error
        setGlobalError(error.response?.data?.message || t('error_generic'))
      } finally {
        setLoading(false)
      }
    }
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
           <Image
            src={'/Images/Logo.svg'}
            width={150}
            height={80}
            alt='Logo'
            priority
           />
        </div>

        {/* Title with Rich Text Support for Blue Color */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-[#4B75A5]">{chunks}</span>
          })}
        </h2>
        
        <p className="text-center text-sm text-gray-500 mt-1">{t('subtitle')}</p>

        {/* Global Error Message */}
        {globalError && (
            <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md text-center border border-red-200">
                {globalError}
            </div>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="space-y-4 mt-6">
          
          <InputField 
            label={t('email')}
            type="email"
            placeholder={t('email_placeholder')}
            {...form.getFieldProps('email')} 
          />

          <InputField 
            label={t('password')}
            type="password"
            placeholder={t('password_placeholder')}
            {...form.getFieldProps('password')} 
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                checked={form.values.remember}
                onChange={form.handleChange}
                className="h-4 w-4 text-[#4B75A5] border-gray-300 rounded focus:ring-[#4B75A5]"
              />
              <span className="text-gray-700">{t('remember_me')}</span>
            </label>
            <Link href="/forgot-password" className="text-[#4B75A5] hover:underline">
              {t('forgot_password')}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4B75A5] text-white hover:bg-[#406896] py-2 rounded-md text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-10"
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                t('submit')
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          {t('no_account')}{' '}
          <Link href="/auth/register" className="text-[#4B75A5] font-medium hover:underline">
            {t('sign_up')}
          </Link>
        </p>
      </div>
    </main>
  )
}