import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

export const supabaseMiddleware: MiddlewareHandler<{
    Variables: {
        supabase: SupabaseClient;
    };
}> = async (c, next) => {
    const client = createServerClient(
        process.env.SUPABASE_URL ?? '',
        process.env.SUPABASE_ANON_KEY ?? '',
        {
            cookies: {
                get: (key) => {
                    return getCookie(c, key) ?? '';
                },
                set: (key, value, options) => {
                    setCookie(c, key, value, options);
                },
                remove: (key, options) => {
                    deleteCookie(c, key, options);
                },
            },
        }
    );
    c.set('supabase', client);
    await next();
};
