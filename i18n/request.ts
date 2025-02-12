import { getRequestConfig } from 'next-intl/server';
import enMessages from '../message/en.json';
import zhMessages from '../message/zh.json';
import { getLocale } from '@/i18n';

export default getRequestConfig(async () => {

    const locale = await getLocale();
    const messages = locale === 'en' ? enMessages : zhMessages;
    return {
        locale,
        messages
    };
});
