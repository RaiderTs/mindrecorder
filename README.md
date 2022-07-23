# Getting Started

Before you start, make sure your `node` version is at least 16.14.0

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). If you want a different port you can specify it in the `package.json` file in the "dev" script

To test a production build run `npm run build` this will create a `build` folder. Run `npm run start` to start the production version of the app

You can use pm2 package for starting and monitoring the app. Run this command from the build folder on the server `pm2 start npm --watch --ignore-watch="node_modules" --restart-delay=10000 --name "mindrecorder" -- start`
