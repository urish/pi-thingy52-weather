# Raspberry Pi Config for HSDPA GSM USB Dongle 3G Modem

Settings up a 3G HSDPA USB Dongle (like [this one](https://www.aliexpress.com/item/7-2Mbps-External-Mobile-Broadband-Unlocked-Universal-Wireless-HSUPA-HSDPA-GSM-USB-Dongle-3G-Modem-Support/32851914363.html)) on a Raspberry Pi

## Instructions

1. Run the following commands:

```bash
apt-get update
apt-get install wvdial usb-modeswitch
```

2. Copy [wvdial.conf](wvdial.conf) to `/etc/wvdial.conf` 

3. Copy [50-hsdpa-usb.rules](50-hsdpa-usb.rules) to `/etc/udev/rules.d/50-hsdpa-usb.rules`

4. Insert a SIM card into your 3G dongle and then plug it into the Raspberry Pi. You should be connected to the internet in about 30 seconds.

## Troubleshooting

Look for logs in `/var/log/syslog`. In particular, it should contain entries similar to these:

```
usb 1-1.2: New USB device found, idVendor=174c, idProduct=55aa
usb 1-1.2: New USB device strings: Mfr=2, Product=3, SerialNumber=1
usb 1-1.2: Product: ASMT1051
usb 1-1.2: Manufacturer: asmedia
usb 1-1.2: SerialNumber: 123456789012
usb-storage 1-1.2:1.0: USB Mass Storage device detected
usb-storage 1-1.2:1.0: Quirks match for vid 174c pid 55aa: 400000
...
usbcore: registered new interface driver option
usbserial: USB Serial support registered for GSM modem (1-port)
option 1-1.5:1.0: GSM modem (1-port) converter detected
usb 1-1.5: GSM modem (1-port) converter now attached to ttyUSB0
...
pppd[25826]: pppd 2.4.7 started by root, uid 0
pppd[25826]: Using interface ppp0
pppd[25826]: Connect: ppp0 <--> /dev/ttyUSB0
pppd[25826]: CHAP authentication succeeded
pppd[25826]: CHAP authentication succeeded
pppd[25826]: Could not determine remote IP address: defaulting to 10.64.64.64
pppd[25826]: local  IP address 10.204.123.25
pppd[25826]: remote IP address 10.64.64.64
pppd[25826]: primary   DNS address 82.102.139.20
pppd[25826]: secondary DNS address 82.102.139.10
```
