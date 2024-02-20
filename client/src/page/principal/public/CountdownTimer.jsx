import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [hours, setHours] = useState(0);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleInputChange = (event) => {
        const newHours = parseInt(event.target.value, 10);
        setHours(newHours);
        setCountdown(newHours * 3600); // Convert hours to seconds
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <label>
                Enter Hours:
                <input type="number" value={hours} onChange={handleInputChange} />
            </label>
            <div>
                <p>Countdown: {formatTime(countdown)}</p>
            </div>
            {
                countdown == 0 && <p>Finished</p>
            }
        </div>
    );
};

export default CountdownTimer;
