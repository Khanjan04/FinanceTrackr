import Popover from "react-bootstrap/Popover";
import ListGroup from "react-bootstrap/ListGroup";
import { RxCross2, RxCheck } from "react-icons/rx";
import { characterRegexInfoStmt } from "./PolicyRegex";

export const PasswordPolicyPopover = (
  pass_policy_const_value_state,
  password_no_input,
  policy,
  z_index
) => {
  const popoverStyle = {
    zIndex: z_index,
  };
  const popover = (
    <Popover
      id="popover-basic"
      style={popoverStyle}
      className="custom-popover p-0"
    >
      <Popover.Header as="h3" className="ff-poppins py-3">
        Password must contain the following:
      </Popover.Header>
      <Popover.Body>
        <ListGroup as="ul" className="list-unstyled">
          {Array.from(pass_policy_const_value_state.entries()).map(function (
            passValue,
            passIndex,
            passArray
          ) {
            return (
              <ListGroup.Item
                as="li"
                data-password-policy-constraint-statement={passValue[0]}
                key={passIndex}
                className={
                  password_no_input
                    ? "ff-poppins fs-14px border-0 text-danger"
                    : passValue[1]
                    ? "ff-poppins fs-14px border-0 text-success"
                    : "ff-poppins fs-14px border-0 text-danger"
                }
              >
                <div className="d-flex w-100">
                  <div className="pe-2">
                    {!password_no_input && passValue[1] ? (
                      <RxCheck size={20} />
                    ) : (
                      <RxCross2 size={20} />
                    )}
                  </div>
                  <div>{characterRegexInfoStmt(passValue[0], policy)}</div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  return popover;
};

export const HandlePasswordChange = (
  event,
  pass_policy_const_setter_state,
  policy,
  username,
  email,
  first_name,
  last_name,
  password_policy_stmt_regex,
  regex_check,
  password_regex,
  setPasswordNoInput,
  setPassPolicyConstValueState,
  setPasswordIsInvalid,
  setPassword
) => {
  setPasswordNoInput(false);
  Array.from(pass_policy_const_setter_state.entries()).forEach(
    ([constName, passwdPolicyConstStateFunction]) => {
      const charRegex = password_policy_stmt_regex(
        constName,
        policy,
        email,
        username,
        first_name && first_name,
        last_name && last_name
      );
      let charConditionOutput = regex_check(charRegex, event.target.value);
      if (charConditionOutput) {
        passwdPolicyConstStateFunction(true);
        setPassPolicyConstValueState((prev) => {
          const temp = new Map(prev);
          temp.set(constName, true);
          return temp;
        });
      } else {
        passwdPolicyConstStateFunction(false);
        setPassPolicyConstValueState((prev) => {
          const temp = new Map(prev);
          temp.set(constName, false);
          return temp;
        });
      }
    }
  );
  setPassword(event.target.value);
  const regex = new RegExp(password_regex);
  if (regex.test(event.target.value)) {
    setPasswordIsInvalid(false);
  } else {
    setPasswordIsInvalid(true);
  }
};

export const GetPasswordClassName = (
  validated,
  password,
  passwordIsInvalid,
  base_class
) => {
  if (validated) {
    if (password && password.length > 0) {
      if (passwordIsInvalid) {
        return base_class + " invalid_input_group";
      } else {
        return base_class + " valid_input_group";
      }
    } else {
      return base_class + " invalid_input_group";
    }
  } else {
    if (password && password.length > 0) {
      if (passwordIsInvalid) {
        return base_class + " invalid_input_group";
      } else {
        return base_class;
      }
    } else {
      return base_class;
    }
  }
};

export const GetInputgroupTextClass = (validated, value) =>{
  const input_group_base_class = " bg-white my-input-group cursor_pointer ";
  return validated? value && value.length >0? input_group_base_class+"border-success":input_group_base_class+"border-danger" :input_group_base_class
}