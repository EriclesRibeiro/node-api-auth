interface HttpResponse<T> {
    status: number;
    body?: T;
    error?: string;
}

export default HttpResponse