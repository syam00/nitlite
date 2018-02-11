//
//  Theme.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 17/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit

class Theme: NSObject {

    static func getBaseThemeColor() -> UIColor {
        return UIColor(red: 153.0/255.0, green: 16.0/255.0, blue: 238.0/255.0, alpha: 1.0)
    }
    
    static func getSecondaryThemeColor() -> UIColor {
        return UIColor(red: 148.0/255.0, green: 33.0/255.0, blue: 146.0/255.0, alpha: 1.0)
    }
    
    static func getAppFontWithSize(size: Double) -> UIFont {
        return UIFont(name: "", size: CGFloat(size))!
    }
}
