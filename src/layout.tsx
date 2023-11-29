import type { Child, FC } from 'hono/jsx';

export const Layout: FC<{ title: string }> = (props: {
    children?: Child;
    title: string;
}) => {
    return (
        <html>
            <head>
                <title>{props.title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body>{props.children}</body>
        </html>
    );
};
