const SAPA_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqQb9WnQ9IstihBNTaSSzc4mBzbd2fcSo3sXFQ8P8pc1khJpCZqh2h-CFt9iefumq_pw/exec";

module.exports = async (req, res) => {
  try {
    const action = (req.query && req.query.action) || "list";
    const url = SAPA_APPS_SCRIPT_URL + "?action=" + encodeURIComponent(action);

    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Gagal mengambil SAPA BALI:", error);
    res.status(500).json({
      ok: false,
      error: "Gagal mengambil data SAPA BALI"
    });
  }
};
