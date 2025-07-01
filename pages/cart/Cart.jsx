import styles from "./Cart.module.css"

export default function Cart() {

    return (
        <>
        <h1>Cart</h1>
        <div data-testid="cartContainer" className={styles.cartContainer}></div>
        </>
    )
}