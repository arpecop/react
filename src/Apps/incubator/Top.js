import React, { Component } from 'react';
import axios from 'axios';
import { env } from './env/constants';
import { Input, Row, Col, List,Avatar } from 'antd';
const { Search } = Input;



export default class Top extends Component {
  state = {
    value: null,
    results:{rows:[]}
  };
  async setValue(value) {
    console.log();
    if (value.length >= 3) {
      this.setState({ value });
    const result = await axios(
        `${env.api}twitter/_design/api/_view/tags?reduce=true&group=true&limit=5&start_key="${
          value
        }"&update=false`,
      );
  
      
      this.setState({ value,results:result.data });
    } else {
        this.setState({ value:null});
    }
  }

  render() {
    const { value,results } = this.state;
    return (
      <Row type="flex" justify="center">
    
        <Col xs={24} sm={20} md={18} lg={10}>
          <Search placeholder="search for users or tags" onChange={e => this.setValue(e.target.value)} style={{color:'#FFF'}} />
             {value ? (
                 <List
    itemLayout="horizontal"
    dataSource={results.rows}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={  <Avatar src={`https://avatars.io/twitter/${item.key}`} size="large" />}
          title={<a href={"/u/"+item.key} style={{color:'#FFF'}}>{item.key}</a>}
         
        />
      </List.Item>
    )}
  />
             ):null } 
        </Col>
      </Row>
    );
  }
}
