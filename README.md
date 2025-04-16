# ecom

## Tech Stack

- .Net 9.0
- React 19
- Angular 18

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
- Angular Language Service [Angular]
- Tailwind CSS Intellisense [Tailwind]
- Auto Rename Tag [Jun Han]

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
___

# React

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

## Convert Json To Typescript [Link](https://transform.tools/json-to-typescript)

## Installation of Material UI in react

```shell
npm install @mui/material@6 @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material
```

Add this styles to `main.ts` file

```typescript
//main.ts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

```
## Setup routing in react

Install this `react-router-dom`
```shell
npm i react-router-dom --legacy-peer-deps
```

Create a new file called `routes/Routes.tsx` inside `app` folder

```

export const routes = createBrowserRouter([
    {
        path: "/", // route route
        element:<App />, // specify app component here
        children: [
            { path: "", element: <HomePage /> }, // specify home component
            { path: "/catalog", element: <Catalog /> }, // specify catalog component
            { path: "/catalog/:id", element: <ProductDetails /> }, // specify product details component
            { path: "/about", element: <AboutPage /> }, // specify about component 
            { path: "/contact", element: <ContactPage /> }, // specify contact component 
        ]
    }
])

```

Now edit `main.tsx` file and add `RouterProvider`

```

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={routes} />
</StrictMode>,
)

```

Now edit `app.tsx` file and replace it with `outlet`

```
function App() {
    const [darkMode, setDarkMode] = useState(true);
    const palleteType = darkMode ? 'dark' : 'light';
    const darkTheme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default:(palleteType === "dark") ? "#eaeaea" : "#121212",
            }
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} toggleDarkMode={()=> setDarkMode(!darkMode)}></NavBar>
    <Box sx={{minHeight: '100vh',
        backgroundColor: (darkMode ?  '#121212':'#eaeaea' ), py:6}}>
    <Container maxWidth="xl" sx={{mt:8}}>
    <Outlet /> <!-- Replaced catalog with outlet component-->
    </Container>
    </Box>
    </ThemeProvider>
    </>
)
}

export default App
```

Now in your `navbar` component create this list and use it with 'NavLink'

```
const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
];

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
];

const NavBar = ({ darkMode, toggleDarkMode}: Props) => {

    return (
        <>
            ...
            ...
              <List sx={{display: "flex"}}>
                    {midLinks.map(({ title, path}) => (
                        <ListItem sx={{color:'inherit', typography:'h6'}} component={NavLink} to={path} key={path}>{title.toUpperCase()}</ListItem>
                    ))}
                
        </>
    )
}

...
```

___

# Angular

## Installation of angular

This [link](https://angular.dev/reference/versions) tell which node is compatible with angular

```shell
npm install -g @angular/cli
```

If you get error like this `Error: error:0308010C:digital envelope routines::unsupported` while running `ng serve` add this environment variable

```shell
export NODE_OPTIONS="--openssl-legacy-provider"
```
If you are not able to update your angular cli

```shell
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@18.1.2
```
## Configured `https` for angular 

- [Install mkcert](https://github.com/FiloSottile/mkcert)
- Run this command in terminal `mkcert -install`
- Inside project folder create a new folder `ssl` and run this command `mkcert localhost`
- Edit `angular.json` file and add following code

```js
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "ssl": true,
            "sslCert": "ssl/localhost.pem",
            "sslKey": "ssl/localhost-key.pem"
          }
```
## Install Angular Material

```shell
ng add @angular/material
```

## Install TailwindCss in angular

```shell
npm install -D tailwindcss postcss
npx tailwindcss init
```
Edit `tailwind.config.js`

```js
 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,ts}"],
   theme: {
     extend: {},
   },
   plugins: [],
 }
```

Now open you global `.css` file and add this

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Useful commands for angular

To generate a component

```shell
ng g c layout/header --skip-tests --dry-run
ng g c layout/header --skip-tests
```
