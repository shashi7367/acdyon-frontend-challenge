// Portlight Landing Page Interactivity
// Built to demonstrate actual product interactions honestly and robustly.

// Global State
let logs = [];
let filteredLogs = [];
let nextLogId = 1;
let isCaptureActive = true;
let activePortFilter = 'all';
let activeStatusFilter = 'all';
let activeSearchQuery = '';
let captureIntervalId = null;
let activeSelectedLogId = null;
let activeInspectorTab = 'headers';

// Preset Request Logs for Realistic Simulation
const mockRequestTemplates = [
  // Port 3000 (React App)
  {
    port: '3000',
    method: 'GET',
    path: '/',
    status: 200,
    statusText: 'OK',
    size: '14.2 KB',
    reqHeaders: {
      'Host': 'localhost:3000',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0'
    },
    resHeaders: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Content-Length': '14528',
      'Date': '',
      'Server': 'Webpack Dev Server',
      'ETag': 'W/"38a-18e3ab03e91"'
    },
    body: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <title>React App</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>`
  },
  {
    port: '3000',
    method: 'GET',
    path: '/static/js/main.chunk.js',
    status: 200,
    statusText: 'OK',
    size: '412.5 KB',
    reqHeaders: {
      'Host': 'localhost:3000',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      'Accept': '*/*',
      'Referer': 'http://localhost:3000/'
    },
    resHeaders: {
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Content-Length': '422400',
      'Server': 'Webpack Dev Server',
      'Cache-Control': 'no-store'
    },
    body: `// Webpack Bundle\n(this.webpackJsonp_mewo = this.webpackJsonp_mewo || []).push([["main"], {\n  "./src/index.js": (function(module, exports) {\n     console.log("React initialized");\n  })\n}]);`
  },
  {
    port: '3000',
    method: 'GET',
    path: '/static/css/main.css',
    status: 304,
    statusText: 'Not Modified',
    size: '0 B',
    reqHeaders: {
      'Host': 'localhost:3000',
      'If-None-Match': 'W/"cf3-18e2ebcd194"',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    resHeaders: {
      'Server': 'Webpack Dev Server',
      'ETag': 'W/"cf3-18e2ebcd194"',
      'Date': ''
    },
    body: null
  },
  
  // Port 8000 (Django API)
  {
    port: '8000',
    method: 'POST',
    path: '/api/v1/auth/token',
    status: 200,
    statusText: 'OK',
    size: '348 B',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://localhost:3000'
    },
    resHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '348',
      'Server': 'WSGIServer/0.2 CPython/3.10.5',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    body: {
      token_type: "Bearer",
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3ODkyNzYwMDB9.h2B9k8...",
      refresh_token: "rF79aB28mD90asJ...",
      user: {
        id: 1,
        email: "dev@portlight.dev",
        role: "administrator"
      }
    }
  },
  {
    port: '8000',
    method: 'GET',
    path: '/api/v1/projects',
    status: 200,
    statusText: 'OK',
    size: '1.8 KB',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Accept': 'application/json'
    },
    resHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '1824',
      'Server': 'WSGIServer/0.2 CPython/3.10.5'
    },
    body: [
      { id: 1, name: "Portlight CLI", status: "active", created_at: "2026-08-10T10:00:00Z" },
      { id: 2, name: "Documentation Portal", status: "planning", created_at: "2026-08-14T15:30:00Z" },
      { id: 3, name: "Marketing Homepage", status: "in-progress", created_at: "2026-08-18T18:00:00Z" }
    ]
  },
  {
    port: '8000',
    method: 'POST',
    path: '/api/v1/projects',
    status: 201,
    statusText: 'Created',
    size: '620 B',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Content-Type': 'application/json'
    },
    resHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '620',
      'Server': 'WSGIServer/0.2 CPython/3.10.5'
    },
    body: {
      id: 4,
      name: "Stripe Webhook Integration",
      status: "planning",
      created_at: "2026-08-19T00:05:00Z"
    }
  },
  {
    port: '8000',
    method: 'GET',
    path: '/api/v1/users/admin',
    status: 403,
    statusText: 'Forbidden',
    size: '94 B',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Accept': 'application/json'
    },
    resHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '94',
      'Server': 'WSGIServer/0.2 CPython/3.10.5'
    },
    body: {
      detail: "You do not have permission to perform this action.",
      error_code: "PERMISSION_DENIED"
    }
  },
  {
    port: '8000',
    method: 'GET',
    path: '/api/v1/missing-endpoint',
    status: 404,
    statusText: 'Not Found',
    size: '72 B',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Accept': 'application/json'
    },
    resHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '72',
      'Server': 'WSGIServer/0.2 CPython/3.10.5'
    },
    body: {
      detail: "The requested resource could not be found on this server."
    }
  },
  {
    port: '8000',
    method: 'POST',
    path: '/api/v1/upload',
    status: 500,
    statusText: 'Internal Server Error',
    size: '1.2 KB',
    reqHeaders: {
      'Host': 'localhost:8000',
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxk Tr'
    },
    resHeaders: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': '1240',
      'Server': 'WSGIServer/0.2 CPython/3.10.5'
    },
    body: `<h1>Internal Server Error</h1>\n<p>Traceback (most recent call last):</p>\n<p>  File "./api/views.py", line 42, in upload_handler</p>\n<p>    uploaded_file = request.FILES['file']</p>\n<p>MultiValueDictKeyError: 'file'</p>`
  }
];

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Populate initial logs to start with a realistic-looking dashboard
  generateInitialLogs(6);
  
  // Start simulation loop
  startCaptureLoop();
  
  // Listen for Konami Code
  initKonamiCode();
  
  // Update port statistics counters
  updatePortCounters();
});

// Mock Log Generator
function generateInitialLogs(count) {
  for (let i = 0; i < count; i++) {
    createNewLog();
  }
  renderLogs();
}

function startCaptureLoop() {
  if (captureIntervalId) clearInterval(captureIntervalId);
  
  // Generate a new request log every 2.5 to 5 seconds dynamically
  captureIntervalId = setInterval(() => {
    if (isCaptureActive) {
      const newLog = createNewLog();
      renderLogs();
      updatePortCounters();
      
      // Stream new log to terminal emulator
      streamToTerminal(newLog);
    }
  }, Math.random() * 2500 + 2500);
}

function createNewLog() {
  const template = mockRequestTemplates[Math.floor(Math.random() * mockRequestTemplates.length)];
  const latency = Math.floor(Math.random() * 80) + (template.status >= 500 ? 150 : 2); // Error statuses are slower
  
  const now = new Date();
  const timestampStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
  
  // Construct dynamic timestamp inside response headers
  const resHeadersCopy = { ...template.resHeaders };
  resHeadersCopy['Date'] = now.toUTCString();
  
  const newLog = {
    id: nextLogId++,
    port: template.port,
    method: template.method,
    path: template.path,
    status: template.status,
    statusText: template.statusText,
    latency: latency + ' ms',
    size: template.size,
    timestamp: timestampStr,
    reqHeaders: template.reqHeaders,
    resHeaders: resHeadersCopy,
    body: template.body
  };
  
  // Add to start of array
  logs.unshift(newLog);
  
  // Cap logs length at 50
  if (logs.length > 50) {
    logs.pop();
  }
  
  return newLog;
}

// Log UI Rendering
function renderLogs() {
  const tbody = document.getElementById('log-tbody');
  if (!tbody) return;
  
  // Filter logs based on filters active
  filteredLogs = logs.filter(log => {
    // Port filter
    if (activePortFilter !== 'all' && log.port !== activePortFilter) return false;
    
    // Status filter
    if (activeStatusFilter !== 'all') {
      const statusGroup = activeStatusFilter[0]; // '2', '3', '4', '5'
      if (Math.floor(log.status / 100) !== parseInt(statusGroup)) return false;
    }
    
    // Search query path filter
    if (activeSearchQuery && !log.path.toLowerCase().includes(activeSearchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Render Rows
  tbody.innerHTML = '';
  
  const noLogsMsg = document.getElementById('no-logs-msg');
  if (filteredLogs.length === 0) {
    noLogsMsg.classList.remove('hidden');
  } else {
    noLogsMsg.classList.add('hidden');
    
    filteredLogs.forEach(log => {
      const tr = document.createElement('tr');
      tr.id = `log-row-${log.id}`;
      if (activeSelectedLogId === log.id) {
        tr.classList.add('active-row');
      }
      
      tr.onclick = () => selectLog(log.id);
      
      const methodBadgeClass = log.method.toLowerCase();
      const statusClass = `status-${Math.floor(log.status / 100)}xx`;
      
      tr.innerHTML = `
        <td><span class="method-badge ${methodBadgeClass}">${log.method}</span></td>
        <td class="status-cell ${statusClass}">${log.status}</td>
        <td style="color: var(--text-primary); font-weight: 500;">${log.path}</td>
        <td style="color: var(--text-muted); font-size: 11px;">:${log.port}</td>
        <td style="text-align: right; color: var(--text-secondary);">${log.latency}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// Stats & Sidebar Counters Update
function updatePortCounters() {
  const countAll = logs.length;
  const count3000 = logs.filter(l => l.port === '3000').length;
  const count8000 = logs.filter(l => l.port === '8000').length;
  
  document.getElementById('port-count-all').innerText = countAll;
  document.getElementById('port-count-3000').innerText = count3000;
  document.getElementById('port-count-8000').innerText = count8000;
}

// User Action Handlers in App Mockup
function toggleCapture() {
  const btn = document.getElementById('capture-toggle');
  const text = document.getElementById('capture-status-text');
  
  isCaptureActive = !isCaptureActive;
  
  if (isCaptureActive) {
    btn.className = 'app-action-btn active';
    text.innerText = 'Capture Active';
    startCaptureLoop();
  } else {
    btn.className = 'app-action-btn paused';
    text.innerText = 'Capture Paused';
    if (captureIntervalId) clearInterval(captureIntervalId);
  }
}

function clearLogs() {
  logs = [];
  filteredLogs = [];
  activeSelectedLogId = null;
  
  // Close inspector drawer
  const drawer = document.getElementById('inspector-drawer');
  drawer.className = 'inspector-drawer empty';
  drawer.querySelector('.inspector-empty-state').classList.remove('hidden');
  drawer.querySelector('.inspector-content').classList.add('hidden');
  
  renderLogs();
  updatePortCounters();
}

function selectPort(port) {
  activePortFilter = port;
  
  // Update UI active state
  const portItems = document.querySelectorAll('.port-item');
  portItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Highlight active
  event.currentTarget.classList.add('active');
  
  renderLogs();
}

function setStatusFilter(status) {
  activeStatusFilter = status;
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-status') === status) {
      btn.classList.add('active');
    }
  });
  
  renderLogs();
}

function filterLogs() {
  const query = document.getElementById('log-search').value;
  activeSearchQuery = query;
  renderLogs();
}

// Inspector logic
function selectLog(id) {
  activeSelectedLogId = id;
  
  // Highlight row in table
  const rows = document.querySelectorAll('#log-tbody tr');
  rows.forEach(row => row.classList.remove('active-row'));
  
  const selectedRow = document.getElementById(`log-row-${id}`);
  if (selectedRow) selectedRow.classList.add('active-row');
  
  const log = logs.find(l => l.id === id);
  if (!log) return;
  
  // Populate inspector details
  const drawer = document.getElementById('inspector-drawer');
  drawer.className = 'inspector-drawer'; // remove .empty
  
  drawer.querySelector('.inspector-empty-state').classList.add('hidden');
  drawer.querySelector('.inspector-content').classList.remove('hidden');
  
  // Title & Headers
  const methodEl = document.getElementById('inspect-method');
  methodEl.innerText = log.method;
  methodEl.className = `method-badge ${log.method.toLowerCase()}`;
  
  document.getElementById('inspect-path').innerText = log.path;
  
  const statusEl = document.getElementById('inspect-status');
  statusEl.innerText = `${log.status} ${log.statusText}`;
  
  // Set class based on status group
  const group = Math.floor(log.status / 100);
  if (group === 2) statusEl.className = 'status-indicator success';
  else if (group === 3) statusEl.className = 'status-indicator redirect';
  else if (group === 4) statusEl.className = 'status-indicator client-error';
  else statusEl.className = 'status-indicator error';
  
  document.getElementById('inspect-duration').innerText = log.latency;
  document.getElementById('inspect-size').innerText = log.size;
  document.getElementById('inspect-time').innerText = log.timestamp;
  
  // Headers Populating
  const reqBody = document.getElementById('request-headers-body');
  reqBody.innerHTML = '';
  Object.keys(log.reqHeaders).forEach(key => {
    reqBody.innerHTML += `
      <tr>
        <td>${key}</td>
        <td>${log.reqHeaders[key]}</td>
      </tr>
    `;
  });
  
  const resBody = document.getElementById('response-headers-body');
  resBody.innerHTML = '';
  Object.keys(log.resHeaders).forEach(key => {
    resBody.innerHTML += `
      <tr>
        <td>${key}</td>
        <td>${log.resHeaders[key]}</td>
      </tr>
    `;
  });
  
  // Body formatting
  const jsonPre = document.getElementById('json-body-pre');
  if (log.body === null) {
    jsonPre.innerText = '(Empty payload)';
  } else if (typeof log.body === 'object') {
    jsonPre.innerText = JSON.stringify(log.body, null, 2);
  } else {
    // If it's HTML or text payload string
    jsonPre.innerText = log.body;
  }
  
  // Switch to current active tab panel
  switchInspectorTab(activeInspectorTab);
}

function closeInspector() {
  activeSelectedLogId = null;
  renderLogs();
  
  const drawer = document.getElementById('inspector-drawer');
  drawer.className = 'inspector-drawer empty';
  drawer.querySelector('.inspector-empty-state').classList.remove('hidden');
  drawer.querySelector('.inspector-content').classList.add('hidden');
}

function switchInspectorTab(tab) {
  activeInspectorTab = tab;
  
  // Update Tab buttons active styling
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText.toLowerCase().includes(tab)) {
      btn.classList.add('active');
    }
  });
  
  // Update Tab panels
  document.getElementById('panel-headers').className = 'tab-panel' + (tab === 'headers' ? ' active' : '');
  document.getElementById('panel-body').className = 'tab-panel' + (tab === 'body' ? ' active' : '');
}

// Tunnel Simulation Toggle
function toggleTunnel(checkbox) {
  const details = document.getElementById('tunnel-details');
  const urlInput = document.getElementById('tunnel-url');
  
  if (checkbox.checked) {
    details.className = 'tunnel-details active';
    urlInput.value = 'Connecting tunnel...';
    
    // Simulate HTTP socket shake hands
    setTimeout(() => {
      if (checkbox.checked) {
        urlInput.value = 'https://share.portlight.dev/mock-tunnel-4a8f';
      }
    }, 800);
  } else {
    details.className = 'tunnel-details inactive';
  }
}

function copyTunnelUrl(btn) {
  const urlInput = document.getElementById('tunnel-url');
  navigator.clipboard.writeText(urlInput.value).then(() => {
    const originalSvg = btn.innerHTML;
    btn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    setTimeout(() => {
      btn.innerHTML = originalSvg;
    }, 1500);
  });
}

// Terminal Output Simulator
function streamToTerminal(log) {
  const termBody = document.getElementById('terminal-body');
  if (!termBody) return;
  
  // Translate properties to terminal formats
  const methodLabel = log.method.toUpperCase().padEnd(4, ' ');
  const methodClass = log.method.toLowerCase();
  
  const statusGroup = Math.floor(log.status / 100);
  const statusClass = `status-${log.status}`;
  
  const newLine = document.createElement('div');
  newLine.className = 'terminal-line-stream';
  newLine.innerHTML = `
    <span class="method ${methodClass}">${methodLabel}</span> ${log.path.padEnd(22, ' ')} <span class="${statusClass}">${log.status} ${log.statusText}</span> <span class="time">${log.latency}</span>
  `;
  
  // Insert before the blinking cursor
  const cursor = document.getElementById('terminal-streaming-cursor');
  termBody.insertBefore(newLine, cursor);
  
  // Cap lines to prevent infinite terminal length (keep last 12 outputs)
  const streamLines = termBody.querySelectorAll('.terminal-line-stream');
  if (streamLines.length > 10) {
    // Leave the cursor alone, remove the oldest stream line
    termBody.removeChild(streamLines[0]);
  }
}

// General CLI Copy Buttons Actions
function copyBrewCommand(btn) {
  const cmd = "brew install portlight-cli";
  navigator.clipboard.writeText(cmd).then(() => {
    const originalContent = btn.innerHTML;
    btn.classList.add('copied-feedback');
    btn.innerHTML = `
      <code>Copied CLI!</code>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    setTimeout(() => {
      btn.classList.remove('copied-feedback');
      btn.innerHTML = originalContent;
    }, 2000);
  });
}

function copyBrewCommandFooter(btn) {
  const cmd = "brew install portlight-cli";
  navigator.clipboard.writeText(cmd).then(() => {
    const span = btn.querySelector('span');
    const originalText = span.innerText;
    span.innerText = "Copied!";
    btn.style.backgroundColor = "var(--accent-green)";
    btn.style.color = "var(--bg-base)";
    
    setTimeout(() => {
      span.innerText = originalText;
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }, 2000);
  });
}

// Mobile Responsive Navigation Toggle
function toggleMobileMenu() {
  const header = document.querySelector('.main-header');
  header.classList.toggle('menu-open');
}

// Konami Code Easter Egg (ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a)
function initKonamiCode() {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let inputSequence = [];
  
  window.addEventListener('keydown', (e) => {
    inputSequence.push(e.key);
    
    // Truncate sequence buffer to match Konami size
    if (inputSequence.length > konamiSequence.length) {
      inputSequence.shift();
    }
    
    // Check match
    if (JSON.stringify(inputSequence) === JSON.stringify(konamiSequence)) {
      showKonamiOverlay();
      inputSequence = []; // Reset after trigger
    }
  });
}

function showKonamiOverlay() {
  const overlay = document.getElementById('konami-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

function closeKonamiOverlay() {
  const overlay = document.getElementById('konami-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}
