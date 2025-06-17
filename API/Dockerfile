# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
EXPOSE 80
#EXPOSE 443

# Copy solution and restore as distinct layers
#COPY Directory.Build.props Directory.Build.props
COPY Directory.Packages.props .

#make sure casing is correct
COPY Directory.Build.props .

COPY ecom.sln .
COPY API/API.csproj API/API.csproj

RUN dotnet restore ecom.sln --verbosity diag

# Copy the rest of the source code
COPY API API
WORKDIR /app/API
RUN dotnet publish -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out ./

ENTRYPOINT ["dotnet", "API.dll"]
