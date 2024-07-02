const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate', (req, res) => {
    const data = req.body;
    const kualifikasiList = data.kualifikasi.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    const benefitList = data.benefit.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    const kualifikasiEnList = data.kualifikasi_en.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    const benefitEnList = data.benefit_en.split(',').map(item => `<li>${item.trim()}</li>`).join('');

    const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lowongan ${data.posisi} - FreeJobID</title>
        <meta name="description" content="Kami mencari ${data.posisi} dengan pengalaman yang relevan. Benefit: Gaji pokok, allowance, BPJS Ketenagakerjaan & Kesehatan.">
        <meta name="keywords" content="Lowongan Kerja, ${data.posisi}, FreeJobID, Pekerjaan, Karir, Rekrutmen, Job Vacancy, Job, Career">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; color: #333; }
            .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1, h2 { color: #2c3e50; }
            ul { list-style-type: none; padding: 0; }
            ul li { background: #ecf0f1; margin: 5px 0; padding: 10px; border-radius: 3px; }
            p { margin: 10px 0; }
            a { color: #2980b9; text-decoration: none; }
            a:hover { text-decoration: underline; }
            img { max-width: 100%; height: auto; margin: 20px 0; }
            .lang-switch { text-align: right; margin-bottom: 20px; }
            .lang-switch a { margin: 0 5px; padding: 5px 10px; background: #2980b9; color: #fff; border-radius: 3px; }
            .lang-switch a:hover { background: #3498db; }
            .back-button { margin-top: 20px; display: inline-block; padding: 10px 20px; background: #2980b9; color: #fff; border-radius: 3px; text-decoration: none; }
            .back-button:hover { background: #3498db; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="lang-switch">
                <a href="#id" onclick="switchLang('id')">Indonesia</a>
                <a href="#en" onclick="switchLang('en')">English</a>
            </div>
            <div id="content-id">
                <h1>Lowongan Kerja ${data.posisi}</h1>
                <img src="${data.img_url}" alt="Flyer Lowongan ${data.posisi}">
                <h2>${data.posisi}</h2>
                <p>${data.deskripsi}</p>
                <h3>Kualifikasi:</h3>
                <ul>
                    ${kualifikasiList}
                </ul>
                <h3>Benefit:</h3>
                <ul>
                    ${benefitList}
                </ul>
                <p>Kirim CV atau portofolio ke PIC: ${data.pic_name} melalui <a href="${data.apply_url}">link ini</a>.</p>
                <img src="https://imheroeskiller.github.io/FreeJobID/jobs/images/GOS.png" alt="We are hiring" width="200">
            </div>
            <div id="content-en" style="display:none;">
                <h1>Job Vacancy ${data.posisi}</h1>
                <img src="${data.img_url}" alt="Flyer Job Vacancy ${data.posisi}">
                <h2>${data.posisi}</h2>
                <p>${data.deskripsi_en}</p>
                <h3>Qualifications:</h3>
                <ul>
                    ${kualifikasiEnList}
                </ul>
                <h3>Benefits:</h3>
                <ul>
                    ${benefitEnList}
                </ul>
                <p>Send your CV or portfolio to PIC: ${data.pic_name} via <a href="${data.apply_url}">this link</a>.</p>
                <img src="https://imheroeskiller.github.io/FreeJobID/jobs/images/GOS.png" alt="We are hiring" width="200">
            </div>
            <a href="https://imheroeskiller.github.io/FreeJobID" class="back-button">Back to Home</a>
        </div>
        <script>
            function switchLang(lang) {
                if(lang === 'id') {
                    document.getElementById('content-id').style.display = 'block';
                    document.getElementById('content-en').style.display = 'none';
                } else {
                    document.getElementById('content-id').style.display = 'none';
                    document.getElementById('content-en').style.display = 'block';
                }
            }
        </script>
    </body>
    </html>`;

    const fileName = `${data.posisi.replace(/ /g, '-').toLowerCase()}.html`;
    const filePath = path.join(__dirname, 'jobs', fileName);
    fs.writeFileSync(filePath, template);
    res.json({ message: 'HTML generated successfully', fileName });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

