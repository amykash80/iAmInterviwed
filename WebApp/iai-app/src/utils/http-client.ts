import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, ResponseType } from "axios";
import storageHelper from "./client-storage";
import AppConfig from "../config";
import ApiError from "../models/ApiError";
import RequestConfig from "../models/RequestConfig";
import store from "../context-store";
import { authActions } from "../context-store/auth-context";
const PUBLIC_URLS: string[] = ["/login/"];

class HttpClient {
    async get<T>(url: string, config?: RequestConfig): Promise<T> {
        try {
            let axiosConfig: AxiosRequestConfig = {};
            configureAxiosRequest(config, axiosConfig);
            let result: AxiosResponse<T> = await axiosClient.get<T>(url, axiosConfig);
            return result.data;
        } catch (error) {
            return onResponseError<T>(error);
        }
    }

    async post<T>(
        url: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        try {
            let axiosConfig: AxiosRequestConfig = {};
            configureAxiosRequest(config, axiosConfig);
            let result: AxiosResponse<T> = await axiosClient.post<T>(
                url,
                data,
                axiosConfig
            );
            return result.data;
        } catch (error) {
            return onResponseError<T>(error);
        }
    }

    async put<T>(
        url: string,
        data: any = {},
        config?: RequestConfig
    ): Promise<T> {
        try {
            let axiosConfig: AxiosRequestConfig = {};
            configureAxiosRequest(config, axiosConfig);
            let result: AxiosResponse<T> = await axiosClient.put<T>(
                url,
                data,
                axiosConfig
            );
            return result.data;
        } catch (error) {
            return onResponseError<T>(error);
        }
    }

    async delete<T>(url: string, config?: RequestConfig): Promise<T> {
        try {
            let axiosConfig: AxiosRequestConfig = {};
            configureAxiosRequest(config, axiosConfig);
            let result: AxiosResponse<T> = await axiosClient.delete<T>(
                url,
                axiosConfig
            );
            return result.data;
        } catch (error) {
            return onResponseError<T>(error);
        }
    }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.url) {
        let urlToMatch = config.url.toLowerCase();
        let loginURL = urlToMatch.startsWith("/signin");
        let matchedUrl = null;
        if (!loginURL) {
            matchedUrl = PUBLIC_URLS.find((url) =>
                urlToMatch.startsWith(url.toLowerCase())
            );
        }
        if (!matchedUrl) {
            let apiToken = storageHelper.getItem(
                AppConfig.account.apiTokenHeader
            );
            // let userToken = storageHelper.getItem(
            //   AppConfig.account.userTokenHeader
            // ); 
            if (apiToken) {
                config.headers[AppConfig.account.apiTokenHeader] = `Bearer ${apiToken}`;
            }
            // if (userToken) {
            //   config.headers[AppConfig.account.userTokenHeader] = userToken;
            // }
        }
    }
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
};

const onResponseError = <T>(error: any) => {
    if (error.response) {
        //Request sent successfully but received error from server
        let errorResponse: AxiosResponse<T> = error.response;
        // Redirected to logout incase of 401
        if (errorResponse.status === 401) {
            storageHelper.removeItem(AppConfig.account.apiTokenHeader);
            storageHelper.removeItem(AppConfig.account.userTokenHeader);
            store.dispatch(authActions.logout());
        }
        if (errorResponse.data) {
            //It means server response contains some data
            return errorResponse.data;
        }

        throw new ApiError(errorResponse.statusText, errorResponse.status);
    } else if (error.request) {
        //Request sent successfully but no response from server
        throw new ApiError("Server is not responding to the request", 0);
    } else {
        //Sending request itself caused issue
        throw new ApiError("Unable to send request", -1);
    }
};

const axiosClient = axios.create({
    baseURL: AppConfig.apiBaseUrl,
    timeout: 60 * 1000, //30 seconds
});
axiosClient.interceptors.request.use(onRequest, onRequestError);

function configureAxiosRequest(
    config: RequestConfig | undefined,
    axiosConfig: AxiosRequestConfig
) {
    if (config) {
        if (config.headers) {
            axiosConfig.headers = config.headers;
        }
        if (config.params) {
            axiosConfig.params = config.params;
        }
        if (config.responseType) {
            axiosConfig.responseType = config.responseType.toLowerCase() as ResponseType;
        }
    }
}
const httpClient = new HttpClient();
export default httpClient;