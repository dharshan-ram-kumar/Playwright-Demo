FROM mcr.microsoft.com/playwright:v1.52.0-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install 
RUN npx playwright install 
