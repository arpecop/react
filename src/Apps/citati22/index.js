import React, { Component } from 'react';
import axios from 'axios';
import {
  List, Button, Row, Col,
} from 'antd';
import { Helmet } from 'react-helmet';

import { FacebookProvider, ShareButton, Like } from 'react-facebook';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Footer = ({ lastkey }) => <Button type="primary" icon="right" href={`/${lastkey}`} />;
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstkey: 0,
      lastkey: 0,
      isLoading: true,

      result: { rows: [] },
      resultAll: { rows: [] },
    };
  }

  async componentDidMount() {
    const { isIndex, match } = this.props;
    const query = isIndex ? '' : `&key="${match.params.id}"&skip=0`;
    const query1 = isIndex ? '' : `&start_key="${match.params.id}"&skip=0`;

    const result = await axios(`https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&${query}`);
    const resultAll = await axios(`https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&limit=20${query1}`);
    this.setState({
      firstkey: resultAll.data.rows[0].key,
      lastkey: resultAll.data.rows.reverse()[0].key,
      resultAll: { rows: [result.data.rows[0], ...resultAll.data.rows] },
      result: result.data,
      isLoading: false,
    });
  }

  render() {
    const {
      isLoading, result, resultAll, firstkey, lastkey,
    } = this.state;

    return (
      
    );
  }
}
