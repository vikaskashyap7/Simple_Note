import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const BlankLayout = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default BlankLayout;
