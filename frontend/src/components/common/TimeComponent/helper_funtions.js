import { getResourcePolicies } from "../../../api/database_policy";

export const loadPolices = async (resource_ids, resource_type, setPolicies, setPolicy, col_name, reverse_allocate) => {
  const { data, error } = await getResourcePolicies(resource_ids, resource_type);
  if (data !== null) {
    setPolicies(data.policies);
    if (col_name) {
      let temp_policy = {};
      for (let key in col_name) {
        if (reverse_allocate === true) {
          temp_policy[col_name[key].id] = Object.entries(data.policies)[key][1][0];
        }
        else {
          temp_policy[col_name[key].id] = Object.entries(data.policies)[0][1][0];
        }
      }
      setPolicy(temp_policy);
    }
  }
};

export const handleSetPolicy = (key, selectedOption, policy, setPolicy) => {
  let tempPolicy = { ...policy };
  tempPolicy[key] = selectedOption;
  setPolicy(tempPolicy);
}
export const handleGetPolicy = (selected_key, policy) => {
  return policy[selected_key]
}



export const getSystemUsers = async (SystemUserResourceList, resource_ids, resource_type, setSystemusers, setSystemuser, col_name, reverse_allocate, target_entity_name) => {
  var isresource = 0;
  if (resource_type === "assets") isresource = 1;
  else if (resource_type === "apps") isresource = 2;
  else isresource = 3;

  let system_users = {};
  for (const id of resource_ids) {
    const { data } = await SystemUserResourceList({
      isresource: isresource,
      new: false,
      id: id,
    });

    if (reverse_allocate === true) {
      if (resource_ids.length > 1) {
        for (const i of col_name) {
          if (i["id"] === id) {
            system_users[i["name"]] = data;
          }
        }
      }
      else {
        system_users[col_name[0]["name"]] = data;
      }
    }
    else {
      system_users[target_entity_name] = data;
    }
  }

  setSystemusers(system_users);
  if (col_name) {
    let temp_systemuser = {};
    for (let key in col_name) {
      if (reverse_allocate === true) {
        temp_systemuser[col_name[key].id] = Object.entries(system_users)[key][1][0];
      }
      else {
        temp_systemuser[col_name[key].id] = Object.entries(system_users)[0][1][0];
      }
    }
    setSystemuser(temp_systemuser);
  }
};

export const handleSetSystemUser = (key, selectedOption, systemuser, setSystemuser) => {
  let tempSystemuser = { ...systemuser };
  tempSystemuser[key] = selectedOption;
  setSystemuser(tempSystemuser);
}

export const handleGetSystemUser = (selected_key, systemuser) => {
  return systemuser[selected_key]
}