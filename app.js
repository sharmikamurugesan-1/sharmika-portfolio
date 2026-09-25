/* ==========================================================================
   SHARMIKA MURUGESAN — PORTFOLIO CLIENT ENGINE
   Hyper3D Interactive Studio Simulator, Dynamic WhatsApp Builder, Form Validation,
   Project Filtering, and Scroll Effects.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initInteractiveStudio();
  initProjectFilter();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const nav = document.querySelector('.site-nav');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-drawer a');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      toggleBtn.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    });

    // Close mobile drawer when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Hyper3D Interactive Studio Simulation
   -------------------------------------------------------------------------- */
const STUDIO_TOOLS = {
  automation: {
    title: "InvoiceFlow Pipeline",
    engine: "Python 3.12 · PyMuPDF",
    defaultPrompt: "Extract vendor names, line items, totals, and invoice dates from 42 scanned PDFs into Excel.",
    chips: [
      "Process 42 vendor invoices",
      "Check duplicate invoice numbers",
      "Email accounting summary"
    ],
    executionLogs: [
      "[0.00s] Initializing PyMuPDF & OCR stream...",
      "[0.34s] Discovered 42 PDF files in incoming directory.",
      "[0.82s] Regex extracting: Vendor, Tax ID, Dates, Total Amounts...",
      "[1.15s] Duplicate check passed: 0 collision detected.",
      "[1.38s] Populating 'quarterly_invoices_report.xlsx' via OpenPyXL...",
      "[✓ COMPLETED in 1.42s] 42 records processed. Saved 3.8 hours of manual accounting!"
    ],
    latency: "142ms",
    stack: "PyMuPDF + Pandas"
  },
  rag: {
    title: "DocuMind RAG Assistant",
    engine: "FastAPI · FAISS · Claude API",
    defaultPrompt: "What is the penalty clause for late delivery in Section 4.2 of vendor_agreement.pdf?",
    chips: [
      "Query SLA refund terms",
      "Summarize liability limits",
      "Extract compliance checklist"
    ],
    executionLogs: [
      "[0.00s] Chunking vendor_agreement.pdf (148 pages)...",
      "[0.22s] Query vector embedding computed via text-embedding-3-small.",
      "[0.45s] FAISS similarity search retrieved top-4 relevant chunks (Score: 0.94).",
      "[0.88s] Context injected into prompt template with strict citation constraints.",
      "[1.32s] LLM synthesized response with exact page citations [Page 42, Clause 4.2].",
      "[✓ ANSWER] Late delivery incurs 1.5% penalty per week, capped at 10% total value."
    ],
    latency: "88ms",
    stack: "FAISS + FastAPI"
  },
  analytics: {
    title: "SalesPulse Dashboard Engine",
    engine: "Python · Pandas · Power BI",
    defaultPrompt: "Clean 1.2M raw POS sales transaction records and calculate regional MoM growth rates.",
    chips: [
      "Ingest 1.2M row CSV",
      "MoM regional growth",
      "Generate Power BI dataset"
    ],
    executionLogs: [
      "[0.00s] Reading 'transactions_2025.csv' using vectorized Pandas chunking...",
      "[0.41s] Imputed missing postal codes; normalized timestamps to UTC.",
      "[0.92s] Aggregated revenue by region & top-selling SKU category.",
      "[1.20s] Exported formatted dataset to SQLite & Power BI semantic model.",
      "[✓ INSIGHT] South region leads with +28.4% MoM growth. High-margin electronics up 14%."
    ],
    latency: "190ms",
    stack: "Pandas + SQLite"
  },
  scraping: {
    title: "PriceWatch 24/7 Tracker",
    engine: "Selenium · BeautifulSoup · SQLite",
    defaultPrompt: "Monitor 150 competitor e-commerce product URLs for price changes below ₹12,000 threshold.",
    chips: [
      "Track 150 competitor URLs",
      "Trigger price drop webhook",
      "Plot 30-day price history"
    ],
    executionLogs: [
      "[0.00s] Dispatching headless scrapers with User-Agent rotation...",
      "[0.55s] 150 endpoints polled. 148 HTTP 200 responses received.",
      "[0.98s] Price drop detected on SKU #8841: ₹14,999 ➔ ₹11,499 (-23.3%).",
      "[1.25s] Threshold rule triggered (Alert limit: ₹12,000).",
      "[✓ ALERT DISPATCHED] Instant alert sent to Telegram & Email in 1.3s."
    ],
    latency: "210ms",
    stack: "Scrapy + SQLite"
  },
  nlp: {
    title: "HireIQ Resume Matcher",
    engine: "Scikit-learn · TF-IDF · Flask",
    defaultPrompt: "Parse and rank 100 candidate resumes against Senior Python/AI Developer job description.",
    chips: [
      "Screen 100 candidate resumes",
      "Score skill fit percentage",
      "Export ranked shortlist"
    ],
    executionLogs: [
      "[0.00s] Parsing 100 PDF & DOCX candidate resumes...",
      "[0.38s] Extracted entities: Python, FastAPI, Docker, PyTorch, RAG architectures.",
      "[0.85s] Calculated TF-IDF cosine similarity against target job specification.",
      "[1.10s] Candidate score matrix generated (Top Match: 94.2% match rate).",
      "[✓ SHORTLIST READY] Top 10 shortlisted candidates compiled to Excel in 22 seconds!"
    ],
    latency: "115ms",
    stack: "Scikit-Learn + NLP"
  }
};

let currentStudioTool = 'automation';
let isRunningStudio = false;

function initInteractiveStudio() {
  const dockButtons = document.querySelectorAll('.dock-btn');
  const titleEl = document.getElementById('studioToolTitle');
  const engineEl = document.getElementById('studioToolEngine');
  const promptInput = document.getElementById('studioPromptInput');
  const chipsContainer = document.getElementById('studioPresetChips');
  const consoleEl = document.getElementById('studioOutputConsole');
  const generateBtn = document.getElementById('btnRunStudio');
  const latencyBadge = document.getElementById('studioLatencyBadge');
  const stackBadge = document.getElementById('studioStackBadge');

  if (!dockButtons.length || !promptInput) return;

  function loadTool(toolKey) {
    currentStudioTool = toolKey;
    const tool = STUDIO_TOOLS[toolKey];
    if (!tool) return;

    // Update active dock state
    dockButtons.forEach(btn => {
      if (btn.dataset.tool === toolKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update UI elements
    titleEl.textContent = tool.title;
    engineEl.textContent = tool.engine;
    promptInput.value = tool.defaultPrompt;
    latencyBadge.textContent = tool.latency;
    stackBadge.textContent = tool.stack;

    // Render chips
    chipsContainer.innerHTML = '';
    tool.chips.forEach((chipText, idx) => {
      const chip = document.createElement('button');
      chip.className = `preset-chip ${idx === 0 ? 'active' : ''}`;
      chip.textContent = chipText;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        promptInput.value = chipText;
      });
      chipsContainer.appendChild(chip);
    });

    // Reset console
    consoleEl.innerHTML = `
      <div class="console-line">
        <span style="color:var(--text-muted);">$</span>
        <span>Ready. Click [EXECUTE PIPELINE] to test live simulation.</span>
      </div>
    `;
  }

  // Bind dock clicks
  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRunningStudio) return;
      loadTool(btn.dataset.tool);
    });
  });

  // Run execution
  generateBtn.addEventListener('click', () => {
    if (isRunningStudio) return;
    isRunningStudio = true;
    generateBtn.style.opacity = '0.6';
    generateBtn.textContent = 'RUNNING PIPELINE...';

    const tool = STUDIO_TOOLS[currentStudioTool];
    consoleEl.innerHTML = '';

    tool.executionLogs.forEach((log, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'console-line';
        if (log.startsWith('[✓')) {
          line.classList.add('success');
        } else if (log.includes('extracted') || log.includes('retrieved')) {
          line.classList.add('accent');
        }
        line.innerHTML = `<span>${log}</span>`;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;

        if (index === tool.executionLogs.length - 1) {
          isRunningStudio = false;
          generateBtn.style.opacity = '1';
          generateBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            EXECUTE PIPELINE
          `;
        }
      }, (index + 1) * 380);
    });
  });

  // Initialize with automation
  loadTool('automation');
}

/* --------------------------------------------------------------------------
   3. Project Category Filter
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.case-study-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filterCategory === 'all' || card.dataset.category.includes(filterCategory)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & Dynamic WhatsApp Builder
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  const whatsappBtn = document.getElementById('secondaryWhatsAppBtn');
  const statusBanner = document.getElementById('formSubmissionStatus');

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const emailInput = document.getElementById('emailAddress');
  const serviceSelect = document.getElementById('serviceType');
  const budgetSelect = document.getElementById('projectBudget');
  const timelineSelect = document.getElementById('preferredTimeline');
  const descTextarea = document.getElementById('projectDescription');

  // Dynamically update WhatsApp URL with pre-filled content
  function updateWhatsAppUrl() {
    if (!whatsappBtn) return;
    const name = nameInput.value.trim() || 'Visitor';
    const service = serviceSelect.value || 'General Inquiry';
    const budget = budgetSelect.value || 'To be discussed';
    const timeline = timelineSelect.value || 'Flexible';
    const desc = descTextarea.value.trim() || 'I would like to discuss a freelance project.';

    const message = `Hi Sharmika! I'm ${name}.\nI'm interested in: ${service}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject details:\n${desc}`;
    const encoded = encodeURIComponent(message);
    // User can customize their actual phone number here
    whatsappBtn.href = `https://wa.me/91XXXXXXXXXX?text=${encoded}`;
  }

  // Listen to input changes to update WhatsApp link live
  [nameInput, phoneInput, emailInput, serviceSelect, budgetSelect, timelineSelect, descTextarea].forEach(el => {
    if (el) el.addEventListener('input', updateWhatsAppUrl);
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.form-err-msg').forEach(msg => msg.textContent = '');

    // Full Name check
    if (!nameInput.value.trim()) {
      document.getElementById('errName').textContent = 'Please enter your full name.';
      isValid = false;
    }

    // Phone / WhatsApp check
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
      document.getElementById('errPhone').textContent = 'Please provide a valid phone or WhatsApp number with country code.';
      isValid = false;
    }

    // Email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      document.getElementById('errEmail').textContent = 'Please provide a valid email address.';
      isValid = false;
    }

    // Service check
    if (!serviceSelect.value) {
      document.getElementById('errService').textContent = 'Please select a service type.';
      isValid = false;
    }

    // Description check
    if (!descTextarea.value.trim() || descTextarea.value.trim().length < 15) {
      document.getElementById('errDesc').textContent = 'Please provide at least 15 characters describing your project problem.';
      isValid = false;
    }

    if (isValid) {
      const submitBtn = form.querySelector('.btn-form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Details...';
      submitBtn.disabled = true;

      setTimeout(() => {
        statusBanner.className = 'form-submission-status success';
        statusBanner.innerHTML = `
          <strong>✓ Thank you, ${nameInput.value.trim()}!</strong><br>
          Your project inquiry has been recorded. Sharmika will review your details and reply within 24 hours.
        `;
        submitBtn.innerHTML = 'Sent Successfully ✓';
        form.reset();
        updateWhatsAppUrl();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 4000);
      }, 700);
    }
  });

  // Initial WhatsApp URL update
  updateWhatsAppUrl();
}
