class Product{
    constructor(title, description, price, thumnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumnail = thumnail;
        this.code = code;
        this.stock;
    }
    setId(id){
        this.id = id;
    }
}

class ProductManager{
    constructor(){
        this.products = [];
        this.idManager= 1;
    }


    validateCode(product){
        let flag = false;
        this.products.forEach((producto) => {
            producto.code === product.code && (flag = true);
        });
        if (!flag) {
            if (
            product.title !== "" &&
            product.description !== "" &&
            product.price !== "" &&
            product.thumbnail !== "" &&
            product.code !== "" &&
            product.stock !== ""
            ) {
            return true;
            } else {
            return `Error: No se pudo cargar ${product.title}`;
            }
        } else {
            return `Error: El producto ${product.title} tiene el mismo codigo que otro producto`;
        }
        }

    addProduct(product) {
        const validacion = this.validateCode(product)
        if (validacion === true) {
          product.setId(this.idManager);
          this.idManager += 1;
          this.products.push(product);
          return `Carga de producto ${product.title} exitosa`
        } else {
          return validacion
        }
      }

    getProdcuts(){
        return this.products
    } 
    
    getProductById(id){
        return (this.products.find(product => product.id === id)) || 'Error: Producto no encontrado' //Devuelve el producto, en caso de no encontrarlo devuelve un error
      }
}

const producto1 = new Product(
     "Remera", 
     "Talle XL",
     200,
     "a",
     2411,
     50
    );

const producto2 = new Product(
     "Buzo",
     "Talle M",
     150,
     "b",
     1010,
      50
);

const producto3 = new Product(
     "Campera",
     "Talle XL",
     200,
     "c",
     2411,
     50);

const producto4 = new Product('Pantalon', '', '', '', '', '')

const ManejadorProductos = new ProductManager();

console.log(ManejadorProductos.addProduct(producto1))

console.log(ManejadorProductos.addProduct(producto2))

console.log(ManejadorProductos.addProduct(producto3)) 

console.log(ManejadorProductos.addProduct(producto4)) 


console.log('Metodo getProducts')
console.log(ManejadorProductos.getProdcuts())

console.log('Metodo getProductById')
console.log(ManejadorProductos.getProductById(2))

console.log('Metodo getProductById')
console.log(ManejadorProductos.getProductById(10)) 

