
FROM node:22-alpine
 WORKDIR /blog-frontend
 COPY package.json package-lock.json ./
  RUN npm install 
  COPY . .
   RUN npm run build 
   EXPOSE 4173 
   CMD ["npm", "run","dev"]