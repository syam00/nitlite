//
//  UIHelper.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 16/9/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit
import RSLoadingView

class UIHelper: NSObject {

    static func showLoading() {
        let loadingView = RSLoadingView()
        loadingView.mainColor = Theme.getBaseThemeColor()
        loadingView.showOnKeyWindow()
    }
    
    static func dismissLoading() {
        RSLoadingView.hideFromKeyWindow()
    }
}
