document.addEventListener("DOMContentLoaded", () => {
  const link = document.querySelector("[data-cv-download]");
  if (!link) return;
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const originalLabel = link.innerHTML;
    link.setAttribute("aria-busy", "true");
    try {
      const response = await fetch("/assets/Gift-Kibet-CV.pdf.b64", { cache: "no-store" });
      if (!response.ok) throw new Error("CV file unavailable");
      const encoded = (await response.text()).trim();
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const download = document.createElement("a");
      download.href = url;
      download.download = "Gift-Kibet-CV.pdf";
      document.body.appendChild(download);
      download.click();
      download.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      link.textContent = "CV unavailable — please try again";
    } finally {
      link.removeAttribute("aria-busy");
      if (link.textContent === "CV unavailable — please try again") return;
      link.innerHTML = originalLabel;
    }
  });
});