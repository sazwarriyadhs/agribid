
/**
 * DEPRECATED: This file is being replaced by a direct database connection.
 * The logic below is preserved for reference but is no longer in use.
 * All components have been updated to point to placeholder data.
 * You should implement your database queries (e.g., using Prisma)
 * and replace the placeholder data in the respective components.
 */

/*
export interface Product {
    id: string;
    name: string;
    name_id: string;
    status: 'Active' | 'Ended' | 'Pending' | 'Rejected';
    status_id: 'Aktif' | 'Selesai' | 'Menunggu' | 'Ditolak';
    image: string;
    aiHint: string;
    seller: string;
    seller_id: string;
    currentBid: number;
    bidders?: { name: string, bid: number, avatar: string }[];
    description: string;
    category: string;
    quantity: string;
    shelfLife: string;
    packaging: string;
}

const productsByRole = {
  petani: [
    { id: 'PROD-P01', name: 'Padi Organik', name_id: 'Padi Organik', status: 'Active', status_id: 'Aktif', stock: '15 Ton', category: 'Grains', description: 'Padi organik varietas unggul dari sawah subur.', price: 500, seller: 'Petani Jaya' },
    { id: 'PROD-P02', name: 'Cabai Merah Keriting', name_id: 'Cabai Merah Keriting', status: 'Ended', status_id: 'Selesai', stock: '500 Kg', category: 'Fruits & Vegetables', description: 'Cabai merah keriting segar, tingkat kepedasan tinggi.', price: 200, seller: 'Petani Jaya' },
    { id: 'PROD-P03', name: 'Jagung Manis', name_id: 'Jagung Manis', status: 'Pending', status_id: 'Menunggu', stock: '5 Ton', category: 'Fruits & Vegetables', description: 'Jagung manis kualitas ekspor.', price: 150, seller: 'Petani Jaya' },
  ],
  nelayan: [
    { id: 'PROD-N01', name: 'Tuna Sirip Kuning Segar', name_id: 'Tuna Sirip Kuning Segar', status: 'Active', status_id: 'Aktif', stock: '2 Ton', category: 'Marine Fishery', description: 'Tuna segar, ditangkap secara berkelanjutan.', price: 8000, seller: 'Nelayan Makmur' },
    { id: 'PROD-N02', name: 'Cumi-cumi Beku', name_id: 'Cumi-cumi Beku', status: 'Active', status_id: 'Aktif', stock: '1.5 Ton', category: 'Marine Fishery', description: 'Cumi-cumi beku, kualitas ekspor.', price: 3000, seller: 'Nelayan Makmur' },
    { id: 'PROD-N03', name: 'Lobster Mutiara Hidup', name_id: 'Lobster Mutiara Hidup', status: 'Ended', status_id: 'Selesai', stock: '300 Kg', category: 'Marine Fishery', description: 'Lobster mutiara hidup untuk pasar premium.', price: 25000, seller: 'Nelayan Makmur' },
  ],
  peternak: [
    { id: 'PROD-T01', name: 'Sapi Limousin', name_id: 'Sapi Limousin', status: 'Active', status_id: 'Aktif', stock: '20 Ekor', category: 'Livestock', description: 'Sapi limousin jantan, berat rata-rata 500kg.', price: 10000, seller: 'Peternak Sentosa' },
    { id: 'PROD-T02', name: 'Ayam Broiler', name_id: 'Ayam Broiler', status: 'Pending', status_id: 'Menunggu', stock: '500 Ekor', category: 'Livestock', description: 'Ayam broiler siap potong, berat rata-rata 1.5kg.', price: 1000, seller: 'Peternak Sentosa' },
    { id: 'PROD-T03', name: 'Susu Sapi Segar', name_id: 'Susu Sapi Segar', status: 'Ended', status_id: 'Selesai', stock: '1000 Liter', category: 'Livestock', description: 'Susu sapi segar hasil pemerahan pagi.', price: 500, seller: 'Peternak Sentosa' },
  ],
  'pengolah-hasil-hutan': [
    { id: 'PROD-H01', name: 'Kayu Jati Gelondongan', name_id: 'Kayu Jati Gelondongan', status: 'Active', status_id: 'Aktif', stock: '10 m³', category: 'Forestry Products', description: 'Kayu jati gelondongan dari hutan rakyat terverifikasi.', price: 7000, seller: 'Hutan Lestari' },
    { id: 'PROD-H02', name: 'Getah Pinus', name_id: 'Getah Pinus', status: 'Ended', status_id: 'Selesai', stock: '5 Ton', category: 'Forestry Products', description: 'Getah pinus kualitas super.', price: 1200, seller: 'Hutan Lestari' },
  ],
  peladang: [
     { id: 'PROD-L01', name: 'Kopi Robusta Lampung', name_id: 'Kopi Robusta Lampung', status: 'Active', status_id: 'Aktif', stock: '5 Ton', category: 'Plantation', description: 'Biji kopi robusta Lampung, petik merah.', price: 2500, seller: 'Ladang Subur' },
     { id: 'PROD-L02', name: 'Biji Kelapa Sawit', name_id: 'Biji Kelapa Sawit', status: 'Pending', status_id: 'Menunggu', stock: '20 Ton', category: 'Plantation', description: 'Tandan buah segar (TBS) kelapa sawit.', price: 4000, seller: 'Ladang Subur' },
  ],
  'green-valley-farms': [
      { id: '1', name: 'Organic Wheat Harvest', name_id: 'Panen Gandum Organik', status: 'Active', status_id: 'Aktif', stock: '10 Ton', category: 'Grains', description: 'High quality wheat', price: 4500, seller: 'Green Valley Farms' }
  ]
};

const initialProducts: Product[] = Object.values(productsByRole).flat().map(p => ({
    id: p.id,
    name: p.name,
    name_id: p.name_id,
    status: p.status as Product['status'],
    status_id: p.status_id as Product['status_id'],
    image: `https://placehold.co/600x400.png?text=${p.name.replace(/ /g, '+')}`,
    aiHint: p.name.toLowerCase(),
    seller: p.seller,
    seller_id: p.seller,
    currentBid: p.price,
    bidders: [],
    description: p.description,
    category: p.category,
    quantity: p.stock,
    shelfLife: 'N/A',
    packaging: 'N/A'
}));


// This acts as a simple in-memory, observable database for our products.
class ProductDatabase {
    private products: Product[];
    private subscribers: (() => void)[] = [];

    constructor() {
        this.products = initialProducts;
    }

    private notifySubscribers() {
        this.subscribers.forEach(cb => cb());
    }

    subscribe(callback: () => void): () => void {
        this.subscribers.push(callback);
        // Return an unsubscribe function
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    getProducts(): Product[] {
        return this.products;
    }
    
    getProductById(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    getProductsByStatus(status: Product['status']): Product[] {
        return this.products.filter(p => p.status === status);
    }

    addProduct(productData: Partial<Product>) {
        const newProduct: Product = {
            id: `PROD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            name: productData.name || 'Untitled Product',
            name_id: productData.name_id || 'Produk Tanpa Judul',
            status: productData.status || 'Pending',
            status_id: productData.status_id || 'Menunggu',
            image: productData.image || 'https://placehold.co/600x400.png',
            aiHint: productData.aiHint || 'product',
            seller: productData.seller || 'Anonymous',
            seller_id: productData.seller_id || 'Anonim',
            currentBid: productData.currentBid || 0,
            description: productData.description || '',
            category: productData.category || 'Uncategorized',
            quantity: productData.quantity || 'N/A',
            shelfLife: productData.shelfLife || 'N/A',
            packaging: productData.packaging || 'N/A',
        };
        this.products.push(newProduct);
        this.notifySubscribers();
    }
    
    updateProduct(id: string, updateData: Partial<Product>) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex > -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updateData };
            this.notifySubscribers();
        }
    }

    updateProductStatus(id: string, status: Product['status']) {
        const statusMap = {
            'Active': 'Aktif',
            'Ended': 'Selesai',
            'Pending': 'Menunggu',
            'Rejected': 'Ditolak'
        }
        const status_id = statusMap[status] as Product['status_id'];
        this.updateProduct(id, { status, status_id });
    }

    deleteProduct(id: string) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex > -1) {
            this.products.splice(productIndex, 1);
            this.notifySubscribers();
        }
    }
}


export const productDatabase = new ProductDatabase();
*/

// TODO: Connect to the database and fetch real data.
// This file now only exports mock data for demonstration purposes.
export const allActiveAuctions = [
    {
      id: '1',
      name: 'Lelang Cabai Organik',
      name_id: 'Lelang Cabai Organik',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'organic chili',
      seller: 'Petani Jaya',
      seller_id: 'Petani Jaya',
      currentBid: 30000,
      bidders: [],
      category: 'Fruits & Vegetables',
      quantity: '1 Ton',
      shelfLife: '7 hari',
      packaging: 'Kantung jaring 5kg',
      description: 'Cabai organik dari petani lokal dengan kualitas terbaik. Dipanen saat matang sempurna untuk rasa pedas yang maksimal.'
    },
    {
      id: '2',
      name: 'Lelang Jagung Manis',
      name_id: 'Lelang Jagung Manis',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'sweet corn',
      seller: 'Petani Jaya',
      seller_id: 'Petani Jaya',
      currentBid: 15000,
      bidders: [],
      category: 'Grains',
      quantity: '5 Ton',
      shelfLife: '5 hari',
      packaging: 'Karung goni',
      description: 'Jagung manis hasil panen segar, cocok untuk dibakar atau direbus. Biji besar dan rasa manis alami.'
    },
    {
      id: '5',
      name: 'Lelang Telur Ayam Kampung',
      name_id: 'Lelang Telur Ayam Kampung',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'free range eggs',
      seller: 'Peternak Sentosa',
      seller_id: 'Peternak Sentosa',
      currentBid: 20000,
      bidders: [],
      category: 'Livestock',
      quantity: '500 butir',
      shelfLife: '30 hari',
      packaging: 'Tray karton',
      description: 'Telur ayam kampung asli, bebas dari bahan kimia dan pakan pabrikan.'
    },
    {
      id: '6',
      name: 'Lelang Sayur Bayam Organik',
      name_id: 'Lelang Sayur Bayam Organik',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'organic spinach',
      seller: 'Petani Jaya',
      seller_id: 'Petani Jaya',
      currentBid: 10000,
      bidders: [],
      category: 'Fruits & Vegetables',
      quantity: '100 ikat',
      shelfLife: '3 hari',
      packaging: 'Ikat segar',
      description: 'Bayam organik segar langsung dari kebun, tanpa pestisida.'
    },
    {
      id: '8',
      name: 'Lelang Padi IR64',
      name_id: 'Lelang Padi IR64',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'rice paddy',
      seller: 'Petani Jaya',
      seller_id: 'Petani Jaya',
      currentBid: 40000,
      bidders: [],
      category: 'Grains',
      quantity: '10 Ton',
      shelfLife: '12 bulan',
      packaging: 'Karung 50kg',
      description: 'Padi varietas IR64, hasil panen baru dengan kualitas gabah kering giling.'
    },
    {
      id: '10',
      name: 'Lelang Tomat Merah Segar',
      name_id: 'Lelang Tomat Merah Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh tomatoes',
      seller: 'Petani Jaya',
      seller_id: 'Petani Jaya',
      currentBid: 12000,
      bidders: [],
      category: 'Fruits & Vegetables',
      quantity: '200 kg',
      shelfLife: '10 hari',
      packaging: 'Krat plastik',
      description: 'Tomat merah segar, ukuran seragam, cocok untuk konsumsi langsung atau diolah.'
    },
    {
      id: '3',
      name: 'Lelang Daging Sapi Segar',
      name_id: 'Lelang Daging Sapi Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh beef',
      seller: 'Peternak Sentosa',
      seller_id: 'Peternak Sentosa',
      currentBid: 85000,
      bidders: [],
      category: 'Livestock',
      quantity: '500 Kg',
      shelfLife: '3 hari (pendingin)',
      packaging: 'Dikemas vakum per 1kg',
      description: 'Daging sapi segar dari peternakan lokal, pemotongan higienis dan sesuai standar. Bagian paha depan.'
    },
    {
      id: '11',
      name: 'Lelang Ayam Broiler Hidup',
      name_id: 'Lelang Ayam Broiler Hidup',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'live broiler chicken',
      seller: 'Peternak Sentosa',
      seller_id: 'Peternak Sentosa',
      currentBid: 60000,
      bidders: [],
      category: 'Livestock',
      quantity: '100 ekor',
      shelfLife: 'N/A',
      packaging: 'Keranjang ayam',
      description: 'Ayam broiler hidup sehat, bobot rata-rata 1.8kg per ekor.'
    },
    {
      id: '12',
      name: 'Lelang Ikan Nila Segar',
      name_id: 'Lelang Ikan Nila Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh tilapia fish',
      seller: 'Nelayan Lokal',
      seller_id: 'Nelayan Lokal',
      currentBid: 25000,
      bidders: [],
      category: 'Perikanan',
      quantity: '300 Kg',
      shelfLife: '2 hari (pendingin)',
      packaging: 'Boks styrofoam dengan es',
      description: 'Ikan nila segar hasil budidaya air tawar, ukuran konsumsi.'
    },
    {
      id: '13',
      name: 'Lelang Udang Windu Beku',
      name_id: 'Lelang Udang Windu Beku',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'frozen tiger prawn',
      seller: 'Nelayan Lokal',
      seller_id: 'Nelayan Lokal',
      currentBid: 78000,
      bidders: [],
      category: 'Perikanan',
      quantity: '150 Kg',
      shelfLife: '6 bulan (beku)',
      packaging: 'Kemasan plastik vakum 1kg',
      description: 'Udang windu segar yang dibekukan dengan cepat untuk menjaga kualitas. Ukuran 20-30 ekor per kg.'
    },
    {
      id: '14',
      name: 'Lelang Kopi Arabika Gayo',
      name_id: 'Lelang Kopi Arabika Gayo',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'arabica coffee beans',
      seller: 'Petani Kopi',
      seller_id: 'Petani Kopi',
      currentBid: 65000,
      bidders: [],
      category: 'Perkebunan',
      quantity: '1 Ton',
      shelfLife: '24 bulan',
      packaging: 'Karung goni 60kg',
      description: 'Biji kopi Arabika Gayo grade 1, diproses secara full-washed.'
    },
    {
      id: '15',
      name: 'Lelang Kakao Kering Fermentasi',
      name_id: 'Lelang Kakao Kering Fermentasi',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fermented dried cocoa beans',
      seller: 'Petani Kakao',
      seller_id: 'Petani Kakao',
      currentBid: 72000,
      bidders: [],
      category: 'Perkebunan',
      quantity: '2 Ton',
      shelfLife: '18 bulan',
      packaging: 'Karung goni 50kg',
      description: 'Biji kakao kering yang telah difermentasi dengan baik, siap untuk diolah menjadi cokelat berkualitas.'
    }
];

export const initialSellerProducts = [
    { 
        id: '1', 
        name: 'Lelang Cabai Organik', 
        name_id: 'Lelang Cabai Organik', 
        status: 'Active', 
        status_id: 'Aktif', 
        quantity: '1 Ton', 
        category: 'Fruits & Vegetables',
        currentBid: 30000,
        image: 'https://placehold.co/600x400.png',
        aiHint: 'organic chili',
        seller: 'Petani Jaya',
        seller_id: 'Petani Jaya',
        description: 'Cabai organik dari petani lokal dengan kualitas terbaik. Dipanen saat matang sempurna untuk rasa pedas yang maksimal.',
        shelfLife: '7 hari',
        packaging: 'Kantung jaring 5kg'
    },
    { 
        id: '2', 
        name: 'Lelang Jagung Manis', 
        name_id: 'Lelang Jagung Manis', 
        status: 'Active', 
        status_id: 'Aktif', 
        quantity: '5 Ton', 
        category: 'Grains',
        currentBid: 15000,
        image: 'https://placehold.co/600x400.png',
        aiHint: 'sweet corn',
        seller: 'Petani Jaya',
        seller_id: 'Petani Jaya',
        description: 'Jagung manis hasil panen segar, cocok untuk dibakar atau direbus. Biji besar dan rasa manis alami.',
        shelfLife: '5 hari',
        packaging: 'Karung goni'
    },
    { 
        id: '99',
        name: 'Panen Gandum Berkualitas',
        name_id: 'Panen Gandum Berkualitas',
        status: 'Ended',
        status_id: 'Selesai',
        quantity: '10 Ton',
        category: 'Grains',
        currentBid: 4500, // This is the final price
        image: 'https://placehold.co/600x400.png',
        aiHint: 'quality wheat',
        seller: 'Petani Jaya',
        seller_id: 'Petani Jaya',
        description: 'Gandum berkualitas tinggi untuk industri roti dan kue.',
        shelfLife: '12 bulan',
        packaging: 'Karung 50kg'
    },
    { 
        id: '98',
        name: 'Bawang Merah Super',
        name_id: 'Bawang Merah Super',
        status: 'Pending',
        status_id: 'Menunggu',
        quantity: '2 Ton',
        category: 'Fruits & Vegetables',
        currentBid: 1800,
        image: 'https://placehold.co/600x400.png',
        aiHint: 'shallots',
        seller: 'Petani Jaya',
        seller_id: 'Petani Jaya',
        description: 'Bawang merah kualitas super, ukuran besar dan kering.',
        shelfLife: '3 bulan',
        packaging: 'Karung jaring'
    }
];
