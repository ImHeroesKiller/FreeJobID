# FreeJobID

FreeJobID - Employment Opportunities for All, Anywhere, Anytime.

## Introduction

FreeJobID is a web-based platform designed to provide job opportunities for everyone, everywhere, at any time. The platform lists various job openings from different locations and allows users to apply directly through the website.

## Features

- **Job Listings:** View job openings with details such as position, location, status, and post date.
- **Apply Now:** Users can easily apply for jobs by clicking the "Apply Now" button.
- **Real-time Updates:** Job listings are updated automatically to ensure the latest opportunities are available.

## Technology Stack

- **HTML5**: For the structure of the web pages.
- **CSS**: For styling and layout.
- **Google Sheets**: To manage and display job listings dynamically.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/username/FreeJobID.git
    cd FreeJobID
    ```

2. **Open the `index.html` file in your browser:**
    Simply double-click the `index.html` file to open it in your default web browser.

## Usage

1. **View Job Openings:**
   - Open the homepage to see a list of current job openings.

2. **Apply for a Job:**
   - Click on the "Apply Now" button to proceed with the job application process.

## Struktur Direktori

- **css/**: Menyimpan semua file CSS.
  - `styles.css`: File CSS utama untuk situs.
- **images/**: Menyimpan semua gambar yang digunakan di situs.
  - `Logo-FreeJobID.png`: Logo utama situs.
  - `favicon.ico`: Favicon untuk situs.
- **jobs/**: Menyimpan halaman detail pekerjaan.
  - **images/**: Menyimpan gambar khusus halaman pekerjaan.
  - `sales-motoris.html`: Halaman detail untuk posisi Sales Motoris.
- **js/**: Menyimpan file JavaScript.
  - `script.js`: File JavaScript utama untuk situs.

## Menambah Halaman Pekerjaan Baru

1. Tambahkan file HTML baru dalam direktori `jobs/`.
2. Tambahkan gambar terkait ke dalam direktori `jobs/images/` jika diperlukan.
3. Perbarui halaman `index.html` untuk menambahkan link ke halaman pekerjaan baru.

## Menggunakan URL Rewriting

Kami menggunakan file `404.html` untuk URL rewriting. Pastikan menambahkan entri baru dalam `404.html` untuk halaman pekerjaan baru:

```html
<script>
    var urlMap = {
        '/job/motoris-sales': 'jobs/sales-motoris.html'
        // Tambahkan mapping baru di sini
    };
</script>
```

## Contribution

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. **Fork the Repository:**
    Click the "Fork" button at the top right of this repository's page.

2. **Clone Your Fork:**
    ```bash
    git clone https://github.com/your-username/FreeJobID.git
    cd FreeJobID
    ```

3. **Create a Branch:**
    ```bash
    git checkout -b feature/YourFeatureName
    ```

4. **Commit Your Changes:**
    ```bash
    git add .
    git commit -m "Add some feature"
    ```

5. **Push to the Branch:**
    ```bash
    git push origin feature/YourFeatureName
    ```

6. **Open a Pull Request:**
    Open a pull request to the main repository, and describe the changes you have made.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact the project maintainer at:

- **Name:** Ary Wibowo
- **Email:** aku@arywibowo.id
- **LinkedIn:** [Ary Wibowo](https://www.linkedin.com/in/boworesearch/)

---

Thank you for using FreeJobID! We hope it helps you find the perfect job opportunity.
