// useRef - useEffect
import React, { useEffect, useState, useRef } from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/hooks03';

const Fetch = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        countRef.current = count;
    }, [count]);
    useEffect(() => {
        const timer = setInterval(() => {
            // console.log(count, countRef.current);
            // setCount(count + 1);
            setCount(countRef.current + 1);
        }, 500);
        return () => clearInterval(timer);
        //  eslint-disable-next-line
    }, []);
    /**
     * 如果添加了 [count] 依赖，虽然说可以达到，500ms自动增加 count
     * 但是导致了 useEffect 的重复执行，这种情况不是我们所期待的。
     * 可以使用 useRef 来解决
     */
    return (
        <div>
            <PageContent>
                count: {count}
            </PageContent>
        </div>
    );
};

export default Fetch;
