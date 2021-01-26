// Promise getSetting
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject(err)
      },
    });
  })
}
// Promise chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
// Promise openSetting
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
// Promise showModal
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
  wx.showModal({
    title: '提示',
    content: content,
    success: (result) => {
      resolve(result)
    },
    fail: (err) => {
      reject(err)
    },
  })

})}

// Promise showToast
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
  wx.showToast({
    title: title,
    icon: 'none',
    success: (result) => {
      resolve(result)
    },
    fail: (err) => {
      reject(err)
    },
  })

})}
