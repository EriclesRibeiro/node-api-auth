import HttpRequest from "./httpRequest";
import HttpResponse from "./httpResponse";

interface Controller {
    handle(params: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}

export default Controller