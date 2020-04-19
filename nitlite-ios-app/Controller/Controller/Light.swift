//
//  Light.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 23/7/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//
import ObjectMapper

class Light : Mappable {
    
    var name : String?
    var device_id : String?
    var id : String?
    var _id : String?
    var location : String?
    var state : Int?
    var active : Int?
    var created_at : Date?
    var updated_at : Date?
    
    init() {}
    
    required convenience init?(map: Map) {
        self.init()
    }

    
    // Mappable
    func mapping(map: Map) {
        name <- map["name"]
        device_id <- map["device_id"]
        id <- map["id"]
        _id <- map["_id"]
        location <- map["location"]
        state <- map["state"]
        active <- map["active"]
        created_at <- (map["created_at"], DateTransform())
        updated_at <- (map["updated_at"], DateTransform())
    }
}
