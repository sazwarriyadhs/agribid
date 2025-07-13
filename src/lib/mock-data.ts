
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
    quantity?: string;
    shelfLife?: string;
    packaging?: string;
}

// This acts as a simple in-memory, observable database for our products.
class ProductDatabase {
    private products: Product[];
    private subscribers: (() => void)[] = [];

    constructor() {
        this.products = [
            {
              id: '1',
              name: 'Organic Wheat Harvest',
              name_id: 'Panen Gandum Organik',
              status: 'Active',
              status_id: 'Aktif',
              image: 'https://placehold.co/600x400.png',
              aiHint: 'wheat field',
              seller: 'Green Valley Farms',
              seller_id: 'Green Valley Farms',
              currentBid: 4500,
              description: 'High quality wheat',
              category: 'Grains',
              bidders: [
                { name: 'Bakery Co.', bid: 4500, avatar: 'B' },
                { name: 'Mill & Co.', bid: 4400, avatar: 'M' },
                { name: 'Artisan Breads', bid: 4300, avatar: 'A' },
              ],
            },
            {
              id: '2',
              name: 'Fresh Atlantic Salmon',
              name_id: 'Salmon Atlantik Segar',
              status: 'Active',
              status_id: 'Aktif',
              image: 'https://placehold.co/600x400.png',
              aiHint: 'salmon seafood',
              seller: 'Ocean Fresh',
              seller_id: 'Ocean Fresh',
              currentBid: 1200,
              description: 'Sustainably farmed salmon',
              category: 'Marine Fishery',
              bidders: [
                { name: 'Seafood World', bid: 1200, avatar: 'S' },
                { name: 'Fine Dining Group', bid: 1150, avatar: 'F' },
                { name: 'Sushi Express', bid: 1100, avatar: 'S' },
              ],
            },
            {
              id: '3',
              name: 'Palm Oil Kernels',
              name_id: 'Biji Kelapa Sawit',
              status: 'Active',
              status_id: 'Aktif',
              image: 'https://placehold.co/600x400.png',
              aiHint: 'palm oil plantation',
              seller: 'Nusantara Palms',
              seller_id: 'Nusantara Palms',
              currentBid: 850,
              description: 'High yield palm oil kernels',
              category: 'Plantation',
              bidders: [
                { name: 'Bio-Fuels Inc.', bid: 850, avatar: 'B' },
                { name: 'Commodity Traders', bid: 800, avatar: 'C' },
              ],
            },
             { 
                id: 'PROD-004', 
                name: 'Robusta Coffee Beans', 
                name_id: 'Biji Kopi Robusta', 
                status: 'Pending',
                status_id: 'Menunggu',
                seller: 'Kintamani Highlands', 
                seller_id: 'Kintamani Highlands',
                image: 'https://placehold.co/100x100.png', 
                aiHint: 'coffee beans', 
                category: 'Plantation',
                description: 'Authentic robusta beans',
                currentBid: 2000
            },
            { 
                id: 'PROD-005', 
                name: 'Frozen Tuna Loin', 
                name_id: 'Loin Tuna Beku', 
                status: 'Pending',
                status_id: 'Menunggu',
                seller: 'Bahari Seafood', 
                seller_id: 'Bahari Seafood',
                image: 'https://placehold.co/100x100.png', 
                aiHint: 'tuna loin', 
                category: 'Marine Fishery',
                description: 'Premium frozen tuna',
                currentBid: 5000
            },
        ];
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
            quantity: productData.quantity,
            shelfLife: productData.shelfLife,
            packaging: productData.packaging,
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
}

// Create a singleton instance of the database
export const productDatabase = new ProductDatabase();
