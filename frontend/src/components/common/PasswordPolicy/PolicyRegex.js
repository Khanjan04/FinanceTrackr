import { PasswordReg } from "../regex/Regex";

export function regexCheck(regexGiven, input) {
  return regexGiven.test(input);
}
export function passwordPolicyStmtRegex(
  objectKey,
  policy,
  email,
  username,
  first_name,
  last_name
) {
  switch (objectKey) {
    case "uppercase":
      let upper_case = "([A-Z]+)";
      let policy_regex_pattern = "^(.*)" + upper_case + "(.*)$";
      const policy_char_regex = new RegExp(policy_regex_pattern);
      return policy_char_regex;
    case "lowercase":
      let lower_case = "([a-z]+)";
      let policy_lower_regex_pattern = "^(.*)" + lower_case + "(.*)$";
      const policy_lower_char_regex = new RegExp(policy_lower_regex_pattern);
      return policy_lower_char_regex;
    case "number":
      let number_case = "(\\d+)";
      let policy_number_regex_pattern = "^(.*)" + number_case + "(.*)$";
      const policy_number_char_regex = new RegExp(policy_number_regex_pattern);
      return policy_number_char_regex;
    case "minimum":
      let minium_case = ".{" + policy.min_password_length + ",}$";
      let min_regex_pattern = "^(.*)" + minium_case;
      const min_regex_exp = new RegExp(min_regex_pattern);
      return min_regex_exp;
    case "maximum":
      let max_case =
        ".{" +
        policy.min_password_length +
        "," +
        policy.max_password_length +
        "}$";
      let max_regex_pattern = "^" + max_case;
      const max_regex_exp = new RegExp(max_regex_pattern);
      return max_regex_exp;
    case "special":
      // escape special symbols.
      let password_special_symbols = policy.password_special_symbols;
      let special_symbol_arr = [];
      if (password_special_symbols.length > 0) {
        special_symbol_arr = Array.from(password_special_symbols);
      }
      let special_regex_part = "[";
      for (let i = 0; i < special_symbol_arr.length; i++) {
        if (
          special_symbol_arr[i] === "+" ||
          special_symbol_arr[i] === "^" ||
          special_symbol_arr[i] === "|" ||
          special_symbol_arr[i] === "-" ||
          special_symbol_arr[i] === "]" ||
          special_symbol_arr[i] === "\\"
        ) {
          special_regex_part += "\\";
          special_regex_part += special_symbol_arr[i];
        } else if (special_symbol_arr[i] === '"') {
          special_regex_part += "\x22";
        } else {
          special_regex_part += special_symbol_arr[i];
        }
      }
      special_regex_part += "]";

      //special regex part negation.
      const all_special_symbols = "'-!\"#$%&()*,\\./:;?@[]^_`{|}~+<=>";
      const password_special_symbols_set = new Set(password_special_symbols);
      const check_special_symbols_negation = Array.from(
        password_special_symbols_set
      );
      let final_regex = "";
      for (let position in all_special_symbols) {
        if (
          check_special_symbols_negation.includes(all_special_symbols[position])
        ) {
          //a includes the special symbol
        } else {
          final_regex += all_special_symbols[position];
        }
      }

      // escape negation special symbols.
      let special_regex_part_negation = "[";
      let special_symbol_arr_negation = [];
      if (final_regex.length > 0) {
        special_symbol_arr_negation = Array.from(final_regex);
      }
      for (let i = 0; i < special_symbol_arr_negation.length; i++) {
        if (special_symbol_arr_negation[i] === "\\") {
          special_regex_part_negation += "\x5c\x5c";
        } else if (special_symbol_arr_negation[i] === "]") {
          special_regex_part_negation += "\x5c\x5d";
        } else if (special_symbol_arr_negation[i] === "-") {
          special_regex_part_negation += "\x5c";
          special_regex_part_negation += special_symbol_arr_negation[i];
        } else if (special_symbol_arr_negation[i] === '"') {
          special_regex_part_negation += "\x22";
        } else {
          special_regex_part_negation += special_symbol_arr_negation[i];
        }
      }
      special_regex_part_negation += "]";
      let special_symbols =
        "(?=.*" +
        special_regex_part +
        ")(?!.*" +
        special_regex_part_negation +
        ")";
      let special_regex_pattern = "^" + special_symbols + "(.*)$";
      const special_regex_exp = new RegExp(special_regex_pattern);
      return special_regex_exp;
    case "restricted":
      //email
      const can_contain_email_or_part = policy.can_contain_email_or_part;
      const can_contain_firstname_or_part =
        policy.can_contain_firstname_or_part;
      const can_contain_lastname_or_part = policy.can_contain_lastname_or_part;
      const can_contain_username_or_part = policy.can_contain_username_or_part;
      const email_regex = /(\S*)*(\.)?@(\S*)*\.(\S*)*/;
      let email_parts = email.match(email_regex);
      let first_email_part = "";
      let second_email_part = "";
      let last_email_part = "";
      if (email_parts !== null && email_parts !== "") {
        first_email_part =
          email_parts[1] !== undefined && email_parts[1] !== ""
            ? email_parts[1]
            : "";
        second_email_part =
          email_parts[3] !== undefined && email_parts[3] !== ""
            ? email_parts[3]
            : "";
        last_email_part =
          email_parts[4] !== undefined && email_parts[4] !== ""
            ? email_parts[4]
            : "";
      }
      let email_part = "";
      if (
        first_email_part !== undefined &&
        first_email_part !== "" &&
        second_email_part !== "" &&
        second_email_part !== undefined &&
        last_email_part !== undefined &&
        last_email_part !== ""
      ) {
        email_part =
          can_contain_email_or_part === true
            ? ""
            : "(?!.*" +
              first_email_part +
              ")" +
              "(?!.*" +
              second_email_part +
              ")" +
              "(?!.*" +
              last_email_part +
              ")" +
              "(?<!.*" +
              first_email_part +
              ")" +
              "(?<!.*" +
              second_email_part +
              ")" +
              "(?<!.*" +
              last_email_part +
              ")";
      }

      //username, first_name, and last_name
      let username_part = "";
      let first_name_part = "";
      let last_name_part = "";
      if (username !== undefined && username !== "") {
        username_part =
          can_contain_username_or_part === true
            ? ""
            : "(?!.*" + username + ")" + "(?<!.*" + username + ")";
      }
      if (first_name !== undefined && first_name !== "") {
        first_name_part =
          can_contain_firstname_or_part === true
            ? ""
            : "(?!.*" + first_name + ")" + "(?<!.*" + first_name + ")";
      }
      if (last_name !== undefined && last_name !== "") {
        last_name_part =
          can_contain_lastname_or_part === true
            ? ""
            : "(?!.*" + last_name + ")" + "(?<!.*" + last_name + ")";
      }
      let restrict_regex_pattern =
        "^" +
        email_part +
        username_part +
        first_name_part +
        last_name_part +
        "(.*)$";
      let pass_policy_restricted_exp = new RegExp(restrict_regex_pattern);
      return pass_policy_restricted_exp;
    default:
      let pass_policy_regex_pattern = new RegExp(PasswordReg);
      return pass_policy_regex_pattern;
  }
}
export function characterRegexInfoStmt(objectKey, policy) {
  switch (objectKey) {
    case "uppercase":
      return "At least one uppercase letter.";
    case "lowercase":
      return "At least one lowercase letter.";
    case "number":
      return "At least one number.";
    case "special":
      return `Only these special characters are allowed: ${policy.password_special_symbols}`;
    case "restricted":
      let message = "";
      message += policy.can_contain_email_or_part
        ? ""
        : "Must not include the email or any part of it. ";
      message += policy.can_contain_username_or_part
        ? ""
        : "Must not include the username. ";
      message += policy.can_contain_firstname_or_part
        ? ""
        : "Must not include first name. ";
      message += policy.can_contain_lastname_or_part
        ? ""
        : "Must not include last name. ";
      return message;
    case "minimum":
      return `Length must be more than ${policy.min_password_length} characters`;
    case "maximum":
      return `Length must be less than ${policy.max_password_length} characters`;
    default:
      return "Password fullfils all required conditions.";
  }
}
export const passwordPolicyRegex = (
  policy,
  email,
  username,
  first_name,
  last_name
) => {
  if (policy !== null) {
    const can_contain_email_or_part = policy.can_contain_email_or_part;
    const can_contain_firstname_or_part = policy.can_contain_firstname_or_part;
    const can_contain_lastname_or_part = policy.can_contain_lastname_or_part;
    const can_contain_username_or_part = policy.can_contain_username_or_part;
    const max_password_length = policy.max_password_length;
    const min_password_length = policy.min_password_length;
    const password_special_symbols = policy.password_special_symbols;
    const require_lowercase_letter = policy.require_lowercase_letter;
    const require_number = policy.require_number;
    const require_special_symbols = policy.require_special_symbols;
    const require_uppercase_letter = policy.require_uppercase_letter;
    //addition of above conditions into regex.
    let upper_case = require_uppercase_letter === true ? "(?=.*[A-Z])" : "";
    let lower_case = require_lowercase_letter === true ? "(?=.*[a-z])" : "";
    let number = require_number === true ? "(?=.*[0-9])" : "";
    let special_regex_part = "[";

    // escape special symbols.
    let special_symbol_arr = [];
    if (password_special_symbols.length > 0) {
      special_symbol_arr = Array.from(password_special_symbols);
    }
    for (let i = 0; i < special_symbol_arr.length; i++) {
      if (
        special_symbol_arr[i] === "+" ||
        special_symbol_arr[i] === "^" ||
        special_symbol_arr[i] === "|" ||
        special_symbol_arr[i] === "-" ||
        special_symbol_arr[i] === "]" ||
        special_symbol_arr[i] === "\\"
      ) {
        special_regex_part += "\\";
        special_regex_part += special_symbol_arr[i];
      } else if (special_symbol_arr[i] === '"') {
        special_regex_part += "\x22";
      } else {
        special_regex_part += special_symbol_arr[i];
      }
    }
    special_regex_part += "]";

    //special regex part negation.
    const all_special_symbols = "'-!\"#$%&()*,\\./:;?@[]^_`{|}~+<=>";
    const password_special_symbols_set = new Set(password_special_symbols);
    const check_special_symbols_negation = Array.from(
      password_special_symbols_set
    );
    let final_regex = "";
    for (let position in all_special_symbols) {
      if (
        check_special_symbols_negation.includes(all_special_symbols[position])
      ) {
        //a includes the special symbol
      } else {
        final_regex += all_special_symbols[position];
      }
    }

    // escape negation special symbols.
    let special_regex_part_negation = "[";
    let special_symbol_arr_negation = [];
    if (final_regex.length > 0) {
      special_symbol_arr_negation = Array.from(final_regex);
    }
    for (let i = 0; i < special_symbol_arr_negation.length; i++) {
      if (special_symbol_arr_negation[i] === "\\") {
        special_regex_part_negation += "\x5c\x5c";
      } else if (special_symbol_arr_negation[i] === "]") {
        special_regex_part_negation += "\x5c\x5d";
      } else if (special_symbol_arr_negation[i] === "-") {
        special_regex_part_negation += "\x5c";
        special_regex_part_negation += special_symbol_arr_negation[i];
      } else if (special_symbol_arr_negation[i] === '"') {
        special_regex_part_negation += "\x22";
      } else {
        special_regex_part_negation += special_symbol_arr_negation[i];
      }
    }
    special_regex_part_negation += "]";

    let special_symbols =
      require_special_symbols === true
        ? "(?=.*" +
          special_regex_part +
          ")(?!.*" +
          special_regex_part_negation +
          ")"
        : "";

    //email
    const email_regex = /(\S*)*(\.)?@(\S*)*\.(\S*)*/;
    let email_parts = email.match(email_regex);
    let first_email_part = "";
    let second_email_part = "";
    let last_email_part = "";
    if (email_parts !== null && email_parts !== "") {
      first_email_part =
        email_parts[1] !== undefined && email_parts[1] !== ""
          ? email_parts[1]
          : "";
      second_email_part =
        email_parts[3] !== undefined && email_parts[3] !== ""
          ? email_parts[3]
          : "";
      last_email_part =
        email_parts[4] !== undefined && email_parts[4] !== ""
          ? email_parts[4]
          : "";
    }
    let email_part = "";
    if (
      first_email_part !== undefined &&
      first_email_part !== "" &&
      second_email_part !== "" &&
      second_email_part !== undefined &&
      last_email_part !== undefined &&
      last_email_part !== ""
    ) {
      email_part =
        can_contain_email_or_part === true
          ? ""
          : "(?!.*" +
            first_email_part +
            ")" +
            "(?!.*" +
            second_email_part +
            ")" +
            "(?!.*" +
            last_email_part +
            ")" +
            "(?<!.*" +
            first_email_part +
            ")" +
            "(?<!.*" +
            second_email_part +
            ")" +
            "(?<!.*" +
            last_email_part +
            ")";
    }

    //username, first_name, and last_name
    let username_part = "";
    let first_name_part = "";
    let last_name_part = "";
    if (username !== undefined && username !== "") {
      username_part =
        can_contain_username_or_part === true
          ? ""
          : "(?!.*" + username + ")" + "(?<!.*" + username + ")";
    }
    if (first_name !== undefined && first_name !== "") {
      first_name_part =
        can_contain_firstname_or_part === true
          ? ""
          : "(?!.*" + first_name + ")" + "(?<!.*" + first_name + ")";
    }
    if (last_name !== undefined && last_name !== "") {
      last_name_part =
        can_contain_lastname_or_part === true
          ? ""
          : "(?!.*" + last_name + ")" + "(?<!.*" + last_name + ")";
    }

    let policy_regex_pattern =
      "^" +
      "(?!.* )" +
      special_symbols +
      email_part +
      username_part +
      first_name_part +
      last_name_part +
      upper_case +
      lower_case +
      number +
      ".{" +
      min_password_length +
      "," +
      max_password_length +
      "}$";
    policy_regex_pattern = new RegExp(policy_regex_pattern);
    return policy_regex_pattern;
  } else {
    let policy_regex_pattern = new RegExp(PasswordReg);
    return policy_regex_pattern;
  }
};

export const showPasswordInvalidTooltip = (policy) => {
  if (policy !== null) {
    let min_password_length = policy.min_password_length;
    let max_password_length = policy.max_password_length;
    let require_uppercase_letter = policy.require_uppercase_letter;
    let require_lowercase_letter = policy.require_lowercase_letter;
    let require_number = policy.require_number;
    let require_special_symbols = policy.require_special_symbols;
    let password_special_symbols = policy.password_special_symbols;
    let can_contain_email_or_part = policy.can_contain_email_or_part;
    let can_contain_username_or_part = policy.can_contain_username_or_part;
    let can_contain_firstname_or_part = policy.can_contain_firstname_or_part;
    let can_contain_lastname_or_part = policy.can_contain_lastname_or_part;
    let policyMessage =
      "Invalid password! Min length:" +
      min_password_length +
      ", " +
      "Max length: " +
      max_password_length +
      ". ";
    policyMessage += require_uppercase_letter
      ? "Require 1 uppercase letter. "
      : "";
    policyMessage += require_lowercase_letter
      ? "Require 1 lowercase letter. "
      : "";
    policyMessage += require_number ? "Require 1 number. " : "";
    policyMessage += require_special_symbols
      ? "Require special symbols. " +
        " Allowed special symbols are: " +
        password_special_symbols +
        "."
      : "";
    policyMessage += can_contain_email_or_part
      ? ""
      : "Can not contain email in password. ";
    policyMessage += can_contain_username_or_part
      ? ""
      : "Can not contain username in password. ";
    policyMessage += can_contain_firstname_or_part
      ? ""
      : "Can not contain firstname in password. ";
    policyMessage += can_contain_lastname_or_part
      ? ""
      : "Can not contain lastname in password. ";
    return policyMessage;
  } else {
    const nonPolicyMessage = `Invalid password! 
    Min length:8 Special Char: 1 Lower Case: 1 Upper Case:1 
    Number:1.Allowed characters are a-z, A-Z, 0-9, @$!%*?&#^().<>.`;
    return nonPolicyMessage;
  }
};
