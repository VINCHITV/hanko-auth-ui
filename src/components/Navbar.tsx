import React from 'react';

function Navbar({title}: { title?: string }) {
    return (
        <div className="navbar bg-base-200">
            <a className="btn btn-ghost normal-case text-xl">{title ?? 'Navbar'}</a>
        </div>
    );
}

export default Navbar;