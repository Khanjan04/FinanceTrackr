import axios from "./axios_interceptor";

export const addBankAccount = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/bank/bank-account/`;
    const response = await axios.post(url, data, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const editBankAccount = async ({ id, updatedInstance }) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/bank/bank-account/?id=${id}`;
    const response = await axios.put(url, updatedInstance, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const bankAccountList = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    let url = `/bank/bank-account/`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const getBankAccountInstanceDetail = async ({id}) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    
    let url = `/bank/bank-account/?id=${id}`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const deleteBankAccount = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      data : data,
    };
    console.log("data", data);
    const url = `/bank/bank-account/`;
    const response = await axios.delete(url, config);
    console.log("response", response);
    return { data: response.data, error: null };
  } catch (e) {
    console.log("e", e);
    return { data: null, error: e.response.data.errors };
  }
};
