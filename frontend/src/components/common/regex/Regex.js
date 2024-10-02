export const RoleNameReg =
  "^(?=.{4,20}$)(?![_\\-])(?!.*[_\\-]{2})[a-zA-Z0-9_\\-]+(?<![_\\-])$";
export const DisplayNameReg = "^.{4,20}$";
export const FirstLastNameReg = "^.+$";
export const SSOapplicationName =
  "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽð ,.'-]+$";
export const UserNameReg = "^.+$";
export const PasswordReg =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\\\@$!%*?&\\.#^()<>\\-\\_\\'\",/;:[\\]^~`{}|\\+=])[A-Za-z\\d\\\\@$!%*?&\\.#^()<>\\-\\_\\'\",/;:[\\]^~`{}|\\+=]{8,20}$";
export const URLReg2 =
  "(\\[(?:(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\dd|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?)\\]";
export const URLReg =
  "^(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])|((l|L)ocalhost)|((?!-)[A-Za-z0-9-]+([\\-\\.]{1}[a-z0-9]+)*\\.[A-Za-z]{2,6})|" +
  URLReg2 +
  "$";
export const PasswordCharUppercaseReg = "^([A-Z]+)$";
export const PasswordCharLowercaseReg = "^([a-z]+)$";

export const checkValidity = (field, value, isSubmitted) => {
  if (isSubmitted === false) {
    return false;
  } else {
    switch (field) {
      case "username": {
        const pattern = /^[a-zA-Z]+[\w@.\d]+$/;
        return !pattern.test(value);
      }
      case "first_name": {
        const pattern = /^(?:[\p{L}'\-.,]+)?$/u;
        return !pattern.test(value);
      }
      case "last_name": {
        const pattern = /^(?:[\p{L}'\-.,]+)?$/u;
        return !pattern.test(value);
      }
      case "email": {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/u;
        return !pattern.test(value);
      }
      case "password": {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.#^()<>])[A-Za-z\d@$!%*?&\.#^()<>]{8,20}$/;
        return !pattern.test(value);
      }
      default:
        return true;
    }
  }
};
