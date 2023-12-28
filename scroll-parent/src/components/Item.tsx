import './Item.css';

export function Item({itemName}) {
    return (
        <>
        <li slot='item'>
            <div className='item-container'>
                {itemName}
            </div>
        </li>
        </>
    )
}