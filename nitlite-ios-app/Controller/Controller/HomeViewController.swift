//
//  HomeViewController.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 17/6/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit
import Eureka
import RSLoadingView

class HomeViewController: UIViewController{

    
    @IBOutlet var tableView : UITableView!
    var addButton : UIBarButtonItem!
    
    private var lightService : LightService!
    fileprivate var fetchedLights : [Light]!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.

        setupView()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func onAddLight() {
        
        let lightController = LightViewController(light: nil)
        self.navigationController?.pushViewController(lightController, animated: true)
    }
    
    func onEditLight(light : Light) {
        
        let lightController = LightViewController(light: light)
        self.navigationController?.pushViewController(lightController, animated: true)
    }
    
    func setupView() {
     
        //fetch all lights and display
        //option to add light
        self.addButton = UIBarButtonItem.init(image: UIImage.init(named: "add"),
                                              style: .plain,
                                              target: self,
                                              action: #selector(onAddLight))
        self.addButton.tintColor = Theme.getBaseThemeColor()
        self.navigationItem.rightBarButtonItem = self.addButton
        
        UIHelper.showLoading()
        
        self.tableView.register(UITableViewCell.self, forCellReuseIdentifier: "light")
        
        fetchLights()
    }
    
    func fetchLights() {
        
        print(UserDefaults.standard.string(forKey: "server_url_preference") ?? "NO VAL")

        if lightService == nil {
            self.lightService = ServiceFactory.createLightService()!
        }
        

        lightService.getAllLights { (lights, error) in
            
            DispatchQueue.main.asyncAfter(deadline: DispatchTime.now()+1) {
                
                UIHelper.dismissLoading()

                if let lightCollection = lights {
                    
                    self.fetchedLights = lightCollection as! [Light]
                    self.tableView.reloadData()
                }
                
            }
        }
    }
    
}

extension HomeViewController : UITableViewDataSource, UITableViewDelegate {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.fetchedLights != nil ? self.fetchedLights.count : 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "light", for: indexPath)
        
        if (self.fetchedLights != nil && self.fetchedLights.count > 0) {
            let light = self.fetchedLights[indexPath.row]
            
            cell.textLabel?.text = light.name
            cell.detailTextLabel?.text = light.id
        }
        else {
            cell.textLabel?.text = "No lights found.."
        }
        

        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        if (self.fetchedLights != nil && self.fetchedLights.count > 0) {
            let light = self.fetchedLights[indexPath.row]
            self.onEditLight(light: light)
        }
        
    }
}
