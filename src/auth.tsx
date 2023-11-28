import { Hono } from 'hono';
import { supabaseMiddleware } from './supabase';
import { Layout } from './layout';

export const authApp = new Hono();

authApp.get('/login/google', supabaseMiddleware, async (c) => {
    const url = new URL(c.req.url);
    const {
        data: { url: loginUrl },
    } = await c.var.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${url.origin}/auth/callback`,
        },
    });
    if (loginUrl !== null) {
        return c.redirect(loginUrl);
    }
    return c.redirect('/auth/error');
});

authApp.get('/callback', supabaseMiddleware, async (c) => {
    const code = c.req.query('code');
    const next = c.req.query('next') ?? '/';
    if (code !== undefined) {
        const { error } = await c.var.supabase.auth.exchangeCodeForSession(
            code
        );
        if (error === null) {
            return c.redirect(next);
        }
    }
    return c.redirect('/auth/error');
});

authApp.post('/logout', supabaseMiddleware, async (c) => {
    await c.var.supabase.auth.signOut();
    return c.redirect('/');
});

authApp.get('/error', async (c) => {
    return c.html(
        <Layout title="ログインに失敗しました">
            <h1>ログインに失敗しました</h1>
            <p>再度ログインしてください。</p>
            <a href="/">トップに戻る</a>
        </Layout>
    );
});
