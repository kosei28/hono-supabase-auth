import { Hono } from 'hono';
import { authApp } from './auth';
import { Layout } from './layout';
import { supabaseMiddleware } from './supabase';

const app = new Hono();

app.get('/', supabaseMiddleware, async (c) => {
    const {
        data: { user },
    } = await c.var.supabase.auth.getUser();
    if (user !== null) {
        const name = user.user_metadata.full_name;
        return c.html(
            <Layout title="Hono & Supabase Auth">
                <h1>Hono & Supabase Auth</h1>
                <p>ようこそ、{name}さん。</p>
                <form method="POST" action="/auth/logout">
                    <button type="submit">ログアウト</button>
                </form>
            </Layout>
        );
    }
    return c.html(
        <Layout title="Hono & Supabase Auth">
            <h1>Hono & Supabase Auth</h1>
            <a href="/auth/login/google">Googleでログイン</a>
        </Layout>
    );
});

app.route('/auth', authApp);

export default app;
