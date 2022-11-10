# Prueba técnica Frontend Ecomsur 2022 - Simón Giraldo Zapata

## Resolución de la prueba - indicaciones

### La resolución de la prueba se realizó de la siguiente manera:

1. La estructura del encarpetado en el código fuente del frontend (front/src) se realizó de la siguiente manera:
<br><br>

 - Carpeta Cart: Contiene las vistas y rutas del carrito de compras.
 - Carpeta Components: Contiene todos los componentes que se pueden reutilizar en cualquier página de la aplicación.
 - Carpeta helpers: Contiene una serie de funciones que ayuda a mejorar la lectura del código y que cada componente y/o página no se vean tan desordenados por la gran cantidad de líneas de código.
 - Carpeta products: Contiene las vistas y rutas del carrito de compras.
 - Carpeta router: Es el propio enrutador de la aplicación, en dicha carpeta se encuentran las rutas principales de la aplicación.
 - Carpeta store: Contiene toda la lógica de redux, como el store y los slices usados.
 - Carpeta styles: Contiene un único archivo donde se encuentran todas las líneas de CSS para los estilos y responsive de la aplicación.
 - Archivo App.js: Es el archivo donde se llama el router y que contiene toda la aplicación en sí.
 - Archivo index.js: Es el archivo donde se llama el componente App el cual contiene toda la aplicación en sí, este archivo se encarga de montar dicho componente en el archivo html que contiene un "< div >< / div >" con id root.

<br>

2. Lógica o flujo de la aplicación:

    La aplicación montará un componente App el cual a su vez montara el componente Router que es quien se encarga de contener las rutas principales de la aplicación, como "/products" y "/cart". <br><br>
    
    Cuando se solicite cualquier ruta esta llegará el componente Router quien a través de los diferentes paths buscara a que componente se está llamando para ser montado en el dom. En el caso de los paths "/products" y "cart", estos pintaran varias rutas que contienen en si las páginas de cada uno de estos módulos, por lo que si por ejemplo se busca la ruta "/cart/checkout", esta ruta llegara al componente Router, este llamara al componente CartRoutes, este se encargará de buscar que página las cuáles se encuentran en la carpeta Pages corresponde con el path que le pasamos que es "/cart/checkout".<br><br>
    
    En el componente Router se están llamando dos providers, los cuales permiten el acceso a los contextos de productos y carrito, esto con el fin de que cualquier elemento que esté dentro de dichos providers, puedan acceder al valor de estos contextos.<br><br>

    Para acceder rápidamente a cada valor que contienen los providers de los contextos se creó un hook personalizado para cada provider, es decir, si tenemos el contexto de productos, aquellos elementos(componentes y/o páginas) que tengan acceso al mismo, podrán hacerlo a través de la función o hook useProducts(), el cual retorna un objeto donde se puede acceder a cada una de las propiedades del mismo, desde simple texto hasta funciones que modifican el estado.<br><br>

    En el carrito, para tener la persistencia de los datos hace uso del LocalStorage, donde guardamos el arreglo de productos cada que hay un cambio en el estado de carrito que tiene el contexto del carrito, es decir, cada que haya un cambio en alguna propiedad de un producto que esté en el estado del carrito, inmediatamente este cambio se verá reflejado en el LocalStorage, y así obtenemos la permanencia de los datos en el carrito.<br><br>

    El contexto del carrito tiene sus propias validaciones, donde validamos aspectos importantes como el stock de productos.<br><br>

    Cuando un producto no tiene stock, directamente al hacer hover en él mismo o yendo a sus detalles nos dirá que el producto no tiene stock por lo que no puede ser añadido al carrito.<br><br>

    En caso de que una validación falle o que se pueda añadir un producto al carro, se hará uso del helper y del reducer de mensajes, ambos usados al mismo tiempo nos evitan un mal código y nos permite arrojar alertas tanto de error como de éxito.<br><br>

    El filtrado de los productos se hace a través de un helper que nos permite acceder a las propiedades de cada objeto, y evaluamos si dicha propiedad es un string para así validar que corresponda con el dato de búsqueda digitado en el input.<br><br>

    Cuando añadimos un producto al carrito, en la barra de navegación, el botón que corresponde para ir a ver nuestro carrito, se actualizará y nos mostrará cuantos productos tenemos al carrito, es decir, evalúa cuantos elementos hay en el carrito, no cuanta cantidad por cada elemento.<br><br>

    Cuando vamos a la página del carrito veremos en una tabla los detalles de cada producto que tenemos en el carrito, su nombre, imagen, etc. Lo más importante son las acciones que se pueden hacer en esta misma página, las acciones son:
    <br>
    <br>
    <ul>
    <li>Limpiar el carrito: Elimina los productos del estado del carrito y del LocalStorage.</li><br>
    <li>Aumentarle cantidad a un producto: Se encarga de aumentarle cantidad al producto, cuando esta se sobrepase del stock disponible del producto, la cantidad ya no se aumentará y lanzará una alerta indicándonos que ya no se puede aumentar más la cantidad.</li><br>
    <li>Aumentarle cantidad a un producto: Se encarga de aumentarle cantidad al producto, cuando esta se sobrepase del stock disponible del producto, la cantidad ya no se aumentará y lanzará una alerta indicándonos que ya no se puede aumentar más la cantidad.</li><br>
    <li>Eliminar un producto del carrito: Cuando se dé click a este botón, se nos lanzará una alerta preguntando si realmente deseamos eliminar el producto del carrito, al aceptar automáticamente se eliminará el producto del carrito y se verán los cambios reflejados en la pantalla.</li>
    <br>
    <span><strong>Aclaración</strong>: Si no hay productos en el carrito, la página nos indicará que no se encuentran productos agregados al carrito y nos sugiere ir a la página de productos a agregarlos.</span> 
    </ul>
    <br>
    <br>
    Cuando deseamos hacer la compra de los productos que tenemos en el carrito, pulsamos el botón "pagar" y este nos redireccionará a la página de checkout, donde se hace una <strong>simulación</strong> de pago.
    <br>
    <br>
        
3. Ejemplo de compra de producto       
        
    Entramos a la página de productos la cual tiene el pathname "/products".

    ![Productos](/products.png)

    Seleccionamos cualquier producto que deseemos añadir al carrito, esto nos llevará a la página del producto.
    ![Producto](/product.png)
    
    Si el producto no tiene stock la página se verá así.
    ![Producto sin stock](/product-sin-stock.png)

    Añadimos el producto al carrito a través del botón que dice "Añadir al carrito".
    ![Producto en el carrito](/product-carrito.png)

    Si nos sobrepasamos con el stock en base a la cantidad del producto que tenemos en el carrito, el sistema lanzará una alerta indicándolo.
    ![Producto sobrepasado](/product-fuera-de-stock.png)

    El carrito irá acumulando la cantidad de productos que tenemos en el carrito y se verá así.
    ![Productos en el carrito](/products-in-cart.png)

    Para ver nuestros productos en el carrito pulsamos click en el ícono de carrito de la barra de navegación. esto nos llevará a la siguiente página.
    ![Carrito](/carrito.png)

    Para limpiar el carrito pulsamos click en el botón que dice "limpiar carrito", esto nos lanzará una alerta preguntándonos si estamos seguros de hacerlo.
    ![Limpiar carrito](/limpiar-carrito.png)

    Si limpiamos el carrito, la página nos indicará que el carrito está vacío y nos sugiere ir a añadir productos al carrito.
    ![Carrito sin productos](/carrito-sin-productos.png)

    Si deseamos eliminar un producto del carrito, debemos pulsar click en el botón con ícono de 🗑, esto nos lanzará una alerta donde nos pregunta si estamos seguros de eliminar el producto del carrito.
    ![Eliminar producto](/eliminar-producto.png)

    Cuando se desea pagar, debemos pulsar click en el botón "pagar", esto nos llevará a la página de checkout, donde se nos solicitará nuestro nombre y dinero a depositar.
    ![Checkout](/checkout.png)

    Cuando insertemos una cantidad igual o mayor al total de la compra, el sistema nos lanzará una alerta indicándonos que la compra se hizo satisfactoriamente.
    ![Compra](/compra.png)

## Requerimientos mínimos de instalación

 Node 14.15.0 <br>
 nvm para instalar rápidamente las versiones de node solicitadas. <br>
 git.
 

## Instalar y Correr la aplicación

La instalación del backend y frontend se hace ejecutando los siguientes comandos:

1. Para descargar el proyecto abrimos una consola (powershell o git) y ejecutamos el siguiente comando:
    ### `git clone https://github.com/SGZ34/virtual-shop-backend-frontend.git` <br>

    para movernos a la carpeta ejecutamos el comando:
    ### `cd front-end-tech-test` <br>

2. Para instalar las dependencias del backend ejecutamos el siguiente comando:
    ### `npm install` <br>

3. Para instalar las dependencias del frontend debemos movernos a la carpeta front con el siguiente comando:
    ### `cd front` <br>
    Después ejecutamos el comando:
    ### `npm install` <br>
4. Después volvemos a la carpeta root de nuestro proyecto con el comando: 
    ### `cd ..` <br>
    Para lanzar el servidor de desarrollo ejecutamos el comando:
    ### `npm run dev` <br>
    Esto arrancará tanto la aplicación del backend como del frontend.<br>

Para ver nuestra aplicación vamos a nuestro navegador y digitamos la siguiente url:
### http://localhost:3000 <br>

A partir de aquí podemos interactuar con la aplicación.




