import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabaseClient, isSupabaseConfigured } from '../utils/supabaseClient';

// Use relative URL for local proxy
const ProductsContext = createContext();

const parseJsonField = (value, fallback = []) => {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const normalizeSupabaseProduct = (product) => ({
  id: product.id,
  name: product.name || '',
  shortName: product.short_name || product.shortName || '',
  slug: product.slug || '',
  price: product.price || 0,
  originalPrice: product.original_price || product.originalPrice || null,
  image: product.image || '/products/placeholder.png',
  macroImage: product.macro_image || product.macroImage || null,
  dimensionsImage: product.dimensions_image || product.dimensionsImage || null,
  description: product.description || '',
  shortDescription: product.short_description || product.shortDescription || '',
  features: parseJsonField(product.features, []),
  benefits: parseJsonField(product.benefits, []),
  gallery: parseJsonField(product.gallery, []),
  customSections: parseJsonField(product.custom_sections || product.customSections, []),
  specs: parseJsonField(product.specs, {}),
  quickFeatures: parseJsonField(product.quick_features || product.quickFeatures, []),
  rating: product.rating || 0,
  reviews: product.review_count || product.reviews || 0,
  badge: product.badge || null,
  inStock: product.in_stock ?? product.inStock ?? true,
  stock: product.stock ?? 0,
  ageRange: product.age_range || product.ageRange || '',
  warranty: product.warranty || '',
  sku: product.sku || '',
  itemId: product.item_id || product.itemId || '',
  itemCategory: product.item_category || product.itemCategory || '',
  itemCategory2: product.item_category2 || product.itemCategory2 || '',
  itemCategory3: product.item_category3 || product.itemCategory3 || '',
  itemVariant: product.item_variant || product.itemVariant || '',
  createdAt: product.created_at || product.createdAt || null,
  updatedAt: product.updated_at || product.updatedAt || null,
});

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from API - use relative URL for proxy
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products from API, trying Supabase fallback:', err);

      if (isSupabaseConfigured && supabaseClient) {
        try {
          const { data, error: supabaseError } = await supabaseClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (supabaseError) {
            throw supabaseError;
          }

          const normalized = (data || []).map(normalizeSupabaseProduct);
          setProducts(normalized);
          setError(null);
          return;
        } catch (fallbackError) {
          console.error('Supabase products fallback failed:', fallbackError);
          setError(fallbackError.message || 'Failed to fetch products');
          return;
        }
      }

      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single product by ID - use relative URL
  const fetchProductById = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return await response.json();
    } catch (err) {
      console.error('Error fetching product from API, trying Supabase fallback:', err);
      if (isSupabaseConfigured && supabaseClient) {
        try {
          const { data, error: supabaseError } = await supabaseClient
            .from('products')
            .select('*')
            .eq('id', id)
            .limit(1);

          if (supabaseError) throw supabaseError;
          if (data?.length) return normalizeSupabaseProduct(data[0]);
        } catch (fallbackError) {
          console.error('Supabase single product fallback failed:', fallbackError);
        }
      }
      return null;
    }
  }, []);

  // Get product from local state (faster)
  const getProductById = useCallback((id) => {
    // Support both string UUIDs and numeric IDs
    return products.find(p => String(p.id) === String(id));
  }, [products]);

  // Refresh products
  const refreshProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    getProductById,
    refreshProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
