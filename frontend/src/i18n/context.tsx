// SPDX-License-Identifier: MIT
// Copyright (c) 2026 aegis-oss org.

'use client';

import React, { createContext, useCallback } from 'react';
import { en } from './locales/en';

export type Locale = 'en';
export type TranslationKey = keyof typeof en;

export interface I18nContextType {
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key) => en[key],
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let value: string = en[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return value;
    },
    [],
  );

  return (
    <I18nContext.Provider value={{ locale: 'en', t }}>
      {children}
    </I18nContext.Provider>
  );
}
