import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styles from './Item.module.css'
const Item = (props) => {
    const [remove, setRemove] = useState(false);
    const onDeleteHandler = () => {
        setRemove(true);
        const timer = setTimeout(() => {
            props.delete(props.id);
        }, 400);
        return () => { clearTimeout(timer) }
    }
    const onEditHandler = () => {
        props.edit(props.item, props.id);
    }
    return (
        <article className={`${styles.ItemCard} ${remove ? styles.out : ''}`}>
            <p>{props.item}</p>
            <div className={styles.btn}>
                <FaEdit onClick={onEditHandler} className={`${styles.edit} ${styles.icon}`} />
                <MdDelete onClick={onDeleteHandler} className={`${styles.delete} ${styles.icon}`} />
            </div>
        </article >
    )
}

export default Item;