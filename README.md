<img width="143" alt="penelope-logo@2x" src="https://user-images.githubusercontent.com/10648307/189042864-3dea5d3a-50be-44bd-953d-99d24f51aa49.png">

Penelope is a GUI on top of the <a href="https://axidraw.com/doc/py_api/#introduction" target="_blank">AxiDraw Python API</a>. While <a href="https://inkscape.org" target="_blank">Inkscape</a> has an extension for plotting from AxiDraw, it's not super fun to use. Penelope has some of the same functionality as the Inkscape extension and the AxiDraw API / CLI, and it works in the browser!

<img width="1792" alt="penelope-screencap-2" src="https://user-images.githubusercontent.com/10648307/189058155-accb5bfc-b96a-477a-aeae-90cead8f03a3.png">

Penelope consists of a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and a <a href="https://github.com/Penelope-for-AxiDraw/penelope-server" target="_blank">simple API</a> built with Python. To upload and plot your artwork, you'll need to be running both the Next.js and Python apps, and you'll need to have a basic <a href="https://www.contentful.com/" target="_blank">Contentful</a> account (it's free!).

### Running the App

Node.js is a prerequisite for this applicaiton. If you don't have it, <a href="https://nodejs.org" target="_blank">you can get Node.js here</a>. Then you should download/clone the Python API and run it locally. Finally, download/clone this repo, and install, build and run the app:

```bash
$ npm install
$ npm run build
$ npm run start
```
Open [http://localhost:3000/penelope](http://localhost:3000/penelope) with your browser to use the app.

### Development
To develop the app, you can make changes to the code locally and then run it with
```bash
$ npm run dev
```
Then open [http://localhost:3000/penelope](http://localhost:3000/penelope) to view your updates.
