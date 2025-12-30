const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

function isValidTarget(target) {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/;
    const ipRangePattern = /^(\d{1,3}\.){3}\d{1,3}-\d{1,3}$/;
    const hostnamePattern = /^[a-zA-Z0-9][a-zA-Z0-9\-\.]*[a-zA-Z0-9]$/;
    return ipPattern.test(target) || ipRangePattern.test(target) || hostnamePattern.test(target);
}

function sanitizeInput(input) {
    return input.replace(/[;&|`$(){}[\]<>'"\\]/g, '');
}

app.post('/api/scan', (req, res) => {
    const { target, scanType, ports, serviceDetection, osDetection, scripts } = req.body;

    if (!target || !isValidTarget(target)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid target. Please enter a valid IP address, range, or hostname.'
        });
    }

    const sanitizedTarget = sanitizeInput(target);
    let nmapCommand = 'nmap';

    switch(scanType) {
        case 'syn': nmapCommand += ' -sS'; break;
        case 'tcp': nmapCommand += ' -sT'; break;
        case 'udp': nmapCommand += ' -sU'; break;
        case 'comprehensive': nmapCommand += ' -A'; break;
        case 'quick': nmapCommand += ' -F'; break;
    }

    if (ports && ports.trim()) {
        nmapCommand += ` -p ${sanitizeInput(ports)}`;
    }
    if (serviceDetection) nmapCommand += ' -sV';
    if (osDetection) nmapCommand += ' -O';
    if (scripts && scripts.trim()) {
        nmapCommand += ` --script=${sanitizeInput(scripts)}`;
    }

    nmapCommand += ` ${sanitizedTarget}`;
    console.log('Executing:', nmapCommand);

    exec(nmapCommand, { timeout: 300000, maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
        if (error && !stdout) {
            return res.status(500).json({
                success: false,
                error: 'Scan failed. Ensure Nmap is installed and you have necessary permissions.'
            });
        }
        res.json({
            success: true,
            results: stdout || stderr,
            command: nmapCommand,
            timestamp: new Date().toISOString()
        });
    });
});

app.get('/api/health', (req, res) => {
    exec('nmap --version', (error, stdout) => {
        if (error) {
            return res.json({ status: 'error', message: 'Nmap not installed' });
        }
        const version = stdout.match(/Nmap version ([\d.]+)/);
        res.json({ status: 'ok', version: version ? version[1] : 'unknown' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Nmap Web Scanner running on http://localhost:${PORT}`);
});
