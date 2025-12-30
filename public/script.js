const helpBtn = document.getElementById('helpBtn');
const closeBtn = document.getElementById('closeBtn');
const helpSection = document.getElementById('helpSection');
const scanForm = document.getElementById('scanForm');
const scanBtn = document.getElementById('scanBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const results = document.getElementById('results');
const resultsText = document.getElementById('resultsText');
const scanInfo = document.getElementById('scanInfo');
const copyBtn = document.getElementById('copyBtn');
const status = document.getElementById('status');

helpBtn.addEventListener('click', () => {
    helpSection.style.display = 'block';
    helpSection.scrollIntoView({ behavior: 'smooth' });
});

closeBtn.addEventListener('click', () => {
    helpSection.style.display = 'none';
});

async function checkNmap() {
    try {
        const res = await fetch('/api/health');
        const data = await res.json();
        if (data.status === 'ok') {
            status.textContent = `✓ Nmap ${data.version} - Ready`;
            status.className = 'status ok';
        } else {
            status.textContent = '✗ Nmap not installed';
            status.className = 'status error';
            scanBtn.disabled = true;
        }
    } catch {
        status.textContent = '✗ Server error';
        status.className = 'status error';
    }
}

checkNmap();

scanForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        target: document.getElementById('target').value.trim(),
        scanType: document.getElementById('scanType').value,
        ports: document.getElementById('ports').value.trim(),
        scripts: document.getElementById('scripts').value.trim(),
        serviceDetection: document.getElementById('serviceDetection').checked,
        osDetection: document.getElementById('osDetection').checked
    };

    scanBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    results.style.display = 'none';

    try {
        const res = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            resultsText.textContent = data.results;
            scanInfo.innerHTML = `
                <p><strong>Target:</strong> ${formData.target}</p>
                <p><strong>Command:</strong> ${data.command}</p>
                <p><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            `;
            results.style.display = 'block';
            results.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Scan failed: ' + data.error);
        }
    } catch (err) {
        alert('Network error: ' + err.message);
    } finally {
        scanBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultsText.textContent).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = original, 2000);
    });
});
