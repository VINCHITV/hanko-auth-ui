import React from "react";

export const PasscodeInput = () => (
    <div className="form-control">
        <label className="input-group">
            <span>Passcode</span>
            <input
                type="number"
                name="code"
                placeholder="6-Digit Passcode"
                className="input input-bordered"
                required
            />
        </label>
    </div>
);