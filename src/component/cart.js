import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';

import {clear, setQuantity, setTotal, remove} from '../action/cart';
import * as products from '../data/items';
import Heading from './heading';
import { Table, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styles from './styles.css';


const Item = connect(
  () => ({}),
  {setQuantity, remove}
)(({id, quantity, setQuantity, remove}) => {
  const {title, price} = products[id];
  const inc = () => { setQuantity({id, quantity: quantity + 1}); }
  const dec = () => { quantity < 2 ? remove(id) : setQuantity({id, quantity: quantity - 1}); }
  return (
    <tr className={styles.cartItem}>
      <td>
        {title} <FontAwesome name="trash" onClick={() => remove(id)}/>
      </td>
      <td>
        ${price}
      </td>
      <td>
        {quantity}
        <FontAwesome
            className={styles.quantityIcon}
            name='plus'
            onClick={inc}
          />

        <FontAwesome
            className={styles.quantityIcon}
            name='minus'
            onClick={dec}
          />
      </td>
      <td>
        ${Math.round((price * quantity) * 100) / 100}
      </td>
    </tr>
  );
});

const Cart = ({total, items, clear}) => (
  <div>
    <Heading><FontAwesome name="shopping-cart"/> Cart</Heading>
    {items.length ?
      <div className={styles.cart}>
        <Button onClick={clear}>Clear all items</Button>
        <Table>
          <thead>
            <tr className={styles.title}>
              <th><h3>Product</h3></th>
              <th><h3>Price</h3></th>
              <th><h3>Quantity</h3></th>
              <th><h3>Total</h3></th>
            </tr>
          </thead>
          <tbody>
            {map((item) => <Item key={item.id} {...item}/>, items)}
          </tbody>
        </Table>
        <h1 className="pull-right">${Math.round(total * 100) / 100}</h1>
      </div>
    : <p>Your cart is empty</p>}
  </div>
);


export default connect((state) => {
  return {
    items: state.cart.items,
    total: reduce(
      (sum, {id, quantity}) => sum + products[id].price * quantity,
      0,
      state.cart.items
    ),
  };
}, {clear})(Cart);
