import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styles from './Item.module.css'
const Item = () => {
    return (
        <article className={styles.ItemCard}>
            <p>Item</p>
            <div className={styles.btn}>
                <FaEdit className={styles.edit} />
                <MdDelete className={styles.delete} />
            </div>
        </article >
    )
}

export default Item;