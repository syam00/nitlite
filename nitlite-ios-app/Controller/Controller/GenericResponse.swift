//
//  GenericeResponse.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 9/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import ObjectMapper

class GenericResponse: Mappable {

    var message : String?
    var result : Any?
    
    required init?(map: Map) {
        
    }
    
    func mapping(map: Map) {
        message <- map["message"]
        result <- map["result"]
    }
}
