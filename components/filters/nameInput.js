import React from "react";

const NameSearch = ({nameFilterChange}) => {
    return (
        <div className="nameSearch">
            <fieldset>
                <legend>Nimi</legend>
                <input type="text" name="productName" id="productNameSearch" onChange={(e) => nameFilterChange(e)}/>
            </fieldset>
        </div>
    )
};

export default NameSearch;