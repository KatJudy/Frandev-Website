(async function () {
  const cacheBust = new URLSearchParams(window.location.search).get("preview") || Date.now();

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setAllText(selector, value) {
    if (typeof value !== "string") return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function createTileIcon() {
    const icon = document.createElement("div");
    icon.className = "tile-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = "<span></span><span></span><span></span><span></span>";
    return icon;
  }

  function renderBullets(items) {
    return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderMetrics(items) {
    return (items || [])
      .map((item) => `<li><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></li>`)
      .join("");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function imageUrl(path) {
    return `url("${String(path || "").replaceAll('"', "%22")}")`;
  }

  function applyContent(content) {
    if (!content) return;

    if (content.seo) {
      document.title = content.seo.title || document.title;
      const description = document.querySelector('meta[name="description"]');
      if (description && content.seo.description) {
        description.setAttribute("content", content.seo.description);
      }
    }

    if (content.global?.primaryCta) {
      setAllText('.button[data-cta]:not([data-cta="hero-learn-about-the-model"])', content.global.primaryCta);
      setText(".mobile-cta", "Request Info");
    }

    if (content.images?.hero) {
      const hero = document.querySelector(".hero");
      if (hero) {
        hero.style.background = `linear-gradient(90deg, rgba(28, 41, 74, 0.94), rgba(28, 41, 74, 0.72) 44%, rgba(28, 41, 74, 0.18)), ${imageUrl(content.images.hero)} center / cover`;
      }
    }

    if (content.images?.model) {
      const panel = document.querySelector(".image-panel");
      if (panel) panel.style.backgroundImage = imageUrl(content.images.model);
    }

    const photoTiles = document.querySelectorAll(".photo-strip div");
    if (photoTiles[0] && content.images?.growthPrimary) {
      photoTiles[0].style.backgroundImage = imageUrl(content.images.growthPrimary);
    }
    if (photoTiles[1] && content.images?.growthSecondary) {
      photoTiles[1].style.backgroundImage = imageUrl(content.images.growthSecondary);
    }

    setText(".hero .eyebrow", content.hero?.eyebrow);
    setText("#hero-title", content.hero?.title);
    setText(".hero-copy", content.hero?.body);
    setText('.button[data-cta="hero-learn-about-the-model"]', content.hero?.secondaryCta);
    setText("#quick-form-title", content.hero?.formTitle);
    setText("#qualification > p", content.hero?.formBody);
    setText("#qualification .form-note", content.hero?.formNote);

    const heroProof = document.querySelector(".hero-proof");
    if (heroProof && Array.isArray(content.hero?.proof)) {
      heroProof.innerHTML = content.hero.proof
        .map(
          (item) => `
            <div class="proof-item">
              <span class="proof-number">${escapeHtml(item.number)}</span>
              <span class="proof-label">${escapeHtml(item.label)}</span>
            </div>
          `,
        )
        .join("");
    }

    setText("#why-title", content.why?.title);
    setText('section[aria-labelledby="why-title"] .eyebrow', content.why?.eyebrow);
    setText('section[aria-labelledby="why-title"] .section-header > p', content.why?.body);
    setText('a[data-cta="why-request-franchise-information"] + .cta-note', content.why?.ctaNote);

    const featureGrid = document.querySelector(".feature-grid");
    if (featureGrid && Array.isArray(content.why?.features)) {
      featureGrid.innerHTML = "";
      content.why.features.forEach((feature) => {
        const article = document.createElement("article");
        article.className = "feature";
        article.appendChild(createTileIcon());
        article.insertAdjacentHTML(
          "beforeend",
          `<h3>${escapeHtml(feature.title)}</h3><p>${escapeHtml(feature.body)}</p>`,
        );
        featureGrid.appendChild(article);
      });
    }

    setText("#details-title", content.details?.title);
    setText('section[aria-labelledby="details-title"] .eyebrow', content.details?.eyebrow);
    setText('section[aria-labelledby="details-title"] .lead-box h3', content.details?.formTitle);
    setText('a[data-cta="details-request-franchise-information"] + .cta-note', content.details?.ctaNote);
    setText(".disclaimer", content.details?.disclaimer);

    const accordionWrap = document.querySelector(".accordion-wrap");
    if (accordionWrap && Array.isArray(content.details?.panels)) {
      accordionWrap.innerHTML = content.details.panels
        .map(
          (panel, index) => `
            <details id="${escapeHtml(panel.id)}" ${index === 0 ? "open" : ""}>
              <summary>${escapeHtml(panel.title)}</summary>
              <div class="accordion-content">
                <div>
                  <p>${escapeHtml(panel.body)}</p>
                  <ul class="check-list">${renderBullets(panel.bullets)}</ul>
                </div>
                <ul class="metric-list" aria-label="${escapeHtml(panel.title)} metrics">
                  ${renderMetrics(panel.metrics)}
                </ul>
              </div>
            </details>
          `,
        )
        .join("");
    }

    setText("#model-title", content.model?.title);
    setText('section[aria-labelledby="model-title"] .eyebrow', content.model?.eyebrow);
    setText('section[aria-labelledby="model-title"] .split > div:last-child > p:not(.eyebrow)', content.model?.body);
    const modelList = document.querySelector('section[aria-labelledby="model-title"] .check-list');
    if (modelList && Array.isArray(content.model?.bullets)) {
      modelList.innerHTML = renderBullets(content.model.bullets);
    }
    setText('a[data-cta="model-request-franchise-information"] + .cta-note', content.model?.ctaNote);

    setText("#growth-title", content.growth?.title);
    setText('section[aria-labelledby="growth-title"] .eyebrow', content.growth?.eyebrow);
    setText('section[aria-labelledby="growth-title"] .section-header > p', content.growth?.body);
    setText('a[data-cta="growth-request-franchise-information"] + .cta-note', content.growth?.ctaNote);

    setText("#leadership-title", content.leadership?.title);
    setText("#leadership .eyebrow", content.leadership?.eyebrow);
    setText("#leadership .section-header > p", content.leadership?.body);
    setText('a[data-cta="leadership-request-franchise-information"] + .cta-note', content.leadership?.ctaNote);
    const teamGrid = document.querySelector(".team-grid");
    if (teamGrid && Array.isArray(content.leadership?.people)) {
      teamGrid.innerHTML = content.leadership.people
        .map(
          (person) => `
            <article class="team-card">
              <h3>${escapeHtml(person.name)}</h3>
              <span class="team-role">${escapeHtml(person.role)}</span>
              <p>${escapeHtml(person.bio)}</p>
            </article>
          `,
        )
        .join("");
    }

    setText("#apply-title", content.contact?.title);
    setText("#apply .eyebrow", content.contact?.eyebrow);
    setText("#apply .cta-inner > div > p:not(.eyebrow)", content.contact?.body);
    setText("#apply .cta-note", content.contact?.note);
    setText("#apply .form-note", content.contact?.formNote);

    const footerSpans = document.querySelectorAll(".footer-inner span");
    if (footerSpans[0] && content.footer?.copyright) footerSpans[0].textContent = content.footer.copyright;
    if (footerSpans[1] && content.footer?.legal) footerSpans[1].textContent = content.footer.legal;
  }

  try {
    const response = await fetch(`content.json?v=${cacheBust}`);
    if (!response.ok) return;
    applyContent(await response.json());
  } catch (error) {
    // The page still works from the hard-coded HTML when opened directly from Finder.
  }
})();
