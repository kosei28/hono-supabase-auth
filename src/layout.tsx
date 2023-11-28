import { Child, FC } from 'hono/jsx';

export const Layout: FC<{ title: string }> = (props: {
    children?: Child;
    title: string;
}) => {
    return (
        <html>
            <head>
                <title>{props.title}</title>
            </head>
            <body>{props.children}</body>
        </html>
    );
};
