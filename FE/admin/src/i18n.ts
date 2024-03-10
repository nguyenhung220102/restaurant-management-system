// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async ({ locale }) => ({
// 	messages: (await import(`./translations/${locale}.json`)).default,
// }));

import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./translations/${locale}.json`)).default
  };
});