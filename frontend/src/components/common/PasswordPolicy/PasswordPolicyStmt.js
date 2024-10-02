import { Col, Form, Row } from "react-bootstrap";
import images from "../../../utils/images";
import { characterRegexInfoStmt } from "./PolicyRegex";

const PasswordPolicyStmt = ({
  passPolicyConstValueState,
  passwordNoInput,
  policy,
}) => {
  return (
    <>
      <span className="password-stmt-title">Passwords must contain:</span>
      <Form.Group
        as={Row}
        className="mb-3 d-flex flex-row justify-content-between align-items-center"
      >
        <Col md={12} className="password-constraint">
          {policy &&
            Array.from(passPolicyConstValueState.entries()).map(function (
              passValue,
              passIndex,
              passArray
            ) {
              return (
                <div
                  data-password-policy-constraint-statement={passValue[0]}
                  key={passIndex}
                  style={{
                    color: passwordNoInput
                      ? "#4B475C"
                      : passValue[1]
                      ? "#03BA82"
                      : "#4B475C",
                  }}
                  className="pt-2 fs-14px ff-pam"
                >
                  {characterRegexInfoStmt(passValue[0], policy)}
                  {!passwordNoInput && passValue[1] && (
                    <img src={images.check_coloured} alt="tick-icon" />
                  )}
                </div>
              );
            })}
        </Col>
      </Form.Group>
    </>
  );
};
export default PasswordPolicyStmt;
