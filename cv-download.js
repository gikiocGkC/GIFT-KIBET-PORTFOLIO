document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll("[data-cv-download]")];
  if (!links.length) return;

  let status = document.getElementById("cv-download-status");
  if (!status) {
    status = document.createElement("span");
    status.id = "cv-download-status";
    status.className = "visually-hidden";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    document.body.append(status);
  }

  links.forEach((link) => {
    const originalLabel = link.innerHTML;
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      links.forEach((item) => item.setAttribute("aria-busy", "true"));
      status.textContent = "Preparing your CV download.";

      try {
        const response = await fetch("/assets/Gift-Kibet-CV.pdf.b64");
        if (!response.ok) throw new Error("CV file unavailable");

        const encoded = (await response.text()).replace(/\\s/g, "");
        if (!encoded.startsWith("JVBER")) throw new Error("Invalid CV file");

        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        const blob = new Blob([bytes], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        const download = document.createElement("a");
        download.href = objectUrl;
        download.download = "Gift-Kibet-CV.pdf";
        download.hidden = true;
        document.body.append(download);
        download.click();
        download.remove();
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
        status.textContent = "Your CV download has started.";
      } catch (error) {
        status.textContent = "The CV could not be downloaded. Please try again later.";
        link.textContent = "CV unavailable — please try again";
        window.setTimeout(() => { link.innerHTML = originalLabel; }, 5000);
      } finally {
        links.forEach((item) => item.removeAttribute("aria-busy"));
      }
    });
  });
});