-- config 
lightPin = 4
initialize_light_request_topic = "INITIALIZE_LIGHT_REQ"
get_light_info_response_topic = "GET_LIGHT_INFO_RESP"
update_light_state_response_topic = "UPDATE_LIGHT_STATE_RESP"
light_device_id = "my_bedroom_light_1"

-- set the gpio mode for the desired pin
gpio.mode(lightPin, gpio.OUTPUT)
gpio.write(lightPin, gpio.LOW)

-- wifi ssid & password
wifi_ssid = "IDH35-RM8910"
wifi_password = "6598598516"

-- configuring Wireless Internet
print('\nAll About Circuits init.lua\n')
wifi.setmode(wifi.STATION)
print('set mode=STATION (mode='..wifi.getmode()..')\n')
print('MAC Address: ',wifi.sta.getmac())
print('Chip ID: ',node.chipid())
print('Heap Size: ',node.heap(),'\n')
-- wifi config start
wifi.sta.config(wifi_ssid,wifi_password)
-- wifi config end

print("\nConnecting mqtt client\n")

-- try connecting to wifi
print('\nAll About Circuits main.lua\n')
tmr.alarm(0, 1000, 1, function()
   if wifi.sta.getip() == nil then
      print("Connecting to AP...\n")
   else
      ip, nm, gw=wifi.sta.getip()
      print("IP Info: \nIP Address: ",ip)
      print("Netmask: ",nm)
      print("Gateway Addr: ",gw,'\n')
      tmr.stop(0)
      connectMQTT()
   end
end)

function connectWS()
    ws = websocket.createClient()
    ws:on("connection", function(ws)
        print('got ws connection')
    end)
    
    ws:on("receive", function(_, msg, opcode)
        print('got message:', msg, opcode) -- opcode is 1 for text message, 2 for binary
    end)

    ws:on("close", function(_, status)
        print('connection closed', status)
        ws = nil -- required to lua gc the websocket client
    end)

    ws:connect('ws://nitlite.herokuapp.com:80')
end

-- connect to mqtt
function connectMQTT()
    -- setup the mqtt client
    m = mqtt.Client(light_device_id, 120)

    m:lwt("/lwt", "offline", 0, 0)

    m:on("connect", function(client) print ("connected") end)
    m:on("offline", function(client) print ("offline") end)

    -- listen for events
    m:on("message", function(client, topic, data)
        print(topic .. ":" )
        if topic == get_light_info_response_topic then
            onUpdateLightState(data)
        elseif topic == update_light_state_response_topic then
            onUpdateLightState(data)
        end
        if data ~= nil then
            print(data)
        end
    end)

    -- start the mqtt client
    m:connect('192.168.1.24', 1883, 0, function(client)
        print("connected")
        client:subscribe(get_light_info_response_topic, 0, function(client)
            print("get_light_info_response_topic subscribed successfully")    
        end)
        client:subscribe(update_light_state_response_topic, 0, function(client)
            print("update_light_state_response_topic subscribed successfully")    
        end)
        client:publish(initialize_light_request_topic, light_device_id, 0, 0, function(client) 
            print("initialized light") 
        end)
    end)
end


-- on update light request
function onUpdateLightState(state)
    if state == '1' then
        gpio.write(lightPin, gpio.HIGH)
        print('light is on')
    else
        gpio.write(lightPin, gpio.LOW)
        print('light is off')
    end
end