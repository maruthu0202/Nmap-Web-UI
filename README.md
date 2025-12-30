# Nmap-Web-UI
Here’s a concise, ready‑to‑paste README content tailored to your Nmap Web Scanner project.

---

# 🔍 Nmap Web Scanner (Web UI)

A modern, browser‑based interface for the **Nmap** network scanner that lets you run and visualize network scans without touching the terminal. Built by **Maruthu B (maruthu0202)**.

***

## ✨ Overview

This project wraps the Nmap CLI in a clean web interface so you can:

- Enter targets (IP, hostname, ranges, subnets) from the browser  
- Choose scan types (SYN, TCP, UDP, comprehensive, quick)  
- Configure ports, NSE scripts, service and OS detection  
- View formatted Nmap output directly in the UI  
- Copy results for reports or further analysis  

It is designed for **learning, lab environments, and authorized security testing**.

***

## 🛠 Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Scanner Engine:** Nmap (installed on the host)  

***

## 📦 Features

- Modern dark‑themed UI with responsive layout  
- Multiple scan modes: default, SYN, TCP connect, UDP, quick, comprehensive  
- Optional port ranges, script selection, service (`-sV`) and OS (`-O`) detection  
- Real‑time scan output panel with command preview  
- Copy‑to‑clipboard button for scan results  
- Built‑in “How to use” section with Nmap examples  
- Health‑check endpoint to verify Nmap installation  

***

## 🔧 Requirements

- Node.js (recommended: latest LTS)  
- npm  
- Nmap installed and available in your PATH  

Check Nmap:

```bash
nmap --version
```

***

## 🚀 Getting Started

```bash
# Clone this repository
git clone https://github.com/maruthu0202/nmap-web-scanner.git
cd nmap-web-scanner

# Install dependencies
npm install

# Start the server
npm start
```

Then open:

```text
http://localhost:3002
```

***

## 🎯 How to Use

1. **Target**  
   - Single IP: `192.168.1.10`  
   - Range: `192.168.1.1-50`  
   - Subnet: `192.168.1.0/24`  
   - Hostname: `example.com`  

2. **Scan Type**  
   - Default – standard scan (top 1000 ports)  
   - SYN Stealth (`-sS`) – fast, requires root  
   - TCP Connect (`-sT`) – no special privileges  
   - UDP (`-sU`) – UDP ports (slower)  
   - Comprehensive (`-A`) – OS, version, scripts, traceroute  
   - Quick (`-F`) – top 100 ports  

3. **Ports (optional)**  
   - Examples: `22,80,443` or `1-1000` or `22,80,443,8000-9000`  

4. **NSE Scripts (optional)**  
   - Examples: `vuln`, `default`, `http-enum,http-title`  

5. **Extra Options**  
   - Service/Version Detection (`-sV`)  
   - OS Detection (`-O`)  

Click **Start Scan** to run, then review the results panel and copy if needed.

***

## 🔒 Security & Ethics

- Only scan **hosts and networks you own or have explicit permission to test**.  
- Some scan types (SYN, OS detection, some scripts) require **sudo/root**.  
- This tool executes Nmap on the server side; deploy it only in **trusted environments**, ideally on internal networks.  

***

## 🐞 Troubleshooting

- **“Nmap not installed”** – install Nmap and ensure it’s in PATH, then restart the server.  
- **Port already in use** – change the port in `server.js` (`const PORT = 3002;`) or stop the other process.  
- **No styles / broken UI** – check that `index.html`, `style.css`, and `script.js` are in the `public/` folder and that static files are served from there.  

***

## 📌 Roadmap

- Authentication for the web UI  
- Scan history and export (JSON/HTML/PDF)  
- Docker image for easy deployment  
- Real‑time scan progress (WebSocket)  
- Dashboard with aggregated stats  

***

## 🤝 Contributing

Contributions, ideas, and bug reports are welcome.

1. Fork the repo  
2. Create a branch: `git checkout -b feature/my-feature`  
3. Commit: `git commit -m "Add my feature"`  
4. Push: `git push origin feature/my-feature`  
5. Open a pull request  

***

mage.jpg)
[2](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/85861353/2565faf1-c383-4709-a081-f8ae60849519/image.jpg)
