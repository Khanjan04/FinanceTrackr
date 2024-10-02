export const prepareRuleBaseRoleMappingData = (roleBasedMapping) => {
    let rolesMapping = [];
    roleBasedMapping.forEach((role, index) => {
        if (role.attribute_value !== "") {
            rolesMapping.push({
                role_id: role.role.role_id,
                attribute_name: role.attribute_name,
                attribute_value: role.attribute_value,
                priority: index
            })
        }
    })
    return rolesMapping;
}