// Layer explorer
(function(){
  const GROUPS = [["Colour",[0,1]],["Thermal",[2,3]],["Multispectral",[4,5,6,7,8,9]],["LiDAR terrain",[10,11,12,13,14,15]]];
  const META = [
    ["Colour","Colour orthomosaic with the labelled modelling grid."],
    ["Ground truth","Orthomosaic with the georeferenced excavation plan used as ground truth."],
    ["Temperature","Surface temperature the morning after rain, 7.2–29.3 °C."],
    ["Anomalies","Thermal anomalies: points that depart sharply from their surroundings."],
    ["NDVI","NDVI, a measure of vegetation vigour."],
    ["NDRE","NDRE, a red-edge index sensitive to chlorophyll."],
    ["DVI","DVI, the difference vegetation index."],
    ["GRVI","GRVI, the green–red vegetation index."],
    ["MCARI","MCARI, a chlorophyll absorption index."],
    ["MSAVI2","MSAVI2, a vegetation index corrected for bare soil."],
    ["Slope","Slope from the LiDAR terrain model."],
    ["Curvature","Profile curvature, picking out breaks in slope along walls."],
    ["Eastness","Eastness, the east–west component of slope direction."],
    ["Northness","Northness, the north–south component of slope direction."],
    ["TPI fine","Fine topographic position: small rises and hollows."],
    ["TPI broad","Broad topographic position: the wider landform."]
  ];
  const SRC = window.LAYER_SRC || META.map((_, i) => "assets/img/layer-" + String(i+1).padStart(2,"0") + ".webp");
  const root = document.getElementById("explorer"); if (!root) return;
  const img = document.getElementById("layer-img"), cap = document.getElementById("layer-cap"), cnt = document.getElementById("layer-count");
  const holder = document.getElementById("groups"), buttons = [];
  SRC.forEach(s => { const p = new Image(); p.src = s; });
  GROUPS.forEach(([name, idx]) => {
    const g = document.createElement("div"); g.className = "group";
    const h = document.createElement("h4"); h.textContent = name; g.appendChild(h);
    const c = document.createElement("div"); c.className = "chips"; c.setAttribute("role","group"); c.setAttribute("aria-label", name + " layers");
    idx.forEach(i => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = META[i][0];
      b.setAttribute("aria-pressed","false"); b.setAttribute("aria-controls","layer-img");
      b.addEventListener("click", () => show(i)); c.appendChild(b); buttons[i] = b;
    });
    g.appendChild(c); holder.appendChild(g);
  });
  function show(i){
    img.src = SRC[i]; img.alt = "Thermi study area. " + META[i][1];
    cap.textContent = META[i][1]; cnt.textContent = "Layer " + (i+1) + " of 16.";
    buttons.forEach((b,k) => b.setAttribute("aria-pressed", k===i ? "true" : "false"));
  }
  root.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const cur = buttons.findIndex(b => b.getAttribute("aria-pressed")==="true");
    const n = (cur + (e.key==="ArrowRight" ? 1 : 15)) % 16; show(n); buttons[n].focus(); e.preventDefault();
  });
  show(2);
})();

// Full-size figure viewer
(function(){
  const dlg = document.getElementById("viewer"); if (!dlg || !dlg.showModal) return;
  const body = document.getElementById("viewer-body"), vimg = document.getElementById("viewer-img");
  const vcap = document.getElementById("viewer-cap"), fit = document.getElementById("viewer-fit");
  let opener = null;
  function setActual(on){ body.classList.toggle("actual", on); fit.setAttribute("aria-pressed", String(on)); fit.textContent = on ? "Fit to screen" : "Actual size"; }
  document.querySelectorAll(".zoom").forEach(btn => {
    btn.addEventListener("click", () => {
      opener = btn;
      const thumb = btn.querySelector("img");
      vimg.src = btn.dataset.full; vimg.alt = thumb ? thumb.alt : "";
      vcap.textContent = btn.dataset.caption || "";
      setActual(false); dlg.showModal();
    });
  });
  fit.addEventListener("click", () => setActual(!body.classList.contains("actual")));
  vimg.addEventListener("click", () => setActual(!body.classList.contains("actual")));
  document.getElementById("viewer-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => { vimg.src = ""; if (opener) opener.focus(); });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
})();
