import AuthContextProvider from './AuthContext'
import CartContext from './CartContext'

const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <CartContext>
                {children}
            </CartContext>
        </AuthContextProvider>
    )
}

export default AppProvider