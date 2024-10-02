import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import images from "../../../utils/images";
import CrossButton from "../ButtonSpinner/CrossButton";
import GeneralButton from "../SaveButton/GeneralButton";
import "./ShowAlert.scss";

const ShowAlert = ({
  setOpenAlert,
  handleAlertAction,
  colName,
  alertMsg,
  headingMsg,
  entity_name,
  loading,
}) => {
  return (
    <Container fluid className="main_content_container alert_container mx-auto">
      <div className="d-flex justify-content-between align-items-center  mb-1">
        <h2 className="main_content_heading">{headingMsg}</h2>
        <CrossButton onClick={() => setOpenAlert((o) => !o)}></CrossButton>
      </div>
      <div>
        <div className="d-flex flex-row justify-content-start align-items-center">
          <p className="sub_heading">{alertMsg} </p>
          {entity_name && (
            <p className="sub_heading_bold">
              <b>&nbsp;{entity_name} : </b>
            </p>
          )}
        </div>
        <div className="d-flex flex-column flex-wrap alert_main_container">
          {colName.map((name, index) => (
            <div className="d-flex flex-row justify-content-start align-items-center">
              <p className="display_names">{index + 1}.</p>
              <p className="display_names mx-2" key={index}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Row className="pt-1 mb-1 justify-content-end">
        <Col sm="auto">
          <GeneralButton
            onClickEvent={() => setOpenAlert((o) => !o)}
            className="me-1"
            value="Cancel"
            color="#505050"
            variant="outlined"
            size="large"
          />
        </Col>
        <Col sm="auto" className="me-sm-2 p-0">
          {loading ? (
            <GeneralButton
              variant="contained"
              disabled={true}
              className="me-1"
              value={<img src={images.Loader} width="26px" height="26px" />}
              size="large"
            />
          ) : (
            <GeneralButton
              onClickEvent={handleAlertAction}
              className="me-1"
              value="Confirm"
              variant="contained"
              size="large"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ShowAlert;
