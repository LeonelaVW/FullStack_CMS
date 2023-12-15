import axios from "axios";

const MANAGER_API_BASE_URL = "http://localhost:8080/managers";

class ManagerService {

    getManagers() {
        return axios.get(MANAGER_API_BASE_URL);
    }
    
    getEmployeeById(managerId) {
        return axios.get(MANAGER_API_BASE_URL + '/' + managerId);
    }
}

export default new ManagerService()
