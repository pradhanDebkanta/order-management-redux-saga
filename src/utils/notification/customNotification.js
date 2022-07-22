import { notification, Row, Col } from "antd";
/*
@params of type will be msgType
*/
export const msgType = {
    success: "success",
    info: "info",
    error: "error",
    warning: "warning",
    warn: "warn",
    open: "open",
    close: "close",
    destroy: "destroy"
}

const MultipleMsg = ({ msg }) => {
    // console.log(msg, "msg");
    return (
        <Row>
            {msg &&
                Array.isArray(msg) && msg.map((pItem, index) => (
                    pItem && Array.isArray(pItem.errors) ? pItem?.errors.map((item, idx) => (
                        <Col span={24} key={idx}>
                            {/* <strong>{item}</strong> */}
                            {item}
                        </Col>
                    )) :
                        (
                            < Col span={24} key={index} >
                                <strong>{pItem}</strong>
                            </Col>
                        )
                ))
            }
        </Row >
    )
}

export const customNotification = ({ status = null, type = "info", message = null, multiMsg = null }) => {
    if (multiMsg) {
        notification[type]({
            message: <MultipleMsg msg={multiMsg} />,
            placement: 'topRight',
            top: 10,
            duration: 6,
        })
        // return;
    }
    if (message) {
        notification[type]({
            message,
            placement: 'topRight',
            top: 10,
            duration: 3,
        })
    }

}
