import React, { useRef, useEffect, useState } from "react";
import rrwebPlayer from "rrweb-player";
import request from "../../request";
import { ResponseRrwebError } from "../../rrweb/types";
import { Skeleton } from "antd";
import { AxiosResponse } from "axios";

const RrwebWarp = ({ projectId, message }) => {
    const [loading, setLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        request
            .post("/api/rrweb/getEventsFromErrors", { projectId, message })
            .then((response: AxiosResponse<ResponseRrwebError>) => {
                setLoading(false);
                const data = response.data;
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
