interface HttpResponse<T> {
    status: number;
    body?: T;
    error?: T;
}

export default HttpResponse