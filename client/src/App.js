import React , { useState , useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./utils/Url";
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Form, Input, Button, Select, notification, Card, Empty } from 'antd';

const { Option } = Select;


function App() {

  const [travelData , setTravelData] = useState([]);

  const openNotification = (data) => {
    notification.open({
      message: data
    });
  };
  

  const onFinish = async(data) => {
    const res = await axios.post(`${baseUrl}/postData`, data)
    if(res.status === 200){
      openNotification("Data Successfully Created.")
      getTravelData();
    }else{
      openNotification("Server Error.")
    }
  };

  const getTravelData = async() => {
    const res = await axios.get(`${baseUrl}/getData`);
    setTravelData(res.data);
  }

  const deleteTravel = async(data)=> {
    const res = await axios.post(`${baseUrl}/deleteData`, data)
    if(res.status === 200){
      openNotification("Data Successfully Deleted")
      getTravelData();
    }else{
      openNotification("Server Error.")
    }
  }

  useEffect(()=>{
    getTravelData();
  },[])

  return (
    <div>
      <center>
        <h2 style={{ marginTop : 50 }}>Travel Package Company.</h2>
      </center>
      <Row style={{ marginTop : 70 }}>
      <Col span={8}>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Location Image"
        name="locationImage"
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cost of Travel"
        name="cost"
       
      >
        <Input />
      </Form.Item>

      

      <Form.Item
        label="Places to visit"
        name="place"
       
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="No of Days to Travel"
        name="days"
      >
      <Select
          placeholder="Select a option"
          allowClear
        >
          <Option value="3">3 Days</Option>
          <Option value="5">5 Days</Option>
          <Option value="10">10 Days</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Mode of Travel"
        name="mode"
      >
      <Select
          placeholder="Select a option"
          allowClear
        >
          <Option value="Train">Train</Option>
          <Option value="Bus">Bus</Option>
          <Option value="Airplane">Airplane</Option>
        </Select>
      </Form.Item>

      
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Col>
      <Col span={15} style={{marginLeft : 40}}>
        <Row>
          
          {
           travelData.length === 0 ?
           <Empty />:
           travelData.map((data,i)=>{
            return(
            <Col span={10} style={{marginLeft : 40 , marginBottom : 30}}>
               <Card title={data.place}>
                  <img src={data.locationImage} alt="location" width={200} />
                  <p><b>Cost of Travel: </b> $ {data.cost}</p>
                  <p><b>Days of Travel: </b>{data.days}</p>
                  <p><b>Mode of Travel: </b>{data.mode}</p>
                  <Button type="primary" onClick={()=>deleteTravel({_id : data._id})}>Delete</Button>
              </Card> 
           </Col>
            )
          })
         }
         
        </Row>
      </Col>
    </Row>
    </div>
  )
}


export default App;

