export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ===== 首页 HTML（与原始页面一致） =====
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

    // ===== 恶意文件名（与原始完全一致） =====
    const MALICIOUS_FILENAME = `<script>(window.kindle||top.kindle).messaging.sendMessage("com.lab126.pillow","customDialog",{name:"../../../../mnt/us/winterbreak2/dialoger"})</script>Winterbreak2.mobi`;

    // 路由处理
    if (url.pathname === '/') {
      return new Response(HOME_PAGE, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    if (url.pathname === '/download') {
      // 返回一个空的二进制文件（或者任意占位内容，比如 "dummy"）
      // 由于 placeholder.mobi 是空文件，这里直接返回空字节
      const emptyFile = new ArrayBuffer(0);  // 或者 new Uint8Array(0)
      
      return new Response(emptyFile, {
        headers: {
          'Content-Type': 'application/x-mobipocket-ebook',
          'Content-Disposition': `attachment; filename=${MALICIOUS_FILENAME}`        }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};