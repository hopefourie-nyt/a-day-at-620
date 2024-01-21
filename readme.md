# A Day at 620
A Day at 620 is a web based game, in which the player navigates the frustrations and joys of working from The New York Times office.

## Getting Started

```
npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```


## Dev Server Port

You can change the dev server's port number by modifying the `vite.config.ts` file. Look for the `server` section:

```js
{
	// ...
	server: { host: '0.0.0.0', port: 8000 },
}
```

It is currently set to port 8000.