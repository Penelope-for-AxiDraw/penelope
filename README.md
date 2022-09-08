<img width="143" alt="penelope-logo@2x" src="https://user-images.githubusercontent.com/10648307/189042864-3dea5d3a-50be-44bd-953d-99d24f51aa49.png">

Penelope is a GUI on top of the <a href="https://axidraw.com/doc/py_api/#introduction" target="_blank">AxiDraw Python API</a>. While <a href="https://inkscape.org" target="_blank">Inkscape</a> has an extension for plotting from AxiDraw, it's not super fun to use. Penelope has some of the same functionality as the Inkscape extension and the AxiDraw API / CLI, and it works in the browser!

Penelope is comprised of a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and a <a href="https://github.com/Penelope-for-AxiDraw/penelope-server" target="_blank">backend</a> built with Python. To upload and plot your artwork, you'll need to be running the frontend and backend apps, and you'll need to have a basic <a href="https://www.contentful.com/" target="_blank">Contentful</a> account (it's free!).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
