import {createElement} from 'react';
import {add} from '../action/cart';
import {connect} from 'react-redux';
import styles from './styles.css';
import { Thumbnail, Button, Col } from 'react-bootstrap';

const Product = ({add, id, title, image}) => (
  <div className={styles.product} onClick={() => add(id)} >
    <Col xs={6} md={4}>
      <Thumbnail src={image} alt="242x200">
        <h3 className={styles.title}>{title}</h3>
      </Thumbnail>
    </Col >
  </div>
);

export default connect(() => ({}), {add})(Product);
