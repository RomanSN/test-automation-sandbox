import { environment } from "../../../environments/environment";

export const USER_API_URL = {
    login: `${environment.apiUrl}/login`,
    signUp: `${environment.apiUrl}/signup`,
    delete: `${environment.apiUrl}/user/delete`,
}
