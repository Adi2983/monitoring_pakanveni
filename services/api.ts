
import { FeedData } from '../types';

const API_URL = 'https://script.google.com/macros/s/AKfycbxvxpLedQk_nWNxz5HF5lKVjqEE9DiTMptyjQl2r7MNzdaWy9CqFdFuEkuPSEvWjq41/exec';

const MOCK_DATA: FeedData[] = [
  {
    tanggal: '2023-10-25',
    toko: 'Poultry Sejahtera',
    lokasi: 'Malang',
    jenis: 'Pakan Ayam Petelur',
    merek: 'Charoen Pokphand',
    npp: 'RI. I. 2304123',
    batch: 'B-123 / 2024-10-25',
    kondisiFisik: 'Baik, Butiran Utuh',
    jamur: 'Tidak',
    kadarAir: 12.5,
    nutrisi: 'Protein 18%, Lemak 3%',
    kemasan: 'Karung Rapi',
    palet: 'Ya',
    hasil: 'Layak',
    tindakLanjut: '-',
    keterangan: 'Stok baru masuk',
    harga: 325000,
  }
];

export const fetchFeedData = async (): Promise<FeedData[]> => {
  try {
    if (API_URL.includes('REPLACE_WITH_YOUR_ID')) {
      return MOCK_DATA;
    }

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    localStorage.setItem('feed_data_cache', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    const cached = localStorage.getItem('feed_data_cache');
    return cached ? JSON.parse(cached) : MOCK_DATA;
  }
};
