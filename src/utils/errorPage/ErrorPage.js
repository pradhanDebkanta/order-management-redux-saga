import React from 'react';
import { Row, Col } from 'antd';
import noresult1 from '../../assets/images/oppsB.svg';
import '../../assets/css/NoResult.css';


const ErrorPage = (props) => {
    // console.log(props, 'from props')
    return (
        <div className="empty-classroom-container" >
            <div className="d-flex justify-content-center">
                <Row gutter={16}>
                    <Col xl={12} lg={12} md={24}>
                        <img src={noresult1} alt="search a img" className="img-fluid" />
                    </Col>
                    <Col xl={12} lg={12} md={24}>
                        <div className=" content-box d-flex justify-content-center">
                            <p className="content-text">
                                Opps!! There is something wrong . <br /> Please check your internet or try after some times.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ErrorPage;
