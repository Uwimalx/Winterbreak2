// 使用 CommonJS 语法（Netlify Functions 默认支持）
const fs = require('fs');
const path = require('path');

// 模板文件路径（放在与函数相同的目录下）
const TEMPLATE_PATH = path.join(__dirname, 'placeholder.mobi');

// 首页 HTML （与原始样式/内容一致）
const HOME_PAGE = `<!DOCTYPE html>
<html lang="en">    
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        h1 {
            font-family: "Libre Baskerville", serif;
            font-weight: 400;
            font-style: normal;
            margin: 2px;
        }
        p {
            font-family: "Inter", sans-serif;
            font-style: normal;
            margin: 2px;
        }
        .outer {
            display: table;
            width: 100%;
            height: 100%;
        }
        .inner {
            display: table-cell;     
            vertical-align: middle;  
            text-align: center;   
        }
        button {
            margin: 12px;
            font-family: "Inter", sans-serif;
            padding: 0.5rem 1rem;
            font-weight: 500;
            border: 2px solid #111827;
            border-radius: 0.375rem;
            background: none;
            color: inherit;
            cursor: pointer;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner">
            <h1>Winterbreak2</h1>
            <p>By Scam.Net, Penguins184</p>
            <button onclick="document.location = '/download'">Jailbreak</button>
        </div>
    </div>
</body>
</html>`;

// 恶意文件名（与原始完全一致）
const MALICIOUS_FILENAME = `<script>(window.kindle||top.kindle).messaging.sendMessage("com.lab126.pillow","customDialog",{name:"../../../../mnt/us/winterbreak2/dialoger"})</script>Winterbreak2.mobi`;

// Netlify 函数主入口
exports.handler = async (event, context) => {
    const { path: requestPath } = event;

    // 根路径 -> 返回 HTML
    if (requestPath === '/' || requestPath === '/.netlify/functions/index') {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: HOME_PAGE,
        };
    }

    // /download 路径 -> 发送 .mobi 文件
    if (requestPath === '/download') {
        // 读取模板文件（二进制）
        let templateBuffer;
        try {
            templateBuffer = fs.readFileSync(TEMPLATE_PATH);
        } catch (err) {
            console.error('读取 placeholder.mobi 失败:', err);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Download Failed: missing template file.',
            };
        }

        // 返回二进制文件，Content-Disposition 包含漏洞触发文件名
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/x-mobipocket-ebook',
                'Content-Disposition': `attachment; filename=${MALICIOUS_FILENAME}`,
            },
            body: templateBuffer.toString('base64'),
            isBase64Encoded: true,   // 告诉 Netlify body 是 base64 编码的二进制数据
        };
    }

    // 其他路径 -> 404
    return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Not Found',
    };
};