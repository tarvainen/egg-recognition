FROM justadudewhohacks/opencv-nodejs

WORKDIR /app

COPY . .

ENTRYPOINT ["npm", "start"]
