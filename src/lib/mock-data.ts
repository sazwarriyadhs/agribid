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
// This file is now deprecated and will be removed once the database connection is implemented.
export {};
