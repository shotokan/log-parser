FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN mkdir /usr/src/app/csv
RUN mkdir /usr/src/app/logs
RUN npm install --quiet

COPY . .

CMD ["npm", "run", "dev"]