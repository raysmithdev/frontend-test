import {createElement} from 'react';
import styles from './styles.css';
import { PageHeader } from 'react-bootstrap';

const Heading = ({children}) => (
  <PageHeader>{children}</PageHeader>
);

export default Heading;
