const state = {
  workspace: null,
  selectedBrandId: null,
  userId: null,
  currentOutput: null,
};

const els = {
  apiStatus: document.querySelector("#apiStatus"),
  brandSelect: document.querySelector("#brandSelect"),
  modeSelect: document.querySelector("#modeSelect"),
  campaignName: document.querySelector("#campaignName"),
  objective: document.querySelector("#objective"),
  theme: document.querySelector("#theme"),
  runButton: document.querySelector("#runButton"),
  outputStatus: document.querySelector("#outputStatus"),
  strategyBox: document.querySelector("#strategyBox"),
  traceBox: document.querySelector("#traceBox"),
  slidesGrid: document.querySelector("#slidesGrid"),
  captionBox: document.querySelector("#captionBox"),
  qualityScore: document.querySelector("#qualityScore"),
  feedback: document.querySelector("#feedback"),
  approveButton: document.querySelector("#approveButton"),
  changesButton: document.querySelector("#changesButton"),
  rejectButton: document.querySelector("#rejectButton"),
  refreshMemoryButton: document.querySelector("#refreshMemoryButton"),
  memoryList: document.querySelector("#memoryList"),
  insightsBox: document.querySelector("#insightsBox"),
};

async function boot() {
  await checkHealth();
  await loadWorkspace();
  bindEvents();
}

async function checkHealth() {
  try {
    const health = await api("/health");
    els.apiStatus.textContent = health.status === "ok" ? "API online" : "API instavel";
    els.apiStatus.classList.add("ok");
  } catch (_error) {
    els.apiStatus.textContent = "API offline";
    els.apiStatus.classList.add("error");
  }
}

async function loadWorkspace() {
  const { workspace } = await api("/workspace/current");
  state.workspace = workspace;
  state.userId = workspace?.users?.[0]?.user?.id ?? null;

  els.brandSelect.innerHTML = "";
  for (const brand of workspace?.brands ?? []) {
    const option = document.createElement("option");
    option.value = brand.id;
    option.textContent = brand.name;
    els.brandSelect.appendChild(option);
  }

  state.selectedBrandId = els.brandSelect.value;
  await loadMemory();
  await loadInsights();
}

function bindEvents() {
  els.brandSelect.addEventListener("change", async () => {
    state.selectedBrandId = els.brandSelect.value;
    await loadMemory();
    await loadInsights();
  });

  els.runButton.addEventListener("click", runCampaign);
  els.approveButton.addEventListener("click", () => submitApproval("approved"));
  els.changesButton.addEventListener("click", () => submitApproval("needs_changes"));
  els.rejectButton.addEventListener("click", () => submitApproval("rejected"));
  els.refreshMemoryButton.addEventListener("click", loadMemory);
}

async function runCampaign() {
  if (!state.userId) {
    setStatus("Usuario seed nao encontrado.");
    return;
  }

  setStatus("Criando campanha...");
  toggleApprovalButtons(false);

  const campaignPayload = {
    brandId: els.brandSelect.value,
    userId: state.userId,
    name: els.campaignName.value,
    objective: els.objective.value,
    theme: els.theme.value,
    mode: els.modeSelect.value,
  };

  const { campaign } = await api("/campaigns", {
    method: "POST",
    body: campaignPayload,
  });

  setStatus("Rodando Orchestrator...");
  const result = await api(`/campaigns/${campaign.id}/run`, {
    method: "POST",
  });

  state.currentOutput = result.output;
  renderOutput(result.output.content);
  renderTrace(result.orchestratorRun);
  toggleApprovalButtons(true);
  setStatus("Output gerado");
  await loadMemory();
  await loadInsights();
}

function renderTrace(run) {
  if (!run) {
    els.traceBox.className = "trace-box empty-state";
    els.traceBox.textContent = "Trace indisponivel.";
    return;
  }

  els.traceBox.classList.remove("empty-state");
  const decisions = run.decisions ?? [];
  const steps = run.steps ?? [];
  els.traceBox.innerHTML = `
    <strong>Como o Orchestrator decidiu</strong><br />
    Status: ${escapeHtml(run.status)} | ${escapeHtml(String(run.durationMs ?? 0))}ms
    <div class="trace-steps">
      ${steps
        .map(
          (step) => `
            <div class="trace-step">
              <span>${escapeHtml(step.name)}</span>
              <span>${escapeHtml(String(step.durationMs))}ms</span>
            </div>
            <div class="trace-decision">${escapeHtml(step.summary)}</div>
          `,
        )
        .join("")}
    </div>
    ${decisions
      .slice(0, 4)
      .map(
        (decision) => `
          <div class="trace-decision">
            <strong>${escapeHtml(decision.key)}:</strong> ${escapeHtml(formatDecisionValue(decision.value))}
            <br />${escapeHtml(decision.reason)}
          </div>
        `,
      )
      .join("")}
  `;
}

function renderOutput(content) {
  els.strategyBox.classList.remove("empty-state");
  els.strategyBox.innerHTML = `
    <strong>${escapeHtml(content.strategy.objective)}</strong><br />
    ${escapeHtml(content.strategy.insight)}<br /><br />
    <strong>Emocao:</strong> ${escapeHtml(content.strategy.emotion)}
  `;

  els.slidesGrid.innerHTML = "";
  for (const slide of content.creative.slides) {
    const card = document.createElement("article");
    card.className = "slide-card";
    card.innerHTML = `
      <div>
        <div class="slide-meta">
          <span>${slide.number}</span>
          <span>${escapeHtml(slide.intent)}</span>
        </div>
        <h3>${escapeHtml(slide.headline)}</h3>
        <p>${escapeHtml(slide.body)}</p>
      </div>
      <div class="slide-visual">${escapeHtml(slide.visualDirection)}</div>
    `;
    els.slidesGrid.appendChild(card);
  }

  els.captionBox.classList.remove("empty-state");
  els.captionBox.innerHTML = `
    <strong>Legenda</strong><br />
    ${escapeHtml(content.creative.caption).replaceAll("\n", "<br />")}<br /><br />
    <strong>CTA:</strong> ${escapeHtml(content.creative.cta)}<br />
    <strong>Hashtags:</strong> ${content.creative.hashtags.map(escapeHtml).join(" ")}
  `;
}

async function submitApproval(status) {
  if (!state.currentOutput) return;

  setStatus("Salvando feedback...");

  await api("/approvals", {
    method: "POST",
    body: {
      outputId: state.currentOutput.id,
      userId: state.userId,
      status,
      feedback: els.feedback.value,
      qualityScore: Number(els.qualityScore.value),
      whatChanged: status === "approved" ? "Aprovado pela interface MVP." : "Feedback registrado pela interface MVP.",
    },
  });

  setStatus(`Feedback salvo: ${status}`);
  toggleApprovalButtons(false);
  await loadMemory();
  await loadInsights();
}

async function loadMemory() {
  if (!state.selectedBrandId) return;

  try {
    const { events } = await api(`/memory/brand/${state.selectedBrandId}/events`);
    renderMemory(events);
  } catch (_error) {
    els.memoryList.textContent = "Nao foi possivel carregar a memoria.";
  }
}

async function loadInsights() {
  if (!state.selectedBrandId) return;

  try {
    const { insights } = await api(`/insights/brand/${state.selectedBrandId}`);
    renderInsights(insights);
  } catch (_error) {
    els.insightsBox.textContent = "Nao foi possivel carregar insights.";
  }
}

function renderInsights(insights) {
  const summary = insights?.summary;

  if (!summary) {
    els.insightsBox.className = "insights-box empty-state";
    els.insightsBox.textContent = "Sem dados suficientes ainda.";
    return;
  }

  els.insightsBox.className = "insights-box";
  const slowestSteps = insights.stepPerformance?.slice(0, 3) ?? [];
  els.insightsBox.innerHTML = `
    <div class="insight-grid">
      <div class="insight-card"><strong>${escapeHtml(String(summary.runs))}</strong><span>runs</span></div>
      <div class="insight-card"><strong>${escapeHtml(String(summary.approvalRate))}%</strong><span>aprovacao</span></div>
      <div class="insight-card"><strong>${escapeHtml(String(summary.averageRunMs))}ms</strong><span>tempo medio</span></div>
      <div class="insight-card"><strong>${escapeHtml(String(summary.averageQualityScore))}</strong><span>score medio</span></div>
    </div>
    <div class="step-list">
      ${slowestSteps
        .map(
          (step) => `
            <div>
              <span>${escapeHtml(step.name)}</span>
              <strong>${escapeHtml(String(step.averageMs))}ms</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderMemory(events) {
  if (!events?.length) {
    els.memoryList.className = "memory-list empty-state";
    els.memoryList.textContent = "Nenhum evento de memoria ainda.";
    return;
  }

  els.memoryList.className = "memory-list";
  els.memoryList.innerHTML = events
    .map((event) => {
      const score = event.payload?.qualityScore ?? "-";
      const schema = event.payload?.schemaVersion ?? event.payload?.contentSchemaVersion ?? "";
      return `
        <div class="memory-item">
          <strong>${escapeHtml(event.eventType)}</strong>
          <small>${new Date(event.createdAt).toLocaleString("pt-BR")} | score: ${escapeHtml(String(score))}</small>
          ${schema ? `<small>${escapeHtml(String(schema))}</small>` : ""}
        </div>
      `;
    })
    .join("");
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
}

function setStatus(message) {
  els.outputStatus.textContent = message;
}

function toggleApprovalButtons(enabled) {
  els.approveButton.disabled = !enabled;
  els.changesButton.disabled = !enabled;
  els.rejectButton.disabled = !enabled;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDecisionValue(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (value === null || value === undefined) {
    return "-";
  }

  return String(value);
}

boot().catch((error) => {
  console.error(error);
  els.apiStatus.textContent = "Erro na UI";
  els.apiStatus.classList.add("error");
});
