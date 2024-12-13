'use client';
import React, { useState } from 'react';

export const PasswordInput: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100">
            <h1 className="text-2xl mb-4">Password Input</h1>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-64"
                    placeholder="Enter your password"
                />
                <button
                    onClick={toggleShowPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
};