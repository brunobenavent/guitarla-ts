import Guitar from './components/Guitar'
import Header from './components/Header'
import { useCart } from './hooks/useCart'

function App() {
    const {data, cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cleanCart, totalPagar, isEmptyCart } = useCart()
    return (
    <>
      <Header
        cart = {cart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        removeFromCart = {removeFromCart}
        cleanCart = {cleanCart}
        totalPagar = {totalPagar}
        isEmptyCart = {isEmptyCart}
      />
      
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map(guitar =>(
                    <Guitar
                        guitar = {guitar}
                        key = {guitar.id}
                        addToCart = {addToCart}
                    />

                ))}

            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
  )
}

export default App
