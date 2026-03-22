import React from "react";

function Log({listlog}) {
    return (
        <>
        
    <section id="log" className="container">
      <h2>Battle Log</h2>
        <ul>
            {listlog?.map((list, index) => (
                <li key={index}>
                    <span>{list.isPlayer ? "Player" : "Monster"}</span>
                    <span> {list.isDamage ? (
                        <span className="log--damage"> {list.text}</span>
                    ) : (
                        <span className="log--heal"> {list.text}</span>
                    )}
                    </span>
                </li>
            ))}
      </ul>
    </section>
        </>
    );
}
export default Log;