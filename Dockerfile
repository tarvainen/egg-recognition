FROM justadudewhohacks/opencv-nodejs

WORKDIR /app

COPY . . 

ENTRYPOINT ["node", "index.js"]