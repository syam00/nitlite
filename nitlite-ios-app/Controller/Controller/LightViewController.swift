//
//  LightViewController.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 18/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit
import Eureka

class LightViewController: FormViewController {
    
    private var light : Light!
    var deleteButton : UIBarButtonItem!

    convenience init() {
        self.init(light: nil)
    }
    
    init(light : Light?) {
        self.light = light
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        setupView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func showDeleteButton() {
        
        self.deleteButton = UIBarButtonItem.init(image: UIImage.init(named: "delete"),
                                                 style: .plain,
                                                 target: self,
                                                 action: #selector(onDelete))
        self.deleteButton.tintColor = Theme.getBaseThemeColor()
        self.navigationItem.rightBarButtonItem = self.deleteButton
    }
    
    func setupView() {
        
        self.navigationController?.navigationBar.tintColor = Theme.getBaseThemeColor()
        
        if self.light == nil {
            self.title = "Add Light"
        }
        else {
            self.title = "Edit Light"
            showDeleteButton()
        }
        
        form +++ Section("Light information")
            <<< TextRow(){ row in
                row.title = "Id"
                row.placeholder = "Enter identifier"
            }
                .cellUpdate { cell, row in
                    cell.textLabel?.textColor = Theme.getBaseThemeColor()
            }
            <<< TextRow(){ row in
                row.title = "Name"
                row.placeholder = "Enter name"
            }
                .cellUpdate { cell, row in
                    cell.textLabel?.textColor = Theme.getBaseThemeColor()
            }
            <<< TextRow(){ row in
                row.title = "Location"
                row.placeholder = "Enter location"
            }.cellUpdate { cell, row in
                cell.textLabel?.textColor = Theme.getBaseThemeColor()
            }
            +++ Section()
            <<< ButtonRow() { row in
                row.title = "Save"
            }.cellUpdate { cell, row in
                cell.textLabel?.textColor = UIColor.white
                cell.backgroundColor = Theme.getBaseThemeColor()
            }
        
    }
    
    func onSave() {
        
        
        
        let light = Light()
        light.active = 0
        light.device_id = "my_test_light_a1"
        light.id = UUID().uuidString
        light.state = 0
        light.name = "test light A1"
        light.location = "my room test light"
    }
    
    func onDelete() {
        
    }
    
}
