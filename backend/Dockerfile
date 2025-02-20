FROM node:22
WORKDIR /blog-backend
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","run","dev"]