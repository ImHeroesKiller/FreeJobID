const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

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
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --primary-light: #e0e7ff;
            --neutral-900: #0f172a;
            --neutral-800: #1e293b;
            --neutral-700: #334155;
            --neutral-600: #475569;
            --neutral-100: #f1f5f9;
            --neutral-50: #f8fafc;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 40px 20px;
            background-color: var(--neutral-50);
            color: var(--neutral-800);
            line-height: 1.6;
        }

        .container {
            max-width: 850px;
            margin: auto;
            background: #fff;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--neutral-100);
        }

        .lang-switch {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
            gap: 8px;
        }

        .lang-btn {
            padding: 6px 16px;
            font-size: 0.875rem;
            font-weight: 700;
            cursor: pointer;
            background-color: var(--neutral-100);
            color: var(--neutral-600);
            border: none;
            border-radius: 9999px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .lang-btn.active {
            background-color: var(--primary);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }

        h1 {
            font-size: 2rem;
            color: var(--neutral-900);
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 24px;
            line-height: 1.25;
        }

        h2 {
            font-size: 1.5rem;
            color: var(--neutral-900);
            font-weight: 700;
            margin-top: 32px;
            margin-bottom: 12px;
        }

        h3 {
            font-size: 1.15rem;
            color: var(--neutral-900);
            font-weight: 700;
            margin-top: 24px;
            margin-bottom: 12px;
        }

        p {
            margin: 12px 0;
            font-size: 1rem;
            color: var(--neutral-600);
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin-bottom: 24px;
        }

        ul li {
            position: relative;
            background: var(--neutral-50);
            margin: 8px 0;
            padding: 12px 16px 12px 40px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 500;
            border: 1px solid rgba(0,0,0,0.02);
            color: var(--neutral-700);
        }

        ul li::before {
            content: '✓';
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary);
            font-weight: 800;
            font-size: 1.1rem;
        }

        a.apply-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 700;
            border-bottom: 2px solid var(--primary-light);
            transition: all 0.2s;
        }

        a.apply-link:hover {
            color: var(--primary-hover);
            border-bottom-color: var(--primary);
        }

        .flyer {
            max-width: 100%;
            height: auto;
            border-radius: 16px;
            margin: 24px 0;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .back-button {
            margin-top: 32px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: var(--primary-light);
            color: var(--primary);
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .back-button:hover {
            background: var(--primary);
            color: white;
            transform: translateX(-4px);
        }

        .footer-logo {
            margin-top: 32px;
            border-top: 1px solid var(--neutral-100);
            padding-top: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="lang-switch">
            <button id="btn-id" class="lang-btn active" onclick="switchLang('id')">Indonesia</button>
            <button id="btn-en" class="lang-btn" onclick="switchLang('en')">English</button>
        </div>
        <div id="content-id">
            <h1>Lowongan Kerja ${data.posisi}</h1>
            <img src="${data.img_url}" alt="Flyer Lowongan ${data.posisi}" class="flyer">
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
            <p>Kirim CV atau portofolio ke PIC: ${data.pic_name} melalui <a href="${data.apply_url}" class="apply-link" target="_blank">link ini</a>.</p>
        </div>
        <div id="content-en" style="display:none;">
            <h1>Job Vacancy ${data.posisi}</h1>
            <img src="${data.img_url}" alt="Flyer Job Vacancy ${data.posisi}" class="flyer">
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
            <p>Send your CV or portfolio to PIC: ${data.pic_name} via <a href="${data.apply_url}" class="apply-link" target="_blank">this link</a>.</p>
        </div>

        <div class="footer-logo">
            <a href="https://imheroeskiller.github.io/FreeJobID" class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back to Home
            </a>
            <img src="https://imheroeskiller.github.io/FreeJobID/jobs/images/GOS.png" alt="We are hiring" width="120">
        </div>
    </div>
    <script>
        function switchLang(lang) {
            if(lang === 'id') {
                document.getElementById('content-id').style.display = 'block';
                document.getElementById('content-en').style.display = 'none';
                document.getElementById('btn-id').classList.add('active');
                document.getElementById('btn-en').classList.remove('active');
            } else {
                document.getElementById('content-id').style.display = 'none';
                document.getElementById('content-en').style.display = 'block';
                document.getElementById('btn-id').classList.remove('active');
                document.getElementById('btn-en').classList.add('active');
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
