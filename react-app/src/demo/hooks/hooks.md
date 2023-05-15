### useCallback（记忆函数）

    防止因为组件重新渲染，导致方法被重新创建，起到缓存作用；只有第二个参数变化了，才重新生命一次

### useMemo（记忆组件）

    useCallback的功能完全可以由useMemo所取代，如果想通过使用useMemo返回一个记忆函数也完全可以
