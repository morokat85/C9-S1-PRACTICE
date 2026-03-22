import React from "react";

function Entity ({NameTitle,percentage}) {
    return (
    <>
    <section className="container">
      <h2>{NameTitle}</h2>
      <div className="healthbar">
        <div style={{width: `${percentage}%`}} className="healthbar__value"></div>
      </div>
    </section>
    </>
    );
}
export default Entity;