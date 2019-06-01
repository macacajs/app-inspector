# Get the Device ID

## iOS

### From command line

```bash
$ xcrun simctl list
```

The command above will list all your iOS simulator devices infomation. Your can find the UDID like XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.

### From Xcode

Open your simulator, choose **Hardware - devices - manage devices**. You will find the identifier in device information.

## Android

### From command line

Launch your device firstly, then use adb to list all your devices.

```bash
$ adb devices

123ABCDEFG	device
192.168.0.100:5555	device
```

## iOS Real Device

```bash
$ DEVELOPMENT_TEAM_ID=TEAM_ID npm i app-inspector -g
```

![](/app-inspector/assets/6d308bd9gy1fg7cnt9hf6j20t70h7782.jpg)