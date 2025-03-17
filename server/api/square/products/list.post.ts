import { SquareClient, SquareEnvironment } from "square"; 
import JSONBig from "json-bigint";

const environment = process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
const token = process.env.SQUARE_ACCESS_TOKEN;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)
  console.log("List Products post", post_data);

  try {

    let products: any[] = [];
    let categories: any[] = [];

    const client = new SquareClient({
      environment, token
    });
    
    interface Category {
      type: string;
      id: string;
      updatedAt: string;
      created_at: string;
      version: number;
      isDeleted: boolean;
      presentAtAllLocations: boolean;
      categoryData: {
        name: string;
        categoryType: string;
        parentCategory: Object;
        isTopLevel: boolean;
        onlineVisibility: boolean;
      }
    }

    interface Product {
      created_at: string;
      id: string;
      itemData: {
        categories: Category[];
        description: string;
        descriptionHtml: string;
        descriptionPlaintext: string;
        ecom_visiblity: string;
        imageIds: string[];
        isArchived: boolean;
        name: string;
        productType: string;
        reportingCategory: Object;
        skipModifierScreen: boolean;
        variations: Object[] | null;
        presentAtAllLocations: boolean;
        type: string;
        updatedAt: string;
        version: number;
      };
      images: any,
      options: any
    }

    const fetchProductOptions = async (product: any) => {
      console.log('product itemData options', product.itemData.itemOptions);
      if(!product.itemData.itemOptions) {
        console.log('no options found');
        return;
      } 
      else {
        if(product.itemData?.itemOptions && (product.itemData?.itemOptions?.length > 0)) {
          console.log('grabbing options..')
          const optionPromises = product.itemData.itemOptions.map(async (option: any) => {
            const optionResponse = await client.catalog.object.get({
              objectId: option.itemOptionId
            });
            return optionResponse.object;
          });
          product['options'] = await Promise.all(optionPromises);
          // console.log('product options', product.options);
        }
      }
    }

    const fetchProductImages = async (product: any) => {
      // console.log('product itemData', product.itemData.imageIds);
      if(!product.itemData.imageIds) {
        await fetchProductOptions(product);
        products.push(product);
        return;
      }
      else {
        if (product.itemData?.imageIds && product?.itemData?.imageIds?.length > 0) {
        
        const imagePromises = product?.itemData?.imageIds?.map(async (imageId: string) => {
          const imageResponse = await client.catalog.object.get({
            objectId: imageId
          });
          return imageResponse.object;
        });
        product['images'] = await Promise.all(imagePromises);
          // console.log('product images', product.images);
          // console.log('product', product);
          if(product?.itemData?.variations && (product?.itemData?.variations?.length > 0)) {
            // console.log('variation images...', product.itemData.variations);
            for (const variation of product.itemData.variations) {
              if(variation.itemVariationData?.imageIds && (variation.itemVariationData?.imageIds?.length > 0)) {
                const variationImagePromises = variation?.itemVariationData?.imageIds?.map(async (imageId: string) => {
                const imageResponse = await client.catalog.object.get({
                    objectId: imageId
                  });
                  return imageResponse.object;
                }
              );
              variation['images'] = await Promise.all(variationImagePromises);
              }
            }
          }
          await fetchProductOptions(product);
          products.push(product);
        }
      }
    };

    const fetchProducts = async () => {

      const result  = await client.catalog.list({})
          
      for (const obj of result.data) {
        if (obj.type === "ITEM") {
          await fetchProductImages(obj);
        }
        if (obj.type === "CATEGORY") {
          categories.push(obj);
        }
      }
    }

    const fetchCategories = async () => {
      for (const category of categories) {
        const categoryResponse = await client.catalog.object.get({
          objectId: category.id
        });
        categories.push(categoryResponse.object);
      }
    }

    const populate_categories = async () => {
      categories.forEach(async (category) => {
        category['products'] = [];
        for(const product of products) {
          if(product.itemData.categories) {
            product.itemData.categories.forEach((prod_category: any) => {
              if(prod_category.id === category.id) {
                category.products.push(product);
              }
            })
          }
        }
      })
    }

    await fetchProducts();
    await populate_categories();
    // await fetchCategories();

    if(products.length) {

      const return_obj = {
        status: 200,
        body: {
          products: JSONBig.stringify(products),
          categories: JSONBig.stringify(categories)
        }
      }

      // console.log('Sending to frontend: ', return_obj);

      return return_obj
    }

    else {
      console.log('No products found', products);
      
      return {
        status: 204,
        body: {
          message: "No products found."
        }
    }
  }
}
  catch (error) {
    return {
      status: 400,
      body: {
        message: `An error occurred while fetching products: ${error}`
      }
    }
  }



})