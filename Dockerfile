FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Create directories for outputs
RUN mkdir -p reports auth logs

# Default command: run all tests
CMD ["npx", "playwright", "test"]
