
/**
 * TAHAP 1: SETUP OTOMATIS
 * Jalankan fungsi 'setupSheet' ini satu kali di editor Apps Script 
 * untuk membuat struktur tabel otomatis sesuai urutan kolom yang diminta.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  sheet.setName("Data Pakan");
  
  const headers = [
    "Tanggal Pemeriksaan",     // Index 0 (A)
    "Nama Toko/Poultry",       // Index 1 (B) -> toko
    "Lokasi Poultry",     // Index 2 (C) -> lokasi
    "Jenis Pakan / Bahan Pakan",// Index 3 (D) -> jenis
    "Merek Pakan",             // Index 4 (E) -> merek
    "Nomor Batch / Expired Date",// Index 5 (F) -> batch
    "Kondisi Fisik Pakan",      // Index 6 (G)
    "Indikasi Jamur (Ya/Tidak)", // Index 7 (H)
    "Kandungan Kadar Air Pakan", // Index 8 (I)
    "Kondisi Kemasan",          // Index 9 (J)
    "Penyimpanan Pakai Palet (Ya/Tidak)", // Index 10 (K)
    "Hasil Pemeriksaan (Layak/Tidak)",    // Index 11 (L)
    "Tindak Lanjut",            // Index 12 (M)
    "Keterangan",               // Index 13 (N)
    "Harga (Rp)"                // Index 14 (O)
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground("#16a34a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
  
  const sampleData = [
    ["2024-01-15", "Toko Makmur Jaya", "Malang", "Pakan Ayam", "CP 511", "EXP: 12/2024", "Bagus", "Tidak", 12.5, "Utuh", "Ya", "Layak", "-", "Stok Baru", 12500],
    ["2024-01-16", "Poultry Kediri", "Kediri", "Jagung Giling", "Lokal", "EXP: 06/2024", "Sedikit Lembab", "Ya", 18.2, "Rusak", "Tidak", "Tidak Layak", "Segera Retur", "Ditemukan jamur halus", 8500]
  ];
  
  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log("Setup Berhasil! Toko (Kolom B) dan Lokasi (Kolom C) telah dikunci.");
}

/**
 * TAHAP 2: API ENDPOINT
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) return ContentService.createTextOutput("[]").setMimeType(ContentService.MimeType.JSON);

    const rows = data.slice(1);
    
    // PEMETAAN BERDASARKAN INDEKS KOLOM (Sangat Akurat)
    const result = rows.map(row => {
      let tanggalVal = row[0];
      if (tanggalVal instanceof Date) {
        tanggalVal = Utilities.formatDate(tanggalVal, "GMT+7", "yyyy-MM-dd");
      }

      return {
        tanggal: tanggalVal || "",
        toko: row[1] || "",          // KOLOM B (Index 1)
        lokasi: row[2] || "",        // KOLOM C (Index 2)
        jenis: row[3] || "",         // KOLOM D
        merek: row[4] || "",         // KOLOM E
        batch: row[5] || "",         // KOLOM F
        kondisiFisik: row[6] || "",
        jamur: row[7] || "Tidak",
        kadarAir: row[8] || 0,
        kemasan: row[9] || "",
        palet: row[10] || "Tidak",
        hasil: row[11] || "Layak",
        tindakLanjut: row[12] || "",
        keterangan: row[13] || "",
        harga: row[14] || 0          // KOLOM O (Index 14)
      };
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
