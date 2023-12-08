import { ProductModel } from "../models/products.models.js";

export default class ProductMongoDB {

  async getAll(page = 1, limit = 10, category, sortOrder) {
    try {
      // Configurar la consulta según los parámetros proporcionados
      const query = category ? { category } : {};
      const sort = {};

      // Configurar el orden según el parámetro de consulta
      if (sortOrder === 'asc') {
        sort.price = 1;
      } else if (sortOrder === 'desc') {
        sort.price = -1;
      }

      // Realizar la consulta paginada
      const response = await ProductModel.paginate(query, { page, limit, sort });

      // Aplicar lean() a los documentos de la respuesta
      const leanResponse = response.docs.map(doc => doc.toObject());

      // Construir los enlaces directos a las páginas previa y siguiente
      const nextLink = response.hasNextPage ? `/api/products?page=${response.nextPage}` : null;
      const prevLink = response.hasPrevPage ? `/api/products?page=${response.prevPage}` : null;

      // Construir y devolver el objeto de respuesta formateado
      return {
        status: 'success',
        payload: {
          products: leanResponse,
          info: {
            count: response.docs.length,
            pages: response.totalPages,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            nextLink,
            prevLink,
          },
        },
      };
    } catch (error) {
      console.error('Error en getAll:', error.message);
      throw new Error('Error al recuperar la lista de productos.');
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(obj, id, { new: true, });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async aggregation1(category) {
    try {
      return await ProductModel.aggregate([
        {
          $match: { category: category }
        },
        {
          $sort: { price: 1 }
        },
      ]);

    } catch (error) {
      console.error('Error en la operación de agregación:', error);
      return null;
    }
  }


}
