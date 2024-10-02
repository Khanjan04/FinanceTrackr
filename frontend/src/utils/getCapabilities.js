import { useSelector } from "react-redux";

function GetCapabilities(){
    const capabilities = useSelector((state)=> state.user?.user?.role?.capabilities || {})
    const isCapable = ("is_admin_user" in capabilities)? capabilities : false; 
    const isCapableEnduser=  ("is_end_user" in capabilities)? capabilities : false;
    return [isCapable, isCapableEnduser];
}
 
export default GetCapabilities;
