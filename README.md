<img width="143" alt="penelope-logo@2x" src="https://user-images.githubusercontent.com/10648307/189042864-3dea5d3a-50be-44bd-953d-99d24f51aa49.png">

Penelope is a GUI on top of the <a href="https://axidraw.com/doc/py_api/#introduction" target="_blank">AxiDraw Python API</a>. While <a href="https://inkscape.org" target="_blank">Inkscape</a> has an extension for plotting from AxiDraw, it's not super fun to use. Penelope has some of the same functionality as the Inkscape extension and the AxiDraw API / CLI, and it works in the browser!

Penelope is comprised of a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and a <a href="https://github.com/Penelope-for-AxiDraw/penelope-server" target="_blank">simple API</a> built with Python. To upload and plot your artwork, you'll need to be running the Next.js and Python apps, and you'll need to have a basic <a href="https://www.contentful.com/" target="_blank">Contentful</a> account (it's free!).

### Running the App

You should first clone and run the Python API locally. Then, build and run the Next.js app:

```bash
npm run build
```
```bash
npm run start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

### Development
To develop the app, you can make changes to the code locally and then run it with
```bash
npm run dev
```
