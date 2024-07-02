# Gunakan Node.js image sebagai base
FROM node:14

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Expose port 8080
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]
