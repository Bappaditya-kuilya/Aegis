// SPDX-License-Identifier: MIT
// Copyright (c) 2026 aegis-oss org.

import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/i18n'

export const metadata: Metadata = {
  title: 'Aegis App',
  description: 'Local-first Aegis viewer for local and recorded AI agent sessions.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
