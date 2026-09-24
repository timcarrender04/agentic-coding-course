(function () {
  const form = document.getElementById("signup-form");
  const status = document.getElementById("status");
  const body = document.getElementById("roster-body");

  function setStatus(msg, isError) {
    status.textContent = msg || "";
    status.classList.toggle("error", !!isError);
  }

  function renderRows(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
      body.innerHTML = '<tr><td colspan="2">No signups yet.</td></tr>';
      return;
    }
    body.innerHTML = rows
      .map(function (row) {
        const name = row.name || "";
        const email = row.email || "";
        return (
          "<tr><td>" +
          escapeHtml(name) +
          "</td><td>" +
          escapeHtml(email) +
          "</td></tr>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function loadRoster() {
    const res = await fetch("/api/signups");
    if (!res.ok) {
      throw new Error("GET /api/signups failed (" + res.status + ")");
    }
    const data = await res.json();
    renderRows(data);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    setStatus("Saving…", false);
    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error("POST failed (" + res.status + ") " + text);
      }
      form.reset();
      setStatus("Added.", false);
      await loadRoster();
    } catch (err) {
      setStatus(err.message, true);
    }
  });

  loadRoster().catch(function (err) {
    body.innerHTML =
      '<tr><td colspan="2">Could not load roster. Is the API running?</td></tr>';
    setStatus(err.message, true);
  });
})();
