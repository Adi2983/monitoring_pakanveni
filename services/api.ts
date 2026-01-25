
import { FeedData } from '../types';

// IMPORTANT: In a real scenario, you would replace this URL with your published Google Apps Script Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbxvxpLedQk_nWNxz5HF5lKVjqEE9DiTMptyjQl2r7MNzdaWy9CqFdFuEkuPSEvWjq41/exec';

// Mock data for initial development or if API is not yet published
const MOCK_DATA: FeedData[] = [
  {
    tanggal: '2023-10-25',
    toko: 'Poultry Sejahtera',
    lokasi: 'Malang',
    jenis: 'Pakan Ayam Petelur',
    merek: 'Charoen Pokphand',
    batch: 'B-123 / 2024-10-25',
    kondisiFisik: 'Baik, Butiran Utuh',
    jamur: 'Tidak',
    kadarAir: 12.5,
    kemasan: 'Karung Rapi',
    palet: 'Ya',
    hasil: 'Layak',
    tindakLanjut: '-',
    keterangan: 'Stok baru masuk',
    // Added missing 'harga' property
    harga: 325000,
  },
  {
    tanggal: '2023-10-24',
    toko: 'Toko Ternak Jaya',
    lokasi: 'Kediri',
    jenis: 'Bahan Pakan Jagung',
    merek: 'Lokal',
    batch: '2024-05-10',
    kondisiFisik: 'Sedikit Berdebu',
    jamur: 'Tidak',
    kadarAir: 14.2,
    kemasan: 'Karung Bekas',
    palet: 'Tidak',
    hasil: 'Tindak Lanjut',
    tindakLanjut: 'Gunakan segera, jangan simpan lama',
    keterangan: 'Kualitas jagung medium',
    // Added missing 'harga' property
    harga: 185000,
  },
  {
    tanggal: '2023-10-20',
    toko: 'Gudang Pakan Mandiri',
    lokasi: 'Blitar',
    jenis: 'Konsentrat Sapi',
    merek: 'Cargill',
    batch: 'C-990 / 2024-01-15',
    kondisiFisik: 'Berbau Apek, Menggumpal',
    jamur: 'Ya',
    kadarAir: 18.0,
    kemasan: 'Sobek Kecil',
    palet: 'Tidak',
    hasil: 'Tidak Layak',
    tindakLanjut: 'Retur ke Supplier',
    keterangan: 'Ditemukan di sudut gudang lembab',
    // Added missing 'harga' property
    harga: 210000,
  },
  {
    tanggal: '2023-10-28',
    toko: 'Central Poultry',
    lokasi: 'Malang',
    jenis: 'Pakan Ayam Broiler',
    merek: 'Japfa Comfeed',
    batch: 'J-551 / 2024-11-01',
    kondisiFisik: 'Kering, Bau Segar',
    jamur: 'Tidak',
    kadarAir: 11.8,
    kemasan: 'Premium Sealed',
    palet: 'Ya',
    hasil: 'Layak',
    tindakLanjut: '-',
    keterangan: 'Kualitas sangat baik',
    // Added missing 'harga' property
    harga: 340000,
  }
];

export const fetchFeedData = async (): Promise<FeedData[]> => {
  try {
    if (API_URL.includes('REPLACE_WITH_YOUR_ID')) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return loadFromCacheOrMock();
    }

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    localStorage.setItem('feed_data_cache', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return loadFromCacheOrMock();
  }
};

const loadFromCacheOrMock = (): FeedData[] => {
  const cached = localStorage.getItem('feed_data_cache');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      return MOCK_DATA;
    }
  }
  return MOCK_DATA;
};
