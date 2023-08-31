import React, { useRef, useEffect } from "react";
import rrwebPlayer from "rrweb-player";

const RrwebWarp = ({ events }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        Promise.resolve().then(() => {
            new rrwebPlayer({
                target: ref.current,
                props: {
                    events: events,
                    width: 800,
                },
            });
        });
    }, []);

    return <div ref={ref}></div>;
};

export default RrwebWarp;
