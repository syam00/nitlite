//
//  LightService.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 23/7/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import Alamofire
import AlamofireObjectMapper

class LightService: BaseService {

    var baseURL: String = ""
    
    init(url : String) {
        self.baseURL = url
    }
    
    //get all lights
    func getAllLights(callback : @escaping (_ result : Any?, _ error : Error?) -> Void) {
        
        let url = self.baseURL + "/light/all"
        
        Alamofire.request(url)
            .responseArray(queue: nil, keyPath: "result", context: nil)
            { (response: DataResponse<[Light]>) in
            
                print("response ", response)
            
                if (response.error != nil){
                    callback(nil, response.error)
                }
                else {
                    callback(response.result.value, nil)
                }
            }
    }
    
    //add light
    func addLight(light : Light?, callback : @escaping (_ result : Any?, _ error : Error?) -> Void) {
        
        let url = self.baseURL + "/light/add"

        Alamofire.request(url, method: .post, parameters: light?.toJSON())
            .responseObject(queue: nil, keyPath: nil, mapToObject: nil, context: nil)
            { (response: DataResponse<GenericResponse>) in
                print("response ", response)
                if (response.error != nil){
                    callback(nil, response.error)
                }
                else {
                    callback(response.result.value, nil)
                }
            }
    }
    
    func deleteLight(lightIdentifier : String?,callback : @escaping (_ result : Any?, _ error : Error?) -> Void) {
        
        let url = self.baseURL + "/light/\(lightIdentifier ?? "0")"

        Alamofire.request(url, method: .delete)
            .responseObject(queue: nil, keyPath: nil, mapToObject: nil, context: nil) { (response : DataResponse<GenericResponse>) in
                print("response ", response)
                if (response.error != nil){
                    callback(nil, response.error)
                }
                else {
                    callback(response.result.value, nil)
                }
        }
    }
    
    //update light info
    func updateLightInfo(light : Light?, callback : @escaping (_ result : Any?, _ error : Error?) -> Void) {
        
        let url = self.baseURL + "/light/\(light?.device_id ?? "0")"
        
        Alamofire.request(url, method: .put, parameters: light?.toJSON())
            .responseObject(queue: nil, keyPath: nil, mapToObject: nil, context: nil) { (response : DataResponse<GenericResponse>) in
                print("response ", response)
                if (response.error != nil){
                    callback(nil, response.error)
                }
                else {
                    callback(response.result.value, nil)
                }
        }
    }
    
    //turn on/off light
    func controlLight(lightIdentifier : String?, state : Int?,callback : @escaping (_ result : Any?, _ error : Error?) -> Void) {
        
        let url = self.baseURL + "/light/\(lightIdentifier ?? "0")/\(state ?? 0)"
        
        Alamofire.request(url, method: .put)
            .responseObject(queue: nil, keyPath: nil, mapToObject: nil, context: nil) { (response : DataResponse<GenericResponse>) in
                print("response ", response)
                if (response.error != nil){
                    callback(nil, response.error)
                }
                else {
                    callback(response.result.value, nil)
                }
        }

    }
    
}
