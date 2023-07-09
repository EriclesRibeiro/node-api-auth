interface HttpRequest<B> {
    body?: B;
    params?: any;
    headers?: any;
}

export default HttpRequest