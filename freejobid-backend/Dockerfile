# Gunakan Node.js image sebagai base
FROM node:14

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]
