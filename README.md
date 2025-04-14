# ecom

## Tech Stack

- .Net 9.0
- React 19

## Tools

- VSCode or Rider
- Postman
- Git
- [Node.js with NVM](https://joachim8675309.medium.com/installing-node-js-with-nvm-4dc469c977d9)

## VSCode Extensions

- C# Devkit [Microsoft]
- C# [Microsoft]
- sqlite [alexcvzz]
- Material Icon Theme [Philipp Kief]
- Nuget Gallery [pcislo]
- ES7+ React/Redux/React-Native snippets [dsznajder]
- ESLint [Microsoft]

## Fix for certificate issue when running

```
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

## Install Entity Framework tool

```
dotnet tool install --global dotnet-ef --version 9.0.0
dotnet tool list -g
```

## Install certificate for react app using vite

```
npm i vite-plugin-mkcert -D
```

Edit the `vite.config` file and add this

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000
  },
  plugins: [react(), mkcert()],
})

```
