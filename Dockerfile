# --- Build stage ---
FROM node:22-alpine AS build

# For using pnpm, we need to install corepack
RUN corepack enable

# This indicates the directory we want our files to extract 
WORKDIR /app

# Copying only files that have info about dependencies, since they change minimally
COPY package.json pnpm-lock.yaml ./

# Install all dependencies including the dev dependecies
RUN pnpm install --frozen-lockfile

# Copy rest of config files and src to workdir
COPY tsconfig.json ./
COPY src ./src

# Compile typescript - javascript
RUN pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

# ----Runtime stage ----
FROM node:22-alpine AS runtime

# Create a workdir
WORKDIR /app

# Copying what is needed to run
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package,json
COPY --from=build /app/node_modules ./node_modules

# Set env as production
ENV NODE_ENV=production

# Since the app is running on port 4000, we expose is
EXPOSE 4000

# Run the command needed to start the app
CMD ["node", "dist/index.js"]


