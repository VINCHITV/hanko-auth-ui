import React from "react";

export const EmailInput = () => (
    <div className="form-control">
        <label className="label">
            <span className="label-text">Your Email</span>
        </label>
        <label className="input-group">
            <span>Email</span>
            <input
                type="text"
                name="email"
                placeholder="info@site.com"
                className="input input-bordered"
                required
            />
        </label>
    </div>
);