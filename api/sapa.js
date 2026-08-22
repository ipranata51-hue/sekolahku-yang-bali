const REPO = 'ipranata51-hue/sekolahku-yang-bali';
const GH_API = `https://api.github.com/repos/${REPO}`;

function json(res, status, body) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return json(res, 500, { error: 'Server belum dikonfigurasi untuk menerima SAPA BALI.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const nama = String(body.nama || '').trim();
    const status = String(body.status || '').trim();
    const pesan = String(body.pesan || '').trim();
    const website = String(body.website || '').trim();

    // Honeypot sederhana untuk bot.
    if (website) return json(res, 200, { ok: true });

    if (!nama || !pesan) return json(res, 400, { error: 'Nama dan saran/pandangan wajib diisi.' });
    if (nama.length > 80 || pesan.length > 3000) return json(res, 400, { error: 'Data terlalu panjang.' });

    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };

    const issueBody = [
      `**Pengirim:** ${nama}`,
      '',
      `**Sebagai:** ${status || 'Lainnya'}`,
      '',
      '**Saran & Pandangan:**',
      pesan,
      '',
      '---',
      'Dikirim melalui website Sekolahku yang BALI.',
      '',
      '> Status awal: MENUNGGU MODERASI. Issue ditutup otomatis agar belum tampil di website.'
    ].join('\n');

    const created = await fetch(`${GH_API}/issues`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: `SAPA BALI — ${nama}`,
        body: issueBody
      })
    });

    const issue = await created.json();
    if (!created.ok) {
      console.error('GitHub create issue:', issue);
      return json(res, created.status >= 400 && created.status < 500 ? created.status : 502, { error: 'SAPA BALI gagal disimpan.' });
    }

    // Moderasi: issue baru langsung ditutup. Pengelola membuka kembali issue
    // yang disetujui; halaman publik hanya membaca issue yang masih terbuka.
    const closed = await fetch(`${GH_API}/issues/${issue.number}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ state: 'closed', state_reason: 'not_planned' })
    });

    if (!closed.ok) console.error('GitHub close issue:', await closed.text());

    return json(res, 201, { ok: true, message: 'SAPA BALI diterima.', issue: issue.number });
  } catch (error) {
    console.error('SAPA BALI endpoint:', error);
    return json(res, 500, { error: 'Terjadi kesalahan pada server.' });
  }
};
