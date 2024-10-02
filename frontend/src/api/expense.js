import axios from "./axios_interceptor";

export const addExpense = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/expense/expense/`;
    const response = await axios.post(url, data, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const editExpense = async ({ id, updatedInstance }) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const url = `/expense/expense/?id=${id}`;
    const response = await axios.put(url, updatedInstance, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const expenseList = async (data) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    let url = `/expense/expense/`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const getExpenseInstanceDetail = async ({id}) => {
  try {
    // const token = get_jwt_token();
    // loginRedirect(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    console.log(id);
    let url = `/expense/expense/?id=${id}`;
    const response = await axios.get(url, config);
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.response.data.errors };
  }
};

export const deleteExpense = async (data) => {
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
    const url = `/expense/expense/`;
    const response = await axios.delete(url, config);
    console.log("response", response);
    return { data: response.data, error: null };
  } catch (e) {
    console.log("e", e);
    return { data: null, error: e.response.data.errors };
  }
};
