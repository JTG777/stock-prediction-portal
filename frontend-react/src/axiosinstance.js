import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance=axios.create({
    baseURL:baseURL,
    headers:{
        'Content-type':'application/json'
    }
})

axiosInstance.interceptors.request.use((config)=>{
    
    const accessToken=localStorage.getItem('accessToken')
    if (accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`


    }
    console.log(config)
    return config
},(error)=>{
    return Promise.reject(error);

})

axiosInstance.interceptors.response.use((response)=>{
    return response
},
async (error)=>{
    const originalRequest=error.config
    if (error.response.status==401 && !originalRequest.retry){
        originalRequest.retry=true
        const refreshToken=localStorage.getItem('refreshToken')

        try {
            const response=await axiosInstance.post('/token/refresh/',{refresh:refreshToken})
            localStorage.setItem('accessToken',response.data.access)
            originalRequest.headers.Authorization=`Bearer ${response.data.access}`
            return axiosInstance(originalRequest)
        } catch (error) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return Promise.reject(err)

        }
    }
        return Promise.reject(error)

}
)



export default axiosInstance