import React from "react";
import './ListHeading.scss';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const ListHeading = ({dataTableHeadingText,dataTableHeadingIcon, dataTablePageLink}) => {
    let title=[]
    let icons=[]
    let links=[]
    dataTableHeadingText instanceof Array ? title=[...title, ...dataTableHeadingText]: title.push(dataTableHeadingText)
    dataTableHeadingIcon instanceof Array ? icons=[...icons, ...dataTableHeadingIcon]: icons.push(dataTableHeadingIcon)
    dataTablePageLink instanceof Array ? links=[...links, ...dataTablePageLink]: links.push(dataTablePageLink)

    return (
        <div className="d-flex flex-row justify-content-start align-items-center py-3 rdt_heading_container">

            {title.map((titles, index) => (<NavLink
              to={links[index] && links[index]}
              className="d-flex align-items-center text-decoration-none"
            >
            {index >0 && <IoIosArrowForward />}
            {icons[index] && <img src={icons[index]} alt="icon" id="center-blueShadow" className="me-3 main-heading-image" />}
            <h2 className="main-heading pe-2">
                {titles}
            </h2>
           </NavLink>))}
        </div>
    )
}

export default ListHeading;
