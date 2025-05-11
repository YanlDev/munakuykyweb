// src/utils/productos.js
import productosData from '../data/productos.json';

/**
 * Obtiene todas las familias de productos
 */
export function getFamilias() {
  return productosData.familias;
}

/**
 * Obtiene una familia específica por su ID
 * @param {string} id - ID de la familia
 */
export function getFamilia(id) {
  return productosData.familias.find(familia => familia.id === id);
}

/**
 * Obtiene todas las categorías de una familia
 * @param {string} familiaId - ID de la familia
 */
export function getCategorias(familiaId) {
  const familia = getFamilia(familiaId);
  return familia ? familia.categorias : [];
}

/**
 * Obtiene una categoría específica
 * @param {string} familiaId - ID de la familia
 * @param {string} categoriaId - ID de la categoría
 */
export function getCategoria(familiaId, categoriaId) {
  const categorias = getCategorias(familiaId);
  return categorias.find(categoria => categoria.id === categoriaId);
}

/**
 * Obtiene todos los productos de una categoría
 * @param {string} familiaId - ID de la familia
 * @param {string} categoriaId - ID de la categoría
 */
export function getProductos(familiaId, categoriaId) {
  const categoria = getCategoria(familiaId, categoriaId);
  return categoria ? categoria.productos : [];
}

/**
 * Obtiene un producto específico
 * @param {string} familiaId - ID de la familia
 * @param {string} categoriaId - ID de la categoría
 * @param {string} productoId - ID del producto
 */
export function getProducto(familiaId, categoriaId, productoId) {
  const productos = getProductos(familiaId, categoriaId);
  return productos.find(producto => producto.id === productoId);
}

/**
 * Busca un producto por su slug en todas las familias y categorías
 * @param {string} slug - Slug del producto
 */
export function getProductoBySlug(slug) {
  for (const familia of productosData.familias) {
    for (const categoria of familia.categorias) {
      const producto = categoria.productos.find(p => p.slug === slug);
      if (producto) {
        return {
          producto,
          familia,
          categoria
        };
      }
    }
  }
  return null;
}

/**
 * Obtiene todos los productos destacados
 */
export function getProductosDestacados() {
  const destacados = [];
  
  productosData.familias.forEach(familia => {
    familia.categorias.forEach(categoria => {
      categoria.productos.forEach(producto => {
        if (producto.destacado) {
          destacados.push({
            ...producto,
            familia: {
              id: familia.id,
              nombre: familia.nombre,
              slug: familia.slug
            },
            categoria: {
              id: categoria.id,
              nombre: categoria.nombre,
              slug: categoria.slug
            }
          });
        }
      });
    });
  });
  
  return destacados;
}

/**
 * Obtiene todos los productos nuevos
 */
export function getProductosNuevos() {
  const nuevos = [];
  
  productosData.familias.forEach(familia => {
    familia.categorias.forEach(categoria => {
      categoria.productos.forEach(producto => {
        if (producto.nuevo) {
          nuevos.push({
            ...producto,
            familia: {
              id: familia.id,
              nombre: familia.nombre,
              slug: familia.slug
            },
            categoria: {
              id: categoria.id,
              nombre: categoria.nombre,
              slug: categoria.slug
            }
          });
        }
      });
    });
  });
  
  return nuevos;
}

/**
 * Obtiene productos según una página específica
 * @param {string} paginaId - ID de la página
 */
export function getProductosByPagina(paginaId) {
  const productos = [];
  
  productosData.familias.forEach(familia => {
    if (familia.paginas_relacionadas.includes(paginaId)) {
      familia.categorias.forEach(categoria => {
        categoria.productos.forEach(producto => {
          productos.push({
            ...producto,
            familia: {
              id: familia.id,
              nombre: familia.nombre,
              slug: familia.slug
            },
            categoria: {
              id: categoria.id,
              nombre: categoria.nombre,
              slug: categoria.slug
            }
          });
        });
      });
    }
  });
  
  return productos;
}

/**
 * Busca productos por término de búsqueda
 * @param {string} termino - Término a buscar
 */
export function buscarProductos(termino) {
  if (!termino || termino.trim() === '') return [];
  
  const terminoLower = termino.toLowerCase();
  const resultados = [];
  
  productosData.familias.forEach(familia => {
    familia.categorias.forEach(categoria => {
      categoria.productos.forEach(producto => {
        // Buscar en nombre, descripción y etiquetas
        if (
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower) ||
          producto.etiquetas.some(tag => tag.toLowerCase().includes(terminoLower))
        ) {
          resultados.push({
            ...producto,
            familia: {
              id: familia.id,
              nombre: familia.nombre,
              slug: familia.slug
            },
            categoria: {
              id: categoria.id,
              nombre: categoria.nombre,
              slug: categoria.slug
            }
          });
        }
      });
    });
  });
  
  return resultados;
}