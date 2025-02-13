#!/bin/bash

# WiFi interface name (adjust if not wlan0)
WIFI_INTERFACE="wlan0"

reset_wifi() {
    echo "Starting WiFi reset process..."

    echo "Disabling WiFi adapter..."
    sudo ip link set $WIFI_INTERFACE down

    echo "Flushing IP configurations..."
    sudo ip addr flush dev $WIFI_INTERFACE

    echo "Clearing any existing routes..."
    sudo ip route flush dev $WIFI_INTERFACE

    echo "Re-enabling WiFi adapter..."
    sudo ip link set $WIFI_INTERFACE up

    echo "Restarting NetworkManager..."
    sudo systemctl restart NetworkManager

    echo "Attempting to renew DHCP lease..."
    sudo dhclient -r $WIFI_INTERFACE
    sudo dhclient $WIFI_INTERFACE

    echo "Testing connectivity..."
    if ping -c 4 8.8.8.8 >/dev/null; then
        echo "Internet is working. Reset successful!"
    else
        echo "Internet is still not working. Check your router or contact your ISP."
    fi
}

# Run the reset function
reset_wifi
