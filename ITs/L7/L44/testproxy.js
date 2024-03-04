const fs = require('fs');
const http = require('http');

// Membaca file proxy.txt
fs.readFile('proxyy.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const proxies = data.split('\n').filter(proxy => proxy.trim() !== ''); // Memisahkan setiap baris proxy
    let liveCount = 0;
    let deadCount = 0;

    proxies.forEach(proxy => {
        const [host, port] = proxy.split(':');
        
        const options = {
            host: host,
            port: port,
            timeout: 5000 // Timeout dalam milidetik
        };

        const req = http.request(options, (res) => {
            console.log(`Proxy ${host}:${port} hidup.`);
            liveCount++;
        });

        req.on('error', (err) => {
            console.log(`Proxy ${host}:${port} mati.`);
            deadCount++;
        });

        req.end();
    });

    console.log(`Jumlah proxy yang hidup: ${liveCount}`);
    console.log(`Jumlah proxy yang mati: ${deadCount}`);
});