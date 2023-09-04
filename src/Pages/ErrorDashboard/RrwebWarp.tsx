import React, { useRef, useEffect, useState } from "react";
import rrwebPlayer from "rrweb-player";
import request from "../../request";
import { ResponseRrwebError } from "../../rrweb/types";
import { Skeleton } from "antd";

const RrwebWarp = ({ projectId, message }) => {
    const [loading, setLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        request
            .post("/api/rrweb/getEventsFromErrors", { projectId, message })
            .then(({ data: _data }) => {
                setLoading(false);
                const data = _data as ResponseRrwebError;
                Promise.resolve().then(() => {
                    new rrwebPlayer({
                        target: ref.current,
                        props: {
                            events: data.events,
                            width: 800,
                        },
                    });
                });
            });
    }, []);

    return (
        <div ref={ref}>
            <Skeleton loading={loading} active />
        </div>
    );
};

export default RrwebWarp;
