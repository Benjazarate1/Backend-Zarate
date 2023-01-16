import { Product } from './Product.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require("fs");

class ProductManager {
    /**
     * Builds a new ProductManager
     * @param {*} path  Path to the file where the products are stored
     */
    constructor(path) {
        if (!path) {
            throw new Error("No se ha especificado un archivo");
        }
        else {
            this.path = path;
            fs.existsSync(path)
                ? this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
                : this.products = [];
        }
    }

    /**
     * Obtains the next id to be used
     * @returns next id
     */
    async getNextId() {
        const count = this.products.length;
        const nextId = (count > 0) ? this.products[count - 1].id + 1 : 1;
        return nextId;
    }

    /**
     * Adds a new product to the file
     * @param {*} product the product to be added
     */
    async addProduct(product) {
        try {
            if (Object.values(product).includes(undefined)) {
                throw new Error("El producto no tiene todas las propiedades");
            }
            if (!this.products.find((p) => p.code === product.code)) {
                product['id'] = this.getNextId();
                this.products.push(product);
                await fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
            }
            else {
                throw new Error("El producto ya existe");
            }
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }

    /**
     * Gets all the products from the file
     * @param {*} path file path
     * @returns all the products
     */
    async getProducts(path) {
        try {
            if (fs.existsSync
                (path)) {
                const products = await fs.readFileSync(this.path, "utf8");
                return JSON.parse(products);
            }
            else {
                throw new Error("El archivo no existe");
            }
        }
        catch (error) {
            console.log('Error al leer el archivo: ', error);
        }
    }

    /**
     * Shows all the products from the file
     * @param {*} path file path
     */
    async showProducts(path) {
        try {
            const products = await this.getProducts(path);
            products.forEach((product) => {
                console.log(JSON.stringify(product));
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Gets a product by id
     * @param {*} path file path
     * @param {*} id product id
     * @returns the product
     */
    async getProductById(path, id) {
        try {
            const products = await this.getProducts(path);
            const product = products.find((p) => p.id === id);
            if (product) {
                return product;
            }
            else {
                throw new Error("El producto no existe");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Updates a product by id
     * @param {*} path file path
     * @param {*} id product id
     * @param {*} product product to be updated
     * @returns the updated product
     */
    async updateProductById(path, id, product) {
        try {
            const products = await this.getProducts(path);
            const index = products.findIndex((p) => p.id === id);
            if (index >= 0) {
                products[index] = { ...products[index], ...product };
                await fs.writeFileSync(this
                    .path, JSON.stringify(products, null, "\t"));

                console.log('Producto actualizado');
            }
            else {
                throw new Error("El producto no existe");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Deletes a product by id
     * @param {*} path file path
     * @param {*} id product id
     */
    async deleteProductById(path, id) {
        try {
            const products = await this.getProducts(path);
            const index = products.findIndex((p) => p.id === id);
            if (index >= 0) {
                products[index].available = false;
                await fs.writeFileSync
                    (this.path, JSON.stringify(products, null, "\t"));
                console.log('Producto eliminado');
            }
            else {
                throw new Error("El producto no existe");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

const product1 = new Product(
    "Remera",
    "Talle XL",
    200,
    "a",
    1,
    50
);

const product2 = new Product(
    "Buzo",
    "Talle M",
    150,
    "b",
    2,
    50
);

const product3 = new Product(
    "Campera",
    "Talle XL",
    200,
    "c",
    3,
    50
);

const product4 = new Product(
    "Pantalon",
    "Talle XL",
    250,
    "c",
    4,
    50
);


const productManager = new ProductManager('./products1.json');
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

const productManager2 = new ProductManager('./products2.json');
productManager2.addProduct(product4);

