import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const ProductContext = createContext();

// Custom hook to access the ProductContext
export const useProducts = () => {
  return useContext(ProductContext);
};

// ProductProvider component to provide the product data
const ProductProvider = ({ children }) => {
  const initialProducts = [

        // Men Products
        {
          id: 1,
          name: 'FLARE T-shirt with graphics',
          price: 20,
          originalPrice: 30.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_28_UNPALMSPR_LightBlue_P_CZ_DJ_11-18-31_64149_CM.jpg?v=1736987019&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_28_UNPALMSPR_LightBlue_P_CZ_DJ_11-18-11_64142_CM.jpg?v=1736987019&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_28_UNPALMSPR_LightBlue_P_CZ_DJ_11-18-11_64142_CM.jpg?v=1736987019&width=600&height=900&crop=center',
          ],
          category: 'men',
          filter: 'T-Shirts',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 0, sold: 0 },
          ],
        },
        
      
        {
          id: 2,
          name: 'Black torn streetwear Jeans stonewashed', 
          price: 40,
          originalPrice: 50.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_58_KNB3057_Black_P_CZ_DJ_13-15-59_41980_CM.jpg?v=1712860592&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_58_KNB3057_Black_P_CZ_DJ_13-15-59_41989_CM.jpg?v=1712860599&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_58_KNB3057_Black_P_CZ_DJ_13-15-59_41980_CM.jpg?v=1712860592&width=600&height=900&crop=center',
          ],
          category: 'men',
          filter: 'Jeans',
          sizes: [
            { size: 'S', quantity: 0, sold: 0 }, // No sizes for this product
            { size: 'M', quantity: 0, sold: 0 }, // No sizes for this product
            { size: 'L', quantity: 15, sold: 7 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
      
        {
          id: 3,
          name: 'Men Shoes',
          price: 30,
          originalPrice: 40.0,
          images: [
            'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example additional images
            'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'men',
          filter: 'Shoes',
          sizes: [
            { size: 'S', quantity: 0, sold: 0 }, // No sizes for this product
            { size: 'M', quantity: 0, sold: 0 }, // No sizes for this product
            { size: 'L', quantity: 15, sold: 7 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
      
        {
          id: 4,
          name: 'Black and White Flare Jacket Office wear',
          price: 60,
          originalPrice: 70.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S7_57_ZDF01C440013_Blackcombo_ZSR_CZ_DJ_14-20-55_31156_PXF.jpg?v=1730138759&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S7_57_ZDF01C440013_Blackcombo_ZSR_CZ_DJ_14-19-57_31147_PXF.jpg?v=1730138759&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S7_57_ZDF01C440013_Blackcombo_ZSR_CZ_DJ_14-20-55_31156_PXF.jpg?v=1730138759&width=600&height=900&crop=center',
            //  // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S7_57_ZDF01C440013_Blackcombo_ZSR_CZ_DJ_14-20-55_31156_PXF.jpg?v=1730138759&width=600&height=900&crop=center',
          ],
          category: 'men',
          filter: 'Jackets',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 5, sold: 2 },
          ],
        },
      
        {
          id: 5,
          name: 'Flare zip up Streetwear Sweater with graphics ',
          price: 35,
          originalPrice: 50.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_20_23000978_Charcoal_P_CZ_DJ_10-52-53_64041_SG.jpg?v=1736986019&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_20_23000978_Charcoal_P_CZ_DJ_10-52-53_64041_SG.jpg?v=1736986019&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-15-25_S7_20_23000978_Charcoal_P_CZ_DJ_10-52-53_64041_SG.jpg?v=1736986019&width=600&height=900&crop=center',
          ],
          category: 'men',
          filter: 'New',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 5, sold: 2 },
          ],
        },
      
        {
          id: 6,
          name: 'Streetwear Demin Flare Shorts Decorated with graphics',
          price: 25,
          originalPrice: 30.0,
          images: [
            'https://images.pexels.com/photos/28973128/pexels-photo-28973128/free-photo-of-stylish-men-at-beach-in-fashionable-attire.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/28973128/pexels-photo-28973128/free-photo-of-stylish-men-at-beach-in-fashionable-attire.jpeg?auto=compress&cs=tinysrgb&w=600', // Example additional images
            'https://images.pexels.com/photos/28973128/pexels-photo-28973128/free-photo-of-stylish-men-at-beach-in-fashionable-attire.jpeg?auto=compress&cs=tinysrgb&w=600',
          ],
          category: 'men',
          filter: 'Sale',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
        {
          id: 7,
          name: 'Mens Hat flap back SAINTS with logo',
          price: 15,
          originalPrice: 30.0,
          images: [
            'https://images.pexels.com/photos/26594943/pexels-photo-26594943/free-photo-of-a-young-man-in-a-fashionable-outfit-sitting-on-a-sofa-and-laughing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/26594943/pexels-photo-26594943/free-photo-of-a-young-man-in-a-fashionable-outfit-sitting-on-a-sofa-and-laughing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example additional images
          ],
          category: 'men',
          filter: 'New',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 8,
          name: 'Mens Nike Jordans Sneakers',
          price: 50,
          originalPrice: 59.0,
          images: [
            'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example additional images
            'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'men',
          filter: 'Shoes',
          sizes: [{ size: 'One Size', quantity: 15, sold: 7 }],
        },
      
        // Women Products
        {
          id: 21,
          name: 'Flare Marisol Polka Dot Mini Dress - Blush/combo',
          price: 30,
          originalPrice: 55.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-23-24_S6_30_KDJD4090701T_Blushcombo_KS_SS_11-24-55_82727_PXF.jpg?v=1735065565&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-23-24_S6_30_KDJD4090701T_Blushcombo_KS_SS_11-24-35_82720_PXF.jpg?v=1735065565&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-23-24_S6_30_KDJD4090701T_Blushcombo_KS_SS_11-25-42_82729_PXF.jpg?v=1735065562&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Dresses',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
        {
          id: 22,
          name: 'Corduroy Flare Micro Mini Skort - Khaki',
          price: 30,
          originalPrice: 40.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S2_11_30008Y_Khaki_CXB_RL_11-09-59_38706_BH.jpg?v=1721345800&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S2_11_30008Y_Khaki_CXB_RL_11-09-59_38708_BH.jpg?v=1721345800&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S2_11_30008Y_Khaki_CXB_RL_11-09-59_38710_BH.jpg?v=1721345800&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Sale',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
        {
          id: 23,
          name: 'Black - Pierce Platform Heels',
          price: 40,
          originalPrice: 50.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-31-24_S3_19_TALISA1_Black_AZ_JS_10-03-50_85307_BH.jpg?v=1735320079',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-31-24_S3_19_TALISA1_Black_AZ_JS_10-04-28_85315_BH.jpg?v=1730740615&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-18-24_S10_23_TALISA1_Black_CXB_10-16-05_14898_ES.jpg?v=1729613962&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Shoes',
          sizes: [{ size: 'One Size', quantity: 15, sold: 7 }],
        },
        {
          id: 24,
          name: 'Women Warm Flare Jacket With Logo',
          price: 60,
          originalPrice: 69.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-06-23Studio3_KT_DB_15-24-26_55_72399JBQ_Heather_P_20319_PXF.jpg?v=1697152211&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-06-23Studio3_KT_DB_15-24-26_55_72399JBQ_Heather_P_20319_PXF.jpg?v=1697152211&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-06-23Studio3_KT_DB_15-24-26_55_72399JBQ_Heather_P_20319_PXF.jpg?v=1697152211&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Jackets',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 5, sold: 2 },
          ],
        },
        {
          id: 25,
          name: 'Elegant Lace Maxi Dress - Red',
          price: 35,
          originalPrice: 39.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/products/11-10-22Studio9_DM_RL_0023_09-28-34_3_NAD80738_Red_0023_JB.jpg?v=1668117457&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/products/11-10-22Studio9_DM_RL_0023_09-28-34_3_NAD80738_Red_0023_JB.jpg?v=1668117457&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/products/11-10-22Studio9_DM_RL_0023_09-28-34_3_NAD80738_Red_0023_JB.jpg?v=1668117457&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Tops',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 26,
          name: 'Flare Hustler Womens Graphic Tee - Off White',
          price: 25,
          originalPrice: 30.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-15-24_S1_23_FNWP116HUSTLER_OffWhite_HY_SS_11-49-47_75906_PXF.jpg?v=1715989260&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-15-24_S1_23_FNWP116HUSTLER_OffWhite_HY_SS_11-49-47_75906_PXF.jpg?v=1715989260&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-15-24_S1_23_FNWP116HUSTLER_OffWhite_HY_SS_11-49-47_75906_PXF.jpg?v=1715989260&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'New',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 5, sold: 2 },
          ],
        },
        {
          id: 27,
          name: 'Flare Wide Leg Dress Pants - White',
          price: 45,
          originalPrice: 60.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/products/CallItEvenWideLegDressPants-White_MER_2.jpg?v=1673375837&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/products/CallItEvenWideLegDressPants-White_MER_2.jpg?v=1673375837&width=600&height=900&crop=center', // Example additional images
            'https://cdn.shopify.com/s/files/1/0293/9277/products/CallItEvenWideLegDressPants-White_MER_2.jpg?v=1673375837&width=600&height=900&crop=center',
          ],
          category: 'women',
          filter: 'Jeans',
          sizes: [
            { size: 'S', quantity: 10, sold: 5 },
            { size: 'M', quantity: 15, sold: 7 },
            { size: 'L', quantity: 8, sold: 3 },
            { size: 'XL', quantity: 0, sold: 0 }, // No sizes for this product
          ],
        },
      
        // Jewellery Products
        {
          id: 51,
          name: 'Necklace - Jose Ricardo Barraza Morachis',
          price: 100,
          originalPrice: 160.0,
          images: [
            'https://images.pexels.com/photos/1454185/pexels-photo-1454185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'jewellery',
          filter: 'Necklaces',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 52,
          name: 'Womens Diamond Ring',
          price: 80,
          originalPrice: 90.0,
          images: [
            'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'jewellery',
          filter: 'Rings',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 53,
          name: 'Bracelet',
          price: 70,
          originalPrice: 90.0,
          images: [
            'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example additional images
            'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'jewellery',
          filter: 'Bracelets',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 54,
          name: 'Flare Pleasure Gold Earrings',
          price: 60,
          originalPrice: 90.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-21-24_S2_64_IDH08233133_Gold_TK_AA_15-30-40_11404_PXF.jpg?v=1708976814&width=600&height=900&crop=center',
          ],
          category: 'jewellery',
          filter: 'Earrings',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 55,
          name: 'Diamond Premium Watch for Men',
          price: 100,
          originalPrice: 160.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/products/04-14-22Studio2_KJ_KP_15-40-45_112_8832MB_Silver_0948_SG.jpg?v=1650305147&width=400&height=599&crop=center',
          ],
          category: 'jewellery',
          filter: 'Sale',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 56,
          name: 'Casting Clover Spells Necklace Diamond Necklace',
          price: 500,
          originalPrice: 660.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/08-21-24_S5_66_TROY11793_Gold_CZ_AP_13-37-01_10038_PXF.jpg?v=1724370528&width=600&height=900&crop=center',
          ],
          category: 'jewellery',
          filter: 'New',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 57,
          name: 'Flare Casual Silver Ring',
          price: 200,
          originalPrice: 260.0,
          images: [
            'https://images.pexels.com/photos/998521/pexels-photo-998521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'jewellery',
          filter: 'Rings',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 58,
          name: 'Silver Good Bracelet',
          price: 150,
          originalPrice: 170.0,
          images: [
            'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          category: 'jewellery',
          filter: 'Bracelets',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 59,
          name: 'Pleasure Gold Flare Earring',
          price: 90,
          originalPrice: 990.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-14-24_S3_1_IDH05243084_Gold_CZ_JS_09-52-31_89590_PXF.jpg?v=1731697510&width=600&height=900&crop=center',
          ],
          category: 'jewellery',
          filter: 'Earrings',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        },
        {
          id: 60,
          name: 'Silver Styled Flare Earrings',
          price: 120,
          originalPrice: 160.0,
          images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-30-24_S1_76_ZDMKJ91324_Silver_AZ_DO_14-48-01_8087_PXF.jpg?v=1735927532&width=600&height=900&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-30-24_S1_76_ZDMKJ91324_Silver_AZ_DO_14-48-01_8087_PXF.jpg?v=1735927532&width=600&height=900&crop=center', // Example additional images
          ],
          category: 'jewellery',
          filter: 'Earrings',
          sizes: [{ size: 'One Size', quantity: 0, sold: 0 }], // No sizes for this product
        }
      ];
      
      
  

        const [products, setProducts] = useState(initialProducts); // Store products in state
        const [activeCategory, setActiveCategory] = useState('women'); // Active category state (default 'women')
        const [activeFilterTabs, setActiveFilterTabs] = useState([]); // State for active filter tabs
        const [isLoadingFilters, setIsLoadingFilters] = useState(false); // Flag to handle loading state
        const [filter, setFilter] = useState(''); // Added state for filter
        const [searchQuery, setSearchQuery] = useState(''); // State for search functionality
      
        // Memoized category-specific filters
        const categoryFilters = useMemo(
          () => ({
            men: ['New', 'Sale', 'T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
            women: ['New', 'Sale', 'Dresses', 'Tops', 'Jeans', 'Jackets'],
            brands: ['New', 'Sale', 'Nike', 'Adidas', 'Puma', 'Reebok'],
            home: ['Furniture', 'New', 'Sale', 'Decor', 'Lighting', 'Kitchen'],
            jewellery: ['Necklaces', 'Bracelets', 'New', 'Sale', 'Rings', 'Earrings'],
          }),
          []
        );

        const decrementQuantity = (productId, size) => {
          setProducts((prevProducts) =>
            prevProducts.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  sizes: product.sizes.map((s) =>
                    s.size === size
                      ? { ...s, quantity: Math.max(s.quantity - 1, 0) }
                      : s
                  ),
                };
              }
              return product;
            })
          );
        };
      
        const addProduct = (product) => {
          setProducts((prevProducts) => [...prevProducts, product]);
        };
      
        const deleteProduct = (id) => {
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        };
      
        const changeCategory = (category) => {
          setActiveCategory(category.toLowerCase());
          setIsLoadingFilters(true); // Trigger loading state when switching tabs
        };
      
        // Filter products based on category and active filters
        const filteredProducts = useMemo(() => {
          return products.filter((product) => {
            const isCategoryMatch = activeCategory === 'all' || product.category === activeCategory;
            const isFilterMatch = activeFilterTabs.length === 0 || activeFilterTabs.includes(product.filter);
            return isCategoryMatch && isFilterMatch;
          });
        }, [activeCategory, activeFilterTabs, products]);
      
        // Get all products without any filtering applied
        const allProducts = useMemo(() => {
          return products; // Simply return all products without applying any filters
        }, [products]);
      
        useEffect(() => {
          if (categoryFilters[activeCategory]) {
            setActiveFilterTabs(categoryFilters[activeCategory]); // Update the filters for the active category
          } else {
            setActiveFilterTabs([]); // Reset to empty filters if no filters are defined
          }
      
          setIsLoadingFilters(false);
        }, [activeCategory, categoryFilters]);
      
        return (
          <ProductContext.Provider
            value={{
              products: filteredProducts, // Pass the filtered products
              allProducts,              // Pass all products (no filtering)
              addProduct,
              deleteProduct,
              changeCategory,           // Expose the category change function
              activeCategory,           // Expose the activeCategory for use in other components
              activeFilterTabs,         // Expose active filter tabs for use in components
              setActiveFilterTabs,      // Explicitly expose setActiveFilterTabs to the context
              isLoadingFilters,         // Pass loading state to the context
              filter,                   // Pass the filter state
              setFilter,                // Pass the setFilter function to allow filter changes
              searchQuery,              // Pass the search query state
              setSearchQuery,           // Pass the setSearchQuery function for search updates
              decrementQuantity,        // for calculating the number of products on each size
            }}
          >
            {children}
          </ProductContext.Provider>
        );
      };
      
      export default ProductProvider;
      





















