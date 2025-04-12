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
