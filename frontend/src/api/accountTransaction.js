import axios from "./axios_interceptor";

export const addAccountTransaction = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/bank/bank-account-transaction/`;
    const response = await axios.post(url, data, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const editAccountTransaction = async ({ id, updatedInstance }) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/bank/bank-account-transaction/?id=${id}`;
    const response = await axios.put(url, updatedInstance, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const accountTransactionList = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    let url = `/bank/bank-account-transaction/`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const getAccountTransactionInstanceDetail = async ({ id }) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };

    let url = `/bank/bank-account-transaction/?id=${id}`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const deleteAccountTransaction = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log("data", data);
    const url = `/bank/bank-account-transaction/`;
    const response = await axios.delete(url, config);
    console.log("response", response);
    return { data: response.data, error: null };
  } catch (e) {
    console.log("e", e);
    return { data: null, error: e.response.data.errors };
  }
};
