import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import "../../assets/css/dashboard.css";
import { useSelector, useDispatch } from 'react-redux';
import { getLimitedOrder, deleteOrder } from "../../store/actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import { Typography, Row, Col, Tooltip, Pagination, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import OrderForm from './OrderForm';
import { customNotification, msgType } from "../../utils/notification/customNotification";
import MyLoader from '../../utils/loader/MyLoader';
import ErrorPage from '../../utils/errorPage/ErrorPage';


const { Title, Text } = Typography;
const { confirm } = Modal;
const defaultPageSize = [10, 25, 50, 100]

const Dashboard = () => {
  const { orderList, totalOrders, loading, errormessage } = useSelector(store => store.orderDetails);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [itemCount, setItemCount] = useState(defaultPageSize[0]);
  const [orderCards, setOrderCards] = useState([]);
  const [isModalOpen, setmodalOpen] = useState(false);
  const [initFormData, setInitForm] = useState({});

  const tempDeletedOrdr = [];
  console.log(loading, "loading");


  useEffect(() => {
    let data = {
      pageNo,
      itemCount
    }
    dispatch(getLimitedOrder(data));
  }, [pageNo, itemCount, dispatch]);


  useEffect(() => {
    constructItem(orderList);
  }, [orderList]);

  const onDeleteOrder = (id) => {
    let flag = tempDeletedOrdr.find((item) => item === id);
    console.log(flag, tempDeletedOrdr, " checking")
    if (flag === undefined) {
      dispatch(deleteOrder(id));
      tempDeletedOrdr.splice(0, tempDeletedOrdr.length);
      tempDeletedOrdr.push(id);
    } else {
      customNotification({ message: "Please wait this order is deleting.", type: msgType.warning })
      console.log("no no wait untill this order get deleted");
    }

  }

  const onPageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    setPageNo(page);
    setItemCount(pageSize);
  }

  const onAction = (flag) => {
    console.log(flag);
    setmodalOpen(flag);
  }

  const newOrder = () => {
    let data = {
      id: uuidv4(),
      customerName: "",
      customerEmail: "",
      product: "Product 1",
      quantity: 1,
      formType: "Create a new order"
    }
    // console.log(data);
    setInitForm(data);
    setmodalOpen(true);
  }

  const editOrder = (data) => {
    let dumData = {
      ...data,
      formType: "Edit order details"
    };
    // console.log(dumData, "dum")
    setInitForm(dumData);
    setmodalOpen(true);

  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this order details?',
      icon: <ExclamationCircleOutlined />,
      content: 'After delete this order you can\'t recover it.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      confirmLoading: true,
      onOk() {
        console.log('OK');
        onDeleteOrder(id);
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  function constructItem(totalOrder) {
    let buildData = totalOrder.length !== 0 && totalOrder.map((item, idx) => {
      return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} key={item.id}>
          <div className="card">
            <div className='itemCard'>
              <Row gutter={16}>
                <Col className="gutter-row" span={20}>
                  <div className='leftSide'>
                    <Row >
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Order Id: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.id}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Customer Name: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.customer_name}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Product: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.product}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Email: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="italic"> {item?.customer_email}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Quantity: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.quantity}</Text>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className='rightSide'>
                    <div>
                      <Row >
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox'>
                            <Tooltip title="Edit this order">
                              <Button style={{ border: "none" }}
                                onClick={() => editOrder({
                                  id: item.id,
                                  customerName: item?.customer_name,
                                  customerEmail: item?.customer_email,
                                  product: item?.product,
                                  quantity: item?.quantity,
                                })}>
                                <EditOutlined style={{ fontSize: '16px', color: '#00FFAB' }} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox'>
                            <Tooltip title="Delete this order">
                              <Button style={{ border: "none" }}
                                onClick={() => showDeleteConfirm(item.id)}
                              >
                                <DeleteOutlined style={{ fontSize: '16px', color: '#F32424' }} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      );
    });
    setOrderCards(buildData);

  }
  return (
    <>{
      loading ? (
        <div>
          <MyLoader />
        </div>
      ) : (
        <>
          {errormessage === "Network Error" ? (
            <ErrorPage />
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center", color: "#4D4C7D" }}>
                <Title level={2}>Order Details</Title>
              </div>
              <div className='createOrderContainer'>
                <div className='createOrderBox'>
                  <div></div>
                  <div>
                    <Button type="primary" icon={<AppstoreAddOutlined />} size={"large"} onClick={newOrder}>
                      Create Order
                    </Button>
                  </div>
                </div>

              </div>
              <div className='ordersContainer'>
                <div style={{ paddingBottom: "1.25rem" }}>
                  <Row gutter={[16, 16]}>
                    {/* {console.log(orderCards, "order cards")} */}
                    {orderCards}
                  </Row>
                </div>

              </div>
              <div className='paginationContainer'>
                <div className='paginationBox'>
                  <div></div>
                  <div className='pagination'>
                    <Pagination showQuickJumper defaultCurrent={pageNo} total={totalOrders} onChange={onPageChange} pageSizeOptions={defaultPageSize} />
                  </div>
                </div>
              </div>

              {
                isModalOpen && (
                  <OrderForm onAction={onAction} initData={initFormData} open={isModalOpen} />
                )
              }

            </div>
          )}
        </>
      )}
    </>
  )
}

export default Dashboard;