/* ============================================================
   SITE CONFIG: edit these values, then save.
   The resume does not list a GitHub URL, so set yours here.
   Example: "https://github.com/your-username"
   ============================================================ */
const CONFIG = {
  githubUrl: "",  // <- paste your GitHub profile URL here
  linkedinUrl: "https://www.linkedin.com/in/vaibhav-dhebe-4882492b2",
  email: "vaibhavx08@gmail.com"
};

(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------- Apply link config ---------- */
  if (CONFIG.githubUrl) {
    $$('[data-link="github"]').forEach(a => (a.href = CONFIG.githubUrl));
  }
  $$('[data-link="linkedin"]').forEach(a => (a.href = CONFIG.linkedinUrl));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = $("#themeBtn");
  function syncThemeLabel() {
    const dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  syncThemeLabel();
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeLabel();
  });

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const menu = $("#menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", e => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
  });

  /* ---------- Scroll progress, nav shadow, active link ---------- */
  const nav = $("#nav");
  const progress = $("#progress");
  const links = $$("a", menu);
  const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- Architecture diagram (built from my projects) ---------- */
  const NODES = {
    elb:  { t: "Elastic Load Balancer", d: "Configured an Elastic Load Balancer with target groups to distribute traffic across EC2 instances, then tested load distribution through the Load Balancer endpoint." },
    ec2a: { t: "EC2 instance", d: "Deployed application workloads on EC2 instances, registered them as backend targets, and controlled traffic with security group rules." },
    ec2b: { t: "EC2 instance", d: "Deployed application workloads on EC2 instances, registered them as backend targets, and controlled traffic with security group rules." },
    cw:   { t: "CloudWatch and SNS", d: "Monitored CPU utilization with CloudWatch, created alarms on thresholds, and used SNS for automated notifications. Validated alerts with a controlled workload." }
  };
  const info = $("#archInfo");
  const nodeBtns = $$(".node");
  function pick(btn) {
    nodeBtns.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    const n = NODES[btn.dataset.node];
    info.innerHTML = "";
    const s = document.createElement("strong");
    s.textContent = n.t + ": ";
    info.append(s, document.createTextNode(n.d));
  }
  nodeBtns.forEach(b => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => pick(b));
  });

  /* ---------- Skill filter ---------- */
  const tabs = $$("#skillTabs button");
  const chips = $$("#chips .chip");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", String(t === tab)));
      const f = tab.dataset.filter;
      chips.forEach(c => {
        const show = f === "all" || c.dataset.cat === f;
        c.classList.toggle("hide", !show);
        if (show) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
      });
    });
  });

  /* ---------- Project cards: show more ---------- */
  $$(".more").forEach(btn => {
    btn.addEventListener("click", () => {
      const extra = btn.nextElementSibling;
      const open = extra.hasAttribute("hidden");
      if (open) extra.removeAttribute("hidden"); else extra.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Show less" : "Show more";
    });
  });

  /* ---------- Copy buttons ---------- */
  $$(".copy").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied: " + text);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); showToast("Copied: " + text); }
        catch (err) { showToast("Copy failed. Please copy it manually."); }
        ta.remove();
      }
    });
  });

  /* ---------- Contact form -> opens the visitor's email app ---------- */
  const form = $("#form");
  const err = $("#formErr");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#fName").value.trim();
    const email = $("#fEmail").value.trim();
    const msg = $("#fMsg").value.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !okEmail || !msg) {
      err.textContent = !name ? "Enter your name." : !okEmail ? "Enter a valid email address." : "Write a message.";
      err.hidden = false;
      return;
    }
    err.hidden = true;
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
    window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
    showToast("Opening your email app");
  });
})();
