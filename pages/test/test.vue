<template>
  <div class="test">

    <!--这里JK 在页面onShow调用了开始扫描，如果需要手动，就在onShow里删除即可-->
    <button @click="openBluetoothAdapter">开始扫描</button>
    <button @click="stopBluetoothDevicesDiscovery">停止扫描</button>
    <button @click="closeBluetoothAdapter">结束流程</button>

    <!--<div class="devices_summary">已发现 {{devices.length}} 个外围设备：</div>-->
    <div class="device_list">
      <button v-for="(item, index) in devices" :key="index"
            :data-device-id="item.deviceId"
            :data-name="item.name || item.localName"
            class="device_item"
            @click="createBLEConnection">
          <div style="font-size: 16px; color: #333;">{{item.name}}</div>
          <!--设置界面上显示信号长度，因为小程序无法送过return的方式传值，那么只能通过手动设置了-->
          <div style="font-size: 10px">信号强度: {{item.RSSI}}dBm({{item.RSSIMAX}} {{max(item, index)}}%)</div>
          <div style="font-size: 10px">UUID: {{item.deviceId}}</div>
          <div style="font-size: 10px">Service数量: {{item.serverNum}}{{len(item, index)}}</div>
      </button>
    </div>
	<van-button type="info">123</van-button>

    <!--<div class="connected_info">-->
      <!--<div>-->
        <!--<div>已连接到 {{devices.name}}</div>-->
        <!--<div class="operation">-->
          <!--<div @click="writeBLECharacteristicValue">写数据</div>-->
          <!--<div @click="closeBLEConnection">断开连接</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div v-for="(item, index) in chs" :key="index" style="font-size: 12px; margin-top: 10px;">-->
        <!--<div>特性UUID: {{item.uuid}}</div>-->
        <!--<div>特性值: {{item.value}}</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // toastTitle: '', // 提示信息
      // deviceName: 'Mi Band 3', // 需要连接设备的名称（通过查询后才能得到）
      // deviceId: '', // 当前已连接设备的唯一识别ID
      // serviceId: '', // 某个服务下的UUID
      // unLinkNum: 0, // 未找到希望目标设备次数，达到N次让用户做xx操作
      devices: [], // 获取到的所有设备的列表
      devicesTemporary: [], // 临时储存 获取到的所有设备的列表
      connected: false,
      chs: [],
      dddd: [1, 2, 3, 4]
    }
  },
  onShow () {
    // 初始化蓝牙模块
    this.openBluetoothAdapter()
  },
  computed: {},
  methods: {
    // =========================
    // 1 - 初始化蓝牙模块
    // 2 - 开始搜寻附近的蓝牙外围设备
    // 此操作比较耗费系统资源，请在搜索并连接到设备后调用 uni.stopBluetoothDevicesDiscovery 方法停止搜索
    // =========================
    openBluetoothAdapter () {
      // 1 - 初始化蓝牙模块 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.openBluetoothAdapter({
        success: (res) => {
          console.log('- 初始化蓝牙模块 - 成功')
          console.log('-')
          // 3 - 开始搜寻附近的蓝牙外围设备
          this.startBluetoothDevicesDiscovery()
        },
        fail: (res) => {
          console.log('- 初始化蓝牙模块 - 失败')
          // todo:提示用户开启蓝牙
          if (res.errCode === 10001) {
            // 错误码10001，表示当前蓝牙适配器不可用
            // 监听蓝牙适配器状态变化事件,那么这里监听蓝牙状态改变，如果返回值是available那么说明蓝牙现在可用，
			// 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
            uni.onBluetoothAdapterStateChange(function (res) {
              console.log('监听当前蓝牙状态', res)
              if (res.available) {
                // 蓝牙可用 3 - 开始搜寻附近的蓝牙外围设备
                this.startBluetoothDevicesDiscovery()
              }
            })
          }
        }
      })
    },

    // =========================
    // 2 - 获取本机蓝牙适配器状态
    // =========================
    getBluetoothAdapterState () {
		// 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.getBluetoothAdapterState({
        success: (res) => {
          console.log('本机蓝牙状态', res)
          // discovering === true 代表 蓝牙正处于搜索设备状态
          if (res.discovering) {
            // 那么启用 监听寻找到新设备的事件
            this.onBluetoothDeviceFound()
          } else if (res.available) {
            // 如果不在搜索状态，那么就检查蓝牙是否可用 available = true 代表蓝牙可用（初始化成功）
            this.startBluetoothDevicesDiscovery()
          }
        }
      })
    },

    // =========================
    // 3 - 开始搜寻附近的蓝牙外围设备
    // =========================
    startBluetoothDevicesDiscovery () {
      if (this._discoveryStarted) {
        return
      }
      this._discoveryStarted = true
	  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: true, // 是否允许重复上报同一设备
        success: (res) => {
          // 搜索成功
          console.log(' - 搜索成功')
          // 4 - 监听寻找到新设备的事件
          this.onBluetoothDeviceFound()
        }
      })
    },

    // =========================
    // 停止搜寻附近的蓝牙外围设备。
    // 若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
    // =========================
    stopBluetoothDevicesDiscovery () {
      console.log('停止扫描')
	  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.stopBluetoothDevicesDiscovery()
    },

    // =========================
    // 4 - 监听寻找到新设备的事件
    // =========================
    onBluetoothDeviceFound () {
		// 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.onBluetoothDeviceFound((res) => {
        res.devices.forEach(device => {
          // 这里判断，如果name和localName为空，那么这个蓝牙很可能用不了，
          // TODO：不过，这个情况也可能存在，所以如果搜不到目标设备，把这个if取消试试
          if (!device.name && !device.localName) {
            return
          }
          // 搜索到的蓝牙设备
          // 这里只能先用临时的空数组承担查找到的设备然后在下边经过延迟后再赋值给储存设备的列表的数组，否则HTML拿不到data下devices的数据
          const foundDevices = this.devicesTemporary
          const idx = this.inArray(foundDevices, 'deviceId', device.deviceId)
          // const data = {}
          if (idx === -1) {
            this.devicesTemporary[foundDevices.length] = device
            // data[`devices[${foundDevices.length}]`] = device
            // console.log(data)
          } else {
            this.devicesTemporary[idx] = device
            // ++num
            // data[`devices[${++num}]`] = device
          }

          setTimeout(() => {
            this.devices = this.devicesTemporary
			console.log('搜索到的设备')
			console.log(this.devices)
          }, 500)
          // todo: 此时应该把这个设备列表展示，然后用户点击选择
          // todo: 此时会一直处于搜索状态，那么当用户点击某个蓝牙设备时，调用 createBLEConnection(设备对象)
          // 那么这里就让它自己动即可
          // for (let i = 0; i < this.devices.length; i++) {
          //   if (this.devices[i].name === 'Mi Band 3') {
          //     this.createBLEConnection()
          //   }
          // }
        })
      })
    },

    // =========================
	// 用户点击某个蓝牙设备 - 进行连接
    // 连接低功耗蓝牙设备。
    // 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作
    // =========================
    createBLEConnection (e) {
      console.log('用户点击，选择连接设备')
      console.log(e)
      const ds = e.currentTarget.dataset
      const deviceId = ds.deviceId
      const name = ds.name
	  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.createBLEConnection({
        deviceId,
        success: (res) => {
			this.connected = true
			this.name = name
			this.deviceId = deviceId
          this.getBLEDeviceServices(deviceId)
        }
      })
	  // 停止扫描附近蓝牙
      this.stopBluetoothDevicesDiscovery()
    },

    // =========================
    // 断开与低功耗蓝牙设备的连接
    // =========================
    closeBLEConnection () {
      console.log('断开连接')
	  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.closeBLEConnection({
        deviceId: this.data.deviceId
      })
	  this.chs = []
	  this.connected = false
	  this.canWrite = false
      // this.setData({
      //   connected: false,
      //   chs: [],
      //   canWrite: false
      // })
    },

    // =========================
    // 获取蓝牙设备 的 所有服务(service)。
    // =========================
    getBLEDeviceServices (deviceId) {
      console.log('-当前连接设备的所有服务↓')
	  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.getBLEDeviceServices({
        deviceId,
        success: (res) => {
          for (let i = 0; i < res.services.length; i++) {
            if (res.services[i].isPrimary) {
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			  // 这里根据每个硬件设备，所用到的服务不同，这里测试0，具体的开始看设备
              this.getBLEDeviceCharacteristics(deviceId, res.services[2].uuid)
              return
            }
          }
        }
      })
    },

    // =========================
	// 获取蓝牙设备某个服务中所有特征值(characteristic)
    // =========================
    getBLEDeviceCharacteristics (deviceId, serviceId) {
		// 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
      uni.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          console.log('获取蓝牙设备某个服务中所有特征值(characteristic) 成功', res.characteristics)
          for (let i = 0; i < res.characteristics.length; i++) {
            let item = res.characteristics[i]
            if (item.properties.read) {
              console.log(item.uuid, '该服务下，可读的UUID特征值')
			  // 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用
			  // 接口读取到的信息需要在 onBLECharacteristicValueChange 方法注册的回调中获取
			  // 原本为uni.xxx 但uniapp框架做了层封装，使用uni.xxx也能调用蓝牙功能，且，可以适配APP端；
              uni.readBLECharacteristicValue({
                // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
                deviceId,
                // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
                serviceId,
                // 这里的 characteristicId就是特征值uuid 需要在 getBLEDeviceCharacteristics 接口中获取
                characteristicId: item.uuid,
                success (res) {
                  console.log('获取蓝牙设备某个服务中所有特征值(characteristic) 失败:', res.errCode)
                }
              })
            }
			// 如果该服务下的某个UUID支持写入，那么就执行写入
            if (item.properties.write) {
				this.canWrite = true
              // this.setData({
              //   canWrite: true
              // })
              this._deviceId = deviceId
              this._serviceId = serviceId
              this._characteristicId = item.uuid
			  console.log(item.uuid, '该服务下，可写的UUID特征值')
              // 在这里发送数据，后边才能通过监听状态值拿到变化，也就是读取出来的值，是根据发送的内容变化的（JK猜测）
              this.writeBLECharacteristicValue()
            }
			// 监听状态值变化
            if (item.properties.notify || item.properties.indicate) {
              uni.notifyBLECharacteristicValueChange({
                deviceId,
                serviceId,
                characteristicId: item.uuid,
                state: true
              })
            }
          }
        },
        fail (res) {
          console.error('getBLEDeviceCharacteristics', res)
        }
      })
      // 操作之前先监听，保证第一时间获取数据
	  // 每次监听到UUID服务值的读取值变化的时候，都会进入，也就是 readBLECharacteristicValue 读取到的值，是在这里获取的，
	  // 这里将每次获取到的UUID的Arrbuffer值拿到，并且转成16进制数值，然后再转成字符串（可能有乱码）
      uni.onBLECharacteristicValueChange((characteristic) => {
		  // 这里将每次监听该服务下的UUID值的变化
		  // 并储存起来
        const idx = this.inArray(this.chs, 'uuid', characteristic.characteristicId)
        const data = {}
        if (idx === -1) {
          console.log('！！！！！！！！！！')
          console.log(characteristic.value)
          console.log('16进制转字符串↓')
          console.log(this.hexCharCodeToStr(this.ab2hex(characteristic.value)))
		  
		  this.chs[this.chs.length] = {
            uuid: characteristic.characteristicId,
            value: this.ab2hex(characteristic.value)
          }
          // data[`chs[${this.data.chs.length}]`] = {
          //   uuid: characteristic.characteristicId,
          //   value: this.ab2hex(characteristic.value)
          // }
        } else {
          console.log('16进制转字符串↓')
          console.log(this.hexCharCodeToStr(this.ab2hex(characteristic.value)))
		  
		  this.chs[idx] = {
            uuid: characteristic.characteristicId,
            value: this.ab2hex(characteristic.value)
          }
		  
          // data[`chs[${idx}]`] = {
          //   uuid: characteristic.characteristicId,
          //   value: this.ab2hex(characteristic.value)
          // }
        }
        // data[`chs[${this.data.chs.length}]`] = {
        //   uuid: characteristic.characteristicId,
        //   value: ab2hex(characteristic.value)
        // }
        // this.setData(data)
        console.log(this.chs)
		// 经过没一次的转换和存储，最后this.chs下会有多个对象 如下↓
		// {uuid: "00002A25-0000-1000-8000-00805F9B34FB", value: "336439393335643865333432"}
		// 这个UUID是当前连接服务下的 characteristic
        console.log('-------------')
      })
    },

    // ==========================
    // 写入数据
    // 向低功耗蓝牙设备特征值中写入二进制数据
    // ==========================
    writeBLECharacteristicValue () {
      console.log('写数据')
      // 向蓝牙设备发送一个0x00的16进制数据
	  // 这个ArrayBuffer(x)就是下边我们要dataView.setUint8(0, 1)的个数，比如要设置8个值，那么这里就是ArrayBuffer(8)
      let buffer = new ArrayBuffer(1)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, 1)
      console.log('发送的buffer')
      console.log(buffer)
      uni.writeBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._serviceId,
        characteristicId: this._characteristicId,
        value: buffer
      })
    },

    // ==========================
    // 关闭蓝牙模块。
    // 调用该方法将断开所有已建立的连接并释放系统资源。
    // 建议在使用蓝牙流程后，与 uni.openBluetoothAdapter（初始化蓝牙） 成对调用
    // ==========================
    closeBluetoothAdapter () {
      console.log('结束流程')
      uni.closeBluetoothAdapter()
      this._discoveryStarted = false
    },

    // ==========================
    // 以下是一些转译的工具函数
    // 以下是一些转译的工具函数
    // 以下是一些转译的工具函数
    // ==========================
    inArray (arr, key, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
          return i
        }
      }
      return -1
    },

    // ArrayBuffer转16进度字符串示例
    ab2hex (buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('')
    },

    // 16进制转字符串
    hexCharCodeToStr (str) {
      var trimedStr = str.trim()
      var rawStr =
        trimedStr.substr(0, 2).toLowerCase() === '0x'
          ? trimedStr.substr(2)
          : trimedStr
      var len = rawStr.length
      if (len % 2 !== 0) {
        // alert("Illegal Format ASCII Code!");
        return ''
      }
      var curCharCode
      var resultStr = []
      for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode))
      }
      return resultStr.join('')
    },
    // 让vue使用小程序的setData方法
    // setData: function (obj) {
    //   let that = this
    //   let keys = []
    //   let val, data
    //   Object.keys(obj).forEach(function (key) {
    //     keys = key.split('.')
    //     val = obj[key]
    //     data = that.$data
    //     keys.forEach(function (key2, index) {
    //       if (index + 1 === keys.length) {
    //         that.$set(data, key2, val)
    //       } else {
    //         if (!data[key2]) {
    //           that.$set(data, key2, {})
    //         }
    //       }
    //       data = data[key2]
    //     })
    //   })
    // },
    // 设置界面上显示信号长度，因为小程序无法送过return的方式传值，那么只能通过手动设置了
    max (item, index) {
      this.devices[index].RSSIMAX = Math.max(0, item.RSSI + 100)
    },
    len (item, index) {
      item = item.advertisServiceUUIDs || []
      this.devices[index].serverNum = item.length
    }
  }
}
</script>

<style lang="stylus">
.test {
  .devices_summary {
    margin-top: 30px;
    padding: 10px;
    font-size: 16px;
  }
  .device_list {
    height: 300px;
    margin: 50px 5px;
    margin-top: 0;
    border: 1px solid #EEE;
    border-radius: 5px;
    width: auto;
  }
  .device_item {
    border-bottom: 1px solid #EEE;
    padding: 10px;
    color: #666;
  }
  .device_item_hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .connected_info {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F0F0F0;
    padding: 10px;
    padding-bottom: 20px;
    margin-bottom: env(safe-area-inset-bottom);
    font-size: 14px;
    min-height: 100px;
    box-shadow: 0 0 3px 0;
  }
  .connected_info .operation {
    position: absolute;
    display: inline-block;
    right: 30px;
  }

}
</style>
