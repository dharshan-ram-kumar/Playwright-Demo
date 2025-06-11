FROM mcr.microsoft.com/playwright:v1.37.1-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install 
RUN npx playwright install 
